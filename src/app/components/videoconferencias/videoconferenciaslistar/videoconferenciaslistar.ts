import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Videoconferencias } from '../../../models/Videoconferencias';
import { VideoconferenciasService } from '../../../services/videoconferenciasservices';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-videoconferenciaslistar',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule,MatPaginator],
  templateUrl: './videoconferenciaslistar.html',
  styleUrl: './videoconferenciaslistar.css',
})
export class Videoconferenciaslistar {
  dataSource: MatTableDataSource<Videoconferencias> = new MatTableDataSource();
  displayedColumns: string[] = ['a', 'b', 'c', 'd', 'e', 'FK', 'l', 'm'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private _snackBar = inject(MatSnackBar);

  constructor(private vS: VideoconferenciasService) {}

  ngOnInit(): void {
    this.vS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.vS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;

    });
  }

  eliminar(id: number) {
    this.vS.delete(id).subscribe(data => {
      this.vS.list().subscribe(data => {
        this.vS.setList(data);
        this._snackBar.open('Se eliminó correctamente', 'Cerrar', { duration: 3000 });

      });
    });
  }

  listar(): void {
    this.vS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  registrar(): void {
    window.location.href = '/videoconferencias/nuevo';
  }
}