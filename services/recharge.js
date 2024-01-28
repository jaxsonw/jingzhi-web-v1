import request from '../utils/request'
import { BASE_URL } from '/consts/env'

export const createOrder = params => request.post(`${BASE_URL}/v1/service/createOrder`, params)
export const getOrderStatus = params => request.post(`${BASE_URL}/v1/service/searchOrderStatus`, params)
export const getWechatSign = ({ url }) => request.post(`${BASE_URL}/v1/wechat/getWechatSign`, { url })

export const getOrderPayInfo = params => request.post(`${BASE_URL}/v1/service/getOrderPayInfo`, params)
export const orderList = params => request.post(`${BASE_URL}/v1/service/orderList`, params)

export const getAuthCode = ({ code }) => request.post(`${BASE_URL}/v1/service/user/authCode`, { code })
