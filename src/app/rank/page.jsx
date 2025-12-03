'use client'

import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import { arenaApi } from '@/src/services/arenaService'

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
