import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CitasService } from '../../services/citasservice';
import { CitaPendienteDTO } from '../../models/CitaPendienteDTO';

// Interfaz local para mostrar los datos agrupados en la tabla/gráfico
interface ReportePendienteAgrupado {
  fecha: string;
  cantidad: number;
}

@Component({
  selector: 'app-reportecitasporpendiente',
  standalone: true,
  imports: [
    NgChartsModule,
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './reportecitasporpendiente.html',
  styleUrl: './reportecitasporpendiente.css'
})
export class Reportecitasporpendiente implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Lista procesada para la tabla
  listaResultados: ReportePendienteAgrupado[] = [];
  totalCitas: number = 0;

  noData: boolean = false;
  // Columnas para la tabla
  displayedColumns: string[] = ['fecha', 'cantidad', 'porcentaje'];

  // Configuración del Gráfico
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
          label: (context) => `Cantidad: ${context.raw}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1 // Asegura números enteros en el eje Y
        }
      }
    }
  };

  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Citas Pendientes por Fecha',
      backgroundColor: []
    }]
  };

  constructor(private cS: CitasService) {}

  ngOnInit(): void {
    this.cargarReporte();
  }

  cargarReporte(): void {
    this.cS.getcitasporpendiente().subscribe({
      next: (data) => {
        if (!data || data.length === 0) {
          this.noData = true;
          this.limpiarGrafico();
        } else {
          this.noData = false;
          this.procesarDatos(data);
        }
      },
      error: (err) => {
        console.error('Error al cargar el reporte de pendientes:', err);
        this.noData = true;
        this.limpiarGrafico();
      }
    });
  }

  private procesarDatos(data: CitaPendienteDTO[]) {
    // 1. Calcular el total
    this.totalCitas = data.length;

    // 2. Agrupar las citas por fecha (YYYY-MM-DD)
    // El DTO trae objetos individuales, necesitamos contarlos por día.
    const conteoPorFecha = new Map<string, number>();

    data.forEach(cita => {
      // Formatear la fecha a string simple 'YYYY-MM-DD'
      // Ajustamos para tomar la parte de la fecha sin hora
      const fechaObj = new Date(cita.fecha);
      const fechaStr = fechaObj.toISOString().split('T')[0]; 
      
      conteoPorFecha.set(fechaStr, (conteoPorFecha.get(fechaStr) || 0) + 1);
    });

    // 3. Convertir el Mapa a un Array y ordenarlo por fecha
    const resultados: ReportePendienteAgrupado[] = Array.from(conteoPorFecha, ([fecha, cantidad]) => ({
      fecha,
      cantidad
    })).sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

    this.listaResultados = resultados;

    // 4. Configurar colores (Paleta consistente con tus otros reportes)
    const backgroundColors = [
      '#ec830a', '#f5862c', '#f06119', '#f7863a', '#d95f02',
      '#7570b3', '#66a61e', '#e7298a', '#1b9e77', '#e6ab02'
    ];
    const colores = Array.from({ length: resultados.length }, (_, i) => backgroundColors[i % backgroundColors.length]);

    // 5. Asignar datos al gráfico
    this.barChartData = {
      labels: resultados.map(r => r.fecha),
      datasets: [{
        data: resultados.map(r => r.cantidad),
        label: 'Citas Pendientes',
        backgroundColor: colores
      }]
    };
    
    this.chart?.update();
  }

  private limpiarGrafico() {
    this.listaResultados = [];
    this.totalCitas = 0;
    this.barChartData = {
      labels: [],
      datasets: [{ data: [], label: '', backgroundColor: [] }]
    };
  }

  porcentaje(cantidad: number): string {
    if (this.totalCitas === 0) return '0.0';
    return ((cantidad / this.totalCitas) * 100).toFixed(1);
  }
}