import { RubroDTO } from "./mapper";

export interface ContabiliumApi {
  getAllRubros: () => Promise<void | RubroDTO[]>
}

export type GetAllRubrosResponse = Rubro[]

export type Rubro = {
  Id : number;
  Name : string; 
}
