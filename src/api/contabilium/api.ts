import { ContabiliumApi, GetAllRubrosResponse } from "./api.interface";
import { mapRubro } from "./mapper";

const BASE_URL = 'https://rest.contabilium.com'

export const contabiliumApi : ContabiliumApi = {
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