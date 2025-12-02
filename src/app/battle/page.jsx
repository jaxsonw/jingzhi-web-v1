'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Button, message, Tooltip, ConfigProvider } from 'antd'
import { ClearOutlined, RobotOutlined } from '@ant-design/icons'
import { arenaApi } from '@/src/arena/services/arena'
import { isLogin } from '@/src/utils'
import { HeaderJingzhi } from '@/src/components/common/HeaderJingzhi'
import { Sidebar } from '@/src/components/common/Sidebar'
import { SingleMessage, BattleRound, SettingsPanel, ChatInput } from './components'

// 默认模型列表（API 加载失败时使用）
const DEFAULT_MODELS = [
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI' },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI' },
]

export default function ChatBattlePage() {
  // 状态
  const [mode, setMode] = useState('single') // single | battle | anonymous
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedModel, setSelectedModel] = useState('')
  const [selectedModels, setSelectedModels] = useState(['', ''])
  const [copiedId, setCopiedId] = useState(null)
  const [votes, setVotes] = useState({}) // { roundIndex: 'A' | 'B' | 'tie' | 'both_bad' }
  
  // 参数设置
  const [showSettings, setShowSettings] = useState(false)
  const [temperature, setTemperature] = useState(0.7)
  const [maxTokens, setMaxTokens] = useState(2048)
  const [generationTime, setGenerationTime] = useState(0)
  const [tokenCount, setTokenCount] = useState(0)
  const startTimeRef = useRef(0)
  
  // 模型和鉴权状态
  const [models, setModels] = useState(DEFAULT_MODELS)
  const [modelsLoading, setModelsLoading] = useState(true)
  const [authError, setAuthError] = useState(null)

  const messagesEndRef = useRef(null)
  const abortControllerRef = useRef(null)

  // 加载模型列表
  const loadModels = useCallback(async () => {
    setModelsLoading(true)
    try {
      const fetchedModels = await arenaApi.getModels()
      console.log('Fetched models:', fetchedModels)
      
      if (fetchedModels && fetchedModels.length > 0) {
        setModels(fetchedModels)
        // 设置默认选中的模型
        setSelectedModel(prev => prev || fetchedModels[0].id)
        setSelectedModels(prev => {
          if (!prev[0] || !prev[1]) {
            return [
              fetchedModels[0]?.id || '',
              fetchedModels[1]?.id || fetchedModels[0]?.id || ''
            ]
          }
          return prev
        })
      } else {
        // 没有模型时使用默认
        console.warn('No models fetched, using defaults')
        setModels(DEFAULT_MODELS)
        setSelectedModel(DEFAULT_MODELS[0].id)
        setSelectedModels([DEFAULT_MODELS[0].id, DEFAULT_MODELS[1]?.id || DEFAULT_MODELS[0].id])
      }
    } catch (error) {
      console.error('Failed to load models:', error)
      // 使用默认模型
      setModels(DEFAULT_MODELS)
      setSelectedModel(DEFAULT_MODELS[0].id)
      setSelectedModels([DEFAULT_MODELS[0].id, DEFAULT_MODELS[1]?.id || DEFAULT_MODELS[0].id])
    } finally {
      setModelsLoading(false)
    }
  }, [])

  // 验证登录状态和 API Key
  const validateApiKey = useCallback(async () => {
    // 先检查登录状态
    if (!isLogin()) {
      setAuthError('请先登录以使用 Chat Battle 功能')
      return false
    }
    
    try {
      await arenaApi.getApiKey()
      setAuthError(null)
      return true
    } catch (error) {
      if (error.code === 'NO_API_KEY') {
        setAuthError('没有可用的 API Key，请前往设置页面创建')
      } else {
        setAuthError(error.message || '获取 API Key 失败')
      }
      return false
    }
  }, [])

  // 初始化加载
  useEffect(() => {
    loadModels()
    validateApiKey()
  }, [])

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
      message.success('已复制')
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      message.error('复制失败')
    }
  }

  // 清空对话
  const handleClear = () => {
    setMessages([])
    setVotes({})
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

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data:')) {
            const data = line.slice(5).trim()
            if (data === '[DONE]') continue
            if (!data) continue

            try {
              const parsed = JSON.parse(data)
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
    } finally {
      reader.releaseLock()
    }

    return content
  }

  // 更新消息内容
  const updateMessageContent = (messageId, content) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, content } : msg
    ))
  }

  // 根据 modelId 获取 model name（用于发送请求）
  const getModelNameById = (modelId) => {
    const model = models.find(m => m.id === modelId)
    return model?.name || modelId
  }

  // 发送消息（单模型）
  const handleSingleMode = async () => {
    // 先验证 API Key
    const isValid = await validateApiKey()
    if (!isValid) {
      message.error('请先登录并确保有可用的 API Key')
      return
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: inputValue.trim(),
    }

    const assistantMessage = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: '',
      modelId: selectedModel,
    }

    setMessages(prev => [...prev, userMessage, assistantMessage])
    setInputValue('')
    setIsGenerating(true)

    try {
      const request = {
        model: getModelNameById(selectedModel),
        messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })),
        temperature,
        max_tokens: maxTokens,
      }

      const stream = await arenaApi.chatCompletionStream(request)
      await processStream(stream, assistantMessage.id, updateMessageContent)
    } catch (error) {
      console.error('Chat error:', error)
      message.error('请求失败: ' + (error.message || '未知错误'))
      updateMessageContent(assistantMessage.id, '请求失败，请重试')
    } finally {
      setIsGenerating(false)
    }
  }

  // 发送消息（对战模式）
  const handleBattleMode = async () => {
    // 先验证 API Key
    const isValid = await validateApiKey()
    if (!isValid) {
      message.error('请先登录并确保有可用的 API Key')
      return
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: inputValue.trim(),
    }

    const assistantA = {
      id: `assistant-a-${Date.now()}`,
      role: 'assistant',
      content: '',
      modelId: selectedModels[0],
    }

    const assistantB = {
      id: `assistant-b-${Date.now()}`,
      role: 'assistant',
      content: '',
      modelId: selectedModels[1],
    }

    setMessages(prev => [...prev, userMessage, assistantA, assistantB])
    setInputValue('')
    setIsGenerating(true)

    try {
      const baseMessages = [...messages, userMessage].map(m => ({ role: m.role, content: m.content }))

      const requestA = {
        model: getModelNameById(selectedModels[0]),
        messages: baseMessages,
        temperature,
        max_tokens: maxTokens,
      }

      const requestB = {
        model: getModelNameById(selectedModels[1]),
        messages: baseMessages,
        temperature,
        max_tokens: maxTokens,
      }

      // 并发请求两个模型
      const [streamA, streamB] = await Promise.all([
        arenaApi.chatCompletionStream(requestA),
        arenaApi.chatCompletionStream(requestB),
      ])

      // 并发处理两个流
      await Promise.all([
        processStream(streamA, assistantA.id, updateMessageContent),
        processStream(streamB, assistantB.id, updateMessageContent),
      ])
    } catch (error) {
      console.error('Battle mode error:', error)
      message.error('请求失败: ' + (error.message || '未知错误'))
    } finally {
      setIsGenerating(false)
    }
  }

  // 发送消息（匿名对战）
  const handleAnonymousMode = async () => {
    // 先验证 API Key
    const isValid = await validateApiKey()
    if (!isValid) {
      message.error('请先登录并确保有可用的 API Key')
      return
    }

    // 随机选择两个模型（从 API 获取的模型列表中选择）
    const [modelA, modelB] = await arenaApi.getRandomModelPair()

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: inputValue.trim(),
    }

    const assistantA = {
      id: `assistant-a-${Date.now()}`,
      role: 'assistant',
      content: '',
      modelId: modelA.id,
      anonymousLabel: 'Assistant A',
    }

    const assistantB = {
      id: `assistant-b-${Date.now()}`,
      role: 'assistant',
      content: '',
      modelId: modelB.id,
      anonymousLabel: 'Assistant B',
    }

    setMessages(prev => [...prev, userMessage, assistantA, assistantB])
    setInputValue('')
    setIsGenerating(true)

    try {
      const baseMessages = [...messages, userMessage].map(m => ({ role: m.role, content: m.content }))

      const requestA = {
        model: modelA.name, // 使用 model name 发送请求
        messages: baseMessages,
        temperature,
        max_tokens: maxTokens,
      }

      const requestB = {
        model: modelB.name, // 使用 model name 发送请求
        messages: baseMessages,
        temperature,
        max_tokens: maxTokens,
      }

      const [streamA, streamB] = await Promise.all([
        arenaApi.chatCompletionStream(requestA),
        arenaApi.chatCompletionStream(requestB),
      ])

      await Promise.all([
        processStream(streamA, assistantA.id, updateMessageContent),
        processStream(streamB, assistantB.id, updateMessageContent),
      ])
    } catch (error) {
      console.error('Anonymous mode error:', error)
      message.error('请求失败: ' + (error.message || '未知错误'))
    } finally {
      setIsGenerating(false)
    }
  }

  // 发送消息
  const handleSend = async () => {
    if (!inputValue.trim() || isGenerating) return

    switch (mode) {
      case 'single':
        await handleSingleMode()
        break
      case 'battle':
        await handleBattleMode()
        break
      case 'anonymous':
        await handleAnonymousMode()
        break
    }
  }

  // 按键处理
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // 投票处理
  const handleVote = (roundIndex, choice) => {
    setVotes(prev => ({ ...prev, [roundIndex]: choice }))
    message.success(`投票成功: ${
      choice === 'A' ? (mode === 'anonymous' ? 'Assistant A 更好' : '左侧更好') :
      choice === 'B' ? (mode === 'anonymous' ? 'Assistant B 更好' : '右侧更好') :
      choice === 'tie' ? '平局' : '两个都不好'
    }`)
  }

  // 渲染消息列表
  const renderMessages = () => {
    // 单模型模式
    if (mode === 'single') {
      return (
        <div className="space-y-4">
          {messages.map((msg) => (
            <SingleMessage
              key={msg.id}
              message={msg}
              onCopy={handleCopy}
              copied={copiedId}
            />
          ))}
          {/* 生成中指示器 */}
          {isGenerating && (
            <div className="flex justify-start">
              <div className="max-w-2xl bg-gray-100 text-gray-900 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.15s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      )
    }

    // 对战/匿名模式 - 按轮次分组
    const rounds = []
    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i]
      if (msg.role === 'user') {
        const round = { userMessage: msg, assistantA: null, assistantB: null }
        
        // 查找该用户消息之后的助手回复
        for (let j = i + 1; j < messages.length; j++) {
          const nextMsg = messages[j]
          if (nextMsg.role === 'user') break
          
          if (nextMsg.role === 'assistant') {
            if (mode === 'battle') {
              if (nextMsg.modelId === selectedModels[0]) {
                round.assistantA = nextMsg
              } else if (nextMsg.modelId === selectedModels[1]) {
                round.assistantB = nextMsg
              }
            } else if (mode === 'anonymous') {
              if (nextMsg.anonymousLabel === 'Assistant A') {
                round.assistantA = nextMsg
              } else if (nextMsg.anonymousLabel === 'Assistant B') {
                round.assistantB = nextMsg
              }
            }
          }
        }
        
        rounds.push(round)
      }
    }

    return (
      <div className="space-y-8">
        {rounds.map((round, roundIndex) => (
          <BattleRound
            key={roundIndex}
            userMessage={round.userMessage}
            assistantA={round.assistantA}
            assistantB={round.assistantB}
            isAnonymous={mode === 'anonymous'}
            models={models}
            onCopy={handleCopy}
            copied={copiedId}
            onVote={(choice) => handleVote(roundIndex, choice)}
            votedChoice={votes[roundIndex]}
          />
        ))}
      </div>
    )
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FF5005',
          colorLink: '#FF5005',
        },
      }}
    >
    <div>
      <HeaderJingzhi active="/battle/" />
      <div className="flex h-screen">
        {/* 导航侧栏 */}
        <Sidebar />
        
        {/* 设置面板 */}
        <SettingsPanel
          mode={mode}
          setMode={setMode}
          setVotes={setVotes}
          models={models}
          modelsLoading={modelsLoading}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          selectedModels={selectedModels}
          setSelectedModels={setSelectedModels}
          temperature={temperature}
          setTemperature={setTemperature}
          maxTokens={maxTokens}
          setMaxTokens={setMaxTokens}
          isGenerating={isGenerating}
          generationTime={generationTime}
          onRefreshModels={() => arenaApi.refreshModels().then(setModels)}
        />

        {/* 主聊天区 */}
        <div className="flex-1 flex flex-col min-h-0 bg-white pt-[56px]">
          {/* 标题栏 */}
          <div className="border-b border-gray-200 bg-white px-6 py-4 shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  {mode === 'single' 
                    ? (models.find(m => m.id === selectedModel)?.name || '选择一个模型')
                    : mode === 'battle'
                      ? `${models.find(m => m.id === selectedModels[0])?.name || 'Model A'} vs ${models.find(m => m.id === selectedModels[1])?.name || 'Model B'}`
                      : '🎭 匿名对战'
                  }
                </h2>
                <p className="text-sm text-gray-500">
                  {mode === 'single' 
                    ? (models.find(m => m.id === selectedModel)?.provider || 'AI助手')
                    : mode === 'battle'
                      ? '并排对比'
                      : '两个匿名模型'
                  }
                </p>
              </div>
              <div className="flex items-center gap-2">
                {mode === 'anonymous' && (
                  <div className="flex items-center gap-1 text-xs text-purple-600">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <span>匿名</span>
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
                  <h3 className="text-lg font-medium text-gray-900 mb-2">您想聊些什么？</h3>
                  <p className="text-gray-500">
                    {mode === 'anonymous' 
                      ? '两个匿名模型将同时回答，您可以比较并选择最佳答案'
                      : mode === 'battle' 
                        ? '多个模型的回复将并排对比显示'
                        : `向 ${models.find(m => m.id === selectedModel)?.name || '选定的模型'} 提问任何问题`
                    }
                  </p>
                </div>
              ) : (
                renderMessages()
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* 输入区 */}
          <ChatInput
            mode={mode}
            models={models}
            selectedModel={selectedModel}
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
