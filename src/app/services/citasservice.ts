import { Injectable } from "@angular/core";
import { environment } from "../../environments/environments";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Citas } from "../models/Citas";

const base_url=environment.base
@Injectable({
    providedIn:'root',
})
export class CitasService{
   private url = `${base_url}/citas`;

    private listaCambio = new Subject<Citas[]>();

    constructor(private http:HttpClient) {}

    list(){
        return this.http.get<Citas[]>(this.url);
    }
    insert(r:Citas){
        return this.http.post(this.url,r,{responseType:'text'});
    }
    setList(listaNueva:Citas[]){
        this.listaCambio.next(listaNueva);
    }
    getList(){
        return this.listaCambio.asObservable();
    }
    listId(id:number){
        return this.http.get<Citas>(`${this.url}/${id}`);
    }
    update(r:Citas) {
    return this.http.put(this.url, r, { responseType: 'text' });
  }
    delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}