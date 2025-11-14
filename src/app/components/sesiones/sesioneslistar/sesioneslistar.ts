import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Sesiones } from '../../../models/Sesiones';
import { SesionesService } from '../../../services/sesionesservice';

@Component({
  selector: 'app-sesioneslistar',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './sesioneslistar.html',
  styleUrl: './sesioneslistar.css',
})
export class Sesioneslistar {
  dataSource: MatTableDataSource<Sesiones> = new MatTableDataSource();
  displayedColumns: string[] = ['a', 'b', 'c', 'd', 'FK', 'l', 'm'];

  constructor(private sS: SesionesService) {}

  ngOnInit(): void {
    this.sS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.sS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.sS.delete(id).subscribe(data => {
      this.sS.list().subscribe(data => {
        this.sS.setList(data);
      });
    });
  }

  // 👇 Métodos nuevos (sin tocar lo anterior)
  listar(): void {
    this.sS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  registrar(): void {
    window.location.href = '/sesiones/nuevo';
  }
}