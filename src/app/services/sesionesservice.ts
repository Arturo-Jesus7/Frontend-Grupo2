import { Injectable } from "@angular/core";
import { environment } from "../../environments/environments";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Sesiones } from "../models/Sesiones";

const base_url=environment.base
@Injectable({
    providedIn:'root',
})
export class SesionesService{
   private url = `${base_url}/sesiones`;

    private listaCambio = new Subject<Sesiones[]>();

    constructor(private http:HttpClient) {}

    list(){
        return this.http.get<Sesiones[]>(this.url);
    }
    insert(r:Sesiones){
        return this.http.post(this.url,r,{responseType:'text'});
    }
    setList(listaNueva:Sesiones[]){
        this.listaCambio.next(listaNueva);
    }
    getList(){
        return this.listaCambio.asObservable();
    }
    listId(id:number){
        return this.http.get<Sesiones>(`${this.url}/${id}`);
    }
    update(r:Sesiones) {
    return this.http.put(this.url, r, { responseType: 'text' });
  }
    delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}