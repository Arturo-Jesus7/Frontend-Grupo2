import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Pagos } from '../../../models/Pagos';
import { PagosService } from '../../../services/pagosservice';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pagoslistar',
  imports: [MatPaginator, MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './pagoslistar.html',
  styleUrl: './pagoslistar.css',
})
export class Pagoslistar {
  dataSource: MatTableDataSource<Pagos> = new MatTableDataSource();
  displayedColumns: string[] = ['a', 'b', 'd', 'e', 'FK', 'l', 'm'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private _snackBar = inject(MatSnackBar);

  constructor(private pS: PagosService) {}

  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.pS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.pS.delete(id).subscribe((data) => {
      this.pS.list().subscribe((data) => {
        this.pS.setList(data);
        this._snackBar.open('Se eliminó correctamente', 'Cerrar', { duration: 3000 });
      });
    });
  }

  listar(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  registrar(): void {
    window.location.href = '/pagos/nuevo';
  }
}
