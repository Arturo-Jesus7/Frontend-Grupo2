import { Component } from '@angular/core';
import {
  ChartDataCustomTypesPerDataset,
  ChartDataset,
  ChartOptions,
  ChartType,
} from './../../../../node_modules/chart.js/dist/types/index.d';
import { MatIconModule } from '@angular/material/icon';
import { CitasService } from '../../services/citasservice';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';

@Component({
  selector: 'app-reportecitasporusuario',
  imports: [MatIconModule, BaseChartDirective],
  templateUrl: './reportecitasporusuario.html',
  styleUrl: './reportecitasporusuario.css',
  providers: [provideCharts(withDefaultRegisterables())],

})
export class Reportecitasporusuario {
 hasData = false;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLegend = true;
  barChartLabels: number[] = [];

  barChartData: ChartDataset[] = [];
  barChartType: ChartType = 'bar';

  constructor(private cS: CitasService) {}

  ngOnInit(): void {
    this.cS.getcitsdporusuario().subscribe((data) => {
      if (data.length > 0) {
        this.hasData=true
        this.barChartLabels = data.map((item) => item.id);
        this.barChartData = [
          {
            data: data.map((item) => item.totalCitas),
            label: 'Cantidad de software por dispositivo',
            backgroundColor: [
              '#ec830af5', // Rojo intenso
              '#f5862ce0', // Rojo estándar

              '#f5863dff', // Rojo oscuro
              '#f06119ff', // Rojo claro
              '#f7863aff',
            ],
          },
        ];
      } else {
        this.hasData = false;
      }
    });
}
}
