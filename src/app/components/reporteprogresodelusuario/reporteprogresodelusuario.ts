import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ReporteProgresoUsuarioDTO } from '../../models/reporte-progreso-usuario-dto';
import { UsuariosService } from '../../services/usuariosservice';

@Component({
  selector: 'app-reporteprogresodelusuario',
  standalone: true,
  imports: [
    NgChartsModule,
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './reporteprogresodelusuario.html',
  styleUrl: './reporteprogresodelusuario.css'
})
export class Reporteprogresodelusuario implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Lista de resultados del backend
  listaResultados: ReporteProgresoUsuarioDTO[] = [];
  
  noData: boolean = false;
  
  // Columnas: Usuario, Fecha, Detalle y el valor del Progreso
  displayedColumns: string[] = ['usuario', 'fecha', 'detalle', 'progreso'];

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
          label: (context) => `Progreso: ${context.raw}%`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100, // Asumiendo que el progreso es de 0 a 100
        ticks: {
          stepSize: 10
        }
      }
    }
  };

  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Nivel de Progreso (%)',
      backgroundColor: []
    }]
  };

  constructor(private uS: UsuariosService) {}

  ngOnInit(): void {
    this.cargarReporte();
  }

  cargarReporte(): void {
    this.uS.progresoDeUsuario().subscribe({
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
        console.error('Error al cargar reporte de progreso:', err);
        this.noData = true;
        this.limpiarGrafico();
      }
    });
  }

  private procesarDatos(data: ReporteProgresoUsuarioDTO[]) {
    this.listaResultados = data;

    // Etiquetas: Nombre Usuario + Fecha (para diferenciar reportes del mismo usuario)
    const etiquetas = data.map(item => {
      // Formatear fecha corta
      const fecha = new Date(item.fechaReporte).toLocaleDateString(); 
      return `${item.nameUsuario} ${item.apellidoUsuario} (${fecha})`;
    });

    const valores = data.map(item => item.progresoReporte);

    // Paleta de colores
    const backgroundColors = [
      '#ec830a', '#f5862c', '#f06119', '#f7863a', '#d95f02',
      '#7570b3', '#66a61e', '#e7298a', '#1b9e77', '#e6ab02'
    ];
    const colores = Array.from({ length: valores.length }, (_, i) => backgroundColors[i % backgroundColors.length]);

    this.barChartData = {
      labels: etiquetas,
      datasets: [{
        data: valores,
        label: 'Progreso',
        backgroundColor: colores
      }]
    };
    
    this.chart?.update();
  }

  private limpiarGrafico() {
    this.listaResultados = [];
    this.barChartData = {
      labels: [],
      datasets: [{ data: [], label: '', backgroundColor: [] }]
    };
  }
}