import { Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Usuarios } from '../../../models/Usuarios';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Terapeutasservice } from '../../../services/terapeutasservice';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-terapeutaslistar',
  imports: [MatPaginatorModule, MatCardModule, CommonModule, MatIconModule, RouterLink, MatButtonModule, RouterLink],
  templateUrl: './terapeutaslistar.html',
  styleUrl: './terapeutaslistar.css',
})
export class Terapeutaslistar {
  dataSource: MatTableDataSource<Usuarios> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
    private _snackBar = inject(MatSnackBar);

  constructor(private teS: Terapeutasservice) {}

  ngOnInit(): void {
    this.teS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.teS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.teS.delete(id).subscribe(data => {
      this.teS.list().subscribe(data => {
        this.teS.setList(data);
        this._snackBar.open('Se eliminó correctamente', 'Cerrar', { duration: 3000 });

      });
    });
  }

  listar(): void {
    this.teS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  registrar(): void {
    window.location.href = '/terapeutas/nuevo';
  }
}
