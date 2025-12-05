'use client'

import React from 'react'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { FileAddOutlined } from '@ant-design/icons'
import { HeaderJingzhi } from '@/src/components/common/HeaderJingzhi'
import { Sidebar } from '@/src/components/common/Sidebar'

export default function ApplyLayout({ children }) {
  return (
    <ConfigProvider 
      locale={zhCN} 
      theme={{ 
        token: { 
          colorPrimary: '#FF5005', 
          colorLink: '#FF5005',
          borderRadius: 8,
        },
        components: {
          Input: {
            borderRadius: 8,
          },
          Select: {
            borderRadius: 8,
          },
          Button: {
            borderRadius: 8,
          },
        }
      }}
    >
      <div className="min-h-screen bg-gray-50">
        <HeaderJingzhi active="/apply/" />
        <div className="flex">
          <Sidebar />
          <div className="flex-1 pt-[56px]">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-[1200px]">
              {/* 页面标题 */}
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <FileAddOutlined className="text-3xl text-[#FF5005]" />
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">模型入驻申请</h1>
                    <p className="text-gray-500 text-sm mt-1">申请成为鲸智竞技场的模型提供商</p>
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
