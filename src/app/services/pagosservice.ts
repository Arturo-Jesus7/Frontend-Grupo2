import { Injectable } from "@angular/core";
import { environment } from "../../environments/environments";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Pagos } from "../models/Pagos";

const base_url=environment.base
@Injectable({
    providedIn:'root',
})
export class PagosService{
   private url = `${base_url}/pagos`;

    private listaCambio = new Subject<Pagos[]>();

    constructor(private http:HttpClient) {}

    list(){
        return this.http.get<Pagos[]>(this.url);
    }
    insert(r:Pagos){
        return this.http.post(this.url,r,{responseType:'text'});
    }
    setList(listaNueva:Pagos[]){
        this.listaCambio.next(listaNueva);
    }
    getList(){
        return this.listaCambio.asObservable();
    }
    listId(id:number){
        return this.http.get<Pagos>(`${this.url}/${id}`);
    }
    update(r:Pagos) {
    return this.http.put(this.url, r, { responseType: 'text' });
  }
    delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}