/*eslint-disable*/
import axios from 'axios'
import { message } from 'antd'
import { getCookie } from './index'
// import { axiosAddToken, nodeAddToken } from './addToken'
// import { baseUrl } from './config';
// import { API_BASE_URL } from '@../consts/env';
// import { getTokenKey } from './localStorage'

axios.defaults.withCredentials = true
axios.defaults.timeout = 50000
axios.defaults.headers.common['Content-Type'] = 'application/json'
// axios.defaults.baseURL = baseUrl;

// 中间件 拦截请求-
axios.interceptors.request.use(
  config => {
    config.metadata = {
      startTime: new Date().getTime()
    }

    let token = getCookie('idToken')

    if (config.url.includes('api.openai.com')) {
      token = sessionStorage.getItem('openkey')
    }

    // 规避 调用openai接口
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    if (!(config?.headers && config?.headers?.Authorization)) {
      // const newConfig = axiosAddToken(config)
      return config
    } else {
      // 兼容直播跨域
      config.withCredentials = false
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(
  response => {
    return response
  },
  err => {
    if (!err.response) {
      return
    }
    const res = err.response
    const newRes = {
      ...res
    }

    // console.error('err', newRes)
    // try {
    //   apiErrReport(newRes)
    // } catch (error) {
    //   console.error(error)
    // }
    if ([500, 502, 503].indexOf(res.status) > -1) {
      console.error('500服务端错误，请稍后重试！')
    } else if (res.status === 401) {
      console.error('需要登陆授权')
    } else if (res.status === 403) {
      console.error('抱歉！你暂无权限操作此功能')
    } else if ([400, 404].indexOf(res.status) > -1) {
      console.error('400/404 接口请求失败，请重试！如有疑问，联系管理员。')
    }
  }
)

/**
 * get
 * @param url
 * @param data
 * @returns {Promise}
 */
const get = (url, params = {}) => {
  params.withCredentials = true
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params
      })
      .then(response => {
        if (response && response.data) {
          resolve(response?.data)
        } else {
          resolve({ data: [] })
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * post
 * @param url
 * @param data
 * @param config
 * @returns {Promise}
 */
const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    // console.log('data', data);
    axios.post(url, data).then(
      response => {
        if (response) {
          resolve(response.data)
        } else {
          resolve({})
        }
      },
      error => {
        reject(error)
      }
    )
  })
}

/**
 * put
 * @param url
 * @param data
 * @returns {Promise}
 */

const put = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios.put(url, params).then(
      response => {
        resolve(response?.data)
      },
      err => {
        reject(err)
      }
    )
  })
}

// node服务端请求底层
const nodeAxios = (url, data = {}, ctx) => {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'get' // default
      // ...nodeAddToken(data, ctx),
    }).then(
      response => {
        resolve(response?.data)
      },
      error => {
        reject(error)
      }
    )
  }).catch(() => {})
}

// 服务端get请求
const nodeGet = (url, params, ctx) => {
  return nodeAxios(
    url,
    {
      method: 'get',
      params
    },
    ctx
  )
}

// 服务端post请求
const nodePost = (url, data, ctx) => {
  return nodeAxios(
    url,
    {
      method: 'post',
      data
    },
    ctx
  )
}

// 服务端put请求
const nodePut = (url, data, ctx) => {
  return nodeAxios(
    url,
    {
      method: 'put',
      data
    },
    ctx
  )
}

export default {
  get,
  put,
  post,
  nodeGet,
  nodePost,
  nodePut
}
