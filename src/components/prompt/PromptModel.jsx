"use client";

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Radio, Button, Checkbox, Spin, Dropdown, Input, Tooltip, Pagination, Drawer, Form, message, Row, Col } from 'antd'
import { getUserAppList, createApp, deleteApp } from '../../services/promptService'
import { isEmpty } from 'lodash'

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
  key: '0'
}]

const USER_DROPDOWN = [{
  label: '复制',
  key: '0'
}, {
  label: '删除',
  key: '1'
}]



const PromptModel = (props) => {
  const router = useRouter()

  const { appList, setAppList, appListLoading, setAppListLoading, setAppListParams, openMobelClick, getAppListData } = props
  const [modelType, setMobelType] = useState(1)
  const [createOpen, setCreateOpen] = useState(false)
  const [createData, setCreateData] = useState({})
  const [appType, setAppType] = useState(2)

  const { TextArea } = Input
  const [form] = Form.useForm()




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
        router.push(`/prompt/${res?.data?.appId}`)
      }
    } else {
      message.error(res?.message || '创建失败，请稍后重试')
    }
    console.log(res, 'resresresres')

  }


  const handelCreateDrawer = () => {
    setCreateOpen(true)
  }

  const headerColseCreate = () => {
    setCreateOpen(false)

  }

  const drawerFooter = (
    <div className='flex justify-between'>
      <div></div>
      <div>

        <Button className='mr-[6px]' onClick={headerColseCreate}>取消</Button>
        <Button onClick={handleCreateApp}>保存</Button>
      </div>


    </div>
  )

  const handleAppListaData = (e) => {
    console.log(e, 'e')
    setAppListLoading(true)

    setAppListParams({
      cid: "",
      filterType: 1,
      page: e,
      pageSize: 9,
      search: ""

    })
  }

  const handelModel = async (e) => {
    setAppListLoading(true)

    setMobelType(e.target.value);
    if (e.target.value === 1) {
      getAppListData()
    } else {
      const res = await getUserAppList()
      if (res.code === 0) {
        console.log(res)
        if (res.data.recordList) {
          setAppListLoading(false)

          // setModelList(res.data.recordList.map(item => ({ id: item.apiModelName, name: item.apiModelName })))
          // const defaultValue = res.data.recordList.find(item => item.apiModelName === 'gemma-7b-it')?.apiModelName
          setAppList(res.data)
        }
      }
    }
  }


  const removeItems = async (itemsId) => {
    const res = await deleteApp({
      appId: itemsId
    })
    if (res?.code) {

    }
  }


  console.log(appList, 'appList')
  return (
    <div>
      <div className='tab-header flex  justify-between mb-[12px]'>
        <Radio.Group onChange={handelModel} value={modelType}>
          <Radio.Button value={1}>系统模版</Radio.Button>
          <Radio.Button value={2}>自定义模版</Radio.Button>
        </Radio.Group>
        <div className='mb-[12px]'>
          <Button type="primary" onClick={handelCreateDrawer}>新增模版</Button>

        </div>
      </div>
      {
        modelType === 1 &&
        <div className='mb-[12px]'>
          <Checkbox>全部</Checkbox>

          <Checkbox>文案创作</Checkbox>
          <Checkbox>办公助理</Checkbox>
          <Checkbox>学习助手</Checkbox>
        </div>
      }

      <div>

      </div>
      <Spin className='h-[calc(100vh_-_384px)]' spinning={appListLoading}>
        <div className='template flex flex-wrap  gap-4'>
          {
            appList?.recordList?.length > 0 ? (
              <>
                {
                  appList?.recordList?.map((items) => {
                    return (
                      <div key={items?.appId} className='templateCard  w-[calc(33.33%_-_11px)]  bg-[#fff] rounded-xl px-[20px] py-[20px] pb-[10px] w-[32.5%]		'>
                        <div className='templateContent flex items-start gap-4'>
                          <img className='mt-[4px]' src="https://img.alicdn.com/imgextra/i2/O1CN01enEjUH1w4NvLmVzTZ_!!6000000006254-55-tps-40-40.svg" />
                          <div className='content flex-1'>
                            <div className='flex justify-between items-center md-[6px]'>
                              <span className='text-base font-medium	'>{items?.name}</span>
                              <div className='text-base'>
                                <Dropdown
                                  menu={
                                    {
                                      items: modelType === 1 ? APP_DROPDOWN : USER_DROPDOWN
                                    }
                                  }
                                  trigger={['click']}

                                >
                                  <MoreOutlined onClick={() => removeItems(items?.appId)} />

                                </Dropdown>
                              </div>
                            </div>
                            <Tooltip color="#fff" overlayInnerStyle={{ color: 'black', width: '300px', fontSize: '13px', padding: '14px' }} placement='bottom' title={items?.desc}>

                              <div className='line-clamp-2	text-xs text-slate-500 min-h-[44px]'>
                                {items?.desc}
                              </div>
                            </Tooltip>

                          </div>
                        </div>
                        <div className='flex items-center pt-[8px] mt-[12px] border-solid border-t border-slate-100	]'>
                          <span className='flex flex-1 justify-center cursor-pointer'>
                            <PieChartOutlined className='mr-[2px]' />
                            查看详情
                          </span>

                          <span className='flex flex-1 justify-center cursor-pointer' onClick={openMobelClick}>调用</span>

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
              <div className='text-[12px] text-[#878aab]'>暂无模版</div>
            )
          }


        </div>


      </Spin>
      <Drawer
        title="新建Prompt模版"
        placement="right"
        open={createOpen}
        footer={drawerFooter}
        onClose={headerColseCreate}
        width={'500'}
      // footer="Footer"
      // onClose={() => toggleDrawer(1, false)}
      // open={open[1]}
      >
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
      </Drawer>
    </div>
  )
}

export default PromptModel