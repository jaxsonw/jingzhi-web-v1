"use client";
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { getServerModelFilterList, getServerModelList } from '../../services/overflow'
import { Col, Row } from 'antd'
import { copyValue } from '@/src/utils';
import { LoadingSkeleton } from '@/src/components/common/LoadingSkeleton'

const TagListComponent = (props) => {
  const { list, title } = props
  const onChange = (value) => {
    props.setCurrent(value)
  }
  return (
    <section className="flex w-full items-start pt-[5px]">
      <span className="text-[16px] flex items-center pt-[8px] whitespace-nowrap text-[#383258]">{title}:</span>
      <div className="flex flex-wrap">
        {/*140E35*/}
        {
          list?.map((item) => {
            return (
              <div
                key={item.value}
                onClick={() => onChange(item.value)}
                className={`my-1 whitespace-nowrap cursor-pointer py-[5px] px-[12px] mx-[8px] text-[14px] rounded-md ${props.current === item.value ? 'bg-[#3162FF] text-[#fff] hover:text-[#fff]' : 'bg-[#F4F5FE] text-[#140E35] hover:text-[#3162FF]'}`}
              >{item.name}</div>
            )
          })
        }
      </div>
    </section>
  )
}

const ModelCard = (props) => {
  return (
    <Link
      href={`/${encodeURIComponent(props?.modelName)}`}
      onClick={(e) => {
        e.preventDefault()
        return false
      }}
    >
      <div
        className="relative group shadow-xs cursor-pointer transition duration-150 ease-out hover:bg-gradient-to-b hover:from-[#c5d2fd] hover:to-[#FFFFFF] shadow-indigo-500/40 p-[20px] bg-[#fff] rounded-[12px] h-[220px] text-[#000]">
        {props.isFree === 1 && <div
          className="absolute top-0 right-0 w-[80px] text-[#fff] text-[14px] pl-[14px] pr-[10px] py-[8px] rounded-tr-[12px] rounded-bl-[12px]"
          style={{
            background: 'linear-gradient(135deg, #46AD76 0%, #46CA92 100%)'
          }}
        >免费使用</div>}
        <div className='flex items-center pb-[8px]'>
          <h4 className="text-[#140E35] text-[20px]">{props.modelName}</h4>
          <div
            className='cursor-pointer ml-[10px] flex items-center rounded-md border border-solid border-green-500 text-green-500 px-[4px] py-[2px] text-[12px]'
            onClick={(e) => {
              e.preventDefault()
              copyValue(props.modelName)
              message.success('复制成功')
              return false
            }} >
            <svg className='icon' xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" viewBox="0 0 12 12" version="1.1">
              <title>复制</title>
              <g id="prompt" stroke="none" strokeWidth="1" fill="#000088" fillRule="evenodd" fillOpacity="0.5">
                <g id="Prompt工程" transform="translate(-323.000000, -328.000000)" fill="#008800" fillRule="nonzero">
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
            <span className='ml-1'>复制</span>
          </div>
        </div>
        <div className="flex items-center pb-[18px]">
          <span className="block p-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">支持{props.typeName}</span>
          <span
            className="block p-[5px] ml-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">上下文长度: {props.contextLen} tokens</span>
        </div>
        <div className="flex items-center pb-[18px]">
          <div>
            <div className="flex items-end">
              <span className="text-[12px]">￥</span>
              <span className="text-2xl  ml-[4px] font-bold leading-[25px]">{props.inputPrice}</span>
              <span
                className="flex mb-[2px] ml-[4px] w-[34px] justify-center bg-[#eaefff] rounded-[2px] text-[12px] text-[#3162FF] items-center border border-[#3162FF] border-solid">输入</span>
            </div>
            <span className="text-[12px] text-[#140E35]">/ 百万tokens</span>
          </div>
          <div className="ml-[24px]">
            <div className="flex items-end">
              <span className="text-[12px]">￥</span>
              <span className="text-2xl ml-[4px] font-bold leading-[25px]">{props.outputPrice}</span>
              <span
                className="flex mb-[2px] ml-[4px] w-[34px] justify-center bg-[#feeded] rounded-[2px] text-[12px] text-[#F24B42] items-center border border-[#F24B42] border-solid">输出</span>
            </div>
            <span className="text-[12px] text-[#140E35]">/ 百万tokens</span>
          </div>
        </div>
        <div className="flex group-hover:hidden items-center pt-[10px] border-t border-solid border-[#D3D7FA]	">
          {props.icon && <img className="w-[20px] rounded-full mr-[10px]" src={props.icon} alt="" />}
          <span className="text-[12px] text-[#140E35]">{props.companyName}</span>
        </div>
        <div className="btn  transition duration-150 ease-out hidden group-hover:flex items-center justify-between">
          <Link
            href={`/${encodeURIComponent(props?.modelName)}`}
            className="flex-1 py-[10px] transition duration-150 ease-out hover:opacity-65 rounded-[8px] flex items-center justify-center text-[#333] bg-[#EEEEEE]">
            <div>
              查看详情
            </div>
          </Link>
          <Link className="text-[#fff] ml-[12px] flex-1 transition duration-150 ease-out hover:opacity-65 py-[10px] rounded-[8px] flex items-center justify-center bg-[#3162FF]"
            href={`/`}>
            <div>
              立即体验
            </div>
          </Link>
        </div>
      </div>
    </Link>
  )
}

