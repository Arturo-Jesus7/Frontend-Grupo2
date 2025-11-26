import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Alertas } from '../../../models/Alertas';
import { AlertasService } from '../../../services/alertasservice';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alertaslistar',
  imports: [MatPaginator, MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './alertaslistar.html',
  styleUrl: './alertaslistar.css',
})
export class Alertaslistar {
  dataSource: MatTableDataSource<Alertas> = new MatTableDataSource();
  displayedColumns: string[] = ['a', 'b', 'c', 'd', 'FK', 'l', 'm'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private _snackBar = inject(MatSnackBar);

  constructor(private uS: AlertasService) { }

  ngOnInit(): void {
    this.uS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.uS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;

    });
  }

  eliminar(id: number) {
    this.uS.delete(id).subscribe(data => {
      this.uS.list().subscribe(data => {
        this.uS.setList(data);
        this._snackBar.open('Se eliminó correctamente', 'Cerrar', { duration: 3000 });

      });
    });
  }

  // 👇 Métodos nuevos (sin tocar lo anterior)
  listar(): void {
    this.uS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  registrar(): void {
    window.location.href = '/alertas/nuevo';
  }
}