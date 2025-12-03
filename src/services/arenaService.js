/**
 * Arena 服务
 * 合并到主项目 service 体系
 */
import request from '../utils/request'
import { BASE_URL } from '../consts/env'
import { getCookie } from '../utils'

// API 端点
const ENDPOINTS = {
  KEY_LIST: '/v1/service/keyList',
  MODEL_LIST: '/v1/service/chatCode/modelList',
  CHAT_COMPLETIONS: '/v1/chat/completions',
  VOTE: '/v1/inner/model/vote',
  VOTE_RANK: '/v1/inner/model/voteRank',
}

// 缓存
let cachedApiKey = null
let cachedModels = null

/**
 * 获取 API Key 列表
 */
export const getKeyList = async () => {
  const res = await request.post(`${BASE_URL}${ENDPOINTS.KEY_LIST}`)
  
  if (res?.code === 0 && res?.data?.recordList) {
    return res.data.recordList
      .filter(item => item.status === 1)
      .map(item => ({
        id: item.id,
        key: item.openKey,
        name: item.name,
        created_at: item.createTime,
        status: item.status === 1 ? 'active' : 'inactive',
      }))
  }
  return []
}

/**
 * 获取当前可用的 API Key（带缓存）
 */
export const getApiKey = async () => {
  if (cachedApiKey) return cachedApiKey

  // 调试模式
  if (typeof window !== 'undefined') {
    const debugKey = localStorage.getItem('arena_api_key')
    if (debugKey) {
      cachedApiKey = debugKey
      return debugKey
    }
  }

  const keys = await getKeyList()
  const activeKey = keys[0]
  
  if (!activeKey?.key) {
    throw new Error('没有可用的 API Key，请先创建')
  }

  cachedApiKey = activeKey.key
  return activeKey.key
}

/**
 * 清除 API Key 缓存
 */
export const clearApiKeyCache = () => {
  cachedApiKey = null
}

/**
 * 获取模型列表
 */
export const fetchModels = async () => {
  try {
    const res = await request.post(`${BASE_URL}${ENDPOINTS.MODEL_LIST}`, { typeId: 1 })
    
    let rawModels = []
    if (res?.code === 0) {
      if (res?.data?.recordList) rawModels = res.data.recordList
      else if (res?.data?.modelList) rawModels = res.data.modelList
      else if (Array.isArray(res?.data)) rawModels = res.data
    }
    
    if (rawModels.length === 0) return getDefaultModels()
    
    return rawModels.map(m => ({
      id: m.id || m.modelId || m.model_name || m.modelName || m.name,
      name: m.name || m.modelName || m.model_name || m.id || m.modelId,
      provider: m.provider || m.companyName || inferProvider(m.id || m.modelId || m.model_name),
    }))
  } catch (error) {
    console.warn('Failed to fetch models:', error)
    return getDefaultModels()
  }
}

/**
 * 获取模型列表（带缓存）
 */
export const getModels = async () => {
  if (cachedModels) return cachedModels
  cachedModels = await fetchModels()
  return cachedModels
}

/**
 * 刷新模型列表
 */
export const refreshModels = async () => {
  cachedModels = null
  return getModels()
}

/**
 * 推断模型提供商
 */
const inferProvider = (modelId) => {
  if (!modelId) return 'Unknown'
  const id = modelId.toLowerCase()
  if (id.includes('gpt') || id.includes('openai')) return 'OpenAI'
  if (id.includes('claude')) return 'Anthropic'
  if (id.includes('tencent') || id.includes('hunyuan')) return 'Tencent'
  if (id.includes('ernie') || id.includes('wenxin')) return 'Baidu'
  if (id.includes('baichuan')) return 'Baichuan'
  if (id.includes('moonshot') || id.includes('kimi')) return 'Moonshot'
  if (id.includes('doubao') || id.includes('skylark')) return 'ByteDance'
  if (id.includes('qwen') || id.includes('tongyi')) return 'Alibaba'
  if (id.includes('glm') || id.includes('zhipu')) return 'Zhipu'
  return 'Other'
}

/**
 * 默认模型列表
 */
export const getDefaultModels = () => [
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI' },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI' },
  { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'OpenAI' },
  { id: 'tencent-ChatStd', name: 'Tencent ChatStd', provider: 'Tencent' },
  { id: 'tencent-ChatPro', name: 'Tencent ChatPro', provider: 'Tencent' },
  { id: 'ERNIE-4.0-Turbo-8K', name: 'ERNIE 4.0 Turbo', provider: 'Baidu' },
  { id: 'Baichuan2-53B', name: 'Baichuan2 53B', provider: 'Baichuan' },
  { id: 'moonshot-v1-128k', name: 'Moonshot v1 128k', provider: 'Moonshot' },
  { id: 'Doubao-pro-128k', name: 'Doubao Pro 128k', provider: 'ByteDance' },
]

/**
 * 获取随机两个模型
 */
export const getRandomModelPair = async () => {
  const models = await getModels()
  if (models.length < 2) {
    const defaults = getDefaultModels()
    return [defaults[0], defaults[1]]
  }
  const shuffled = [...models].sort(() => Math.random() - 0.5)
  return [shuffled[0], shuffled[1]]
}

/**
 * 非流式聊天完成（使用 API Key 鉴权）
 */
export const chatCompletion = async (chatRequest) => {
  const apiKey = await getApiKey()
  
  const response = await fetch(`${BASE_URL}${ENDPOINTS.CHAT_COMPLETIONS}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ ...chatRequest, stream: false }),
  })

  if (!response.ok) {
    throw new Error(`Chat completion failed: ${response.status}`)
  }
  return response.json()
}

/**
 * 流式聊天完成（SSE，使用 API Key 鉴权）
 */
export const chatCompletionStream = async (chatRequest) => {
  const apiKey = await getApiKey()

  const response = await fetch(`${BASE_URL}${ENDPOINTS.CHAT_COMPLETIONS}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'text/event-stream',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ ...chatRequest, stream: true }),
  })

  if (!response.ok) {
    throw new Error(`Stream request failed: ${response.status}`)
  }
  if (!response.body) {
    throw new Error('Response body is null')
  }
  return response.body
}

/**
 * 投票
 */
export const vote = async (voteRequest) => {
  const res = await request.post(`${BASE_URL}${ENDPOINTS.VOTE}`, voteRequest)
  return res
}

/**
 * 获取投票排行榜
 */
export const getVoteRank = async () => {
  const res = await request.post(`${BASE_URL}${ENDPOINTS.VOTE_RANK}`)
  if (res?.code === 0 && Array.isArray(res?.data)) {
    return res.data
  }
  return []
}

// 便捷 API 导出（兼容旧代码）
export const arenaApi = {
  getKeyList,
  getApiKey,
  clearApiKeyCache,
  getModels,
  refreshModels,
  getDefaultModels,
  getRandomModelPair,
  chatCompletion,
  chatCompletionStream,
  vote,
  getVoteRank,
}

export default arenaApi
