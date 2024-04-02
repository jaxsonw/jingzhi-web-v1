import request from '../utils/request'
import { BASE_URL } from '../consts/env'



// 获取七牛上传token
export const getQiniuToken = async (): Promise<any> => {
  return request.post(`${BASE_URL}/v1/qiniuToken`, {})
}
