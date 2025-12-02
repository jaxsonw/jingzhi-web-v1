'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Button, message, Tooltip, ConfigProvider } from 'antd'
import { ClearOutlined, RobotOutlined, PlusOutlined } from '@ant-design/icons'
import { arenaApi } from '@/src/arena/services/arena'
import { isLogin } from '@/src/utils'
import { HeaderJingzhi } from '@/src/components/common/HeaderJingzhi'
import { Sidebar } from '@/src/components/common/Sidebar'
import { BattleRound, ChatInput } from './components'
import * as chatStorage from './services/chatStorage'

// 默认模型列表（API 加载失败时使用）
const DEFAULT_MODELS = [
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI' },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI' },
]

export default function ChatBattlePage() {
  // 会话状态
  const [sessions, setSessions] = useState([])
  const [currentSessionId, setCurrentSessionId] = useState(null)
  const [currentSession, setCurrentSession] = useState(null)
  
  // 消息和输入状态
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copiedId, setCopiedId] = useState(null)
  const [votes, setVotes] = useState({}) // { roundIndex: { choice, modelA, modelB, revealed } }
  
  // 生成状态
  const [generationTime, setGenerationTime] = useState(0)
  const startTimeRef = useRef(0)
  
  // 模型和鉴权状态
  const [models, setModels] = useState(DEFAULT_MODELS)
  const [modelsLoading, setModelsLoading] = useState(true)
  const [authError, setAuthError] = useState(null)

  const messagesEndRef = useRef(null)
  const abortControllerRef = useRef(null)

  // 获取两个不同的随机模型
  const getRandomModelPair = useCallback(() => {
    if (models.length < 2) {
      return [models[0], models[0]]
    }
    const shuffled = [...models].sort(() => Math.random() - 0.5)
    return [shuffled[0], shuffled[1]]
  }, [models])

  // 加载模型列表
  const loadModels = useCallback(async () => {
    setModelsLoading(true)
    try {
      const fetchedModels = await arenaApi.getModels()
      if (fetchedModels && fetchedModels.length > 0) {
        setModels(fetchedModels)
      } else {
        setModels(DEFAULT_MODELS)
      }
    } catch (error) {
      console.error('Failed to load models:', error)
      setModels(DEFAULT_MODELS)
    } finally {
      setModelsLoading(false)
    }
  }, [])

  // 加载会话列表
  const loadSessions = useCallback(async () => {
    try {
      const allSessions = await chatStorage.getAllSessions()
      setSessions(allSessions)
    } catch (error) {
      console.error('Failed to load sessions:', error)
    }
  }, [])

  // 加载特定会话
  const loadSession = useCallback(async (sessionId) => {
    try {
      const session = await chatStorage.getSession(sessionId)
      if (session) {
        setCurrentSession(session)
        setCurrentSessionId(sessionId)
        setMessages(session.messages || [])
        setVotes(session.votes || {})
      }
    } catch (error) {
      console.error('Failed to load session:', error)
    }
  }, [])

  // 创建新会话
  const createNewSession = useCallback(async () => {
    try {
      const [modelA, modelB] = getRandomModelPair()
      const session = await chatStorage.createSession(modelA.id, modelB.id)
      setSessions(prev => [session, ...prev])
      setCurrentSession(session)
      setCurrentSessionId(session.id)
      setMessages([])
      setVotes({})
      message.success('新会话已创建')
    } catch (error) {
      console.error('Failed to create session:', error)
      message.error('创建会话失败')
    }
  }, [getRandomModelPair])

  // 保存当前会话
  const saveCurrentSession = useCallback(async (newMessages, newVotes) => {
    if (!currentSession) return
    
    try {
      const title = newMessages.length > 0 && newMessages[0].role === 'user'
        ? newMessages[0].content.slice(0, 20) + (newMessages[0].content.length > 20 ? '...' : '')
        : '新对话'
      
      const updated = await chatStorage.updateSession({
        ...currentSession,
        title,
        messages: newMessages,
        votes: newVotes,
      })
      
      setCurrentSession(updated)
      setSessions(prev => prev.map(s => s.id === updated.id ? updated : s))
    } catch (error) {
      console.error('Failed to save session:', error)
    }
  }, [currentSession])

  // 删除会话
  const deleteSession = useCallback(async (sessionId) => {
    try {
      await chatStorage.deleteSession(sessionId)
      setSessions(prev => prev.filter(s => s.id !== sessionId))
      
      if (currentSessionId === sessionId) {
        setCurrentSession(null)
        setCurrentSessionId(null)
        setMessages([])
        setVotes({})
      }
      message.success('会话已删除')
    } catch (error) {
      console.error('Failed to delete session:', error)
      message.error('删除会话失败')
    }
  }, [currentSessionId])

  // 验证登录状态和 API Key
  const validateApiKey = useCallback(async () => {
    if (!isLogin()) {
      setAuthError('请先登录以使用对战功能')
      return false
    }
    
    try {
      const apiKey = await arenaApi.getApiKey()
      if (!apiKey) {
        setAuthError('没有可用的 API Key，请前往设置页面创建')
        return false
      }
      setAuthError(null)
      return true
    } catch (error) {
      if (error.status === 401) {
        setAuthError('没有可用的 API Key，请前往设置页面创建')
      } else {
        setAuthError(error.message || '获取 API Key 失败')
      }
      return false
    }
  }, [])

  // 初始化
  useEffect(() => {
    loadModels()
    validateApiKey()
    loadSessions()
  }, [loadModels, validateApiKey, loadSessions])

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // 生成时间计时器
  useEffect(() => {
    let interval
    if (isGenerating) {
      startTimeRef.current = Date.now()
      interval = setInterval(() => {
        setGenerationTime(Math.floor((Date.now() - startTimeRef.current) / 1000))
      }, 100)
    } else {
      setGenerationTime(0)
    }
    return () => clearInterval(interval)
  }, [isGenerating])

  // 复制消息
  const handleCopy = async (id, content) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedId(id)
      message.success('已复制到剪贴板')
      setTimeout(() => setCopiedId(null), 2000)
    } catch (error) {
      message.error('复制失败')
    }
  }

  // 清空当前会话
  const handleClear = () => {
    setMessages([])
    setVotes({})
    if (currentSession) {
      saveCurrentSession([], {})
    }
    message.info('对话已清空')
  }

  // 停止生成
  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
    setIsGenerating(false)
  }

  // 处理 SSE 流
  const processStream = async (stream, messageId, updateFn) => {
    const reader = stream.getReader()
    const decoder = new TextDecoder()
    let content = ''
    let streamError = null

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data:')) {
            const data = line.slice(5).trim()
            if (data === '[DONE]' || data === '[ DONE ]') continue
            if (!data) continue

            try {
              const parsed = JSON.parse(data)
              
              // 检查是否是错误响应
              if (parsed.code && parsed.message) {
                streamError = parsed.message || `错误代码: ${parsed.code}`
                continue
              }
              
              const delta = parsed.choices?.[0]?.delta?.content
              if (delta) {
                content += delta
                updateFn(messageId, content)
              }
            } catch (e) {
              // 解析错误跳过
            }
          }
        }
      }
      
      // 如果流中有错误，抛出
      if (streamError) {
        throw new Error(streamError)
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        throw error
      }
    }
  }

  // 更新消息内容
  const updateMessageContent = (messageId, content) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, content } : msg
    ))
  }

  // 获取模型名称
  const getModelNameById = (modelId) => {
    const model = models.find(m => m.id === modelId)
    return model?.name || modelId
  }

  // 发送消息（对战模式）
  const handleSend = async () => {
    if (!inputValue.trim() || isGenerating) return

    // 如果没有当前会话，先创建一个
    let session = currentSession
    if (!session) {
      const [modelA, modelB] = getRandomModelPair()
      session = await chatStorage.createSession(modelA.id, modelB.id)
      setSessions(prev => [session, ...prev])
      setCurrentSession(session)
      setCurrentSessionId(session.id)
    }

    // 每轮对话都使用新的随机模型对（确保两个不同）
    const [modelA, modelB] = getRandomModelPair()
    const modelAId = modelA.id
    const modelBId = modelB.id

    const userMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: inputValue.trim(),
    }

    // 记录本轮使用的模型ID到消息中
    const roundId = Date.now()
    const assistantA = {
      id: `assistant_a_${roundId}`,
      role: 'assistant',
      content: '',
      modelId: modelAId,
      anonymousLabel: 'Assistant A',
      roundModelA: modelAId,  // 记录本轮模型A
      roundModelB: modelBId,  // 记录本轮模型B
    }

    const assistantB = {
      id: `assistant_b_${roundId}`,
      role: 'assistant',
      content: '',
      modelId: modelBId,
      anonymousLabel: 'Assistant B',
      roundModelA: modelAId,
      roundModelB: modelBId,
    }

    const newMessages = [...messages, userMessage, assistantA, assistantB]
    setMessages(newMessages)
    setInputValue('')
    setIsGenerating(true)

    try {
      const baseMessages = [...messages, userMessage].map(m => ({ role: m.role, content: m.content }))

      const requestA = {
        model: getModelNameById(modelAId),
        messages: baseMessages,
      }

      const requestB = {
        model: getModelNameById(modelBId),
        messages: baseMessages,
      }

      // 分别处理两个模型的请求，捕获单个错误
      const processModelRequest = async (request, messageId, label) => {
        try {
          const stream = await arenaApi.chatCompletionStream(request)
          await processStream(stream, messageId, updateMessageContent)
        } catch (error) {
          console.error(`${label} error:`, error)
          // 标记该消息为错误状态
          setMessages(prev => prev.map(msg => 
            msg.id === messageId 
              ? { ...msg, content: `[请求失败] ${error.message || '未知错误'}`, error: true }
              : msg
          ))
        }
      }

      await Promise.all([
        processModelRequest(requestA, assistantA.id, 'Model A'),
        processModelRequest(requestB, assistantB.id, 'Model B'),
      ])

      // 检查是否有错误，如果有则自动揭晓模型
      setMessages(prev => {
        const hasError = prev.some(msg => msg.error)
        if (hasError) {
          // 计算当前轮次索引
          const roundIndex = prev.filter(m => m.role === 'user').length - 1
          // 自动设置为已揭晓状态（使用本轮的模型ID）
          setVotes(v => ({
            ...v,
            [roundIndex]: {
              choice: null,
              modelA: modelAId,
              modelB: modelBId,
              revealed: true,
              hasError: true,
            }
          }))
        }
        return prev
      })
    } catch (error) {
      console.error('Battle mode error:', error)
      message.error('请求失败: ' + (error.message || '未知错误'))
    } finally {
      setIsGenerating(false)
      // 保存会话
      setMessages(prev => {
        saveCurrentSession(prev, votes)
        return prev
      })
    }
  }

  // 投票处理
  const handleVote = async (roundIndex, choice) => {
    if (!currentSession) return
    
    try {
      // 调用投票 API
      const rounds = []
      for (let i = 0; i < messages.length; i++) {
        const msg = messages[i]
        if (msg.role === 'user') {
          const round = { userMessage: msg, assistantA: null, assistantB: null }
          for (let j = i + 1; j < messages.length; j++) {
            const next = messages[j]
            if (next.role === 'user') break
            if (next.role === 'assistant') {
              if (next.anonymousLabel === 'Assistant A') round.assistantA = next
              else if (next.anonymousLabel === 'Assistant B') round.assistantB = next
            }
          }
          rounds.push(round)
        }
      }
      
      const targetRound = rounds[roundIndex]
      if (targetRound?.assistantA?.id) {
        await arenaApi.vote({
          round_id: targetRound.assistantA.id,
          user_choice: choice,
        })
      }
      
      // 更新投票状态，从消息中获取本轮使用的模型信息
      const newVotes = {
        ...votes,
        [roundIndex]: {
          choice,
          modelA: targetRound.assistantA?.roundModelA || targetRound.assistantA?.modelId,
          modelB: targetRound.assistantA?.roundModelB || targetRound.assistantB?.modelId,
          revealed: true, // 标记已揭晓
        }
      }
      setVotes(newVotes)
      
      // 保存到会话
      saveCurrentSession(messages, newVotes)
      
      message.success(`投票成功！模型已揭晓`)
    } catch (error) {
      console.error('投票失败:', error)
      message.error('投票失败')
    }
  }

  // 渲染消息列表
  const renderMessages = () => {
    const rounds = []
    
    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i]
      if (msg.role === 'user') {
        const round = { userMessage: msg, assistantA: null, assistantB: null }
        
        for (let j = i + 1; j < messages.length; j++) {
          const nextMsg = messages[j]
          if (nextMsg.role === 'user') break
          
          if (nextMsg.role === 'assistant') {
            if (nextMsg.anonymousLabel === 'Assistant A') {
              round.assistantA = nextMsg
            } else if (nextMsg.anonymousLabel === 'Assistant B') {
              round.assistantB = nextMsg
            }
          }
        }
        
        rounds.push(round)
      }
    }

    return (
      <div className="space-y-6">
        {rounds.map((round, roundIndex) => (
          <BattleRound
            key={roundIndex}
            round={round}
            roundIndex={roundIndex}
            models={models}
            votes={votes}
            onVote={handleVote}
            onCopy={handleCopy}
            copiedId={copiedId}
            isAnonymous={true}
            currentSession={currentSession}
          />
        ))}
      </div>
    )
  }

  // 登录/鉴权错误时显示
  if (authError) {
    return (
      <ConfigProvider theme={{ token: { colorPrimary: '#FF5005', colorLink: '#FF5005' } }}>
        <div>
          <HeaderJingzhi active="/battle/" />
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex items-center justify-center pt-[56px]">
              <div className="text-center">
                <RobotOutlined className="text-5xl text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">需要登录</h3>
                <p className="text-gray-500 mb-4">{authError}</p>
                <Button type="primary" href="/login">去登录</Button>
              </div>
            </div>
          </div>
        </div>
      </ConfigProvider>
    )
  }

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#FF5005', colorLink: '#FF5005' } }}>
      <div>
        <HeaderJingzhi active="/battle/" />
        <div className="flex h-screen">
          {/* 导航侧栏 */}
          <Sidebar />
          
          {/* 会话列表侧栏 */}
          <div className="hidden lg:flex w-64 bg-gray-50 border-r border-gray-200 flex-col shrink-0 pt-[56px] overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={createNewSession}
                className="w-full"
              >
                新建对话
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {sessions.length === 0 ? (
                <div className="p-4 text-center text-gray-500 text-sm">
                  暂无对话记录
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {sessions.map(session => (
                    <div
                      key={session.id}
                      onClick={() => loadSession(session.id)}
                      className={`p-3 cursor-pointer hover:bg-gray-100 transition-colors ${
                        currentSessionId === session.id ? 'bg-orange-50 border-l-2 border-[#FF5005]' : ''
                      }`}
                    >
                      <div className="font-medium text-sm text-gray-900 truncate">
                        {session.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(session.updatedAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* 状态指示 */}
            <div className="p-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-[#FF5005] animate-pulse' : 'bg-gray-300'}`}></div>
                  <span>{isGenerating ? `生成中 ${generationTime}s` : '就绪'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 主聊天区 */}
          <div className="flex-1 flex flex-col min-h-0 bg-white pt-[56px]">
            {/* 标题栏 */}
            <div className="border-b border-gray-200 bg-white px-6 py-4 shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">
                    🎭 匿名对战
                  </h2>
                  <p className="text-sm text-gray-500">
                    两个匿名模型将同时回答，投票后揭晓身份
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {isGenerating && (
                    <div className="flex items-center gap-2 text-sm text-[#FF5005]">
                      <div className="w-2 h-2 bg-[#FF5005] rounded-full animate-pulse"></div>
                      <span>生成中 {generationTime}s</span>
                    </div>
                  )}
                  <Tooltip title="清空对话">
                    <Button icon={<ClearOutlined />} onClick={handleClear} disabled={isGenerating} />
                  </Tooltip>
                </div>
              </div>
            </div>

            {/* 消息区 */}
            <div className="flex-1 overflow-y-auto min-h-0">
              <div className="max-w-4xl mx-auto px-6 py-4">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center py-20">
                    <RobotOutlined className="text-5xl text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">开始匿名对战</h3>
                    <p className="text-gray-500">
                      两个匿名模型将同时回答，您可以比较并选择最佳答案
                    </p>
                    {!currentSession && (
                      <Button 
                        type="primary" 
                        className="mt-4"
                        onClick={createNewSession}
                      >
                        开始新对话
                      </Button>
                    )}
                  </div>
                ) : (
                  renderMessages()
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* 输入区 */}
            <ChatInput
              mode="anonymous"
              models={models}
              selectedModel=""
              inputValue={inputValue}
              setInputValue={setInputValue}
              isGenerating={isGenerating}
              onSend={handleSend}
              onStop={handleStop}
            />
          </div>
        </div>
      </div>
    </ConfigProvider>
  )
}
