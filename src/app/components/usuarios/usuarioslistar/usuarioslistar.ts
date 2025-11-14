import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Usuarios } from '../../../models/Usuarios';
import { UsuariosService } from '../../../services/usuariosservice';

@Component({
  selector: 'app-usuarioslistar',
  imports: [MatTableModule,CommonModule,MatIconModule,RouterLink , MatButtonModule,RouterLink],
  templateUrl: './usuarioslistar.html',
  styleUrl: './usuarioslistar.css',
})
export class Usuarioslistar {
  dataSource: MatTableDataSource<Usuarios> = new MatTableDataSource();
  displayedColumns: string[] = ['a', 'b', 'c', 'd','e','f','g','h','i','j','k','FK','l','m'];
  
  constructor(private uS: UsuariosService) {}
  ngOnInit(): void {

    this.uS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.uS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }  
  eliminar(id:number){
    this.uS.delete(id).subscribe(data=>{
      this.uS.list().subscribe(data=>{
        this.uS.setList(data)
      })
    })
  }
}
