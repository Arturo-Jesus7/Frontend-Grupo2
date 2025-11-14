import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Alertas } from '../../../models/Alertas';
import { AlertasService } from '../../../services/alertasservice';

@Component({
  selector: 'app-alertaslistar',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './alertaslistar.html',
  styleUrl: './alertaslistar.css',
})
export class Alertaslistar {
  dataSource: MatTableDataSource<Alertas> = new MatTableDataSource();
  displayedColumns: string[] = ['a', 'b', 'c', 'd', 'FK', 'l', 'm'];

  constructor(private uS: AlertasService) {}

  ngOnInit(): void {
    this.uS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.uS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.uS.delete(id).subscribe(data => {
      this.uS.list().subscribe(data => {
        this.uS.setList(data);
      });
    });
  }

  // 👇 Métodos nuevos (sin tocar lo anterior)
  listar(): void {
    this.uS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  registrar(): void {
    window.location.href = '/alertas/nuevo';
  }
}