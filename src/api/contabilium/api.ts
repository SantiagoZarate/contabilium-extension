import { ContabiliumApi, GetAccessTokenReponse, GetAllRubrosResponse } from "./api.interface";
import { mapRubro } from "./mapper";

const BASE_URL = 'https://rest.contabilium.com'

export const contabiliumApi : ContabiliumApi = {
  getAccessToken(){
    const url = BASE_URL + '/token'

    const body = new URLSearchParams();
    body.append('grant_type', 'client_credentials');  // or any other grant type you need
    body.append('client_id', 'your_client_id');       // replace with your client_id
    body.append('client_secret', 'your_client_secret'); // replace with your client_secret
  
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
    }).then((response : GetAccessTokenReponse) => response.access_token)
    .catch(e => {
      console.error(e);
    })
  },
  getAllRubros(){
    return fetch(BASE_URL + '/api/conceptos/rubros').then(response => {
      if(!response.ok){
        throw new Error('Error al obtener todas las marcas')
      }
      return response.json()
    }).then((response : GetAllRubrosResponse) => response.map(r => mapRubro(r)))
    .catch(e => {
      console.error(e);
    })
  }
}