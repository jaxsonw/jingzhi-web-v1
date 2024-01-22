import request from '../utils/request'
import { BASE_URL } from '/consts/env'

/**
 * email 邮箱
 * */
export const getEmailCode = params => request.post(`${BASE_URL}/v1/sendVerifyCode`, params)

/**
 *   email 邮箱
    verify_code 验证码
 * */
export const login = params => request.post(`${BASE_URL}/v1/loginByCode`, params)
export const getUserInfo = () => request.get(`${BASE_URL}/v1/me`)
