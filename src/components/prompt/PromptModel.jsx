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
import { color } from 'framer-motion';
import { bg } from 'date-fns/locale';
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

const TAG_COLOR = {
  1: {
    color: '#1c67e1',
    bg: '#e9f0fc'
  },
  2: {
    color: '#a27851',
    bg: '#f6f1ee'
  },
  3: {
    color: '#0edc5e',
    bg: '#e7fbee'
  },
  4: {
    color: '#688653',
    bg: '#eff3ec'
  },
  5: {
    color: '#70d024',
    bg: '#f1fbeb'
  },
  6: {
    color: '#03487b',
    bg: '#e7ecf2'
  },
  7: {
    color: '#c780bc',
    bg: '#f9f2f8'
  },
  8: {
    color: '#102fc5',
    bg: '#e6ebf9'
  },
  9: {
    color: '#97c1cf',
    bg: '#f4f9fa'
  },
  10: {
    color: '#d43117',
    bg: '#fcece8'
  }
}

const PromptModel = (props) => {
  const router = useRouter()

  const { appList, setAppList, appListLoading, appListPage, setAppListLoading, setAppListPage, getAppListData, cateList, setAppListCid, appListCid, appListSearch, setAppListSearch } = props
  const [modelType, setMobelType] = useState(1)
  const [createOpen, setCreateOpen] = useState(false)
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
    }else if(res.code === 40001){
      setAppListLoading(false)
      setAppList([])
      message.error("请先登录")
    }
  }

  const handleCreateApp = async () => {
    const params = form.getFieldsValue()
    console.log(params, 'params')
    console.log(isEmpty(params.name), 'isEmpty(params.name)')

    if (isEmpty(params.name)) {
      message.error('请输入模板名称')
      return
    } else if (isEmpty(params.desc)) {
      message.error('请输入模版内容')
      return
    }

    const res = await createApp(params)
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
    const code = `curl 'https://api.agicto.cn/v1/service/apiAppGenerate' \\
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
    // https://api.agicto.cn/
    const code = `curl 'https://api.agicto.cn/v1/service/apiAppGenerate' \\
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
          <div>
            {data?.prompt}
            <button
              onClick={() => copyValue(data?.prompt)}
              type="button"
              className="inline-flex items-center px-2.5 border border-transparent text-sm  font-medium "
            >
              <FaRegCopy color="black" size={14} />
            </button>
          </div>
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
        pageSize: 12,
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
    if(appListPage!==1)setAppListPage(1)
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
  const getRandomIntegerFromArray = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  }
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div>
      <div className='tab-header flex  justify-between mb-[12px]'>
        <Radio.Group onChange={handelModel} value={modelType}>
          <Radio.Button value={1}>系统模版</Radio.Button>
          <Radio.Button value={2}> 自定义模版</Radio.Button>
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
                      <div key={items?.appId} className='templateCard  w-[calc(33.33%_-_11px)]  bg-[#fff] rounded-xl px-[16px] pt-[16px] pb-[10px] w-[24%] min-h-[240px]	relative	flex flex-col max-w-full overflow-hidden'>
                        {/* <span className='absolute top-0 left-5 text-xs text-slate-500'>{items?.cName}</span> */}
                        <div className='templateContent flex items-start gap-4 flex-1 max-w-full'>
                          {/* <div className='content'>
                            <img className='mt-[4px]' src="https://img.alicdn.com/imgextra/i2/O1CN01enEjUH1w4NvLmVzTZ_!!6000000006254-55-tps-40-40.svg" />
                          </div> */}
                          <div className='content flex-1 flex flex-col max-w-full overflow-hidden'>
                            <div className='flex justify-between items-center mb-[8px]'>
                              <span className='text-base font-medium	leading-[22px] text-[18px] max-w-[200px] line-clamp-1'>{items?.name}</span>
                              <div
                                className='text-[10px] text-[#140E3580] flex items-center border-solid border border-[#140E351A] p-[4px] rounded'
                                onClick={() => {
                                  copyValue(items.prompt)
                                  message.success('复制成功')
                                }} >
                                <svg className='icon' xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" viewBox="0 0 12 12" version="1.1">
                                  <title>复制</title>
                                  <g id="prompt" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.5">
                                    <g id="Prompt工程" transform="translate(-323.000000, -328.000000)" fill="#140E35" fill-rule="nonzero">
                                      <g id="Group-4" transform="translate(120.000000, 306.000000)">
                                        <g id="Group-6" transform="translate(199.000000, 16.000000)">
                                          <g id="复制" transform="translate(4.000000, 6.000000)">
                                            <path d="M4.2631579,0 L10.8947369,0 C11.5051568,0 12,0.494843171 12,1.10526315 L12,7.7368421 C12,8.34726209 11.5051568,8.84210527 10.8947369,8.84210527 L4.2631579,8.84210527 C3.65273791,8.84210527 3.15789473,8.34726209 3.15789473,7.7368421 L3.15789473,1.10526315 C3.15789473,0.494843165 3.65273791,0 4.2631579,0 Z M4.2631579,0.947368422 C4.17595505,0.947368422 4.10526316,1.0180603 4.10526316,1.10526315 L4.10526316,7.7368421 C4.10526316,7.82404496 4.17595504,7.89473684 4.2631579,7.89473684 L10.8947369,7.89473684 C10.9819397,7.89473684 11.0526316,7.82404495 11.0526316,7.7368421 L11.0526316,1.10526315 C11.0526316,1.0180603 10.9819397,0.947368422 10.8947369,0.947368422 L4.2631579,0.947368422 Z M7.89473684,9.78947369 C7.89473684,9.52786512 8.10681249,9.31578948 8.36842105,9.31578948 C8.63002962,9.31578948 8.84210527,9.52786512 8.84210527,9.78947369 L8.84210527,10.8947369 C8.84210527,11.5051568 8.34726209,12 7.7368421,12 L1.10526315,12 C0.494843171,12 0,11.5051568 0,10.8947369 L0,4.2631579 C0,3.65273791 0.494843165,3.15789473 1.10526315,3.15789473 L2.21052631,3.15789473 C2.47213488,3.15789473 2.68421052,3.36997038 2.68421052,3.63157895 C2.68421052,3.89318751 2.47213488,4.10526316 2.21052631,4.10526316 L1.10526315,4.10526316 C1.0180603,4.10526316 0.947368422,4.17595505 0.947368422,4.2631579 L0.947368422,10.8947369 C0.94736843,10.9819397 1.0180603,11.0526316 1.10526315,11.0526316 L7.7368421,11.0526316 C7.82404495,11.0526316 7.89473684,10.9819397 7.89473684,10.8947369 L7.89473684,9.78947369 Z" id="Shape" />
                                          </g>
                                        </g>
                                      </g>
                                    </g>
                                  </g>
                                </svg>
                                <span className='ml-[4px]'>复制promt</span>
                                {/* <Dropdown
                                  menu={
                                    {
                                      items: modelType === 1 ? APP_DROPDOWN : USER_DROPDOWN,
                                      onClick: (e) => removeItems(e, items)
                                    }
                                  }
                                  trigger={['click']}

                                >
                                  <MoreOutlined />

                                </Dropdown> */}
                              </div>
                            </div>
                            <div className='flex items-center text-[12px] text-[#140E3580] leading-[17px]'>
                              {
                                items.viewNum && <div className='flex items-center mr-[8px]'>
                                  <svg className='icon' xmlns="http://www.w3.org/2000/svg" width="12px" height="9px" viewBox="0 0 12 9" version="1.1">
                                    <title>查看</title>
                                    <g id="prompt" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.5">
                                      <g id="Prompt工程" transform="translate(-136.000000, -359.000000)" fill-rule="nonzero">
                                        <g id="Group-4" transform="translate(120.000000, 306.000000)">
                                          <g id="查看" transform="translate(16.000000, 53.000000)">
                                            <path d="M12,4.40130686 C12,4.32924701 11.9878182,4.26897128 11.9843566,4.2617977 C11.9817346,4.22609185 11.9695528,4.16101409 11.9582253,4.12685489 C11.9551909,4.1183556 11.951258,4.10944387 11.9477964,4.10094457 C11.9416834,4.08135349 11.9351727,4.06220431 11.9277781,4.04697334 C10.8212353,1.62669352 8.43885613,0 6.00031096,0 C3.56220768,0 1.18003474,1.62519105 0.0785148755,4.03237577 C0.0652430179,4.05850704 0.0558746452,4.08353354 0.049997322,4.1053047 C0.0473900901,4.11247827 0.0443409422,4.11922467 0.0419546683,4.12554391 C0.0201835153,4.18932542 0.0197563539,4.23370732 0.0214945085,4.22217364 C0.0112717843,4.26897129 0.00190342611,4.36212469 0.00190342611,4.36212469 C-0.000703805798,4.3901856 -0.000703805798,4.41260488 0.00234532763,4.44047431 C0.00234532763,4.44047431 0.0116989601,4.52187306 0.0162800447,4.53840028 C0.0175762978,4.56146769 0.0232326775,4.59499348 0.0299790781,4.62547014 L0.0295371766,4.62547014 C0.0354144999,4.65158668 0.0434718937,4.67683414 0.0545636808,4.70163969 C0.0602347863,4.72078887 0.0669811869,4.7386418 0.0728585102,4.75213461 C1.18090381,7.17282686 3.56264958,8.7999623 6.00031096,8.7999623 C8.43929805,8.7999623 10.8216772,7.17415258 11.9155963,4.77912023 C11.9325507,4.74777449 11.943451,4.71818164 11.9508455,4.69249227 C11.9543218,4.68467056 11.9573857,4.67770322 11.959551,4.67073586 C11.978715,4.61499701 11.9826185,4.56669688 11.9808803,4.56669688 L11.9804678,4.56712406 C11.9882748,4.52841323 12,4.47052379 12,4.40130686 Z M11.1921107,4.4308997 C11.1916836,4.43265258 11.1907998,4.43481792 11.1899307,4.43657081 C11.1886344,4.44178527 11.1864691,4.44788355 11.1851434,4.45398184 C10.2004925,6.57604997 8.12152472,7.9999242 6.00031094,7.9999242 C3.88432636,7.9999242 1.80904115,6.57999765 0.814594677,4.45050553 C0.812193663,4.44311099 0.810455508,4.43612891 0.807848276,4.42917629 C0.807406375,4.42220893 0.806110122,4.41655257 0.805682946,4.41261962 C0.804813869,4.40828895 0.803944791,4.40219067 0.803281932,4.39694674 L0.803281932,4.39151132 C0.805682946,4.38258485 0.807406375,4.37367312 0.808290178,4.36387759 C0.810028332,4.35866312 0.811339311,4.35365486 0.813298424,4.3479985 C1.7983618,2.22482559 3.87908244,0.800303225 6.00029622,0.800303225 C8.12236435,0.800303225 10.2026725,2.22612184 11.1847015,4.34602464 C11.1855706,4.35016381 11.1864544,4.35365486 11.1877654,4.35648304 C11.1886344,4.35995935 11.1894888,4.3634504 11.1912269,4.36714766 C11.193407,4.38304148 11.1951452,4.39871435 11.1973252,4.40653606 C11.194718,4.41479967 11.1934217,4.42263611 11.1921107,4.4308997 Z" id="Shape" fill="#140E35" />
                                            <path d="M6.00029622,2.40001115 C4.89768633,2.40001115 4.00009053,3.29716504 4.00009053,4.39999588 C4.00009053,5.50260576 4.89768633,6.40020157 6.00029622,6.40020157 C7.1029061,6.40020157 8.00050191,5.50260576 8.00050191,4.39999588 C8.00050191,3.29716504 7.1029061,2.40001115 6.00029622,2.40001115 Z M6.00029622,5.60011928 C5.33907497,5.60011928 4.80018753,5.06165903 4.80018753,4.4000106 C4.80018753,3.7385684 5.33907497,3.20012288 6.00029622,3.20012288 C6.66194464,3.20012288 7.20043436,3.73858314 7.20043436,4.4000106 C7.20043436,5.06165903 6.66194464,5.60011928 6.00029622,5.60011928 Z" id="Shape" fill="#272536" />
                                          </g>
                                        </g>
                                      </g>
                                    </g>
                                  </svg>
                                  <span className='ml-[2px] '>{items.viewNum}</span>
                                </div>
                              }
                              {
                                items.praiseNum && <div className='flex items-center mr-[8px]'>
                                  <svg className='icon' xmlns="http://www.w3.org/2000/svg" width="12px" height="11px" viewBox="0 0 12 11" version="1.1">
                                    <title>喜欢</title>
                                    <g id="prompt" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.5">
                                      <g id="Prompt工程" transform="translate(-189.000000, -359.000000)" fill="#140E35" fill-rule="nonzero">
                                        <g id="Group-4" transform="translate(120.000000, 306.000000)">
                                          <g id="喜欢" transform="translate(69.000000, 53.074512)">
                                            <path d="M5.99785022,10.0007166 C5.63668934,10.0007166 5.27337871,9.84163381 4.9143676,9.4826227 L0.928699381,5.45180938 C0.45145109,4.8563239 0,4.29308491 0,3.20100323 C0,1.43604443 1.43604443,0.00214977822 3.19885345,0.00214977822 C3.86313148,0.00214977822 4.49946255,0.204227881 5.0390541,0.584736665 C5.21963453,0.71157293 5.26262987,0.960945904 5.13579362,1.14152635 C5.00895735,1.32210678 4.75958438,1.36510212 4.57900393,1.23826587 C4.17484771,0.952346841 3.69759942,0.801863153 3.19885345,0.801863153 C1.87459691,0.801863153 0.799713362,1.87889647 0.799713362,3.20100324 C0.799713362,3.96847009 1.05338588,4.3274812 1.53923325,4.93371553 L5.48405589,8.91723398 C5.68398423,9.11716231 5.84521677,9.1967037 6,9.19885346 C6.15908276,9.20100323 6.31171623,9.12146184 6.51809388,8.9150842 L10.4758151,4.91651737 C10.80043,4.56395557 11.2002866,3.96847008 11.2002866,3.19885346 C11.2002866,1.87459692 10.1232533,0.799713375 8.80114654,0.799713375 C8.20136151,0.799713375 7.62522394,1.02328915 7.18237191,1.42744537 L5.50770334,3.10426371 C5.35077034,3.2611967 5.09924759,3.2611967 4.94231459,3.10426371 C4.78538159,2.94733071 4.78538159,2.69580796 4.94231459,2.53887496 L6.62988177,0.849158011 C7.23396633,0.29666787 8.00143319,0 8.80114655,0 C10.5661053,0 12,1.43604443 12,3.19885345 C12,4.22859189 11.4862057,5.00250805 11.0541025,5.46900752 L7.08348261,9.48047295 C6.72232173,9.84163381 6.36116087,10.0007166 5.99785022,10.0007166 Z" id="Path" />
                                          </g>
                                        </g>
                                      </g>
                                    </g>
                                  </svg>
                                  <span className='ml-[2px] '>{items.praiseNum}</span>
                                </div>
                              }
                              {
                                items.collectNum && <div className='flex items-center mr-[8px]'>
                                  <svg className='icon' xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" viewBox="0 0 12 12" version="1.1">
                                    <title>收藏 (1)</title>
                                    <g id="prompt" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.5">
                                      <g id="Prompt工程" transform="translate(-232.000000, -358.000000)" fill="#140E35" fill-rule="nonzero">
                                        <g id="Group-4" transform="translate(120.000000, 306.000000)">
                                          <g id="收藏-(1)" transform="translate(112.000000, 52.000000)">
                                            <path d="M11.9761695,4.34195598 C11.9189447,4.1658303 11.7666897,4.03746685 11.583425,4.01084014 L8.02680898,3.49404212 L6.43624303,0.271206774 C6.35429372,0.105139138 6.18516708,0 5.99998029,0 C5.8147935,0 5.64566686,0.105139138 5.56371755,0.271206774 L3.9731516,3.49405744 L0.416535552,4.01085545 C0.233288108,4.03750258 0.0810537956,4.16586138 0.0238290694,4.34197222 C-0.0333956568,4.51808305 0.0143114238,4.71140998 0.146895147,4.84068199 L2.72050146,7.34932099 L2.11296056,10.891556 C2.08164274,11.074079 2.15666977,11.2585532 2.30649201,11.3674052 C2.45631424,11.4762572 2.65494424,11.4906061 2.81885604,11.404418 L5.99998795,9.73200732 L9.18111985,11.404418 C9.28702485,11.4603179 9.53113472,11.4732754 9.69347644,11.3673857 C9.84794612,11.2666266 9.91831972,11.0740832 9.88701534,10.891556 L9.27947443,7.34932099 L11.8530654,4.84068199 C11.9856787,4.71142073 12.0334027,4.51807839 11.9761695,4.34195598 Z M8.41714892,6.83109866 C8.30248586,6.9428659 8.25016188,7.10389846 8.27722874,7.26171772 L8.76135931,10.0844726 L6.22636275,8.75173902 C6.15654865,8.71502723 6.0788508,8.69585244 5.99997263,8.69586896 C5.92109514,8.69585796 5.84339859,8.71503243 5.77358251,8.75173902 L3.23858596,10.0844726 L3.72271653,7.26171772 C3.74978727,7.10390105 3.69746915,6.9428689 3.58281166,6.83109866 L1.53194568,4.83199824 L4.36615639,4.42017099 C4.52461688,4.39714987 4.66160183,4.29762702 4.7324667,4.15403778 L5.99998795,1.58579181 L7.26749388,4.15402247 C7.33835577,4.29760766 7.47533407,4.39712983 7.63378887,4.42015568 L10.4680149,4.83198292 L8.41714892,6.83109866 Z" id="Shape" />
                                          </g>
                                        </g>
                                      </g>
                                    </g>
                                  </svg>
                                  <span className='ml-[2px] '>{items.collectNum}</span>
                                </div>
                              }
                            </div>
                            {/* <Tooltip color="#fff" overlayInnerStyle={{ color: 'black', width: '300px', fontSize: '13px', padding: '14px' }} placement='bottom' title={items?.desc}>

                              <div className='line-clamp-3	text-xs text-slate-500 min-h-[44px]'>
                                {items?.prompt}
                              </div>
                            </Tooltip> */}
                            <div className='line-clamp-4	text-[14px] text-[#140E35CC] min-h-[44px] mt-[8px] mb-[4px] flex-1 leading-[20px] max-w-full'>
                              {items?.prompt || "暂无prompt"}
                            </div>
                            <div className='content flex flex-wrap w-full'>
                              {
                                items?.tagList?.map((item) => {
                                  const randomNumber = getRandomIntegerFromArray(numbers);
                                  return (
                                    <div key={item.id} className={`flex items-center justify-center py-[2px] px-[10px] rounded mr-[5px] mt-[8px]`} style={{ backgroundColor: TAG_COLOR[randomNumber].bg }}>
                                      <span className={`block rounded-[100px] w-[6px] h-[6px]`} style={{ backgroundColor: TAG_COLOR[randomNumber].color }}></span>
                                      <span className={`text-sm text-nowrap ml-[6px]`} style={{ color: TAG_COLOR[randomNumber].color }}>{item.name}</span>
                                    </div>
                                  )
                                })
                              }
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center pt-[10px] mt-[12px] border-solid border-t border-slate-100	text-[#140E35FF]">
                          <span className='flex flex-1 justify-center cursor-pointer hover:text-[#1677ff]' onClick={() => handelDetailDrawer(items)} >
                            <PieChartOutlined className='mr-[2px]' />
                            <span className='ml-[4px]'>查看详情</span>
                          </span>
                          {/* <div className='border-solid  border-l border-[#dedede] h-[0.9em] ant-divider-vertical'></div>
                          <span className='flex flex-1 justify-center cursor-pointer hover:text-[#1677ff]' onClick={() => openMobelClick(items)}>调用</span> */}
                          <div className='border-solid  border-l border-[#dedede] h-[1em] ant-divider-vertical'></div>
                          <span className='flex flex-1 justify-center cursor-pointer hover:text-[#1677ff]' onClick={() => { router.push(`/prompt/${items?.appId}`) }}>对话</span>

                        </div>

                      </div>
                    )
                  })
                }
                {appList?.recordList?.length > 0 && appList?.total && <div className='w-full flex justify-center mt-[30px]'>
                  <Pagination defaultCurrent={1} current={appListPage} defaultPageSize={12} onChange={handleAppListaData} total={appList?.total} showSizeChanger={false} />

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
