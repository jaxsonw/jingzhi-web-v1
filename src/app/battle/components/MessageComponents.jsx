'use client'

import { Button, Spin } from 'antd'
import { CopyOutlined, CheckOutlined } from '@ant-design/icons'

/**
 * 单模型消息组件
 */
export function SingleMessage({ message: msg, onCopy, copied }) {
  const isUser = msg.role === 'user'
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-2xl ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-900'
        } rounded-2xl px-4 py-3`}
      >
        <div className="whitespace-pre-wrap">{msg.content || '...'}</div>
        {!isUser && msg.content && (
          <div className="mt-2 flex justify-end">
            <Button 
              type="text" 
              size="small" 
              icon={copied === msg.id ? <CheckOutlined className="text-green-500" /> : <CopyOutlined />}
              onClick={() => onCopy(msg.id, msg.content)}
            />
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * 对战轮次组件
 */
export function BattleRound({ 
  userMessage, 
  assistantA, 
  assistantB, 
  isAnonymous, 
  models, 
  onCopy, 
  copied, 
  onVote, 
  votedChoice 
}) {
  const getModelName = (modelId) => {
    const model = models.find(m => m.id === modelId)
    return model?.name || modelId || 'Model'
  }

  return (
    <div className="space-y-6 mb-8">
      {/* 用户消息 - 居中显示 */}
      <div className="flex justify-center">
        <div className="max-w-2xl bg-gray-100 text-gray-900 rounded-2xl px-6 py-3 text-center">
          <div className="whitespace-pre-wrap">{userMessage.content}</div>
        </div>
      </div>
      
      {/* 助手回复 - 并排显示 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assistant A */}
        <div className="space-y-2">
          <div className={`text-sm font-medium ${isAnonymous ? 'text-purple-600' : 'text-blue-600'}`}>
            {isAnonymous ? 'Assistant A' : getModelName(assistantA?.modelId)}
          </div>
          <div className={`border-2 rounded-2xl px-4 py-3 min-h-[100px] ${
            isAnonymous 
              ? 'border-purple-400 bg-purple-50 text-gray-900'
              : 'border-blue-400 bg-blue-50 text-gray-900'
          }`}>
            {assistantA ? (
              <>
                <div className="whitespace-pre-wrap">{assistantA.content}</div>
                {assistantA.content && (
                  <div className="mt-2 flex justify-end">
                    <Button 
                      type="text" 
                      size="small" 
                      icon={copied === assistantA.id ? <CheckOutlined className="text-green-500" /> : <CopyOutlined />}
                      onClick={() => onCopy(assistantA.id, assistantA.content)}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-gray-500 italic flex items-center gap-2">
                <Spin size="small" /> 正在生成回复...
              </div>
            )}
          </div>
        </div>
        
        {/* Assistant B */}
        <div className="space-y-2">
          <div className={`text-sm font-medium ${isAnonymous ? 'text-pink-600' : 'text-green-600'}`}>
            {isAnonymous ? 'Assistant B' : getModelName(assistantB?.modelId)}
          </div>
          <div className={`border-2 rounded-2xl px-4 py-3 min-h-[100px] ${
            isAnonymous 
              ? 'border-pink-400 bg-pink-50 text-gray-900'
              : 'border-green-400 bg-green-50 text-gray-900'
          }`}>
            {assistantB ? (
              <>
                <div className="whitespace-pre-wrap">{assistantB.content}</div>
                {assistantB.content && (
                  <div className="mt-2 flex justify-end">
                    <Button 
                      type="text" 
                      size="small" 
                      icon={copied === assistantB.id ? <CheckOutlined className="text-green-500" /> : <CopyOutlined />}
                      onClick={() => onCopy(assistantB.id, assistantB.content)}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-gray-500 italic flex items-center gap-2">
                <Spin size="small" /> 正在生成回复...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 投票区域 */}
      {assistantA?.content && assistantB?.content && (
        <VotePanel 
          isAnonymous={isAnonymous}
          onVote={onVote}
          votedChoice={votedChoice}
        />
      )}
    </div>
  )
}

/**
 * 投票面板组件
 */
function VotePanel({ isAnonymous, onVote, votedChoice }) {
  return (
    <div className="flex flex-col items-center space-y-3 pt-4 border-t border-gray-200">
      <p className="text-sm text-gray-600 font-medium">哪个回复更好？</p>
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => onVote('A')}
          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
            votedChoice === 'A' 
              ? 'bg-[#FF5005] text-white border-[#FF5005]'
              : isAnonymous
                ? 'border-purple-300 bg-purple-50 text-purple-700 hover:bg-purple-100'
                : 'border-[#FF5005]/30 bg-[#FF5005]/10 text-[#FF5005] hover:bg-[#FF5005]/20'
          }`}
        >
          {isAnonymous ? 'Assistant A 更好' : '左侧更好'}
        </button>
        <button
          onClick={() => onVote('tie')}
          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
            votedChoice === 'tie'
              ? 'bg-gray-600 text-white border-gray-600'
              : 'border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100'
          }`}
        >
          平局
        </button>
        <button
          onClick={() => onVote('B')}
          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
            votedChoice === 'B'
              ? 'bg-[#FF5005] text-white border-[#FF5005]'
              : isAnonymous
                ? 'border-pink-300 bg-pink-50 text-pink-700 hover:bg-pink-100'
                : 'border-[#FF5005]/30 bg-[#FF5005]/10 text-[#FF5005] hover:bg-[#FF5005]/20'
          }`}
        >
          {isAnonymous ? 'Assistant B 更好' : '右侧更好'}
        </button>
        <button
          onClick={() => onVote('both_bad')}
          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
            votedChoice === 'both_bad'
              ? 'bg-red-600 text-white border-red-600'
              : 'border-red-300 bg-red-50 text-red-700 hover:bg-red-100'
          }`}
        >
          两个都不好
        </button>
      </div>
      {votedChoice && (
        <div className="text-sm text-[#FF5005] font-medium bg-[#FF5005]/10 px-3 py-1 rounded-full">
          ✓ 您已投票: {
            votedChoice === 'A' ? (isAnonymous ? 'Assistant A 更好' : '左侧更好') :
            votedChoice === 'B' ? (isAnonymous ? 'Assistant B 更好' : '右侧更好') :
            votedChoice === 'tie' ? '平局' : '两个都不好'
          }
        </div>
      )}
    </div>
  )
}
