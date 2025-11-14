import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Tecnicas } from '../../../models/Tecnicas';
import { TecnicasService } from '../../../services/tecnicasservice';

@Component({
  selector: 'app-tecnicaslistar',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './tecnicaslistar.html',
  styleUrl: './tecnicaslistar.css',
})
export class Tecnicaslistar {
  dataSource: MatTableDataSource<Tecnicas> = new MatTableDataSource();
  displayedColumns: string[] = ['a', 'b', 'c', 'FK', 'l', 'm'];

  constructor(private tS: TecnicasService) {}

  ngOnInit(): void {
    this.tS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.tS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.tS.delete(id).subscribe(data => {
      this.tS.list().subscribe(data => {
        this.tS.setList(data);
      });
    });
  }

  // 👇 Métodos nuevos (sin tocar lo anterior)
  listar(): void {
    this.tS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  registrar(): void {
    window.location.href = '/tecnicas/nuevo';
  }
}