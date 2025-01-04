export interface GetProductsParams {
  page ?: number
}

export interface GetProductsResponse {
  Items:      Item[];
  TotalPage:  number;
  TotalItems: number;
}

export interface Item {
  Id:               number;
  Nombre:           string;
  Codigo:           string;
  CodigoOem:        string;
  CodigoBarras:     string;
  Descripcion:      string;
  Precio:           number;
  PrecioFinal:      number;
  SincronizaStock:  boolean;
  PrecioAutomatico: null;
  SincronizaPrecio: boolean;
  Iva:              number;
  Rentabilidad:     number;
  CostoInterno:     number;
  Stock:            number;
  StockMinimo:      number;
  StockInventario:  number;
  Observaciones:    string;
  Estado:           Estado;
  Tipo:             Tipo;
  IdRubro:          string;
  IdSubrubro:       string;
  Foto:             null;
  AplicaRG5329:     boolean;
  IDMoneda:         number;
  ListasDePrecio:   null;
  Items:            null;
}

export enum Estado {
  Activo = "Activo",
}

export enum Tipo {
  Producto = "Producto",
}
