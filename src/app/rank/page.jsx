'use client'

import React, { useState, useEffect } from 'react'
import { Table, Spin, ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { TrophyOutlined, ReloadOutlined } from '@ant-design/icons'
import { HeaderJingzhi } from '@/src/components/common/HeaderJingzhi'
import { Sidebar } from '@/src/components/common/Sidebar'
import { arenaApi } from '@/src/arena/services/arena'

// 公司图标映射
// const CompanyIcon = ({ company }) => {
//   const iconMap = {
//     'OpenAI': '🤖',
//     'Google': 'G',
//     'Anthropic': 'A',
//     'xAI': 'X',
//     'Baidu': '百',
//     'Tencent': '腾',
//     'Alibaba': '阿',
//     'ByteDance': '抖',
//     'Moonshot': '🌙',
//     'Zhipu': '智',
//     'Baichuan': '百',
//   }
  
//   const getCompanyStyle = (company) => {
//     const styles = {
//       'Google': 'bg-white text-blue-500 border border-gray-200',
//       'Anthropic': 'bg-[#d4a574] text-white',
//       'xAI': 'bg-black text-white',
//       'OpenAI': 'bg-black text-white',
//       'Baidu': 'bg-blue-600 text-white',
//       'Tencent': 'bg-blue-500 text-white',
//       'Alibaba': 'bg-orange-500 text-white',
//       'ByteDance': 'bg-black text-white',
//       'Moonshot': 'bg-purple-600 text-white',
//       'Zhipu': 'bg-blue-700 text-white',
//       'Baichuan': 'bg-orange-600 text-white',
//     }
//     return styles[company] || 'bg-gray-500 text-white'
//   }
  
//   return (
//     <span className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-bold ${getCompanyStyle(company)}`}>
//       {iconMap[company] || company?.charAt(0) || '?'}
//     </span>
//   )
// }

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

export default function RankPage() {
  const [rankData, setRankData] = useState([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [showAll, setShowAll] = useState(false)

  // 显示的数据（默认前10，点击查看全部后显示所有）
  const displayData = showAll ? rankData : rankData.slice(0, 10)

  const fetchRankData = async () => {
    setLoading(true)
    try {
      const data = await arenaApi.getVoteRank()
      // 添加排名序号
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
    {
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
      width: 80,
      align: 'center',
      render: (rank) => <RankBadge rank={rank} />,
    },
    {
      title: '模型',
      dataIndex: 'model',
      key: 'model',
      render: (model, record) => (
        <div className="flex items-center gap-3">
          {/* <CompanyIcon company={record.companyName} /> */}
          <span className="font-mono text-gray-800">{model}</span>
        </div>
      ),
    },
    {
      title: '分数',
      dataIndex: 'score',
      key: 'score',
      width: 120,
      align: 'center',
      sorter: (a, b) => a.score - b.score,
      render: (score) => (
        <span className="font-semibold text-gray-700">{score?.toLocaleString()}</span>
      ),
    },
    {
      title: '投票数',
      dataIndex: 'vote',
      key: 'vote',
      width: 120,
      align: 'center',
      sorter: (a, b) => a.vote - b.vote,
      render: (vote) => (
        <span className="text-gray-600">{vote?.toLocaleString()}</span>
      ),
    },
  ]

  return (
    <ConfigProvider locale={zhCN} theme={{ token: { colorPrimary: '#FF5005', colorLink: '#FF5005' } }}>
      <div className="min-h-screen bg-gray-50">
        <HeaderJingzhi active="/rank/" />
        <div className="flex">
          <Sidebar />
          <div className="flex-1 pt-[56px]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* 页面标题 */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TrophyOutlined className="text-3xl text-[#FF5005]" />
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">模型排行榜</h1>
                      <p className="text-gray-500 text-sm mt-1">基于用户投票的模型评分排名</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {lastUpdated && (
                      <span className="text-sm text-gray-400">
                        更新于 {lastUpdated.toLocaleTimeString()}
                      </span>
                    )}
                    <button
                      onClick={fetchRankData}
                      disabled={loading}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-[#FF5005] hover:bg-orange-50 rounded-lg transition-colors"
                    >
                      <ReloadOutlined className={loading ? 'animate-spin' : ''} />
                      刷新
                    </button>
                  </div>
                </div>
              </div>

              {/* 排行榜表格 */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-700 overflow-hidden">
                <Table
                  columns={columns}
                  dataSource={displayData}
                  loading={loading}
                  pagination={false}
                  rowClassName={(record) => {
                    if (record.rank === 1) return 'bg-yellow-50/50'
                    if (record.rank === 2) return 'bg-gray-50/50'
                    if (record.rank === 3) return 'bg-amber-50/50'
                    return ''
                  }}
                  className="rank-table"
                />
                
                {/* 查看全部按钮 */}
                {!showAll && rankData.length > 10 && (
                  <div className="border-t border-gray-100">
                    <button
                      onClick={() => setShowAll(true)}
                      className="w-full py-4 text-sm text-gray-500 hover:text-[#FF5005] hover:bg-orange-50 transition-colors"
                    >
                      查看全部 ({rankData.length} 个模型)
                    </button>
                  </div>
                )}
                
                {/* 收起按钮 */}
                {showAll && rankData.length > 10 && (
                  <div className="border-t border-gray-100">
                    <button
                      onClick={() => setShowAll(false)}
                      className="w-full py-4 text-sm text-gray-500 hover:text-[#FF5005] hover:bg-orange-50 transition-colors"
                    >
                      收起
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .rank-table .ant-table-thead > tr > th {
          background: #fdfdfd;
          font-weight: 600;
          color: #666;
          border-bottom: 1px solid #f0f0f0;
        }
        .rank-table .ant-table-tbody > tr > td {
          padding: 16px;
          border-bottom: 1px solid #f5f5f5;
        }
        .rank-table .ant-table-tbody > tr:hover > td {
          background: #fff7f0 !important;
        }
        .rank-table .ant-table-tbody > tr:last-child > td {
          border-bottom: none;
        }
      `}</style>
    </ConfigProvider>
  )
}
