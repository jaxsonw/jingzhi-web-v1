"use client";

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Radio, Button, Modal, Spin, Dropdown, Input, Tooltip, Pagination, Drawer, Form, message, Row, Col } from 'antd'
import { getUserAppList, createApp, deleteApp } from '../../services/promptService'
import { isEmpty, mapKeys, map, debounce } from 'lodash'
import { copyValue } from '../../utils/index'
import { FaRegCopy } from "react-icons/fa";
import { CodeEdit } from './consts'

import {
  MoreOutlined,
  PieChartOutlined
} from '@ant-design/icons';
const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
  },
};

const APP_DROPDOWN = [{
  label: '复制',
  key: 0
}]

const USER_DROPDOWN = [{
  label: '复制',
  key: 0
}, {
  label: '删除',
  key: 1
}]

const DRAWER_TITLE = {
  NEW: '新建Prompt模版',
  DETAIL: '详情'
}


const PromptModel = (props) => {
  const router = useRouter()

  const { appList, setAppList, appListLoading, appListPage, setAppListLoading, setAppListPage, getAppListData, cateList, setAppListCid, appListCid, appListSearch, setAppListSearch } = props
  const [modelType, setMobelType] = useState(1)
  const [createOpen, setCreateOpen] = useState(false)
  const [createData, setCreateData] = useState({})
  const [drawerDom, setDrawerDom] = useState('')
  const [drawerFooterDom, setDrawerFooterDom] = useState('')
  const [mobelCodeDom, setMobelCodeDom] = useState('')
  const [openMobel, setOpenMobel] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState(DRAWER_TITLE.NEW)

  const [appType, setAppType] = useState(2)

  const { TextArea } = Input
  const [form] = Form.useForm()


  const getUserData = async () => {
    const res = await getUserAppList()
    if (res.code === 0) {
      if (res.data.recordList) {
        setAppListLoading(false)
        setAppList(res.data)
      }
    }
  }

  const handleCreateApp = async () => {
    const params = form.getFieldsValue()
    if (isEmpty(params.name)) {
      message.error('请输入模板名称')
      return
    } else if (isEmpty(params.desc)) {
      message.error('请输入模版内容')
      return
    }
    const res = await createApp(createData)
    if (res.code === 0) {
      message.success('新建成功')
      setCreateOpen(false)
      if (res?.data?.appId) {
        getUserData()
        // router.push(`/prompt/${res?.data?.appId}`)
      }
    } else {
      message.error(res?.message || '创建失败，请稍后重试')
    }

  }


  const handelCreateDrawer = () => {
    setCreateOpen(true)
    setDrawerTitle(DRAWER_TITLE.NEW)
    setDrawerFooterDom(<>
      <div className='flex justify-between'>
        <div></div>
        <div>

          <Button className='mr-[6px]' onClick={headerColseCreate}>取消</Button>
          <Button onClick={handleCreateApp}>保存</Button>
        </div>


      </div>
    </>)
    setDrawerDom(
      <>
        <Form
          // name="basic"
          // labelCol={{
          //   span: 8,
          // }}
          // wrapperCol={{
          //   span: 16,
          // }}
          // style={{
          //   maxWidth: 600,
          // }}
          // initialValues={{
          //   remember: true,
          // }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          // autoComplete="off"
          initialValues={{
            type: 2

          }}
          form={form}
          onValuesChange={(_, values) => {
            const newData = {}
            Object.keys(values).forEach(item => {
              if (values[item]) {
                newData[item] = values[item]
              }
            })
            setCreateData(newData)
          }}
          layout="vertical"

        >
          <Form.Item
            // {...formItemLayout}
            name="name"
            label="模版名称"
            rules={[
              {
                required: true,
                message: '请输入模板名称',
              },
            ]}
          >

            <TextArea placeholder="输入模版名称" styles={{ height: '300px' }} className="h-[60px]" autoSize={{ minRows: 1, maxRows: 8 }}
            ></TextArea>
          </Form.Item>

          <Form.Item
            label="模版内容"
            name="desc"
            rules={[
              {
                required: true,
                message: '请输入模版内容',
              },
            ]}
          >
            <TextArea placeholder="输入模版内容" styles={{ height: '300px' }} classNames="h-[60px]" autoSize={{ minRows: 12, maxRows: 16 }}
            ></TextArea>
          </Form.Item>

          <Form.Item
            // label="模版内容"
            name="type"
          // rules={[
          //   {
          //     required: true,
          //     message: '请输入模版内容',
          //   },
          // ]}
          >
            <Radio.Group
              // disabled={Boolean(appDetail)}
              onChange={e => {
                const value = e?.target?.value
                setAppType(Number(value))
              }}
              label="应用类型"
              value={appType}
              options={
                [
                  {
                    label: "文本生成型应用",
                    value: 2
                  }, {
                    label: "对话型应用",
                    value: 1
                  }
                ]
              }
            />

          </Form.Item>

        </Form>
      </>
    )
  }


  const handleOpenCancel = () => {
    setOpenMobel(false)

  }

  const openMobelClick = (data) => {
    setOpenMobel(true)
    const code = `curl 'https://api.ioii.cn/v1/service/apiAppGenerate' \\
  -H 'accept: */*' \\
  -H 'accept-language: zh-CN,zh;q=0.9' \\
  -H 'authorization: Bearer sk-NMIpYw8Trr4j1PeqEwPomSLSIRG8iKiCDsZL9q9iElnai83E' \\
  -H 'content-type: application/json' \\
  -H 'sec-ch-ua: "Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"' \\
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36' \\
  --data-raw '{"appId":"${data?.appId}","dialogId":3807,"message":"你想问的","paramsList":[],"model":"gpt-3.5-turbo"}'`


    setDrawerFooterDom(<>
      <div className='flex justify-between'>
        <div></div>
        <div>
          <Button className='mr-[6px]' onClick={() => copyValue(code)}>复制</Button>

          <Button onClick={handleOpenCancel}>关闭</Button>
        </div>


      </div>
    </>)
    setMobelCodeDom(<>
      <div>

        <div className='font-medium	pb-[8px]'>代码示例</div>

        <CodeEdit defaultValue={code} />

      </div>

    </>)
  }


  const handelDetailDrawer = (data) => {
    setCreateOpen(true)
    setDrawerTitle(DRAWER_TITLE.DETAIL)
    const code = `curl 'https://api.ioii.cn/v1/service/apiAppGenerate' \\
  -H 'accept: */*' \\
  -H 'accept-language: zh-CN,zh;q=0.9' \\
  -H 'authorization: Bearer sk-NMIpYw8Trr4j1PeqEwPomSLSIRG8iKiCDsZL9q9iElnai83E' \\
  -H 'content-type: application/json' \\
  -H 'sec-ch-ua: "Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"' \\
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36' \\
  --data-raw '{"appId":"${data?.appId}","dialogId":3807,"message":"你想问的","paramsList":[],"model":"gpt-3.5-turbo"}'`


    setDrawerFooterDom(<>
      <div className='flex justify-between'>
        <div></div>
        <div>
          <Button className='mr-[6px]' onClick={() => copyValue(code)}>复制</Button>

          <Button onClick={headerColseCreate}>关闭</Button>
        </div>


      </div>
    </>)

    setDrawerDom(
      <>
        <div className='mb-[16px]'>
          <div className='font-medium	pb-[8px]'>模版名称</div>
          <div>{data?.name}</div>
        </div>
        <div className='mb-[16px]'>

          <div className='font-medium	pb-[8px]'>模版所属类别</div>
          <div>{data?.cName}</div>
        </div>
        <div className='mb-[16px]'>

          <div className='font-medium	pb-[8px]'> 模版内容</div>
          <div>{data?.desc}</div>
        </div>
        <div className='mb-[16px]'>

          <div className='font-medium	pb-[8px]'> Prompt</div>
          <div>{data?.prompt}</div>
        </div>
        <div className='mb-[16px]'>

          <div className='font-medium	pb-[8px]'>模版ID</div>
          <div>
            {data?.appId}
            <button
              onClick={() => copyValue(data?.appId)}
              type="button"
              className="inline-flex items-center px-2.5 border border-transparent text-sm  font-medium "
            >
              <FaRegCopy color="black" size={14} />
            </button>
          </div>
        </div>

        <div>
          {/* <Markdown code={code} placeholder="```// 构建代码将出现在这里 ```">
          </Markdown> */}
          <div className='font-medium	pb-[8px]'>代码示例</div>

          <CodeEdit defaultValue={code} />

        </div>

      </>
    )
  }

  const headerColseCreate = () => {
    setCreateOpen(false)

  }

  const handleAppListaData = (e) => {
    setAppListLoading(true)

    setAppListPage(e)
  }


  const handelModel = async (e) => {
    setAppListLoading(true)

    setMobelType(e.target.value);
    if (e.target.value === 1) {
      getAppListData({
        cid: appListCid,
        filterType: 1,
        keywords: "",
        page: appListPage,
        pageSize: 9,
        type: ""
      })
    } else {
      getUserData()
    }
  }





  const removeItems = async (e, itemsId) => {
    if (e?.key === '0') {
      copyValue(itemsId?.desc)
      message.success('复制成功')
    } else {
      setAppListLoading(true)

      const res = await deleteApp({
        appId: itemsId?.appId
      })
      if (res?.code === 0) {
        message.success('删除成功')
        getUserData()
      }
    }

  }

  const handleCitChange = (e) => {
    setAppListCid(e.target.value)
    setAppListLoading(true)

  }

  const tabList = map([{ label: '全部', cid: '' }, ...cateList], obj => {
    return mapKeys(obj, (value, key) => {
      if (key === 'cid') {
        return 'value'
      } else {
        return key
      }
    })
  })

  const onSearchChange = async event => {
    setAppListSearch(event?.target?.value)
    // getClientApplist({
    //   propsType: attrValue,
    //   propsCid: cid,
    //   propsSearch: event?.target?.value,
    //   filterType: sortValue
    // })
  }



  return (
    <div>
      <div className='tab-header flex  justify-between mb-[12px]'>
        <Radio.Group onChange={handelModel} value={modelType}>
          <Radio.Button value={1}>系统模版</Radio.Button>
          <Radio.Button value={2}>自定义模版</Radio.Button>
        </Radio.Group>
        <div className='mb-[12px] flex '>
          <Input
            onChange={debounce(onSearchChange, 500)}
            type="text"
            placeholder="搜索你需要的应用"
            className='mr-[10px]'
            required
            allowClear
          />
          <Button type="primary" onClick={handelCreateDrawer}>新增模版</Button>

        </div>
      </div>
      {
        modelType === 1 &&
        <div className='mb-[12px]'>
          <Radio.Group onChange={handleCitChange} value={appListCid}>
            {
              tabList?.map((item) => {
                return (<Radio key={item?.value} value={item?.value}>{item?.label}</Radio>)
              })
            }


          </Radio.Group>
        </div>
      }

      <div>

      </div>
      <Spin className='h-[calc(100vh_-_384px)] ' spinning={appListLoading}>
        <div className='template flex flex-wrap  gap-4 pb-[30px]'>
          {
            appList?.recordList?.length > 0 ? (
              <>
                {
                  appList?.recordList?.map((items) => {
                    return (
                      <div key={items?.appId} className='templateCard  w-[calc(33.33%_-_11px)]  bg-[#fff] rounded-xl px-[20px] py-[20px] pb-[10px] w-[32.5%]	relative	'>
                        {/* <span className='absolute top-0 left-5 text-xs text-slate-500'>{items?.cName}</span> */}

                        <div className='templateContent flex items-start gap-4'>
                          <div className='content'>

                            <img className='mt-[4px]' src="https://img.alicdn.com/imgextra/i2/O1CN01enEjUH1w4NvLmVzTZ_!!6000000006254-55-tps-40-40.svg" />
                          </div>
                          <div className='content flex-1'>
                            <div className='flex justify-between items-center md-[6px]'>
                              <span className='text-base font-medium	'>{items?.name}</span>
                              <div className='text-base'>
                                <Dropdown
                                  menu={
                                    {
                                      items: modelType === 1 ? APP_DROPDOWN : USER_DROPDOWN,
                                      onClick: (e) => removeItems(e, items)
                                    }
                                  }
                                  trigger={['click']}

                                >
                                  <MoreOutlined />

                                </Dropdown>
                              </div>
                            </div>
                            <Tooltip color="#fff" overlayInnerStyle={{ color: 'black', width: '300px', fontSize: '13px', padding: '14px' }} placement='bottom' title={items?.desc}>

                              <div className='line-clamp-3	text-xs text-slate-500 min-h-[44px]'>
                                {items?.prompt}
                              </div>
                            </Tooltip>

                          </div>
                        </div>
                        <div className='flex items-center pt-[8px] mt-[12px] border-solid border-t border-slate-100	]'>
                          <span className='flex flex-1 justify-center cursor-pointer hover:text-[#1677ff]' onClick={() => handelDetailDrawer(items)} >
                            <PieChartOutlined className='mr-[2px]' />
                            查看详情
                          </span>
                          <div className='border-solid  border-l border-[#dedede] h-[0.9em] ant-divider-vertical'></div>
                          <span className='flex flex-1 justify-center cursor-pointer hover:text-[#1677ff]' onClick={() => openMobelClick(items)}>调用</span>
                          <div className='border-solid  border-l border-[#dedede] h-[0.9em] ant-divider-vertical'></div>
                          <span className='flex flex-1 justify-center cursor-pointer hover:text-[#1677ff]' onClick={() => { router.push(`/prompt/${items?.appId}`) }}>对话</span>

                        </div>

                      </div>
                    )
                  })
                }
                {appList?.recordList?.length > 0 && appList?.total && <div className='w-full flex justify-center mt-[30px]'>
                  <Pagination defaultCurrent={1} defaultPageSize={9} onChange={handleAppListaData} total={appList?.total} showSizeChanger={false} />

                </div>}
              </>
            ) : (
              <>
                {
                  !appListLoading && <div className='w-text-[12px] text-[#878aab] text-center w-full	mt-[30px]'>暂无模版</div>

                }
              </>

            )
          }


        </div>


      </Spin>
      <Drawer
        title={drawerTitle}
        placement="right"
        open={createOpen}
        footer={drawerFooterDom}
        onClose={headerColseCreate}
        width={'600'}
      // footer="Footer"
      // onClose={() => toggleDrawer(1, false)}
      // open={open[1]}
      >
        {drawerDom}
      </Drawer>
      <Modal
        title="模版调用"
        open={openMobel}
        footer={drawerFooterDom}
        onCancel={handleOpenCancel}
      >
        <p className='mb-[16px]'>调用Prompt，可直接复制cUrl命令请求。</p>
        {mobelCodeDom}
      </Modal>
    </div>
  )
}

export default PromptModel