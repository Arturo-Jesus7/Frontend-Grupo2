import { Injectable } from "@angular/core";
import { environment } from "../../environments/environments";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Diagnosticos } from "../models/Diagnosticos";

const base_url=environment.base
@Injectable({
    providedIn:'root',
})
export class DiagnosticosService{
   private url = `${base_url}/diagnosticos`;

    private listaCambio = new Subject<Diagnosticos[]>();

    constructor(private http:HttpClient) {}

    list(){
        return this.http.get<Diagnosticos[]>(this.url);
    }
    insert(r:Diagnosticos){
        return this.http.post(this.url,r,{responseType:'text'});
    }
    setList(listaNueva:Diagnosticos[]){
        this.listaCambio.next(listaNueva);
    }
    getList(){
        return this.listaCambio.asObservable();
    }
    listId(id:number){
        return this.http.get<Diagnosticos>(`${this.url}/${id}`);
    }
    update(r:Diagnosticos) {
    return this.http.put(this.url, r, { responseType: 'text' });
  }
    delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}