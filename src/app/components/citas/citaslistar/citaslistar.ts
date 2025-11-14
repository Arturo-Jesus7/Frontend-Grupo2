import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Citas } from '../../../models/Citas';
import { CitasService } from '../../../services/citasservice';

@Component({
  selector: 'app-citaslistar',
  imports: [MatTableModule,CommonModule,MatIconModule,RouterLink , MatButtonModule,RouterLink],
  templateUrl: './citaslistar.html',
  styleUrl: './citaslistar.css',
})
export class Citaslistar {
dataSource: MatTableDataSource<Citas> = new MatTableDataSource();
  displayedColumns: string[] = ['a', 'b', 'c', 'd','e','f','FK1','FK2','l','m'];
  
  constructor(private cS: CitasService) {}
  ngOnInit(): void {

    this.cS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.cS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }  
  eliminar(id:number){
    this.cS.delete(id).subscribe(data=>{
      this.cS.list().subscribe(data=>{
        this.cS.setList(data)
      })
    })
  }
}
