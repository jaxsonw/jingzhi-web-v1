const serverRequest = async (url, params, options) =>
  await fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params),
    ...options // 根据 API 需求发送相应的请求体
  }).then(res => res?.json())
export default serverRequest
