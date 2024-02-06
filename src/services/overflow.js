import request from '../utils/request'
import { BASE_URL } from '../consts/env'

export const getChartModelList = params => request.post(`${BASE_URL}/v1/service/consumeModelList`, params)
export const getChartDetail = params => request.post(`${BASE_URL}/v1/service/consumeChart`, params)
export const getModelPriceList = params => request.post(`${BASE_URL}/v1/modelPriceList`, params)
