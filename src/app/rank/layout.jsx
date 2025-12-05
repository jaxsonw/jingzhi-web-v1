'use client'

import React from 'react'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { TrophyOutlined } from '@ant-design/icons'
import { HeaderJingzhi } from '@/src/components/common/HeaderJingzhi'
import { Sidebar } from '@/src/components/common/Sidebar'

export default function RankLayout({ children }) {
  return (
    <ConfigProvider locale={zhCN} theme={{ token: { colorPrimary: '#FF5005', colorLink: '#FF5005' } }}>
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

              {/* 子页面内容 */}
              {children}
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  )
}
