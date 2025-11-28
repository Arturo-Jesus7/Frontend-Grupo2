import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Historial } from '../../../models/Historial';
import { HistorialService } from '../../../services/historialservice';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-historiallistar',
  imports: [MatPaginator, MatCardModule, MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './historiallistar.html',
  styleUrl: './historiallistar.css',
})
export class Historiallistar {
  dataSource: MatTableDataSource<Historial> = new MatTableDataSource();
  displayedColumns: string[] = ['a', 'b', 'FK', 'l', 'm'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private _snackBar = inject(MatSnackBar);

  constructor(private hS: HistorialService) { }

  ngOnInit(): void {
    this.hS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.hS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;

    });
  }

  eliminar(id: number) {
    this.hS.delete(id).subscribe(data => {
      this.hS.list().subscribe(data => {
        this.hS.setList(data);
        this._snackBar.open('Se eliminó correctamente', 'Cerrar', { duration: 3000 });
      });
    });
  }

  listar(): void {
    this.hS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  registrar(): void {
    window.location.href = '/historial/nuevo';
  }
}
