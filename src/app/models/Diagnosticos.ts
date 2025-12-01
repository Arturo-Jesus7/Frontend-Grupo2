import { Historial } from "./Historial"

export class Diagnosticos{
    idDiagnostico:number=0
    fechaRegistroDiagnostico:Date=new Date()
    descripcionDiagnostico:string=""
    terapeutaDiagnostico:string=""
    severidadDiagnostico:string=""
    firmaDiagnostico:string=""
    historial:Historial=new Historial()
}