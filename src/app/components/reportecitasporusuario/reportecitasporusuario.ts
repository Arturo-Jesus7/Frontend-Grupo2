import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartType, ChartOptions, ChartData } from 'chart.js';
import { NgChartsModule, BaseChartDirective } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { CitasService } from '../../services/citasservice';
import { CitaPorUsuarioDTO } from '../../models/CitaPorUsuarioDTO';

@Component({
  selector: 'app-reportecitasporusuario',
  standalone: true,
  imports: [
    CommonModule,
    NgChartsModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './reportecitasporusuario.html',
  styleUrl: './reportecitasporusuario.css'
})
export class Reportecitasporusuario implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  hasData: boolean = false;

  barChartType: ChartType = 'bar';

  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `Total: ${context.raw}`
        }
      }
    },
    scales: {
      x: {},
      y: {
        beginAtZero: true
      }
    }
  };

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Cantidad de Citas por Usuario',
        backgroundColor: []
      }
    ]
  };

  constructor(private cS: CitasService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cS.getcitsdporusuario().subscribe({
      next: (data) => {
        if (!data || data.length === 0) {
          this.hasData = false;
          this.limpiarGrafico();
        } else {
          this.hasData = true;
          this.procesarDatos(data);
        }
      },
      error: (err) => {
        console.error('Error al obtener datos de citas por usuario', err);
        this.hasData = false;
        this.limpiarGrafico();
      }
    });
  }

  private procesarDatos(data: CitaPorUsuarioDTO[]): void {
    const etiquetas = data.map(item => `Usuario ${item.id}`);
    const valores = data.map(item => item.totalCitas);

    const coloresBase = [
      '#ec830a', '#f5862c', '#f06119', '#f7863a', '#d95f02',
      '#7570b3', '#66a61e', '#e7298a', '#1b9e77', '#e6ab02'
    ];
    const colores = Array.from({ length: valores.length }, (_, i) => coloresBase[i % coloresBase.length]);

    this.barChartData = {
      labels: etiquetas,
      datasets: [
        {
          data: valores,
          label: 'Cantidad de Citas por Usuario',
          backgroundColor: colores
        }
      ]
    };

    this.chart?.update();
  }

  private limpiarGrafico(): void {
    this.barChartData = {
      labels: [],
      datasets: [
        {
          data: [],
          label: '',
          backgroundColor: []
        }
      ]
    };

    this.chart?.update();
  }
}
