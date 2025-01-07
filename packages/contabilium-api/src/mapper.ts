import { ItemDTO } from './dto/itemDTO';
import { RubroDTO } from './dto/rubroDTO';
import { Rubro } from './interface/getAllRubros';
import { Item } from './interface/getProducts';

export function mapRubro(rubro: Rubro): RubroDTO {
  return {
    id: rubro.Id,
    name: rubro.Nombre,
  };
}

export function mapItem(item: Item): ItemDTO {
  return {
    id: item.Id,
    name: item.Nombre,
    idRubro: item.IdRubro,
    price: item.PrecioFinal,
  };
}
