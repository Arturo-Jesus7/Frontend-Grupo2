import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Videoconferencias } from '../../../models/Videoconferencias';
import { VideoconferenciasService } from '../../../services/videoconferenciasservices';

@Component({
  selector: 'app-videoconferenciaslistar',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './videoconferenciaslistar.html',
  styleUrl: './videoconferenciaslistar.css',
})
export class Videoconferenciaslistar {
  dataSource: MatTableDataSource<Videoconferencias> = new MatTableDataSource();
  displayedColumns: string[] = ['a', 'b', 'c', 'd', 'e', 'FK', 'l', 'm'];

  constructor(private vS: VideoconferenciasService) {}

  ngOnInit(): void {
    this.vS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.vS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.vS.delete(id).subscribe(data => {
      this.vS.list().subscribe(data => {
        this.vS.setList(data);
      });
    });
  }

  listar(): void {
    this.vS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  registrar(): void {
    window.location.href = '/videoconferencias/nuevo';
  }
}