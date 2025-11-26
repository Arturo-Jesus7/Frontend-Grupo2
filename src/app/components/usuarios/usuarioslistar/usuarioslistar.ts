import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Usuarios } from '../../../models/Usuarios';
import { UsuariosService } from '../../../services/usuariosservice';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuarioslistar',
  imports: [MatPaginatorModule, MatCardModule, CommonModule, MatIconModule, RouterLink, MatButtonModule, RouterLink],
  templateUrl: './usuarioslistar.html',
  styleUrl: './usuarioslistar.css',
})
export class Usuarioslistar implements OnInit {
  dataSource: MatTableDataSource<Usuarios> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
    private _snackBar = inject(MatSnackBar);

  constructor(private uS: UsuariosService) {}

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

  listar(): void {
    this.uS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator; 
    });
  }

  registrar(): void {
    window.location.href = '/usuarios/nuevo'; 
  }
}