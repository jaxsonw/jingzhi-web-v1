import request from '../utils/request'
import serverRequest from '../utils/serverRequest'
import { BASE_URL } from '../consts/env'

export const consumeModelList = params => request.post(`${BASE_URL}/v1/service/consumeModelList`, params)
export const consumeChart = params => request.post(`${BASE_URL}/v1/service/consumeChart`, params)
export const getModelPriceList = params => request.post(`${BASE_URL}/v1/modelPriceList`, params)

export const getModelFilterList = params => request.post(`${BASE_URL}/v1/service/site/modelFilterList`, params)
export const getServerModelFilterList = () => serverRequest(`${BASE_URL}/v1/service/site/modelFilterList`)

export const getModelList = params => request.post(`${BASE_URL}/v1/service/site/modelList`, params)
export const getServerModelList = params => serverRequest(`${BASE_URL}/v1/service/site/modelList`, params)

export const getModelCateList = params => request.post(`${BASE_URL}/v1/service/site/modelCateList`, params)
