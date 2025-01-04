import { RubroDTO } from "./mapper";

export interface ContabiliumApi {
  getAccessToken: () => Promise<void | GetAccessTokenReponse['access_token']>
  getAllRubros: () => Promise<void | RubroDTO[]>
}

export type GetAccessTokenReponse = {
  access_token: string;
  token_type:   string;
  expires_in:   number;
}

export type GetAllRubrosResponse = Rubro[]

export type Rubro = {
  Id : number;
  Nombre : string; 
}
