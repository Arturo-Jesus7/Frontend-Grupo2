import { Injectable } from "@angular/core";
import { environment } from "../../environments/environments";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Tratamientos } from "../models/Tratamientos";

const base_url=environment.base
@Injectable({
    providedIn:'root',
})
export class TratamientossService{
   private url = `${base_url}/tratamientos`;

    private listaCambio = new Subject<Tratamientos[]>();

    constructor(private http:HttpClient) {}

    list(){
        return this.http.get<Tratamientos[]>(this.url);
    }
    insert(r:Tratamientos){
        return this.http.post(this.url,r,{responseType:'text'});
    }
    setList(listaNueva:Tratamientos[]){
        this.listaCambio.next(listaNueva);
    }
    getList(){
        return this.listaCambio.asObservable();
    }
    listId(id:number){
        return this.http.get<Tratamientos>(`${this.url}/${id}`);
    }
    update(r:Tratamientos) {
    return this.http.put(this.url, r, { responseType: 'text' });
  }
    delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}