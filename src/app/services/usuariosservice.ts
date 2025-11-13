import { Injectable } from "@angular/core";
import { environment } from "../../environments/environments";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Usuarios } from "../models/Usuarios";

const base_url=environment.base
@Injectable({
    providedIn:'root',
})
export class UsuariosService{
   private url = `${base_url}/usuarios`;

    private listaCambio = new Subject<Usuarios[]>();

    constructor(private http:HttpClient) {}

    list(){
        return this.http.get<Usuarios[]>(this.url);
    }
    insert(r:Usuarios){
        return this.http.post(this.url,r,{responseType:'text'});
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
    return this.http.put(this.url, r, { responseType: 'text' });
  }
    delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}