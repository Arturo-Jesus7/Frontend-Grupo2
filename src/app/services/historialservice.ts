import { Injectable } from "@angular/core";
import { environment } from "../../environments/environments";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Historial } from "../models/Historial";

const base_url=environment.base
@Injectable({
    providedIn:'root',
})
export class HistorialService{
   private url = `${base_url}/historiales`;

    private listaCambio = new Subject<Historial[]>();

    constructor(private http:HttpClient) {}

    list(){
        return this.http.get<Historial[]>(this.url);
    }
    insert(r:Historial){
        return this.http.post(this.url,r,{responseType:'text'});
    }
    setList(listaNueva:Historial[]){
        this.listaCambio.next(listaNueva);
    }
    getList(){
        return this.listaCambio.asObservable();
    }
    listId(id:number){
        return this.http.get<Historial>(`${this.url}/${id}`);
    }
    update(r:Historial) {
    return this.http.put(this.url, r, { responseType: 'text' });
  }
    delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}