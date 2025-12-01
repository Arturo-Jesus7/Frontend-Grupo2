import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Tecnicas } from '../../../models/Tecnicas';
import { TecnicasService } from '../../../services/tecnicasservice';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tecnicaslistar',
  imports: [MatPaginator,MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './tecnicaslistar.html',
  styleUrl: './tecnicaslistar.css',
})
export class Tecnicaslistar {
  dataSource: MatTableDataSource<Tecnicas> = new MatTableDataSource();
  displayedColumns: string[] = ['a', 'b', 'c', 'FK', 'l', 'm'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private _snackBar = inject(MatSnackBar);

  constructor(private tS: TecnicasService) {}

  ngOnInit(): void {
    this.tS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.tS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;

    });
  }

  eliminar(id: number) {
    this.tS.delete(id).subscribe(data => {
      this.tS.list().subscribe(data => {
        this.tS.setList(data);
        this._snackBar.open('Se eliminó correctamente', 'Cerrar', { duration: 3000 });

      });
    });
  }

  // 👇 Métodos nuevos (sin tocar lo anterior)
  listar(): void {
    this.tS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  registrar(): void {
    window.location.href = '/tecnicas/nuevo';
  }
}