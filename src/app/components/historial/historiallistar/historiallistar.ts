import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Historial } from '../../../models/Historial';
import { HistorialService } from '../../../services/historialservice';

@Component({
  selector: 'app-historiallistar',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './historiallistar.html',
  styleUrl: './historiallistar.css',
})
export class Historiallistar {
  dataSource: MatTableDataSource<Historial> = new MatTableDataSource();
  displayedColumns: string[] = ['a', 'b', 'FK', 'l', 'm'];

  constructor(private hS: HistorialService) {}

  ngOnInit(): void {
    this.hS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.hS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.hS.delete(id).subscribe(data => {
      this.hS.list().subscribe(data => {
        this.hS.setList(data);
      });
    });
  }

  // 👇 Métodos nuevos (sin tocar lo anterior)
  listar(): void {
    this.hS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  registrar(): void {
    window.location.href = '/historial/nuevo';
  }
}