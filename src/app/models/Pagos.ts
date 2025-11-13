import { Citas } from "./Citas"

export class Pagos{
    idPago:number=0
    montoPago:number=0
    passApiPago:string=""
    fechaPago:Date=new Date()
    estadoPago:string=""
    citas:Citas=new Citas()
}