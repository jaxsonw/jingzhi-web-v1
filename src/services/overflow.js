import request from '../utils/request'
import { BASE_URL } from '../consts/env'

export const consumeModelList = params => request.post(`${BASE_URL}/v1/service/consumeModelList`, params)
export const consumeChart = params => request.post(`${BASE_URL}/v1/service/consumeChart`, params)
export const getModelPriceList = params => request.post(`${BASE_URL}/v1/modelPriceList`, params)
