"use client";

import React, { useState } from 'react'
import { Layout, Tabs, Radio, Button, Checkbox, Spin, Dropdown, Input } from 'antd'
// import { Layout, Select, Form, Input } from 'antd'
import {
  MoreOutlined,
  PieChartOutlined
} from '@ant-design/icons';

const { TextArea } = Input;

const prompt = () => {
  const [size, setSize] = useState('small');

  const tabsItem =
    [
      {
        label: 'Prompt模版',
        key: '1',
        children: (
          <div>

            <div className='tab-header flex  justify-between mb-[12px]'>
              <Radio.Group defaultValue="a" >
                <Radio.Button value="a">系统模版</Radio.Button>
                <Radio.Button value="b">自定义模版</Radio.Button>
              </Radio.Group>
              <div className='mb-[12px]'>
                <Button type="primary">新增模版</Button>

              </div>
            </div>
            <div className=' mb-[12px]'>
              <Checkbox>全部</Checkbox>
              <Checkbox>文案创作</Checkbox>
              <Checkbox>办公助理</Checkbox>
              <Checkbox>学习助手</Checkbox>
            </div>
            {/* <Spin> */}
            <div className='template flex flex-wrap	 gap-4	'>
              <div className='templateCard  bg-[#fff] rounded-xl px-[20px] py-[20px] pb-[10px] w-[32.5%]		'>
                <div className='templateContent flex items-start gap-4'>
                  <img className='mt-[4px]' src="https://img.alicdn.com/imgextra/i2/O1CN01enEjUH1w4NvLmVzTZ_!!6000000006254-55-tps-40-40.svg" />
                  <div className='content flex-1 w-[calc(100% - 48px)]'>
                    <div className='flex justify-between items-center md-[6px]'>
                      <span className='text-base font-medium	'>PHP大师</span>
                      <div className='text-base'>
                        <Dropdown
                          menu={
                            {
                              items: [{
                                label: '复制',
                                key: '0'
                              }]
                            }
                          }
                          trigger={['click']}

                        >
                          <MoreOutlined onClick={(e) => e.preventDefault()} />

                        </Dropdown>
                      </div>
                    </div>
                    <div className='line-clamp-2	text-xs text-slate-500'>
                      你是一位资深PHP编程专家，现在接到一个明确的开发任务。诉求是：${require}。请使用PHP语言详细描述一种实现该诉求的算法或方法，并考虑在实现过程中可能遇到的边界情况和错误处理，以及如何通过高效且安全的代码来满足此需求。
                    </div>
                  </div>
                </div>
                <div className='flex items-center pt-[8px] mt-[12px] border-solid border-t border-slate-100	]'>
                  <span className='flex flex-1 justify-center'>
                    <PieChartOutlined className='mr-[2px]' />
                    查看详情
                  </span>
                  <span className='flex flex-1 justify-center'>调用</span>

                </div>

              </div>
              <div className='templateCard  bg-[#fff] rounded-xl px-[20px] py-[20px] pb-[10px] w-[32.5%]		'>
                <div className='templateContent flex items-start gap-4'>
                  <img className='mt-[4px]' src="https://img.alicdn.com/imgextra/i2/O1CN01enEjUH1w4NvLmVzTZ_!!6000000006254-55-tps-40-40.svg" />
                  <div className='content flex-1 w-[calc(100% - 48px)]'>
                    <div className='flex justify-between items-center md-[6px]'>
                      <span className='text-base font-medium	'>PHP大师</span>
                      <div className='text-base'>
                        <Dropdown
                          menu={
                            {
                              items: [{
                                label: '复制',
                                key: '0'
                              }]
                            }
                          }
                          trigger={['click']}

                        >
                          <MoreOutlined onClick={(e) => e.preventDefault()} />

                        </Dropdown>
                      </div>
                    </div>
                    <div className='line-clamp-2	text-xs text-slate-500'>
                      你是一位资深PHP编程专家，现在接到一个明确的开发任务。诉求是：${require}。请使用PHP语言详细描述一种实现该诉求的算法或方法，并考虑在实现过程中可能遇到的边界情况和错误处理，以及如何通过高效且安全的代码来满足此需求。
                    </div>
                  </div>
                </div>
                <div className='flex items-center pt-[8px] mt-[12px] border-solid border-t border-slate-100	]'>
                  <span className='flex flex-1 justify-center'>
                    <PieChartOutlined className='mr-[2px]' />
                    查看详情
                  </span>
                  <span className='flex flex-1 justify-center'>调用</span>

                </div>

              </div>
              <div className='templateCard  bg-[#fff] rounded-xl px-[20px] py-[20px] pb-[10px] w-[32.5%]		'>
                <div className='templateContent flex items-start gap-4'>
                  <img className='mt-[4px]' src="https://img.alicdn.com/imgextra/i2/O1CN01enEjUH1w4NvLmVzTZ_!!6000000006254-55-tps-40-40.svg" />
                  <div className='content flex-1 w-[calc(100% - 48px)]'>
                    <div className='flex justify-between items-center md-[6px]'>
                      <span className='text-base font-medium	'>PHP大师</span>
                      <div className='text-base'>
                        <Dropdown
                          menu={
                            {
                              items: [{
                                label: '复制',
                                key: '0'
                              }]
                            }
                          }
                          trigger={['click']}

                        >
                          <MoreOutlined onClick={(e) => e.preventDefault()} />

                        </Dropdown>
                      </div>
                    </div>
                    <div className='line-clamp-2	text-xs text-slate-500'>
                      你是一位资深PHP编程专家，现在接到一个明确的开发任务。诉求是：${require}。请使用PHP语言详细描述一种实现该诉求的算法或方法，并考虑在实现过程中可能遇到的边界情况和错误处理，以及如何通过高效且安全的代码来满足此需求。
                    </div>
                  </div>
                </div>
                <div className='flex items-center pt-[8px] mt-[12px] border-solid border-t border-slate-100	]'>
                  <span className='flex flex-1 justify-center'>
                    <PieChartOutlined className='mr-[2px]' />
                    查看详情
                  </span>
                  <span className='flex flex-1 justify-center'>调用</span>

                </div>

              </div>
              <div className='templateCard  bg-[#fff] rounded-xl px-[20px] py-[20px] pb-[10px] w-[32.5%]		'>
                <div className='templateContent flex items-start gap-4'>
                  <img className='mt-[4px]' src="https://img.alicdn.com/imgextra/i2/O1CN01enEjUH1w4NvLmVzTZ_!!6000000006254-55-tps-40-40.svg" />
                  <div className='content flex-1 w-[calc(100% - 48px)]'>
                    <div className='flex justify-between items-center md-[6px]'>
                      <span className='text-base font-medium	'>PHP大师</span>
                      <div className='text-base'>
                        <Dropdown
                          menu={
                            {
                              items: [{
                                label: '复制',
                                key: '0'
                              }]
                            }
                          }
                          trigger={['click']}

                        >
                          <MoreOutlined onClick={(e) => e.preventDefault()} />

                        </Dropdown>
                      </div>
                    </div>
                    <div className='line-clamp-2	text-xs text-slate-500'>
                      你是一位资深PHP编程专家，现在接到一个明确的开发任务。诉求是：${require}。请使用PHP语言详细描述一种实现该诉求的算法或方法，并考虑在实现过程中可能遇到的边界情况和错误处理，以及如何通过高效且安全的代码来满足此需求。
                    </div>
                  </div>
                </div>
                <div className='flex items-center pt-[8px] mt-[12px] border-solid border-t border-slate-100	]'>
                  <span className='flex flex-1 justify-center'>
                    <PieChartOutlined className='mr-[2px]' />
                    查看详情
                  </span>
                  <span className='flex flex-1 justify-center'>调用</span>

                </div>

              </div>
            </div>

            {/* </Spin> */}
          </div>
        ),
      },
      {
        label: 'Prompt优化',
        key: '2',
        children: (
          <div className='container bg-[#fff] rounded-xl p-[24px] h-[70vh] flex justify-between'>
            <div className='h-[100%] w-[49%]'>
              <div className='mb-[12px]'>原始prompt</div>
              <div style={{ height: 'calc(100% - 36px)' }} className='rounded-xl  border-solid border border-slate-300'>
                <TextArea style={{ height: 'calc(100% - 36px)', resize: 'none', padding: '12px', border: 'none', border: 'none', boxShadow: 'none' }} autoSize={false}></TextArea>
              </div>
            </div>
            <div className='h-[100%] w-[49%] ' >
              <div className='mb-[12px]'>优化prompt</div>
              <div style={{ height: 'calc(100% - 36px)' }} className='rounded-xl  border-solid border border-slate-300'>
                <TextArea style={{ height: 'calc(100% - 36px)', resize: 'none', padding: '12px', border: 'none', border: 'none', boxShadow: 'none' }} autoSize={false}></TextArea>
              </div>
            </div>

          </div>
        ),
        disabled: true,
      }
    ]
  return (
    <>
      <Layout>
        <div className="h-screen pt-[80px] lg:px-16">
          <div className='bg-[#fff] rounded-2xl flex items-center h-[108px] px-[20px] '>
            <img className='w-[68px] h-[68px] mr-[20px]' src="https://img.alicdn.com/imgextra/i3/O1CN014pVwxY1jsE1P8kVHO_!!6000000004603-55-tps-68-68.svg" />
            <div>
              <h1 className='gap-2 text-xl md-[4px]'>Prompt工程</h1>
              <h1 className='gap-2 text-xs text-slate-500	'>Prompt工程通过设计和改进prompt使大模型能够更准确、可靠地执行特定任务，平台为您提供了Prompt模板、Prompt优化等一系列Prompt工程工具。</h1>

            </div>
          </div>

          {/* <Layout className={'h-[calc(100vh_-_10px)] relative  '}> */}
          <Tabs
            defaultActiveKey="2"
            size={'large'}
            style={{
              marginBottom: 32,
            }}
            items={tabsItem.map((_, i) => {
              const id = String(i + 1);
              return {
                label: _.label,
                key: id,
                children: _.children,
              };
            })}
          />
          {/* </Layout> */}
        </div>

      </Layout>

    </>
  )
}

export default prompt