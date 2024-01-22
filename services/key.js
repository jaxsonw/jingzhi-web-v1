import request from '../utils/request'
import { BASE_URL } from '/consts/env'

export const getKeyList = () => request.post(`${BASE_URL}/v1/service/keyList`)

export const editKey = params => request.post(`${BASE_URL}/v1/service/createKey`, params)
