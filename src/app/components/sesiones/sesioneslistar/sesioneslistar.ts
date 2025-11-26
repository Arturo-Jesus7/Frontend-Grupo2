import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Sesiones } from '../../../models/Sesiones';
import { SesionesService } from '../../../services/sesionesservice';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sesioneslistar',
  imports: [MatPaginator,MatCardModule,MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './sesioneslistar.html',
  styleUrl: './sesioneslistar.css',
})
export class Sesioneslistar {
  dataSource: MatTableDataSource<Sesiones> = new MatTableDataSource();
  displayedColumns: string[] = ['a', 'b', 'c', 'd', 'FK', 'l', 'm'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private _snackBar = inject(MatSnackBar);

  constructor(private sS: SesionesService) {}

  ngOnInit(): void {
    this.sS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.sS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;

    });
  }

  eliminar(id: number) {
    this.sS.delete(id).subscribe(data => {
      this.sS.list().subscribe(data => {
        this.sS.setList(data);
                this._snackBar.open('Se eliminó correctamente', 'Cerrar', { duration: 3000 });

      });
    });
  }

  // 👇 Métodos nuevos (sin tocar lo anterior)
  listar(): void {
    this.sS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  registrar(): void {
    window.location.href = '/sesiones/nuevo';
  }
}