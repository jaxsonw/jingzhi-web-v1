'use client'

import React, { useState, useMemo } from 'react'
import { Segmented } from 'antd'
import { NON_TIMELY_SCORES, TIMELY_SCORES, DOMAINS, NON_TIMELY_BY_DOMAIN, TIMELY_BY_DOMAIN } from './data'

// 主类别
const CATEGORIES = [
  { value: 'non-timely', label: '非时效性' },
  { value: 'timely', label: '时效性' },
]

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

export default function ParamsRankPage() {
  const [category, setCategory] = useState('non-timely')

  // 获取综合数据
  const overallData = useMemo(() => {
    return category === 'non-timely' ? NON_TIMELY_SCORES : TIMELY_SCORES
  }, [category])

  // 获取各领域数据
  const domainDataMap = useMemo(() => {
    const dataSource = category === 'non-timely' ? NON_TIMELY_BY_DOMAIN : TIMELY_BY_DOMAIN
    const result = {}
    DOMAINS.forEach(domain => {
      const data = dataSource[domain.key] || []
      result[domain.key] = [...data].sort((a, b) => b.score - a.score)
    })
    return result
  }, [category])

  return (
    <>
      {/* 筛选器 */}
      <div className="mb-6">
        <Segmented options={CATEGORIES} value={category} onChange={setCategory} />
      </div>

      {/* 网格布局 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {/* 综合排名卡片 */}
        <OverallCard 
          title={category === 'non-timely' ? '📊 非时效性综合排名' : '📊 时效性综合排名'} 
          data={overallData} 
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
