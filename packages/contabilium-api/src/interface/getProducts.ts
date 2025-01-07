export interface GetProductsParams {
  page?: number | undefined;
}

export interface GetProductsResponse {
  Items: Item[];
  TotalPage: number;
  TotalItems: number;
}

export interface Item {
  Id: number;
  Nombre: string;
  Codigo: string;
  CodigoOem: string;
  CodigoBarras: string;
  Descripcion: string;
  Precio: number;
  PrecioFinal: number;
  SincronizaStock: boolean;
  PrecioAutomatico: null;
  SincronizaPrecio: boolean;
  Iva: number;
  Rentabilidad: number;
  CostoInterno: number;
  Stock: number;
  StockMinimo: number;
  StockInventario: number;
  Observaciones: string;
  Estado: string;
  Tipo: string;
  IdRubro: string;
  IdSubrubro: string;
  Foto: any;
  AplicaRG5329: boolean;
  IDMoneda: number;
  ListasDePrecio: any;
  Items: any;
}

export enum Estado {
  Activo = 'Activo',
}

export enum Tipo {
  Producto = 'Producto',
}
