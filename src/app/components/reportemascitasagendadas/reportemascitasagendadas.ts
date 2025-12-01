import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TotalCitasUsuarioDTO } from '../../models/total-citas-usuario-dto';
import { UsuariosService } from '../../services/usuariosservice';


@Component({
  selector: 'app-reportemascitasagendadas',
  standalone: true,
  imports: [
    NgChartsModule,
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './reportemascitasagendadas.html',
  styleUrl: './reportemascitasagendadas.css'
})
export class Reportemascitasagendadas implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Lista de datos recibidos del backend
  listaResultados: TotalCitasUsuarioDTO[] = [];
  totalCitasRegistradas: number = 0;

  noData: boolean = false;
  // Columnas a mostrar en la tabla (Usuario, Cantidad, Porcentaje)
  displayedColumns: string[] = ['usuario', 'cantidad', 'porcentaje'];

  // Configuración del Gráfico de Barras
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
          label: (context) => `Citas: ${context.raw}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1 // Números enteros para conteo de citas
        }
      }
    }
  };

  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Citas Agendadas por Usuario',
      backgroundColor: []
    }]
  };

  constructor(private uS: UsuariosService) {}

  ngOnInit(): void {
    this.cargarReporte();
  }

  cargarReporte(): void {
    this.uS.masCitasAgendadas().subscribe({
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
        console.error('Error al cargar reporte de citas agendadas:', err);
        this.noData = true;
        this.limpiarGrafico();
      }
    });
  }

  private procesarDatos(data: TotalCitasUsuarioDTO[]) {
    this.listaResultados = data;
    
    // Calculamos el total general para sacar los porcentajes relativos
    this.totalCitasRegistradas = data.reduce((sum, item) => sum + item.cantidadCitas, 0);

    // Preparamos etiquetas (Nombre + Apellido) y valores
    const etiquetas = data.map(item => `${item.nameUsuario} ${item.apellidoUsuario}`);
    const valores = data.map(item => item.cantidadCitas);

    // Paleta de colores consistente
    const backgroundColors = [
      '#ec830a', '#f5862c', '#f06119', '#f7863a', '#d95f02',
      '#7570b3', '#66a61e', '#e7298a', '#1b9e77', '#e6ab02'
    ];
    const colores = Array.from({ length: valores.length }, (_, i) => backgroundColors[i % backgroundColors.length]);

    this.barChartData = {
      labels: etiquetas,
      datasets: [{
        data: valores,
        label: 'Cantidad de Citas',
        backgroundColor: colores
      }]
    };
    
    this.chart?.update();
  }

  private limpiarGrafico() {
    this.listaResultados = [];
    this.totalCitasRegistradas = 0;
    this.barChartData = {
      labels: [],
      datasets: [{ data: [], label: '', backgroundColor: [] }]
    };
  }

  porcentaje(cantidad: number): string {
    if (this.totalCitasRegistradas === 0) return '0.0';
    return ((cantidad / this.totalCitasRegistradas) * 100).toFixed(1);
  }
}