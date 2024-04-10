"use client";

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Radio, Button, Checkbox, Spin, Dropdown, Input, Tooltip, Pagination, Drawer, Form, message, Row, Col } from 'antd'
import { getUserAppList, createApp, deleteApp } from '../../services/promptService'
import { isEmpty, mapKeys, map, debounce } from 'lodash'
import { copyValue } from '../../utils/index'

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



const PromptModel = (props) => {
  const router = useRouter()

  const { appList, setAppList, appListLoading, appListPage, setAppListLoading, setAppListPage, openMobelClick, getAppListData, cateList, setAppListCid, appListCid, appListSearch, setAppListSearch } = props
  const [modelType, setMobelType] = useState(1)
  const [createOpen, setCreateOpen] = useState(false)
  const [createData, setCreateData] = useState({})
  const [appType, setAppType] = useState(2)

  const { TextArea } = Input
  const [form] = Form.useForm()


  const getUserData = async () => {
    const res = await getUserAppList()
    if (res.code === 0) {
      if (res.data.recordList) {
        setAppListLoading(false)

        // setModelList(res.data.recordList.map(item => ({ id: item.apiModelName, name: item.apiModelName })))
        // const defaultValue = res.data.recordList.find(item => item.apiModelName === 'gemma-7b-it')?.apiModelName
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
    console.log(e, 'e')
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

                              <div className='line-clamp-2	text-xs text-slate-500 min-h-[44px]'>
                                {items?.desc}
                              </div>
                            </Tooltip>

                          </div>
                        </div>
                        <div className='flex items-center pt-[8px] mt-[12px] border-solid border-t border-slate-100	]'>
                          <span className='flex flex-1 justify-center cursor-pointer' onClick={() => { router.push(`/prompt/${items?.appId}`) }}>
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