import envs from '@/config/envs';
import { ContabiliumApiService } from '@contabilium-extensions/contabilium-api/service'

console.log({ envs });

const { API_ID, API_SECRET, API_URL } = envs

export const contabiliumApi = new ContabiliumApiService(API_URL, API_ID, API_SECRET)
