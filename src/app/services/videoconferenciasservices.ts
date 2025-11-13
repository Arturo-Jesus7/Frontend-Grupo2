import { Injectable } from "@angular/core";
import { environment } from "../../environments/environments";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Videoconferencias } from "../models/Videoconferencias";

const base_url=environment.base
@Injectable({
    providedIn:'root',
})
export class VideoconferenciasService{
   private url = `${base_url}/videoconferencias`;

    private listaCambio = new Subject<Videoconferencias[]>();

    constructor(private http:HttpClient) {}

    list(){
        return this.http.get<Videoconferencias[]>(this.url);
    }
    insert(r:Videoconferencias){
        return this.http.post(this.url,r,{responseType:'text'});
    }
    setList(listaNueva:Videoconferencias[]){
        this.listaCambio.next(listaNueva);
    }
    getList(){
        return this.listaCambio.asObservable();
    }
    listId(id:number){
        return this.http.get<Videoconferencias>(`${this.url}/${id}`);
    }
    update(r:Videoconferencias) {
    return this.http.put(this.url, r, { responseType: 'text' });
  }
    delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}