import { Injectable } from "@angular/core";
import { environment } from "../../environments/environments";
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Usuarios } from "../models/Usuarios";
import { TotalCitasUsuarioDTO } from "../models/total-citas-usuario-dto";
import { ReporteProgresoUsuarioDTO } from "../models/reporte-progreso-usuario-dto";

const base_url=environment.base
@Injectable({
    providedIn:'root',
})
export class UsuariosService{
   private url = `${base_url}/usuarios`;

    private listaCambio = new Subject<Usuarios[]>();

    constructor(private http:HttpClient) {}

    list(){
        return this.http.get<Usuarios[]>(`${this.url}/usuario`);
    }
    insert(r:Usuarios){
        return this.http.post(`${this.url}/usuario`,r,{responseType:'text'});
    }
    setList(listaNueva:Usuarios[]){
        this.listaCambio.next(listaNueva);
    }
    getList(){
        return this.listaCambio.asObservable();
    }
    listId(id:number){
        return this.http.get<Usuarios>(`${this.url}/${id}`);
    }
    update(r:Usuarios) {
    return this.http.put(`${this.url}/usuario`, r, { responseType: 'text' });
  }
    delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
    // Endpoint: /usuarios/mas-citas-agendadas
  masCitasAgendadas(): Observable<TotalCitasUsuarioDTO[]> {
    return this.http.get<TotalCitasUsuarioDTO[]>(`${this.url}/mas-citas-agendadas`);
  }

  // Endpoint: /usuarios/estado-progreso-usuario
  progresoDeUsuario(): Observable<ReporteProgresoUsuarioDTO[]> {
    return this.http.get<ReporteProgresoUsuarioDTO[]>(`${this.url}/estado-progreso-usuario`);
  }
}
