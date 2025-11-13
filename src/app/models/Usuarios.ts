import { Roles } from "./Roles"

export class Usuarios{
    idUsuario:number=0
    username:string=""
    password:string=""
    enabled:boolean=false
    nameUsuario:string=""
    apellidoUsuario:string=""
    fechaNacimiento:Date=new Date()
    DNIUsuario:number=0
    especialidadUsuario:number=0
    numerocolegiatura:number=0
    apoderadoUsuario:string=""
    roles:Roles=new Roles()
}