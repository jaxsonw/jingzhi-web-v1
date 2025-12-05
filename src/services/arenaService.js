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
  MODEL_STAT: '/v1/model/stat',
  MODEL_PROVIDER_APPLY: '/v1/modelProvider/apply',
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
      provider: m.provider || m.companyName || '--',
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
 * 默认模型列表
 */
export const getDefaultModels = () => [
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
  const ctobase = 'https://api.agicto.cn'
  const res = await request.post(`${ctobase}${ENDPOINTS.VOTE}`, voteRequest)
  return res
}

/**
 * 获取投票排行榜
 */
export const getVoteRank = async () => {
  const ctobase = 'https://api.agicto.cn'
  const res = await request.post(`${ctobase}${ENDPOINTS.VOTE_RANK}`)
  if (res?.code === 0 && Array.isArray(res?.data)) {
    return res.data
  }
  return []
}

/**
 * 获取模型调用统计
 * 新数据结构：
 * {
 *   monthList: [{ month: "202512", childList: [{ token: "123", companyName: "xxx" }] }],
 *   modelList: [{ token: "123", companyName: "xxx", model: "xxx-gpt" }]
 * }
 */
export const getModelStats = async () => {
  const ctobase = 'https://api.agicto.cn'
  try {
    const response = await fetch(`${ctobase}${ENDPOINTS.MODEL_STAT}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
    
    if (!response.ok) throw new Error(`API responded with status: ${response.status}`)
    
    const rawData = await response.json()
    const { monthList = [], modelList = [] } = rawData

    // 处理模型列表数据（token 为字符串，需要转换）
    const models = modelList
      .map(item => ({
        model: item.model || 'Unknown',
        totalToken: parseInt(item.token, 10) || 0,
        companyName: item.companyName || 'Unknown',
      }))
      .sort((a, b) => b.totalToken - a.totalToken)

    // 计算总调用量
    const totalTokens = models.reduce((sum, model) => sum + model.totalToken, 0)

    // 计算排名和真实占比百分比
    const processedModels = models.map((model, index) => ({
      ...model,
      rank: index + 1,
      percentage: totalTokens > 0 ? (model.totalToken / totalTokens * 100) : 0
    }))

    // 生成月度数据用于图表（按公司分类）
    const colors = ['#2563eb', '#ea580c', '#9333ea', '#16a34a', '#0891b2', '#dc2626', '#7c3aed', '#0d9488', '#ca8a04', '#6366f1']
    
    // 计算所有公司的总调用量，用于确定颜色分配
    const companyTotals = new Map()
    monthList.forEach(monthItem => {
      (monthItem.childList || []).forEach(item => {
        const company = item.companyName || 'Unknown'
        const tokenValue = parseInt(item.token, 10) || 0
        companyTotals.set(company, (companyTotals.get(company) || 0) + tokenValue)
      })
    })
    const sortedCompanies = [...companyTotals.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name], index) => ({ name, color: colors[index % colors.length] }))
    const companyColorMap = new Map(sortedCompanies.map(c => [c.name, c.color]))
    
    // 处理月度数据
    const monthlyData = monthList
      .sort((a, b) => (a.month || '').localeCompare(b.month || ''))
      .map(monthItem => {
        const month = monthItem.month || ''
        const childList = monthItem.childList || []
        
        // 计算月度总调用量
        const monthTotal = childList.reduce((sum, item) => sum + (parseInt(item.token, 10) || 0), 0)
        
        // 按公司生成分段数据
        const companySegments = childList
          .map(item => {
            const tokenValue = parseInt(item.token, 10) || 0
            return {
              name: item.companyName || 'Unknown',
              value: tokenValue,
              percentage: monthTotal > 0 ? (tokenValue / monthTotal * 100) : 0,
              color: companyColorMap.get(item.companyName) || '#6b7280'
            }
          })
          .filter(seg => seg.value > 0)
          .sort((a, b) => b.value - a.value)
          .slice(0, 10)

        return {
          month,
          segments: companySegments,
          total: monthTotal
        }
      })

    // 统计信息
    const activeModels = processedModels.filter(model => model.totalToken > 0).length
    
    return {
      models: processedModels,
      monthlyData,
      stats: {
        totalModels: processedModels.length,
        activeModels,
        totalTokens,
        averageTokens: processedModels.length > 0 ? Math.round(totalTokens / processedModels.length) : 0,
        topModel: processedModels.length > 0 ? processedModels[0].model : 'N/A'
      },
      lastUpdated: new Date().toISOString(),
    }
  } catch (error) {
    console.error('获取模型统计数据失败:', error)
    return null
  }
}

/**
 * 提交模型提供商申请
 */
export const submitProviderApply = async (formData) => {
  const ctobase = 'https://api.agicto.cn'
  try {
    const response = await fetch(`${ctobase}${ENDPOINTS.MODEL_PROVIDER_APPLY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || '提交失败')
    }
    
    return { success: true, data }
  } catch (error) {
    console.error('提交模型提供商申请失败:', error)
    return { success: false, error: error.message || '网络错误，请重试' }
  }
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
  getModelStats,
  submitProviderApply,
}

export default arenaApi
