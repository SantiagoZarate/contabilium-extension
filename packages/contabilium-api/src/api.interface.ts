// Dtos
import { ItemDTO } from './dto/itemDTO';
import { RubroDTO } from './dto/rubroDTO';

import { GetAccessTokenReponse } from './interface/getAcessToken';
import {
  GetProductsParams,
} from './interface/getProducts';

export interface ContabiliumApi {
  getAccessToken: () => Promise<void | GetAccessTokenReponse['access_token']>;
  getAllRubros: () => Promise<void | RubroDTO[]>;
  getProducts: (params: GetProductsParams) => Promise<ItemDTO[]>;
  getAllProducts: () => Promise<ItemDTO[]>;
}
