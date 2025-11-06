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
        return this.http.post(this.url,r);
    }
    setList(listaNueva:Roles[]){
        this.listaCambio.next(listaNueva);
    }
    getList(){
        return this.listaCambio.asObservable();
    }
}