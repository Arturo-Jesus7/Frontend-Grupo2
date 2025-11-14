import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Pagos } from '../../../models/Pagos';
import { PagosService } from '../../../services/pagosservice';

@Component({
  selector: 'app-pagoslistar',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './pagoslistar.html',
  styleUrl: './pagoslistar.css',
})
export class Pagoslistar {
  dataSource: MatTableDataSource<Pagos> = new MatTableDataSource();
  displayedColumns: string[] = ['a', 'b', 'c', 'd', 'e', 'FK', 'l', 'm'];

  constructor(private pS: PagosService) {}

  ngOnInit(): void {
    this.pS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.pS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.pS.delete(id).subscribe(data => {
      this.pS.list().subscribe(data => {
        this.pS.setList(data);
      });
    });
  }

  listar(): void {
    this.pS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  registrar(): void {
    window.location.href = '/pagos/nuevo';
  }
}