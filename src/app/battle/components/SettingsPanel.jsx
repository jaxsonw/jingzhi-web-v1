'use client'

import { Button, Select, Slider, Tooltip } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'

/**
 * 设置面板组件
 * 包含模式选择、模型选择、参数设置
 */
export function SettingsPanel({
  mode,
  setMode,
  setVotes,
  models,
  modelsLoading,
  selectedModel,
  setSelectedModel,
  selectedModels,
  setSelectedModels,
  temperature,
  setTemperature,
  maxTokens,
  setMaxTokens,
  isGenerating,
  generationTime,
  onRefreshModels,
}) {
  return (
    <div className="hidden lg:flex w-64 bg-gray-50 border-r border-gray-200 flex-col shrink-0 pt-[56px] overflow-hidden">
      <div className="p-4 flex-1 overflow-y-auto overflow-x-hidden">
        {/* 模式选择 */}
        <ModeSelector 
          mode={mode} 
          setMode={setMode} 
          setVotes={setVotes} 
        />

        {/* 模型选择 */}
        {mode !== 'anonymous' && (
          <ModelSelector
            mode={mode}
            models={models}
            modelsLoading={modelsLoading}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
            selectedModels={selectedModels}
            setSelectedModels={setSelectedModels}
            onRefreshModels={onRefreshModels}
          />
        )}

        {/* 匿名模式说明 */}
        {mode === 'anonymous' && (
          <div className="mb-6 p-3 bg-purple-50 border border-purple-200 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-purple-900">匿名对战</span>
            </div>
            <p className="text-xs text-purple-700">
              两个匿名模型将同时回答，为您选择最佳答案！
            </p>
          </div>
        )}

        {/* 参数设置 */}
        <ParameterSettings
          temperature={temperature}
          setTemperature={setTemperature}
          maxTokens={maxTokens}
          setMaxTokens={setMaxTokens}
        />

        {/* 状态指示 */}
        <StatusIndicator 
          isGenerating={isGenerating} 
          generationTime={generationTime} 
        />
      </div>
    </div>
  )
}

/**
 * 模式选择器
 */
function ModeSelector({ mode, setMode, setVotes }) {
  const handleModeChange = (newMode) => {
    setMode(newMode)
    setVotes({})
  }

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">模式</label>
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleModeChange('single')}
            className={`px-3 py-2 text-sm rounded-md border transition-colors ${
              mode === 'single'
                ? 'bg-[#FF5005] text-white border-[#FF5005]'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            单模型
          </button>
          <button
            onClick={() => handleModeChange('battle')}
            className={`px-3 py-2 text-sm rounded-md border transition-colors ${
              mode === 'battle'
                ? 'bg-[#FF5005] text-white border-[#FF5005]'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            对比模式
          </button>
        </div>
        <button
          onClick={() => handleModeChange('anonymous')}
          className={`w-full px-3 py-2 text-sm rounded-md border transition-colors ${
            mode === 'anonymous'
              ? 'bg-purple-600 text-white border-purple-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          🎭 匿名对战
        </button>
      </div>
    </div>
  )
}

/**
 * 模型选择器
 */
function ModelSelector({
  mode,
  models,
  modelsLoading,
  selectedModel,
  setSelectedModel,
  selectedModels,
  setSelectedModels,
  onRefreshModels,
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">
          {mode === 'single' ? '模型' : '模型选择'}
        </label>
        <Tooltip title="刷新模型列表">
          <Button 
            type="text"
            size="small"
            icon={<ReloadOutlined spin={modelsLoading} />} 
            onClick={onRefreshModels}
            disabled={modelsLoading}
          />
        </Tooltip>
      </div>
      {mode === 'single' ? (
        <Select
          value={selectedModel}
          onChange={setSelectedModel}
          className="w-full"
          loading={modelsLoading}
          placeholder="选择模型"
          popupMatchSelectWidth={false}
          optionLabelProp="label"
          options={models.map(m => ({ 
            value: m.id,
            label: m.name,
            desc: (
              <div className="flex flex-col">
                <span className="font-medium truncate">{m.name}</span>
                <span className="text-xs text-gray-500">{m.provider || 'Unknown'}</span>
              </div>
            )
          }))}
          optionRender={(option) => option.data.desc}
        />
      ) : (
        <div className="space-y-2">
          <Select
            value={selectedModels[0]}
            onChange={(v) => setSelectedModels([v, selectedModels[1]])}
            className="w-full"
            loading={modelsLoading}
            placeholder="选择模型 A"
            options={models.map(m => ({ 
              value: m.id, 
              label: m.name
            }))}
          />
          <div className="text-center text-gray-400 text-xs">VS</div>
          <Select
            value={selectedModels[1]}
            onChange={(v) => setSelectedModels([selectedModels[0], v])}
            className="w-full"
            loading={modelsLoading}
            placeholder="选择模型 B"
            options={models.map(m => ({ 
              value: m.id, 
              label: m.name
            }))}
          />
        </div>
      )}
    </div>
  )
}

/**
 * 参数设置
 */
// 橙色主题滑块样式
const sliderStyles = {
  trackBg: '#FF5005',
  trackHoverBg: '#FF5005',
  handleColor: '#FF5005',
  handleActiveColor: '#FF5005',
  dotActiveBorderColor: '#FF5005',
}

function ParameterSettings({ temperature, setTemperature, maxTokens, setMaxTokens }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">参数设置</label>
      <div className="space-y-4 px-1">
        <div>
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Temperature</span>
            <span>{temperature}</span>
          </div>
          <Slider
            min={0}
            max={2}
            step={0.1}
            value={temperature}
            onChange={setTemperature}
            styles={{ track: { background: '#FF5005' }, handle: { borderColor: '#FF5005' } }}
          />
        </div>
        <div>
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Max Tokens</span>
            <span>{maxTokens}</span>
          </div>
          <Slider
            min={50}
            max={4096}
            step={50}
            value={maxTokens}
            onChange={setMaxTokens}
            styles={{ track: { background: '#FF5005' }, handle: { borderColor: '#FF5005' } }}
          />
        </div>
      </div>
    </div>
  )
}

/**
 * 状态指示器
 */
function StatusIndicator({ isGenerating, generationTime }) {
  return (
    <div className="text-sm text-gray-600">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-[#FF5005] animate-pulse' : 'bg-gray-300'}`}></div>
        <span>{isGenerating ? `生成中 ${generationTime}s` : '就绪'}</span>
      </div>
    </div>
  )
}
