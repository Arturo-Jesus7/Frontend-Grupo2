import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Diagnosticos } from '../../../models/Diagnosticos';
import { DiagnosticosService } from '../../../services/diagnosticosservice';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-diagnosticoslistar',
  imports: [MatPaginator, MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './diagnosticoslistar.html',
  styleUrl: './diagnosticoslistar.css',
})
export class Diagnosticoslistar {
  dataSource: MatTableDataSource<Diagnosticos> = new MatTableDataSource();
  displayedColumns: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'FK', 'l', 'm'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private _snackBar = inject(MatSnackBar);

  constructor(private dS: DiagnosticosService) { }

  ngOnInit(): void {
    this.dS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.dS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;

    });
  }

  eliminar(id: number) {
    this.dS.delete(id).subscribe(data => {
      this.dS.list().subscribe(data => {
        this.dS.setList(data);
        this._snackBar.open('Se eliminó correctamente', 'Cerrar', { duration: 3000 });

      });
    });
  }

  listar(): void {
    this.dS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  registrar(): void {
    window.location.href = '/diagnosticos/nuevo';
  }
}