'use client'

import React, { useState } from 'react'
import { Form, Input, Button, Card, Result, message } from 'antd'
import { SendOutlined, CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons'
import { arenaApi } from '@/src/services/arenaService'

const { TextArea } = Input

export default function ApplyPage() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      const result = await arenaApi.submitProviderApply(values)
      if (result.success) {
        setSubmitted(true)
        message.success('申请提交成功')
      } else {
        message.error(result.error || '提交失败，请重试')
      }
    } catch (err) {
      message.error('网络错误，请重试')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setSubmitted(false)
    form.resetFields()
  }

  if (submitted) {
    return (
      <Result
        status="success"
        icon={<CheckCircleOutlined className="text-[#FF5005]" style={{ fontSize: 72 }} />}
        title={<span className="text-xl font-semibold">申请已提交</span>}
        subTitle="我们已收到您的模型提供商申请，将在 3-5 个工作日内处理。"
        extra={[
          <Button key="new" type="primary" onClick={handleReset} className="rounded-lg">
            提交新申请
          </Button>,
        ]}
      />
    )
  }

  return (
    <Card 
      title={<span className="text-lg font-medium">申请信息</span>}
      className="shadow-sm rounded-xl"
      extra={<span className="text-sm text-gray-400">所有字段均为必填项</span>}
    >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark={false}
          >
            {/* 基本信息 */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b">基本信息</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  name="name"
                  label="联系人姓名"
                  rules={[{ required: true, message: '请输入联系人姓名' }]}
                >
                  <Input className="rounded-md" placeholder="请输入联系人姓名" />
                </Form.Item>

                <Form.Item
                  name="company"
                  label="公司"
                  rules={[{ required: true, message: '请输入公司名称' }]}
                >
                  <Input className="rounded-md" placeholder="请输入公司名称" />
                </Form.Item>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  name="job"
                  label="职位"
                  rules={[{ required: true, message: '请输入职位' }]}
                >
                  <Input className="rounded-md" placeholder="请输入职位" />
                </Form.Item>

                <Form.Item
                  name="mobile"
                  label="联系电话"
                  rules={[{ required: true, message: '请输入联系电话' }]}
                >
                  <Input className="rounded-md" placeholder="+86 138 0000 0000" />
                </Form.Item>
              </div>
            </div>

            {/* 模型信息 */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b">模型信息</h3>

              <Form.Item
                name="baseUrl"
                label="API 端点"
                rules={[
                  { required: true, message: '请输入 API 端点' },
                  { type: 'url', message: '请输入有效的 URL' }
                ]}
              >
                <Input className="rounded-md" placeholder="https://api.example.com/v1/chat/completions" />
              </Form.Item>

              <Form.Item
                name="openKey"
                label="测试用 API-Key"
                rules={[{ required: true, message: '请输入测试用 API-Key' }]}
              >
                <Input.Password className="rounded-md" placeholder="sk-xxxxxxxxxxxx" />
              </Form.Item>

              <Form.Item
                name="desc"
                label="模型描述"
                rules={[{ required: true, message: '请输入模型描述' }]}
              >
                <TextArea 
                  rows={4} 
                  className="rounded-md"
                  placeholder="请详细描述您的模型特点、性能、应用场景等..."
                />
              </Form.Item>
            </div>

            {/* 提交按钮 */}
            <div className="flex justify-end pt-4 border-t">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={loading ? <LoadingOutlined /> : <SendOutlined />}
                size="large"
                className="min-w-[140px] rounded-lg"
              >
                {loading ? '提交中...' : '提交申请'}
              </Button>
            </div>
          </Form>
    </Card>
  )
}
