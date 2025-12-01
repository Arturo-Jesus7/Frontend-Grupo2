import { Injectable } from "@angular/core";
import { environment } from "../../environments/environments";
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Citas } from "../models/Citas";
import { CitaPorUsuarioDTO } from "../models/CitaPorUsuarioDTO";
import { CitasPorMesDTO } from "../models/CitasPorMesDTO";
import { CitaPendienteDTO } from "../models/CitaPendienteDTO";

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
  getcitsdporusuario():Observable<CitaPorUsuarioDTO[]>{
    return this.http.get<CitaPorUsuarioDTO[]>(`${this.url}/por-usuario`);
  }
    getcitaspormes():Observable<CitasPorMesDTO[]>{
    return this.http.get<CitasPorMesDTO[]>(`${this.url}/por-mes`);
  }
      getcitasporpendiente():Observable<CitaPendienteDTO[]>{
    return this.http.get<CitaPendienteDTO[]>(`${this.url}/pendientes`);
  }
}