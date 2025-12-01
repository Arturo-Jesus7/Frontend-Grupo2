import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Citas } from '../../../models/Citas';
import { CitasService } from '../../../services/citasservice';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-citaslistar',
  imports: [MatPaginator, MatCardModule, MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './citaslistar.html',
  styleUrl: './citaslistar.css',
})
export class Citaslistar {
  dataSource: MatTableDataSource<Citas> = new MatTableDataSource();
  displayedColumns: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'FK1', 'FK2', 'l', 'm'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private _snackBar = inject(MatSnackBar);

  constructor(private cS: CitasService) { }

  ngOnInit(): void {
    this.cS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.cS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;

    });
  }

  eliminar(id: number) {
    this.cS.delete(id).subscribe(data => {
      this.cS.list().subscribe(data => {
        this.cS.setList(data);
        this._snackBar.open('Se eliminó correctamente', 'Cerrar', { duration: 3000 });

      });
    });
  }

  listar(): void {
    this.cS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  registrar(): void {
    window.location.href = '/citas/nuevo';
  }
}