import { Nota } from "./Nota";

export interface Categoria {
    Id:number ,
    Nombre:string,
    FechaReg:Date,
    Notas: Nota[]
}