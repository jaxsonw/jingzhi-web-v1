'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Table } from 'antd'
import { ReloadOutlined, LineChartOutlined, UserOutlined, RiseOutlined } from '@ant-design/icons'
import { arenaApi } from '@/src/services/arenaService'
import { NON_TIMELY_SCORES, DOMAINS, NON_TIMELY_BY_DOMAIN } from './data'

// 排名徽章
const RankBadge = ({ rank }) => {
  if (rank === 1) {
    return (
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-white font-bold shadow-lg">
        {rank}
      </div>
    )
  }
  if (rank === 2) {
    return (
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 text-white font-bold shadow">
        {rank}
      </div>
    )
  }
  if (rank === 3) {
    return (
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 text-white font-bold shadow">
        {rank}
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center w-8 h-8 text-gray-600 font-medium">
      {rank}
    </div>
  )
}

// 单个领域卡片组件
const DomainCard = ({ domain, data }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* 卡片标题 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800">{domain.name}</h3>
      </div>
      
      {/* 表头 */}
      <div className="grid grid-cols-[40px_1fr_70px] px-4 py-2 bg-gray-50 text-xs text-gray-500 font-medium">
        <span className="text-center">排名</span>
        <span>模型</span>
        <span className="text-right">得分</span>
      </div>
      
      {/* 数据列表 */}
      <div className="divide-y divide-gray-50">
        {data.map((item, idx) => (
          <div 
            key={idx} 
            className={`grid grid-cols-[40px_1fr_70px] px-4 py-2.5 items-center hover:bg-orange-50/50 transition-colors ${
              idx === 0 ? 'bg-yellow-50/30' : idx === 1 ? 'bg-gray-50/30' : idx === 2 ? 'bg-amber-50/30' : ''
            }`}
          >
            <span className={`text-center font-bold text-sm ${
              idx === 0 ? 'text-yellow-600' : idx === 1 ? 'text-gray-500' : idx === 2 ? 'text-amber-700' : 'text-gray-400'
            }`}>
              {idx + 1}
            </span>
            <span className="text-sm text-gray-800 truncate" title={item.model}>{item.model}</span>
            <span className={`text-right text-sm font-medium ${idx === 0 ? 'text-[#FF5005]' : 'text-gray-600'}`}>
              {item.score?.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// 综合排名卡片
const OverallCard = ({ title, data }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden col-span-full lg:col-span-2">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      
      {/* 表头 */}
      <div className="grid grid-cols-[40px_1fr_60px_60px_60px_60px_70px] px-4 py-2 bg-gray-50 text-xs text-gray-500 font-medium">
        <span className="text-center">排名</span>
        <span>模型</span>
        <span className="text-center">相关性</span>
        <span className="text-center">边界</span>
        <span className="text-center">完整</span>
        <span className="text-center">简洁</span>
        <span className="text-right">总分</span>
      </div>
      
      <div className="divide-y divide-gray-50">
        {data.map((item, idx) => (
          <div 
            key={idx} 
            className={`grid grid-cols-[40px_1fr_60px_60px_60px_60px_70px] px-4 py-2.5 items-center hover:bg-orange-50/50 transition-colors ${
              idx === 0 ? 'bg-yellow-50/30' : idx === 1 ? 'bg-gray-50/30' : idx === 2 ? 'bg-amber-50/30' : ''
            }`}
          >
            <span className={`text-center font-bold text-sm ${
              idx === 0 ? 'text-yellow-600' : idx === 1 ? 'text-gray-500' : idx === 2 ? 'text-amber-700' : 'text-gray-400'
            }`}>
              {idx + 1}
            </span>
            <div className="truncate">
              <span className="text-sm text-gray-800">{item.model}</span>
              <span className="ml-1 text-xs text-gray-400">{item.provider}</span>
            </div>
            <span className="text-center text-xs text-gray-500">{item.relevance?.toFixed(2)}</span>
            <span className="text-center text-xs text-gray-500">{item.boundary?.toFixed(2)}</span>
            <span className="text-center text-xs text-gray-500">{item.completeness?.toFixed(2)}</span>
            <span className="text-center text-xs text-gray-500">{item.conciseness?.toFixed(2)}</span>
            <span className={`text-right text-sm font-semibold ${idx === 0 ? 'text-[#FF5005]' : 'text-gray-700'}`}>
              {item.total?.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// 投票排行榜内容
function VoteRankContent() {
  const [rankData, setRankData] = useState([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [showAll, setShowAll] = useState(false)

  const displayData = showAll ? rankData : rankData.slice(0, 10)

  const fetchRankData = async () => {
    setLoading(true)
    try {
      const data = await arenaApi.getVoteRank()
      const rankedData = data.map((item, index) => ({
        ...item,
        rank: index + 1,
        key: index,
      }))
      setRankData(rankedData)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('获取排行榜失败:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRankData()
  }, [])

  const columns = [
    { title: '排名', dataIndex: 'rank', key: 'rank', width: 80, align: 'center', render: (rank) => <RankBadge rank={rank} /> },
    { title: '模型', dataIndex: 'model', key: 'model', render: (model) => <span className="font-mono text-gray-800">{model}</span> },
    { title: '分数', dataIndex: 'score', key: 'score', width: 120, align: 'center', sorter: (a, b) => a.score - b.score, render: (score) => <span className="font-semibold text-gray-700">{score?.toLocaleString()}</span> },
    { title: '投票数', dataIndex: 'vote', key: 'vote', width: 120, align: 'center', sorter: (a, b) => a.vote - b.vote, render: (vote) => <span className="text-gray-600">{vote?.toLocaleString()}</span> },
  ]

  return (
    <>
      <div className="flex justify-end mb-4">
        {lastUpdated && <span className="text-sm text-gray-400 mr-4 leading-8">更新于 {lastUpdated.toLocaleTimeString()}</span>}
        <button onClick={fetchRankData} disabled={loading} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-[#FF5005] hover:bg-orange-50 rounded-lg transition-colors">
          <ReloadOutlined className={loading ? 'animate-spin' : ''} />
          刷新
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
        <Table columns={columns} dataSource={displayData} loading={loading} pagination={false}
          rowClassName={(record) => record.rank === 1 ? 'bg-yellow-50/50' : record.rank === 2 ? 'bg-gray-50/50' : record.rank === 3 ? 'bg-amber-50/50' : ''}
          className="rank-table"
        />
        {!showAll && rankData.length > 10 && (
          <div className="border-t border-gray-100">
            <button onClick={() => setShowAll(true)} className="w-full py-4 text-sm text-gray-500 hover:text-[#FF5005] hover:bg-orange-50 transition-colors">
              查看全部 ({rankData.length} 个模型)
            </button>
          </div>
        )}
        {showAll && rankData.length > 10 && (
          <div className="border-t border-gray-100">
            <button onClick={() => setShowAll(false)} className="w-full py-4 text-sm text-gray-500 hover:text-[#FF5005] hover:bg-orange-50 transition-colors">
              收起
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        .rank-table .ant-table-thead > tr > th { background: #fdfdfd; font-weight: 600; color: #666; border-bottom: 1px solid #f0f0f0; }
        .rank-table .ant-table-tbody > tr > td { padding: 16px; border-bottom: 1px solid #f5f5f5; }
        .rank-table .ant-table-tbody > tr:hover > td { background: #fff7f0 !important; }
        .rank-table .ant-table-tbody > tr:last-child > td { border-bottom: none; }
      `}</style>
    </>
  )
}

// 多领域评测榜内容
function ParamsRankContent() {
  // 获取各领域数据
  const domainDataMap = useMemo(() => {
    const result = {}
    DOMAINS.forEach(domain => {
      const data = NON_TIMELY_BY_DOMAIN[domain.key] || []
      result[domain.key] = [...data].sort((a, b) => b.score - a.score)
    })
    return result
  }, [])

  return (
    <>
      {/* 网格布局 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {/* 综合排名卡片 */}
        <OverallCard 
          title="📊 综合排名" 
          data={NON_TIMELY_SCORES} 
        />
        
        {/* 各领域卡片 */}
        {DOMAINS.map(domain => (
          <DomainCard 
            key={domain.key}
            domain={domain}
            data={domainDataMap[domain.key]}
          />
        ))}
      </div>

      {/* 数据说明 */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-500">
          <span className="font-medium text-gray-600">数据来源：</span>
          基于14个领域的标准化测试评估，评测维度包括相关性、知识边界处理、答案完整性、答案简洁性。
        </p>
      </div>
    </>
  )
}

// 调用量排行榜内容
function UsageRankContent() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [timeRange, setTimeRange] = useState('top10')

  const fetchStats = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await arenaApi.getModelStats()
      if (data) {
        setStats(data)
      } else {
        setError('获取数据失败')
      }
    } catch (err) {
      setError(err?.message || '未知错误')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const formatTokens = (tokens) => {
    if (tokens >= 1e12) return `${(tokens / 1e12).toFixed(2)}T`
    if (tokens >= 1e9) return `${(tokens / 1e9).toFixed(2)}B`
    if (tokens >= 1e6) return `${(tokens / 1e6).toFixed(2)}M`
    if (tokens >= 1e3) return `${(tokens / 1e3).toFixed(2)}K`
    return tokens.toString()
  }

  const formatTokensWithUnit = (tokens) => {
    if (tokens >= 1e12) return `${(tokens / 1e12).toFixed(2)} 万亿`
    if (tokens >= 1e9) return `${(tokens / 1e9).toFixed(2)} 十亿`
    if (tokens >= 1e6) return `${(tokens / 1e6).toFixed(2)} 百万`
    if (tokens >= 1e3) return `${(tokens / 1e3).toFixed(2)} 千`
    return `${tokens} Tokens`
  }

  const getDisplayData = () => {
    if (!stats) return []
    switch (timeRange) {
      case 'top10': return stats.models.slice(0, 10)
      case 'top50': return stats.models.slice(0, 50)
      default: return stats.models
    }
  }

  // 月份名称映射
  const monthNameMap = {
    '01': '一月', '02': '二月', '03': '三月', '04': '四月',
    '05': '五月', '06': '六月', '07': '七月', '08': '八月',
    '09': '九月', '10': '十月', '11': '十一月', '12': '十二月'
  }

  // 使用真实数据的堆叠柱状图
  const stackedBarData = useMemo(() => {
    if (!stats?.monthlyData || stats.monthlyData.length === 0) return []
    return stats.monthlyData.map(item => ({
      ...item,
      monthLabel: monthNameMap[item.month?.slice(-2)] || item.month
    }))
  }, [stats])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <ReloadOutlined className="text-2xl text-[#FF5005] animate-spin" />
        <span className="ml-2 text-base text-gray-600">正在加载模型统计数据...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <LineChartOutlined className="text-4xl text-[#FF5005] mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">无法加载统计数据</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button onClick={fetchStats} className="flex items-center gap-2 px-4 py-2 mx-auto text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
          <ReloadOutlined />
          重试
        </button>
      </div>
    )
  }

  if (!stats) return null

  const displayData = getDisplayData()

  return (
    <>
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">模型总数</span>
            <UserOutlined className="text-gray-400" />
          </div>
          <div className="text-2xl font-semibold text-gray-900">{stats.stats?.totalModels?.toLocaleString() || 0}</div>
          <p className="text-xs text-gray-400">活跃模型</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">总调用量</span>
            <RiseOutlined className="text-gray-400" />
          </div>
          <div className="text-2xl font-semibold text-gray-900">{formatTokens(stats.stats?.totalTokens || 0)}</div>
          <p className="text-xs text-gray-400">{formatTokensWithUnit(stats.stats?.totalTokens || 0)}</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">热门模型</span>
            <LineChartOutlined className="text-gray-400" />
          </div>
          <div className="text-lg font-semibold text-gray-900 truncate">{stats.models[0]?.model || 'N/A'}</div>
          <p className="text-xs text-gray-400">
            {formatTokens(stats.models[0]?.totalToken || 0)} ({stats.models[0]?.percentage?.toFixed(1) || '0'}%)
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">最后更新</span>
            <ReloadOutlined className="text-gray-400" />
          </div>
          <div className="text-sm font-medium text-gray-900">
            {new Date(stats.lastUpdated).toLocaleTimeString()}
          </div>
          <p className="text-xs text-gray-400">
            {new Date(stats.lastUpdated).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* 堆叠柱状图 */}
      {stackedBarData.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <LineChartOutlined className="text-[#FF5005]" />
              公司调用量分布
            </h3>
            <p className="text-xs text-gray-500 mt-1">各月份公司调用量占比分析（基于真实数据）</p>
          </div>
          
          <div className="h-52 relative">
            <div className="ml-4 h-full border-l border-b border-gray-300 relative">
              {/* 网格线 */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {[0, 20, 40, 60, 80].map((line) => (
                  <div key={line} className="border-t border-gray-100 border-dashed" />
                ))}
              </div>
              
              {/* 堆叠柱状图 */}
              <div className="absolute inset-0 flex items-end justify-around px-2 pb-2">
                {(() => {
                  const monthCount = stackedBarData.length
                  const maxHeight = Math.max(...stackedBarData.map(m => m.total))
                  // 根据月份数量动态计算宽度
                  const barWidth = monthCount <= 3 ? 60 : monthCount <= 6 ? 45 : monthCount <= 12 ? 35 : 25
                  const gap = monthCount <= 6 ? 8 : 4
                  
                  return stackedBarData.map((monthData, monthIndex) => (
                    <div
                      key={monthIndex}
                      className="flex flex-col justify-end rounded-t overflow-hidden"
                      style={{ 
                        height: maxHeight > 0 ? `${(monthData.total / maxHeight) * 100}%` : '0%',
                        width: `${barWidth}px`,
                        marginLeft: monthIndex === 0 ? 0 : `${gap}px`
                      }}
                      title={`${monthData.monthLabel || monthData.month}: 总计 ${formatTokens(monthData.total)}`}
                    >
                      {monthData.segments.map((segment, segIndex) => (
                        <div
                          key={segIndex}
                          className="w-full transition-all duration-500 ease-out hover:opacity-80"
                          style={{ 
                            height: `${segment.percentage}%`,
                            backgroundColor: segment.color,
                            minHeight: '1px'
                          }}
                          title={`${segment.name}: ${formatTokens(segment.value)} (${segment.percentage.toFixed(1)}%)`}
                        />
                      ))}
                    </div>
                  ))
                })()}
              </div>
              
              {/* X轴标签 */}
              <div className="absolute -bottom-6 left-0 right-0 flex justify-around text-xs text-gray-500 px-2">
                {stackedBarData.map((monthData, index) => (
                  <span 
                    key={index} 
                    className="text-center truncate"
                    style={{ 
                      fontSize: stackedBarData.length > 12 ? '8px' : '10px',
                      maxWidth: stackedBarData.length <= 3 ? '60px' : stackedBarData.length <= 6 ? '45px' : '35px'
                    }}
                  >
                    {monthData.monthLabel || monthData.month}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* 图例 - 使用真实数据的模型 */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {stackedBarData[0]?.segments?.map((segment, idx) => (
              <div key={segment.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="text-xs text-gray-600">{segment.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 时间范围切换 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
          {[
            { key: 'top10', label: '前 10' },
            { key: 'top50', label: '前 50' },
            { key: 'all', label: '全部模型' },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setTimeRange(item.key)}
              className={`px-4 py-1.5 text-sm rounded-md transition-all ${
                timeRange === item.key
                  ? 'bg-white text-[#FF5005] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button onClick={fetchStats} className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
          <ReloadOutlined />
          刷新
        </button>
      </div>

      {/* 排行榜列表 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">模型排行榜</h3>
          <p className="text-xs text-gray-500 mt-1">按总调用量 (tokens) 排序</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {displayData.map((model) => (
            <div key={model.model} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100 hover:bg-orange-50/50 transition-colors">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 font-medium text-xs text-gray-600 min-w-[32px]">
                {model.rank}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 truncate pr-2 text-sm">{model.model}</h3>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="text-right">
                      <span className="font-medium text-gray-700">{formatTokens(model.totalToken)}</span>
                      <div className="text-xs text-gray-500">{formatTokensWithUnit(model.totalToken)}</div>
                    </div>
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs font-bold whitespace-nowrap">
                      {model.percentage?.toFixed(2)}%
                    </span>
                  </div>
                </div>
                
                {/* 进度条 */}
                <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-500 ease-out"
                    style={{ width: `${Math.max(model.percentage || 0, 3)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

// 主页面组件
export default function RankPage() {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') || 'vote'

  if (tab === 'params') return <ParamsRankContent />
  if (tab === 'usage') return <UsageRankContent />
  return <VoteRankContent />
}
