import { Usuarios } from "./Usuarios"

export class Citas{
    idCita:number=0
    estadoCita:string=""
    fechaCita:Date=new Date()
    motivoCita:string=""
    videoCita:string=""
    favoritoCita:boolean=false
    usuarioPaciente:Usuarios=new Usuarios()
    usuarioTerapeuta:Usuarios=new Usuarios()
}