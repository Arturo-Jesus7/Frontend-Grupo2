import { Citas } from "./Citas"

export class Sesiones{
    idSesion:number=0
    numeroSesion:string=""
    fechaInicioSesion:Date=new Date()
    fechaFinSesion:Date=new Date()
    citas:Citas=new Citas()
}