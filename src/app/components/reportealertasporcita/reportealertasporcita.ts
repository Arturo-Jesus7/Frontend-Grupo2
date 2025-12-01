import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AlertasService } from '../../services/alertasservice';
import { AlertaPorCitaDTO } from '../../models/alerta-por-cita-dto';

// Interfaz para la tabla resumen (agrupado)
interface ReporteAlertaAgrupado {
  fecha: string;
  cantidad: number;
}

@Component({
  selector: 'app-reportealertasporcita',
  standalone: true,
  imports: [
    NgChartsModule,
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './reportealertasporcita.html',
  styleUrl: './reportealertasporcita.css'
})
export class Reportealertasporcita implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Variables de datos
  listaResultados: ReporteAlertaAgrupado[] = [];
  totalAlertas: number = 0;
  noData: boolean = false;

  // Columnas para la tabla
  displayedColumns: string[] = ['fecha', 'cantidad', 'porcentaje'];

  // --- CONFIGURACIÓN DEL GRÁFICO ---
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `Alertas: ${context.raw}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1 // Para que no salgan decimales en el eje Y (ej: 1.5 alertas)
        }
      }
    }
  };

  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Cantidad de Alertas por Fecha',
      backgroundColor: [],
      borderColor: '#333',
      borderWidth: 1
    }]
  };

  constructor(private aS: AlertasService) {}

  ngOnInit(): void {
    this.cargarReporte();
  }

  cargarReporte(): void {
    this.aS.alertasPorCita().subscribe({
      next: (data: AlertaPorCitaDTO[]) => {
        if (!data || data.length === 0) {
          this.noData = true;
          this.limpiarGrafico();
        } else {
          this.noData = false;
          this.procesarDatos(data);
        }
      },
      error: (err) => {
        console.error('Error al cargar el reporte:', err);
        this.noData = true;
        this.limpiarGrafico();
      }
    });
  }

  private procesarDatos(data: AlertaPorCitaDTO[]) {
    // 1. Total de alertas (filas crudas del backend)
    this.totalAlertas = data.length;

    // 2. Agrupar por Fecha (YYYY-MM-DD)
    // El backend devuelve LocalDateTime, que llega como string "2023-11-20T10:00:00"
    const mapConteo = new Map<string, number>();

    data.forEach(item => {
      // Convertimos el string o Date a un objeto Date real
      const fechaObj = new Date(item.fechaCita);
      
      // Validamos que sea una fecha válida
      if (!isNaN(fechaObj.getTime())) {
        // Extraemos solo la parte de la fecha YYYY-MM-DD
        // Usamos toISOString().split('T')[0] para formato estándar
        const fechaStr = fechaObj.toISOString().split('T')[0];

        if (mapConteo.has(fechaStr)) {
          mapConteo.set(fechaStr, mapConteo.get(fechaStr)! + 1);
        } else {
          mapConteo.set(fechaStr, 1);
        }
      }
    });

    // 3. Convertir el Mapa a Array y Ordenar por fecha ascendente
    const resultados: ReporteAlertaAgrupado[] = Array.from(mapConteo, ([fecha, cantidad]) => ({
      fecha,
      cantidad
    })).sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

    this.listaResultados = resultados;

    // 4. Preparar colores dinámicos
    const paletaColores = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', 
      '#FF9F40', '#E7E9ED', '#71B37C', '#EC932F', '#069BFF'
    ];
    const colores = resultados.map((_, i) => paletaColores[i % paletaColores.length]);

    // 5. Actualizar los datos del gráfico
    this.barChartData = {
      labels: resultados.map(r => r.fecha),
      datasets: [{
        data: resultados.map(r => r.cantidad),
        label: 'Cantidad de Alertas',
        backgroundColor: colores,
        borderColor: 'rgba(0,0,0,0.1)',
        borderWidth: 1
      }]
    };

    // Forzar actualización visual del gráfico
    this.chart?.update();
  }

  private limpiarGrafico() {
    this.listaResultados = [];
    this.totalAlertas = 0;
    this.barChartData = {
      labels: [],
      datasets: [{ data: [], label: '', backgroundColor: [] }]
    };
  }

  // Método auxiliar para la tabla
  porcentaje(cantidad: number): string {
    if (this.totalAlertas === 0) return '0%';
    return ((cantidad / this.totalAlertas) * 100).toFixed(1) + '%';
  }
}