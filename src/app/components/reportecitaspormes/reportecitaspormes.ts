import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CitasService } from '../../services/citasservice';
import { CitasPorMesDTO } from '../../models/CitasPorMesDTO';

@Component({
  selector: 'app-reportecitaspormes',
  standalone: true,
  imports: [
    NgChartsModule,
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './reportecitaspormes.html',
  styleUrl: './reportecitaspormes.css'
})
export class Reportecitaspormes implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  listaCitas: CitasPorMesDTO[] = [];
  totalCitas: number = 0;

  noData: boolean = false;
  displayedColumns: string[] = ['mes', 'cantidad', 'porcentaje'];

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
    }
  };

  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Citas por Mes',
      backgroundColor: []
    }]
  };

  constructor(private cS: CitasService) {}

  ngOnInit(): void {
    this.cargarReporte();
  }

  cargarReporte(): void {
    this.cS.getcitaspormes().subscribe({
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
        console.error('Error al cargar el reporte:', err);
        this.noData = true;
        this.limpiarGrafico();
      }
    });
  }

  private procesarDatos(data: CitasPorMesDTO[]) {
    this.listaCitas = data;
    this.totalCitas = data.reduce((sum, item) => sum + item.total, 0);

    // Colores para las barras
    const backgroundColors = [
      '#ec830a', '#f5862c', '#f06119', '#f7863a', '#d95f02',
      '#7570b3', '#66a61e', '#e7298a', '#1b9e77', '#e6ab02'
    ];
    // Repetir colores si hay más barras que colores definidos
    const colores = Array.from({ length: data.length }, (_, i) => backgroundColors[i % backgroundColors.length]);

    this.barChartData = {
      labels: data.map(d => d.mes),
      datasets: [{
        data: data.map(d => d.total),
        label: 'Cantidad de Citas',
        backgroundColor: colores
      }]
    };
    
    this.chart?.update();
  }

  private limpiarGrafico() {
    this.listaCitas = [];
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