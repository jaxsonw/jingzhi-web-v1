import { getModelDetail } from '../../../services/overflow'
import ModelDetail from './content'
import { getHighlighter } from 'shiki'
import { BASE_URL } from '@/src/consts/env'

const getData = async params => {
  try {
    const res = await getModelDetail(params)
    // console.log("res", res)
    if (res.code === 0) {
      return { data: res.data, flag: true }
    } else {
      return { data: res?.message || "获取模型数据失败,尝试刷新或联系网站管理员", flag: false }
    }
  } catch (err) {
    return {
      data: '获取模型数据失败,尝试刷新或联系网站管理员',
      flag: false
    }
  }
}

export async function getServerSideProps(context) {
  return context
}

const ModelContentServer = async ({ modelName: modelName, status }) => {
  const { data, flag } = await getData(modelName)
  // console.log('data', data, flag)
  if (flag) {
    const code = `curl "{BASE_URL}/v1/chat/completions" \\
    -H "Content-Type: application/json" \\
    -H "Authorization: Bearer {JINGZHI_API_KEY}" \\
    -d '{
        "model": "${modelName.modelName}",
        "messages": [
            {
                "role": "user",
                "content": "你是谁，用中文回答"
            }
        ]
    }'`

    const codeHtml = await (async function codeToHtml(code, lang) {
      const highlighter = await getHighlighter({
        theme: 'solarized-light', // 你可以选择你喜欢的主题
      });
      const html = highlighter.codeToHtml(code, { lang })
      return html.replace(/\{JINGZHI_API_KEY\}/g, '<a href="/space/apikey/" class="underline">JINGZHI_API_KEY</a>').replace(/\{BASE_URL\}/g, BASE_URL)
    })(data?.example || code, 'json')

    return <ModelDetail data={data} status={status} codeHtml={codeHtml} code={data?.example || code}></ModelDetail>
  } else {
    return <div className="h-screen text-center leading-[100vh] text-[30px]">
      {data}
    </div>
  }
}

export default ModelContentServer
