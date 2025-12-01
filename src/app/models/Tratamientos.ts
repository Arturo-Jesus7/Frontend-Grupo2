import { Historial } from "./Historial"

export class Tratamientos{
    idTratamiento:number=0
    objetivoTratamiento:string=""
    planTratamiento:string=""
    FechaInicioTratamiento:Date=new Date()
    FechaFinTratamiento:Date=new Date()
    terapeutaTratamiento:string=""
    progresoTratamiento:number=0
    historial:Historial=new Historial()
}