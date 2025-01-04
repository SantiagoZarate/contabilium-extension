import envs from "@/config/envs";
import { ContabiliumApi } from "./api.interface";
import { mapItem, mapRubro } from "./mapper";
import { authRequest } from "./util/authRequest";

// Response Interfaces
import { GetProductsResponse } from "./interface/getProducts";
import { GetAccessTokenReponse } from "./interface/getAcessToken";
import { GetAllRubrosResponse } from "./interface/getAllRubros";

const BASE_URL = 'https://rest.contabilium.com'

export const contabiliumApi: ContabiliumApi = {
  getAccessToken() {
    const url = BASE_URL + '/token'

    const body = new URLSearchParams();
    body.append('grant_type', 'client_credentials');
    body.append('client_id', 'ahumadamonica@hotmail.com');
    body.append('client_secret', envs.API_SECRET);

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Important to set the Content-Type
      },
      body: body.toString(), // Convert the body to the correct x-www-form-urlencoded format
    }).then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener el access token');
      }
      return response.json();
    }).then((response: GetAccessTokenReponse) => response.access_token)
      .catch(e => {
        console.error(e);
      })
  },
  getAllRubros() {
    const accessToken = localStorage.getItem('contabilium_access_token')

    return authRequest(BASE_URL + '/api/conceptos/rubros')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener todas las marcas')
        }
        return response.json()
      }).then((response: GetAllRubrosResponse) => response.map(r => mapRubro(r)))
      .catch(e => {
        console.error(e);
      })
  },
  getProducts({ page = 1 }) {
    const url = BASE_URL + '/api/conceptos/search?pageSize=0&page=' + page
    return authRequest(url).then(response => {
      if (response.ok) {
        throw new Error('Error al obtener los productos')
      }
      return response.json()
    }).then((response: GetProductsResponse) => response.Items.map(i => mapItem(i)))
      .catch(e => {
        console.error(e);
      })
  },
}