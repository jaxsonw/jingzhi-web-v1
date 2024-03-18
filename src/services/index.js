import request from '../utils/request'
import { BASE_URL } from '../consts/env'

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

export const getSiteUseNumber = () => request.post(`${BASE_URL}/v1/plat/info`)
 

export const suggest = params => request.post(`${BASE_URL}/v1/service/suggest`, params)

// 获取代码
export const codeSearch = params => request.post(`${BASE_URL}/v1/service/chatgpt/codeSearch`, params)

// 获取key
export const checkCodeValid = data => request.post(`${BASE_URL}/v1/service/checkCodeValid`, data)

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
export const openAi = async (
  data,
  options
) => {
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

  //    source.addEventListener('status', function(e) {
  //        console.log('System status is now: ' + e.data);
  //    });

  // console.log(evtSource.readyState, "aareadyState");
  // console.log(evtSource.url, "aaurl");

  evtSource.onopen = function () {
    console.log('Connection to server opened.')
  }

  evtSource.onmessage = async function (e) {
    const msg = e.data
    if (msg.indexOf('[DONE]') !== -1) {
      console.log('readEnd')
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

  evtSource.addEventListener(
    'ping',
    function (e) {
      console.log('ping')
      console.log(e.data, 'pingData')
    },
    false
  )
  // @ts-ignore;
  evtSource.stream()

  return {
    code: 0,
    data: { content: '' }
  }
}

