export interface GetStockByDepositosResponse {
  Id: number;
  Codigo: string;
  StockActual: number;
  StockReservado: number;
  StockConReservas: number;
  stock?: Omit<GetStockByDepositosResponse, 'stock'>[];
}
