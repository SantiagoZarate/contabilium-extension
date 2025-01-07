import { ContabiliumApi } from './api.interface';
import { mapItem, mapRubro } from './mapper';
import { authRequest } from './util/authRequest';

// Response Interfaces
import { GetProductsParams, GetProductsResponse } from './interface/getProducts';
import { GetAccessTokenReponse } from './interface/getAcessToken';
import { GetAllRubrosResponse } from './interface/getAllRubros';

// Static data
import PRODUCTS from './data/products.json';

export class ContabiliumApiService implements ContabiliumApi {
  private baseUrl: string;
  private clientId: string;
  private clientSecret: string;

  constructor(baseUrl: string, clientId: string, clientSecret: string) {
    this.baseUrl = baseUrl;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  async getAccessToken(): Promise<string | void> {
    const url = `${this.baseUrl}/token`;

    const body = new URLSearchParams();
    body.append('grant_type', 'client_credentials');
    body.append('client_id', this.clientId);
    body.append('client_secret', this.clientSecret);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      });

      if (!response.ok) {
        throw new Error('Error al obtener el access token');
      }

      const result: GetAccessTokenReponse = await response.json();
      return result.access_token;
    } catch (error) {
      console.error(error);
    }
  }

  async getAllRubros(): Promise<any[] | void> {
    const url = `${this.baseUrl}/api/conceptos/rubros`;

    try {
      const response = await authRequest(url);

      if (!response.ok) {
        throw new Error('Error al obtener todas las marcas');
      }

      const result: GetAllRubrosResponse = await response.json();
      return result.map((r) => mapRubro(r));
    } catch (error) {
      console.error(error);
    }
  }

  async getProducts({ page = 1 }: GetProductsParams) {
    const url = `${this.baseUrl}/api/conceptos/search?pageSize=0&page=${page}`;

    try {
      const response = await authRequest(url);

      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }

      const result: GetProductsResponse = await response.json();
      return result.Items.map((i) => mapItem(i));
    } catch (error) {
      return []
    }
  }

  async getAllProducts(): Promise<any[]> {
    try {
      // Use static data for now
      const staticProducts = PRODUCTS.map((p) => mapItem(p));
      if (staticProducts.length > 0) {
        return staticProducts;
      }

      const responses = await Promise.all(
        Array.from({ length: 60 }, (_, i) => this.getProducts({ page: i + 1 }))
      );

      return responses.flat();
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}