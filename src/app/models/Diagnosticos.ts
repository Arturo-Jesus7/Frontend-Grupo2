import { Historial } from "./Historial"

export class Diagnosticos{
    idDiagnostico:number=0
    fechaRegistroDiagnostico:Date=new Date()
    descripcionDiagnostico:string=""
    terapeutaDiagnostico=""
    severidadDiagnostico=""
    firmaDiagnostico:string=""
    historial:Historial=new Historial()
}