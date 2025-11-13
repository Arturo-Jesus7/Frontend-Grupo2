import { Injectable } from "@angular/core";
import { environment } from "../../environments/environments";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Alertas } from "../models/Alertas";

const base_url=environment.base
@Injectable({
    providedIn:'root',
})
export class AlertasService{
   private url = `${base_url}/alertas`;

    private listaCambio = new Subject<Alertas[]>();

    constructor(private http:HttpClient) {}

    list(){
        return this.http.get<Alertas[]>(this.url);
    }
    insert(r:Alertas){
        return this.http.post(this.url,r,{responseType:'text'});
    }
    setList(listaNueva:Alertas[]){
        this.listaCambio.next(listaNueva);
    }
    getList(){
        return this.listaCambio.asObservable();
    }
    listId(id:number){
        return this.http.get<Alertas>(`${this.url}/${id}`);
    }
    update(r:Alertas) {
    return this.http.put(this.url, r, { responseType: 'text' });
  }
    delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}