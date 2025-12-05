'use client'

import React, { Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { TrophyOutlined, BarChartOutlined, LineChartOutlined } from '@ant-design/icons'
import { HeaderJingzhi } from '@/src/components/common/HeaderJingzhi'
import { Sidebar } from '@/src/components/common/Sidebar'

const tabs = [
  { key: 'vote', label: '投票总榜', icon: <TrophyOutlined /> },
  { key: 'params', label: '多领域评测榜', icon: <BarChartOutlined /> },
  { key: 'usage', label: '调用量榜', icon: <LineChartOutlined /> },
]

// 内部布局内容组件
function RankLayoutContent({ children }) {
  const searchParams = useSearchParams()
  const router = useRouter()

  // 获取当前激活的 tab
  const activeTab = searchParams.get('tab') || 'vote'

  const handleTabChange = (tabKey) => {
    if (tabKey === 'vote') {
      router.push('/modelplaza/rank/')
    } else {
      router.push(`/modelplaza/rank/?tab=${tabKey}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderJingzhi active="/rank/" />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 pt-[56px]">
          <div className={`mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-[1800px]`}>
            {/* 页面标题 */}
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <TrophyOutlined className="text-3xl text-[#FF5005]" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">模型排行榜</h1>
                  <p className="text-gray-500 text-sm mt-1">综合评估各模型在不同维度的表现</p>
                </div>
              </div>
            </div>

            {/* Tab 切换器 */}
            <div className="mb-6">
              <div className="flex gap-2 p-1 bg-gray-100 rounded-xl w-fit">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => handleTabChange(tab.key)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.key
                        ? 'bg-white text-[#FF5005] shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 子页面内容 */}
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function RankLayout({ children }) {
  return (
    <ConfigProvider locale={zhCN} theme={{ token: { colorPrimary: '#FF5005', colorLink: '#FF5005' } }}>
      <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><span className="text-gray-500">加载中...</span></div>}>
        <RankLayoutContent>{children}</RankLayoutContent>
      </Suspense>
    </ConfigProvider>
  )
}
