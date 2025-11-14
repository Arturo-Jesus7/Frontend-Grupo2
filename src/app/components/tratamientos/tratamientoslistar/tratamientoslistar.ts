import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Tratamientos } from '../../../models/Tratamientos';
import { TratamientossService } from '../../../services/tratamientosservice';

@Component({
  selector: 'app-tratamientoslistar',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './tratamientoslistar.html',
  styleUrl: './tratamientoslistar.css',
})
export class Tratamientoslistar {
  dataSource: MatTableDataSource<Tratamientos> = new MatTableDataSource();
  displayedColumns: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'FK', 'l', 'm'];

  constructor(private tS: TratamientossService) {}

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

  listar(): void {
    this.tS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  registrar(): void {
    window.location.href = '/tratamientos/nuevo';
  }
}