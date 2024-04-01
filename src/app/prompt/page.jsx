"use client";

import React, { useEffect, useState } from 'react'
import { Layout, Tabs, Radio, Button, Checkbox, Spin, Dropdown, Input, Tooltip, Modal, Pagination } from 'antd'
// import { Layout, Select, Form, Input } from 'antd'

import PromptTextarea from '../../components/prompt/PromptTextarea'
import PromptModel from '../../components/prompt/PromptModel'

import { getAppList } from '../../services/promptService'

const CheckboxGroup = Checkbox.Group;

const prompt = () => {
  const [size, setSize] = useState('small');
  const [promptText, setPromptText] = useState('');
  const [openMobel, setOpenMobel] = useState(false);
  const [appListParams, setAppListParams] = useState({
    cid: "",
    filterType: 1,
    page: 1,
    pageSize: 9,
    search: ""
  });

  const [appList, setAppList] = useState([]);

  const [appListLoading, setAppListLoading] = useState(false);

  const getAppListData = async () => {
    const res = await getAppList(appListParams)
    if (res.code === 0) {
      console.log(res)
      if (res.data.recordList && res.data.recordList.length > 0) {
        setAppListLoading(false)

        // setModelList(res.data.recordList.map(item => ({ id: item.apiModelName, name: item.apiModelName })))
        // const defaultValue = res.data.recordList.find(item => item.apiModelName === 'gemma-7b-it')?.apiModelName
        setAppList(res.data)
      }
    }
  }

  useEffect(() => {
    setAppListLoading(true)

    getAppListData()
  }, [])

  useEffect(() => {
    getAppListData()
  }, [appListParams])

  const openMobelClick = () => {
    setOpenMobel(true)
  }

  const handleOpenCancel = () => {
    setOpenMobel(false)

  }



  const tabsItem =
    [
      {
        label: 'Prompt模版',
        key: '1',
        children: <PromptModel
          appList={appList}
          setAppList={setAppList}
          appListLoading={appListLoading}
          setAppListLoading={setAppListLoading}
          setAppListParams={setAppListParams}
          openMobelClick={openMobelClick}
          getAppListData={getAppListData}
        />,
      },
      {
        label: 'Prompt优化',
        key: '2',
        children: <PromptTextarea
          setPromptText={setPromptText}
          promptText={promptText}
        />,
        disabled: true,
      }
    ]
  return (
    <>
      {/* <Layout> */}
      <div className="h-[100vh] pt-[80px] lg:px-16 bg-[#f2f8ff]  min-w-[1200px] overscroll-auto	overflow-hidden">
        <div className='bg-[#fff] rounded-2xl flex items-center h-[108px] px-[20px] '>
          <img className='w-[68px] h-[68px] mr-[20px]' src="https://img.alicdn.com/imgextra/i3/O1CN014pVwxY1jsE1P8kVHO_!!6000000004603-55-tps-68-68.svg" />
          <div>
            <h1 className='gap-2 text-xl md-[4px]'>Prompt工程</h1>
            <h1 className='gap-2 text-xs text-slate-500	'>Prompt工程通过设计和改进prompt使大模型能够更准确、可靠地执行特定任务，平台为您提供了Prompt模板、Prompt优化等一系列Prompt工程工具。</h1>

          </div>
        </div>

        {/* <Layout className={'h-[calc(100vh_-_10px)] relative  '}> */}
        <Tabs
          defaultActiveKey="1"
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
      <Modal
        title="模版调用"
        open={openMobel}
        onCancel={handleOpenCancel}
      >
        <p>调用模板，需要获取Access Key、Access Secret Key。具体使用方法请见调用文档。</p>
      </Modal>
      {/* </Layout> */}

    </>
  )
}

export default prompt