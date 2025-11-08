import { Injectable } from "@angular/core";
import { environment } from "../../environments/environments";
import { Roles } from "../models/Roles";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
    providedIn: 'root',
})
export class rolesservice{
    private url = `${base_url}/roles`;

    private listaCambio = new Subject<Roles[]>();

    constructor(private http:HttpClient) {}

    list(){
        return this.http.get<Roles[]>(this.url);
    }
    insert(r:Roles){
        return this.http.post(this.url,r,{responseType:'text'});
    }
    setList(listaNueva:Roles[]){
        this.listaCambio.next(listaNueva);
    }
    getList(){
        return this.listaCambio.asObservable();
    }
    listId(id:number){
        return this.http.get<Roles>(`${this.url}/${id}`);
    }
    update(r:Roles) {
    return this.http.put(this.url, r, { responseType: 'text' });
  }
    delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}