// import { fetchEventSource } from "@microsoft/fetch-event-source";
import request from '../utils/request'
import { BASE_URL } from '../consts/env'
import { getTokenKey } from '@/src/utils/localStorage'
const TIMEOUT = 300
let timerOut = null
let timerOutCount = 0
let errorTryCount = 0

//获取授权登录地址
export const getLoginUrl = params => request.post(`${BASE_URL}/v1/service/site/config`, params)
// code登录
export const loginByCode = params => request.post(`${BASE_URL}/v1/service/loginByCode`, params)
/**
 * email 邮箱
 * */
export const getEmailCode = params => request.post(`${BASE_URL}/v1/sendVerifyCode`, params)
/**
 *   email 邮箱
    verify_code 验证码
 * */

//获取手机号验证码
export const getMobileCode = params => request.post(`${BASE_URL}/v1/sendCode`, params)
//手机验证码登录
export const loginByMobile = params => request.post(`${BASE_URL}/v1/loginByMobile`, params)

export const login = params => request.post(`${BASE_URL}/v1/loginByCode`, params)
export const getUserInfo = () => request.get(`${BASE_URL}/v1/me`)

//获取导航
export const getNavList = ()=>request.post(`${BASE_URL}/v1/service/navList`)

export const getInviteSuccessList = () => request.post(`${BASE_URL}/v1/user/getInviteSuccessList`)

export const getSiteUseNumber = () => request.post(`${BASE_URL}/v1/plat/info`)

export const suggest = params => request.post(`${BASE_URL}/v1/service/suggest`, params)

// 获取代码
export const codeSearch = params => request.post(`${BASE_URL}/v1/service/chatgpt/codeSearch`, params)

// 获取key
export const checkCodeValid = data => request.post(`${BASE_URL}/v1/service/checkCodeValid`, data)
// export const chatCode = data => request.post(`${BASE_URL}/v1/service/chatCode`, data)
export const getModel = params => request.post(`${BASE_URL}/v1/service/chatCode/modelList `, params)

export const chatCode = async (data, options) => {
  let xtextContent = ''
  let needTimeOut = true
  EventSource = SSE
  var apiUrl = `https://api.agicto.cn/v1/service/chatCode`
  const evtSource = new EventSource(apiUrl, {
    headers: {
      Authorization: 'Bearer ' + getTokenKey(),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    payload: JSON.stringify(data)
  })
  evtSource.onopen = function () {}

  evtSource.onmessage = async function (e) {
    clearInterval(timerOut)
    timerOutCount = 0
    needTimeOut = false
    timerOut = setInterval(async () => {
      if (needTimeOut && timerOutCount > TIMEOUT) {
        clearInterval(timerOut)
        timerOutCount = 0
        options.onEnd({ content: xtextContent, canResend: true })
        evtSource.close()
        return
      }
      timerOutCount += 1
    }, 1000)

    const msg = e.data
    if (msg.indexOf('[DONE]') !== -1) {
      evtSource.close()
      options.onEnd({ content: xtextContent })
      return
    }
    try {
      const resultData = JSON.parse(e.data)
      if (resultData && Object.prototype.toString.call(resultData) === '[object Object]') {
        xtextContent += resultData?.choices[0].delta.content
        options.onMessage({ content: xtextContent })
      }
    } catch (error) {}
    if (e.data) {
    }
  }

  evtSource.onerror = function (e) {
    clearInterval(timerOut)
    timerOutCount = 0
    if (errorTryCount >= 2) {
      options.onEnd({ content: xtextContent, canResend: true })
    } else {
      errorTryCount++
      chatCode(data, options, xtextContent)
    }
  }

  evtSource.addEventListener('ping', function (e) {}, false)
  // @ts-ignore;
  evtSource.stream()

  return {
    code: 0,
    data: { content: '' }
  }
}

// 获取代码 json方式
export const openAiJson = async data => {
  const res = await request.post(`https://api.openai.com/v1/completions`, {
    model: 'code-davinci-002',
    prompt: data,
    temperature: 0.7,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  })

  return {
    code: 0,
    content: res.choices ? res.choices[0].text : '服务器繁忙～～'
  }
}

// 获取代码 流方式
export const openAi = async (data, options) => {
  let xtextContent = ''
  // @ts-ignore;
  EventSource = SSE
  var apiUrl = 'https://openai.chatkok.com/v1/completions'
  var params = {
    model: 'text-davinci-003',
    // model: "gpt-3.5-turbo",
    prompt: data,
    max_tokens: 2000,
    temperature: 0.1,
    top_p: 1,
    stream: true,
    frequency_penalty: 0,
    presence_penalty: 0
  }

  const evtSource = new EventSource(apiUrl, {
    // @ts-ignore
    headers: {
      Authorization: 'Bearer ' + window.sessionStorage.getItem('openkey'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    payload: JSON.stringify(params)
  })

  evtSource.onopen = function () {}

  evtSource.onmessage = async function (e) {
    const msg = e.data
    if (msg.indexOf('[DONE]') !== -1) {
      evtSource.close()
      options.onEnd({ content: xtextContent })
      return
    }
    const resultData = JSON.parse(e.data)
    // console.log(e.data, "aasta");
    xtextContent += resultData?.choices[0].text
    options.onMessage({ content: xtextContent })
  }

  evtSource.onerror = function () {
    console.log('EventSource failed.')
  }

  evtSource.addEventListener('ping', function (e) {}, false)
  // @ts-ignore;
  evtSource.stream()

  return {
    code: 0,
    data: { content: '' }
  }
}
