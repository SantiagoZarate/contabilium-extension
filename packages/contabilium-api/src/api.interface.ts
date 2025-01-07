// Dtos
import { ItemDTO } from './dto/itemDTO';
import { RubroDTO } from './dto/rubroDTO';

import { GetAccessTokenReponse } from './interface/getAcessToken';
import {
  GetProductsParams,
  GetProductsResponse,
  Item,
} from './interface/getProducts';
import { GetStockByDepositosResponse } from './interface/getStockByDepositos';

export interface ContabiliumApi {
  getAccessToken: () => Promise<void | GetAccessTokenReponse['access_token']>;
  getAllRubros: () => Promise<void | RubroDTO[]>;
  getProducts: (params: GetProductsParams) => Promise<ItemDTO[]>;
  getAllProducts: () => Promise<ItemDTO[]>;
  getStockByDepositos: (productSKU: string) => Promise<void | GetStockByDepositosResponse>;
  getProductByName: (productName: string) => Promise<void | GetProductsResponse>
}
