import request from '../utils/request';
import { BASE_URL } from "../consts/env";


let timerOut = null
let timerOutCount = 0
let errorTryCount = 0
/**
 * prompt文档
 * https://文档链接 https://note.youdao.com/s/7t3KS3Bg 

 */
// 市场应用列表
// /v1/service/appList
// 参数
// lastMsgId
// page 分页数

export const getAppList = async payload => request.post(`${BASE_URL}/v1/service/appList`, payload);


// 个人应用列表

export const getUserAppList = async payload => request.post(`${BASE_URL}/v1/service/userAppList`, payload);

// 创建应用
export const createApp = async payload => request.post(`${BASE_URL}/v1/service/createApp`, payload);

// 删除应用

export const deleteApp = async payload => request.post(`${BASE_URL}/v1/service/delApp`, payload);

// 更新APP
export const updateApp = params => request.post(`${BASE_URL}/v1/service/updateApp`, params)


// APP详情
export const getAppDetail = params => request.post(`${BASE_URL}/v1/service/getAppInfo`, params)

// 获取公开app配置
export const getChatAppConfig = appId => request.post(`${BASE_URL}/v1/service/getChatAppConfig`, { appId })

// APP配置更新
export const updateAppConfig = params => request.post(`${BASE_URL}/v1/service/updateAppConfig`, params)


// 我的应用会话列表
export const getMyAppDialog = params => request.post(`${BASE_URL}/v1/service/userAppDialogList`, params)
// .创建应用会话
export const createAppChat = params => request.post(`${BASE_URL}/v1/service/createAppDialog`, params)

// .编辑&删除应用会话
export const updateAppDialog = params => request.post(`${BASE_URL}/v1/service/updateAppDialog`, params)

// 获取类别
export const getCateList = params => request.post(`${BASE_URL}/v1/service/cateList`, params)

// 模型列表

export const getModelList = params => request.post(`${BASE_URL}/v1/service/site/modelList`, params)



export const openAi = (data, options, oldCOntent = '') => {
  let isCheckContent = false
  let currentRecordId = null
  let needTimeOut = true
  let chatEnd = false
  const checkErrorMsg =
    '抱歉，您提出的问题涉及敏感信息，我不能参与对该话题的讨论。根据有关规定，请您注意不要提出涉恐，涉黄，涉政等相关问题，如您继续提出敏感问题，西鲸将做出封禁账号处理。感谢您的配合！'
  let xtextContent = oldCOntent || ''
  // @ts-ignore;
  EventSource = SSE
  var apiUrl = `${BASE_URL}${data.path}`
  // const apiUrl = "https://api.openaixx.com/v1/inner/search";
  let params = {
    ...data,
  }
  delete params.path

  const evtSource = new EventSource(apiUrl, {
    // @ts-ignore
    headers: {
      Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      'Content-Type': 'application/json',
    },
    method: 'POST',
    payload: JSON.stringify(params),
    // payload: params,
  })

  //    source.addEventListener('status', function(e) {
  //        console.log('System status is now: ' + e.data);
  //    });

  // console.log(evtSource.readyState, "aareadyState");
  // console.log(evtSource.url, "aaurl");
  // evtSource.CONNECTING

  evtSource.onopen = function () {}

  evtSource.onmessage = async function (e) {
    clearInterval(timerOut)
    timerOutCount = 0
    needTimeOut = false
    timerOut = setInterval(async () => {
      if (needTimeOut && timerOutCount > TIMEOUT) { 
        await report({
          content: {
            userInfo: localStorage.getItem('userInfo'),
            date: new Date(),
            payload: params,
            type: '超时错误',
          },
        })
        clearInterval(timerOut)
        timerOutCount = 0
        options.onEnd({ content: xtextContent, canResend: true })
        evtSource.close()
        return
      }
      timerOutCount += 1
    }, 1000)
    try {
      const response = JSON.parse(evtSource?.xhr?.response || '{}')
      if (response?.code === 40003 || response?.code === 40001) {
        toast.error('请重新登录～')
        location.href = `/login?redirect=${window.location.href || '/'}`
        return
      }
    } catch {}
    const msg = e?.data
    try {
      const { recordId } = JSON.parse(msg || '{}') || {}
      if (recordId) currentRecordId = recordId
    } catch {}
    // 结束
    if (msg.indexOf('[DONE]') !== -1) {
      evtSource.close()
      if(!chatEnd){
        chatEnd = true;
        const res = await checkContent({
          text: xtextContent,
          recordId: currentRecordId,
          scene: options?.scene || 3,
        })
        if (!res) xtextContent = checkErrorMsg 
      }
      options.onEnd({ content: xtextContent, status: 'finish', recordId: currentRecordId  }) 
      clearInterval(timerOut)
      return
    }else if (msg.indexOf(`"finish_reason":"stop"`) !== -1) {
      //敏感检测
      const resultData = JSON.parse(e?.data || '{}')
      evtSource.close()
      clearInterval(timerOut)
      xtextContent += resultData?.choices?.[0]?.delta?.content || ''
      // console.log('finish_reasonstop:checkContent', xtextContent)
      if(!chatEnd){
        chatEnd = true; 
        const res = await checkContent({
          text: xtextContent,
          recordId: currentRecordId,
          scene: options?.scene || 3,
        })
        if (!res) xtextContent = checkErrorMsg
      }
      
      options.onEnd({ content: xtextContent, status: 'finish',recordId: currentRecordId })  
      return
    } else if (msg.indexOf(`"finish_reason":"length"`) !== -1) { 
      //长度限制
      evtSource.close()
      timerOutCount = 0
      clearInterval(timerOut)
      xtextContent += resultData?.choices?.[0]?.delta?.content || ''
      openAi(data, options, xtextContent)
    }
    const resultData = JSON.parse(e?.data || '{}')
    const fileList = resultData?.fileList
    if (fileList) {
      options.onFile && options.onFile(fileList)
    }
    xtextContent += resultData?.choices?.[0]?.delta?.content || '' 
    if (xtextContent?.length > 100 && !isCheckContent) {
      isCheckContent = true
      const res = await checkContent({
        text: xtextContent,
        recordId: currentRecordId,
        scene: options?.scene || 3,
      })
      if (res) {
        options.onMessage({ content: xtextContent ,recordId: currentRecordId})
      } else {
        options.onEnd({ content: checkErrorMsg, status: 'finish' }) 
        evtSource.close()
      }
      return
    }

    options.onMessage({ content: xtextContent })
  }

  evtSource.onerror = async function () {
    clearInterval(timerOut)
    timerOutCount = 0
    if (errorTryCount >= 2) {
      options.onEnd({ content: xtextContent, canResend: true })
      await report({
        content: {
          userInfo: localStorage.getItem('userInfo'),
          date: new Date(),
          payload: params,
          type: 'EventSource Error',
        },
      })
      console.log('EventSource failed.')
    } else {
      errorTryCount++
      console.log('EventSource_failed_TRY')
      openAi(data, options, xtextContent)
    }
  }

  // evtSource.addEventListener(
  //   'ping',
  //   function (e) {
  //     console.log('ping')
  //     console.log(e.data, 'pingData')
  //   },
  //   false
  // )
  // @ts-ignore;
  evtSource.stream()

  const close = () => {
    clearInterval(timerOut)
    evtSource.close()
  }
  return {
    close,
  }
}