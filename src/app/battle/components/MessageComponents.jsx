'use client'

import { Button, Spin, Tag } from 'antd'
import { CopyOutlined, CheckOutlined, TrophyOutlined, WarningOutlined } from '@ant-design/icons'

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
 * @param {Object} props
 * @param {Object} props.round - { userMessage, assistantA, assistantB }
 * @param {number} props.roundIndex - 轮次索引
 * @param {Array} props.models - 模型列表
 * @param {Object} props.votes - 投票记录 { roundIndex: { choice, modelA, modelB, revealed } }
 * @param {Function} props.onVote - 投票回调
 * @param {Function} props.onCopy - 复制回调
 * @param {string} props.copiedId - 已复制的消息ID
 * @param {boolean} props.isAnonymous - 是否匿名模式
 * @param {Object} props.currentSession - 当前会话
 */
export function BattleRound({ 
  round,
  roundIndex,
  models, 
  votes,
  onVote, 
  onCopy, 
  copiedId,
  isAnonymous,
  currentSession,
}) {
  const { userMessage, assistantA, assistantB } = round
  const voteInfo = votes[roundIndex]
  const isRevealed = voteInfo?.revealed
  const votedChoice = voteInfo?.choice
  const hasError = voteInfo?.hasError || assistantA?.error || assistantB?.error

  const getModelName = (modelId) => {
    const model = models.find(m => m.id === modelId)
    return model?.name || modelId || 'Unknown Model'
  }

  // 获取模型名称（投票后或出错时显示真实名称）
  // 优先从投票记录获取，其次从消息的 roundModelA/B 获取，最后从 modelId 获取
  const modelAName = (isRevealed || hasError)
    ? getModelName(voteInfo?.modelA || assistantA?.roundModelA || assistantA?.modelId)
    : 'Assistant A'
  
  const modelBName = (isRevealed || hasError)
    ? getModelName(voteInfo?.modelB || assistantB?.roundModelB || assistantB?.modelId)
    : 'Assistant B'

  // 判断是否是获胜者
  const isWinnerA = votedChoice === 'A'
  const isWinnerB = votedChoice === 'B'
  
  // 判断是否有错误
  const errorA = assistantA?.error
  const errorB = assistantB?.error

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
          <div className={`flex items-center gap-2 text-sm font-medium ${
            errorA 
              ? 'text-red-600'
              : isRevealed 
                ? (isWinnerA ? 'text-[#FF5005]' : 'text-gray-600')
                : 'text-purple-600'
          }`}>
            {errorA && <WarningOutlined className="text-red-500" />}
            {isWinnerA && !errorA && <TrophyOutlined className="text-[#FF5005]" />}
            <span>{modelAName}</span>
            {errorA && (
              <Tag color="red" className="ml-1">失败</Tag>
            )}
            {isRevealed && !errorA && (
              <Tag color={isWinnerA ? 'orange' : 'default'} className="ml-1">
                {isWinnerA ? '胜出' : votedChoice === 'tie' ? '平局' : ''}
              </Tag>
            )}
          </div>
          <div className={`border-2 rounded-2xl px-4 py-3 min-h-[100px] ${
            errorA
              ? 'border-red-300 bg-red-50'
              : isRevealed
                ? (isWinnerA ? 'border-[#FF5005] bg-orange-50' : 'border-gray-300 bg-gray-50')
                : 'border-purple-400 bg-purple-50'
          } text-gray-900`}>
            {assistantA ? (
              <>
                <div className="whitespace-pre-wrap">{assistantA.content}</div>
                {assistantA.content && (
                  <div className="mt-2 flex justify-end">
                    <Button 
                      type="text" 
                      size="small" 
                      icon={copiedId === assistantA.id ? <CheckOutlined className="text-green-500" /> : <CopyOutlined />}
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
          <div className={`flex items-center gap-2 text-sm font-medium ${
            errorB 
              ? 'text-red-600'
              : isRevealed 
                ? (isWinnerB ? 'text-[#FF5005]' : 'text-gray-600')
                : 'text-pink-600'
          }`}>
            {errorB && <WarningOutlined className="text-red-500" />}
            {isWinnerB && !errorB && <TrophyOutlined className="text-[#FF5005]" />}
            <span>{modelBName}</span>
            {errorB && (
              <Tag color="red" className="ml-1">失败</Tag>
            )}
            {isRevealed && !errorB && (
              <Tag color={isWinnerB ? 'orange' : 'default'} className="ml-1">
                {isWinnerB ? '胜出' : votedChoice === 'tie' ? '平局' : ''}
              </Tag>
            )}
          </div>
          <div className={`border-2 rounded-2xl px-4 py-3 min-h-[100px] ${
            errorB
              ? 'border-red-300 bg-red-50'
              : isRevealed
                ? (isWinnerB ? 'border-[#FF5005] bg-orange-50' : 'border-gray-300 bg-gray-50')
                : 'border-pink-400 bg-pink-50'
          } text-gray-900`}>
            {assistantB ? (
              <>
                <div className="whitespace-pre-wrap">{assistantB.content}</div>
                {assistantB.content && (
                  <div className="mt-2 flex justify-end">
                    <Button 
                      type="text" 
                      size="small" 
                      icon={copiedId === assistantB.id ? <CheckOutlined className="text-green-500" /> : <CopyOutlined />}
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

      {/* 投票区域 - 未投票且无错误时显示 */}
      {assistantA?.content && assistantB?.content && !isRevealed && !hasError && (
        <VotePanel 
          roundIndex={roundIndex}
          onVote={onVote}
        />
      )}

      {/* 错误提示 - 有错误时显示 */}
      {hasError && (
        <div className="flex justify-center">
          <div className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-full flex items-center gap-2">
            <WarningOutlined />
            <span>部分模型请求失败，已自动揭晓模型身份</span>
          </div>
        </div>
      )}

      {/* 投票结果 - 已投票时显示 */}
      {isRevealed && !hasError && (
        <div className="flex justify-center">
          <div className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
            ✓ 您的选择: {
              votedChoice === 'A' ? `${modelAName} 更好` :
              votedChoice === 'B' ? `${modelBName} 更好` :
              votedChoice === 'tie' ? '平局' : '两个都不好'
            }
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * 投票面板组件（未投票时显示）
 */
function VotePanel({ roundIndex, onVote }) {
  const handleVote = (choice) => {
    onVote(roundIndex, choice)
  }

  return (
    <div className="flex flex-col items-center space-y-3 pt-4 border-t border-gray-200">
      <p className="text-sm text-gray-600 font-medium">哪个回复更好？投票后揭晓模型身份</p>
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => handleVote('A')}
          className="px-4 py-2 rounded-lg border text-sm font-medium transition-colors border-purple-300 bg-purple-50 text-purple-700 hover:bg-purple-100"
        >
          Assistant A 更好
        </button>
        <button
          onClick={() => handleVote('tie')}
          className="px-4 py-2 rounded-lg border text-sm font-medium transition-colors border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100"
        >
          平局
        </button>
        <button
          onClick={() => handleVote('B')}
          className="px-4 py-2 rounded-lg border text-sm font-medium transition-colors border-pink-300 bg-pink-50 text-pink-700 hover:bg-pink-100"
        >
          Assistant B 更好
        </button>
        <button
          onClick={() => handleVote('both_bad')}
          className="px-4 py-2 rounded-lg border text-sm font-medium transition-colors border-red-300 bg-red-50 text-red-700 hover:bg-red-100"
        >
          两个都不好
        </button>
      </div>
    </div>
  )
}
