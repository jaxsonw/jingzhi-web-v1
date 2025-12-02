'use client'

import { Button, Input } from 'antd'
import { SendOutlined, StopOutlined } from '@ant-design/icons'

const { TextArea } = Input

/**
 * 聊天输入组件
 */
export function ChatInput({
  mode,
  models,
  selectedModel,
  inputValue,
  setInputValue,
  isGenerating,
  onSend,
  onStop,
}) {
  // 按键处理
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  // 获取 placeholder 文本
  const getPlaceholder = () => {
    if (mode === 'anonymous') return '向匿名模型提问...'
    if (mode === 'battle') return '向模型提问...'
    const modelName = models.find(m => m.id === selectedModel)?.name || '模型'
    return `向${modelName}提问...`
  }

  // 获取提示文本
  const getHintText = () => {
    if (mode === 'battle') return '多个模型的回复将并排对比显示'
    if (mode === 'anonymous') return '两个匿名模型将同时回答，您可以比较并选择最佳答案'
    return '内容由第三方AI处理，回复可能不准确'
  }

  return (
    <div className="border-t border-gray-200 bg-white px-4 md:px-6 py-3 shrink-0">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-2 md:gap-3 items-end">
          <TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={getPlaceholder()}
            rows={3}
            disabled={isGenerating}
            className="flex-1"
            style={{ resize: 'none' }}
          />
          {isGenerating ? (
            <Button 
              type="primary" 
              danger 
              icon={<StopOutlined />} 
              onClick={onStop}
            >
              停止
            </Button>
          ) : (
            <Button 
              type="primary" 
              icon={<SendOutlined />} 
              onClick={onSend}
              disabled={!inputValue.trim()}
            >
              发送
            </Button>
          )}
        </div>
        <div className="mt-1 text-xs text-gray-500">
          {getHintText()}
        </div>
      </div>
    </div>
  )
}
