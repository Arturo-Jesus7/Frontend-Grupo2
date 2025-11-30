import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Usuarios } from '../models/Usuarios';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
const base_url=environment.base
@Injectable({
  providedIn: 'root',
})
export class Terapeutasservice {
  private url = `${base_url}/usuarios`;

    private listaCambio = new Subject<Usuarios[]>();

    constructor(private http:HttpClient) {}

    list(){
        return this.http.get<Usuarios[]>(`${this.url}/terapeuta`);
    }
    insert(r:Usuarios){
        return this.http.post(`${this.url}/terapeuta`,r,{responseType:'text'});
    }
    setList(listaNueva:Usuarios[]){
        this.listaCambio.next(listaNueva);
    }
    getList(){
        return this.listaCambio.asObservable();
    }
    listId(id:number){
        return this.http.get<Usuarios>(`${this.url}/${id}`);
    }
    update(r:Usuarios) {
    return this.http.put(`${this.url}/terapeuta`, r, { responseType: 'text' });
  }
    delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
