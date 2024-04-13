"use client";

import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd'

import PromptTextarea from '../../components/prompt/PromptTextarea'
import PromptModel from '../../components/prompt/PromptModel'

import { getAppList, getCateList } from '../../services/promptService'
import { getKeyList } from '../../services/key'


const Prompt = () => {
  const [promptText, setPromptText] = useState('');
  const [appListPage, setAppListPage] = useState(1);
  const [appListCid, setAppListCid] = useState('');
  const [appListSearch, setAppListSearch] = useState('');

  const [appList, setAppList] = useState([]);

  const [cateList, setCateList] = useState([])


  const [appListLoading, setAppListLoading] = useState(false);

  const getAppListData = async (appListParams) => {
    const res = await getAppList(appListParams)
    if (res.code === 0) {
      if (res.data.recordList && res.data.recordList.length > 0) {
        setAppListLoading(false)
        setAppList(res.data)
      }
    }
  }

  const getKeyListData = async () => {
    const res = await getKeyList()
    try {
      if (res.data.recordList[0].openKey) localStorage.setItem('open-key', res.data.recordList[0].openKey)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    setAppListLoading(true)
    getKeyListData()
    getAppListData({
      cid: "",
      filterType: 1,
      page: 1,
      pageSize: 9,
      search: "",
      type: ""
    })
    getClietCateList()
  }, [])


  const getClietCateList = async () => {
    const res = await getCateList()
    const renderCateList = (res?.data?.recordList || []).map(item => ({ ...item, label: item.name }))
    setCateList(renderCateList)
  }


  useEffect(() => {
    getAppListData({
      cid: appListCid,
      filterType: 1,
      keywords: appListSearch,
      page: appListPage,
      pageSize: 9,
      type: ""
    })
  }, [appListPage, appListCid, appListSearch])





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
          setAppListPage={setAppListPage}
          setAppListCid={setAppListCid}
          getAppListData={getAppListData}
          cateList={cateList}
          appListCid={appListCid}
          appListPage={appListPage}
          appListSearch={appListSearch}
          setAppListSearch={setAppListSearch}
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


    </>
  )
}


export default Prompt