const Model = (props) => {
  const [typeData, setTypeData] = useState({ cateList: [], companyList: [] })
  const [queryParams, setQueryParams] = useState({ companyId: 0, typeId: 0, freeType: 0 })
  const [modelDataRes, setModelDataRes] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (typeData.cateList.length === 0 && typeData.companyList.length === 0) {
      getServerModelFilterList().then(res => {
        setTypeData(res?.data)
      })
    }
    getServerModelList({
      ...queryParams,
      companyId: queryParams.companyId === 0 ? null : queryParams.companyId,
      typeId: queryParams.typeId === 0 ? null : queryParams.typeId
    }).then(res => {
      setModelDataRes(res?.data?.recordList)
      setTotal(res?.data?.total)
      setLoading(false)
    })
  }, [queryParams])

  const modalPriceTag = {
    title: '模型价格',
    current: queryParams.freeType,
    setCurrent: (v) => setQueryParams({ ...queryParams, freeType: v }),
    list: [
      {
        name: '全部',
        value: 0,
        link: ''
      },
      {
        name: '收费',
        value: 1,
        link: ''
      },
      {
        name: '免费',
        value: 2,
        link: ''
      }
    ]
  }
  const handleList = (list, fn) => {
    if (!list || list.length === 0) return []
    return fn(list)
  }
  return (
    <div>
      <div className="overflow-auto pb-[100px] pt-[104px] lg:px-16 bg-[#F4F5FE]">
        <title>模型广场</title>
        {
          loading ?
            <LoadingSkeleton />
            :
            <>
              <TagListComponent {...modalPriceTag} />
              {/* <TagListComponent {...{
                title: '使用场景',
                current: queryParams.typeId,
                setCurrent: (v) => setQueryParams({ ...queryParams, typeId: v }),
                list: handleList(typeData.cateList, (list) => [{
                  name: '全部',
                  value: 0
                }].concat(list.map(item => ({ name: item.cateName, value: item.cateId }))))
              }} /> */}
              <TagListComponent {...{
                title: '提供公司',
                current: queryParams.companyId,
                setCurrent: (v) => setQueryParams({ ...queryParams, companyId: v }),
                list: handleList(typeData.companyList, (list) => [{
                  name: '全部',
                  value: 0
                }].concat(list.map(item => ({ name: item.companyName, value: item.companyId }))))
              }} />
              <div className="mt-[60px]">
                <Row gutter={[16, 16]}>
                  {
                    modelDataRes && modelDataRes.length > 0 ? modelDataRes?.map((item, index) => {
                      return (
                        // eslint-disable-next-line react/jsx-key
                        <Col lg={8} xs={24} md={12} key={"modelitem" + index}>
                          <ModelCard {...item} />
                        </Col>
                      )
                    }) : <div className="text-center text-[#999] w-full">暂无数据~</div>
                  }
                </Row>
              </div>
            </>
        }
      </div>
    </div>
  )
}


export default Model;
