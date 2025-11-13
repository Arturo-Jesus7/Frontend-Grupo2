import { Injectable } from "@angular/core";
import { environment } from "../../environments/environments";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Tecnicas } from "../models/Tecnicas";

const base_url=environment.base
@Injectable({
    providedIn:'root',
})
export class TecnicasService{
   private url = `${base_url}/tecnicas`;

    private listaCambio = new Subject<Tecnicas[]>();

    constructor(private http:HttpClient) {}

    list(){
        return this.http.get<Tecnicas[]>(this.url);
    }
    insert(r:Tecnicas){
        return this.http.post(this.url,r,{responseType:'text'});
    }
    setList(listaNueva:Tecnicas[]){
        this.listaCambio.next(listaNueva);
    }
    getList(){
        return this.listaCambio.asObservable();
    }
    listId(id:number){
        return this.http.get<Tecnicas>(`${this.url}/${id}`);
    }
    update(r:Tecnicas) {
    return this.http.put(this.url, r, { responseType: 'text' });
  }
    delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}