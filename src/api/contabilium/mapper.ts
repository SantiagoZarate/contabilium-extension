import { Rubro } from "./api.interface";

export function mapRubro(rubro : Rubro): RubroDTO{
  return {
    id: rubro.Id,
    name: rubro.Name
  }
}

export type RubroDTO = {
  id: number;
  name: string;
}