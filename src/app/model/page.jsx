"use client";
import React, { Fragment, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getServerModelFilterList, getServerModelList } from '../../services/overflow'
import { Col, Row } from 'antd'

const Loading = () => {
  return (
    <div className="animate-pulse flex space-x-4">
      {/*<div className="h-[50px] bg-slate-300 rounded"></div>*/}
      <div className="flex-1 space-y-6 py-1">
        <div className="flex">
          <div className="h-[20px] w-[100px] bg-slate-200 rounded"></div>
          <div className="h-[20px] w-[80px] ml-[20px] bg-slate-300 rounded"></div>
          <div className="h-[20px] w-[80px] ml-[10px] bg-slate-200 rounded"></div>
        </div>
        <div className="flex">
          <div className="h-[20px] w-[100px] bg-slate-200 rounded"></div>
          <div className="h-[20px] w-[80px] ml-[20px] bg-slate-200 rounded"></div>
          <div className="h-[20px] w-[100px] ml-[10px] bg-slate-200 rounded"></div>
          <div className="h-[20px] w-[70px] ml-[10px] bg-slate-200 rounded"></div>
          <div className="h-[20px] w-[100px] ml-[10px] bg-slate-200 rounded"></div>
          <div className="h-[20px] w-[80px] ml-[10px] bg-slate-200 rounded"></div>
          <div className="h-[20px] w-[80px] ml-[10px] bg-slate-200 rounded"></div>
          <div className="h-[20px] w-[80px] ml-[10px] bg-slate-200 rounded"></div>
          <div className="h-[20px] w-[80px] ml-[10px] bg-slate-200 rounded"></div>
        </div>
        <div className="flex">
          <div className="h-[20px] w-[100px] bg-slate-200 rounded"></div>
          <div className="h-[20px] w-[80px] ml-[20px] bg-slate-200 rounded"></div>
          <div className="h-[20px] w-[100px] ml-[10px] bg-slate-200 rounded"></div>
          <div className="h-[20px] w-[70px] ml-[10px] bg-slate-200 rounded"></div>
          <div className="h-[20px] w-[100px] ml-[10px] bg-slate-200 rounded"></div>
          <div className="h-[20px] w-[80px] ml-[10px] bg-slate-200 rounded"></div>
          <div className="h-[20px] w-[80px] ml-[10px] bg-slate-200 rounded"></div>
          <div className="h-[20px] w-[80px] ml-[10px] bg-slate-200 rounded"></div>
          <div className="h-[20px] w-[80px] ml-[10px] bg-slate-200 rounded"></div>
          <div className="h-[20px] w-[100px] ml-[10px] bg-slate-200 rounded"></div>
          <div className="h-[20px] w-[100px] ml-[10px] bg-slate-200 rounded"></div>
          <div className="h-[20px] w-[100px] ml-[10px] bg-slate-200 rounded"></div>
          <div className="h-[20px] w-[100px] ml-[10px] bg-slate-200 rounded"></div>
          <div className="h-[20px] w-[100px] ml-[10px] bg-slate-200 rounded"></div>
          <div className="h-[20px] w-[100px] ml-[10px] bg-slate-200 rounded"></div>
        </div>
        <Row gutter={[16, 16]}>
          <Col lg={8} md={12} xs={24}>
            <div
              className="group shadow-xs cursor-pointer shadow-indigo-500/40 p-[20px]  bg-slate-300/50% rounded-[12px] ">
              <h4 className="text-[#140E35] text-[20px] pb-[8px]">
                <div className="h-[20px] bg-slate-200 rounded"></div>
              </h4>
              <div className="flex items-center pb-[18px]">
                <span className="block p-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">
                  <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                </span>
                <span
                  className="block p-[5px] ml-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">
                  <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                </span>
              </div>
              <div className="flex items-center divide-y pb-[18px]">
                <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
              </div>
              <div className="flex items-center pt-[10px]">
                <div className="h-[30px] w-[30px]  bg-slate-200 rounded-full"></div>
                <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
              </div>
            </div>
          </Col>
          <Col lg={8} md={12} xs={24}>
            <div
              className="group shadow-xs cursor-pointer shadow-indigo-500/40 p-[20px]  bg-slate-300/50% rounded-[12px] ">
              <h4 className="text-[#140E35] text-[20px] pb-[8px]">
                <div className="h-[20px] bg-slate-200 rounded"></div>
              </h4>
              <div className="flex items-center pb-[18px]">
                <span className="block p-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">
                  <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                </span>
                <span
                  className="block p-[5px] ml-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">
                  <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                </span>
              </div>
              <div className="flex items-center divide-y pb-[18px]">
                <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
              </div>
              <div className="flex items-center pt-[10px]">
                <div className="h-[30px] w-[30px]  bg-slate-200 rounded-full"></div>
                <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
              </div>
            </div>
          </Col>
          <Col lg={8} md={12} xs={24}>
            <div
              className="group shadow-xs cursor-pointer shadow-indigo-500/40 p-[20px]  bg-slate-300/50% rounded-[12px] ">
              <h4 className="text-[#140E35] text-[20px] pb-[8px]">
                <div className="h-[20px] bg-slate-200 rounded"></div>
              </h4>
              <div className="flex items-center pb-[18px]">
                <span className="block p-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">
                  <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                </span>
                <span
                  className="block p-[5px] ml-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">
                  <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                </span>
              </div>
              <div className="flex items-center divide-y pb-[18px]">
                <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
              </div>
              <div className="flex items-center pt-[10px]">
                <div className="h-[30px] w-[30px]  bg-slate-200 rounded-full"></div>
                <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
              </div>
            </div>
          </Col>
          <Col lg={8} md={12} xs={24}>
            <div
              className="group shadow-xs cursor-pointer shadow-indigo-500/40 p-[20px]  bg-slate-300/50% rounded-[12px] ">
              <h4 className="text-[#140E35] text-[20px] pb-[8px]">
                <div className="h-[20px] bg-slate-200 rounded"></div>
              </h4>
              <div className="flex items-center pb-[18px]">
                <span className="block p-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">
                  <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                </span>
                <span
                  className="block p-[5px] ml-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">
                  <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                </span>
              </div>
              <div className="flex items-center divide-y pb-[18px]">
                <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
              </div>
              <div className="flex items-center pt-[10px]">
                <div className="h-[30px] w-[30px]  bg-slate-200 rounded-full"></div>
                <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
              </div>
            </div>
          </Col>
          <Col lg={8} md={12} xs={24}>
            <div
              className="group shadow-xs cursor-pointer shadow-indigo-500/40 p-[20px]  bg-slate-300/50% rounded-[12px] ">
              <h4 className="text-[#140E35] text-[20px] pb-[8px]">
                <div className="h-[20px] bg-slate-200 rounded"></div>
              </h4>
              <div className="flex items-center pb-[18px]">
                <span className="block p-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">
                  <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                </span>
                <span
                  className="block p-[5px] ml-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">
                  <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                </span>
              </div>
              <div className="flex items-center divide-y pb-[18px]">
                <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
              </div>
              <div className="flex items-center pt-[10px]">
                <div className="h-[30px] w-[30px]  bg-slate-200 rounded-full"></div>
                <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
              </div>
            </div>
          </Col>
          <Col lg={8} md={12} xs={24}>
            <div
              className="group shadow-xs cursor-pointer shadow-indigo-500/40 p-[20px]  bg-slate-300/50% rounded-[12px] ">
              <h4 className="text-[#140E35] text-[20px] pb-[8px]">
                <div className="h-[20px] bg-slate-200 rounded"></div>
              </h4>
              <div className="flex items-center pb-[18px]">
                <span className="block p-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">
                  <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                </span>
                <span
                  className="block p-[5px] ml-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">
                  <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                </span>
              </div>
              <div className="flex items-center divide-y pb-[18px]">
                <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
              </div>
              <div className="flex items-center pt-[10px]">
                <div className="h-[30px] w-[30px]  bg-slate-200 rounded-full"></div>
                <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
              </div>
            </div>
          </Col>
          <Col lg={8} md={12} xs={24}>
            <div
              className="group shadow-xs cursor-pointer shadow-indigo-500/40 p-[20px]  bg-slate-300/50% rounded-[12px] ">
              <h4 className="text-[#140E35] text-[20px] pb-[8px]">
                <div className="h-[20px] bg-slate-200 rounded"></div>
              </h4>
              <div className="flex items-center pb-[18px]">
                <span className="block p-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">
                  <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                </span>
                <span
                  className="block p-[5px] ml-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">
                  <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                </span>
              </div>
              <div className="flex items-center divide-y pb-[18px]">
                <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
              </div>
              <div className="flex items-center pt-[10px]">
                <div className="h-[30px] w-[30px]  bg-slate-200 rounded-full"></div>
                <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
              </div>
            </div>
          </Col>
          <Col lg={8} md={12} xs={24}>
            <div
              className="group shadow-xs cursor-pointer shadow-indigo-500/40 p-[20px]  bg-slate-300/50% rounded-[12px] ">
              <h4 className="text-[#140E35] text-[20px] pb-[8px]">
                <div className="h-[20px] bg-slate-200 rounded"></div>
              </h4>
              <div className="flex items-center pb-[18px]">
                <span className="block p-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">
                  <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                </span>
                <span
                  className="block p-[5px] ml-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">
                  <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                </span>
              </div>
              <div className="flex items-center divide-y pb-[18px]">
                <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
              </div>
              <div className="flex items-center pt-[10px]">
                <div className="h-[30px] w-[30px]  bg-slate-200 rounded-full"></div>
                <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
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
          list?.map((item, index) => {
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
    <div
      className="relative group shadow-xs cursor-pointer transition duration-150 ease-out hover:bg-gradient-to-b hover:from-[#c5d2fd] hover:to-[#FFFFFF] shadow-indigo-500/40 p-[20px] bg-[#fff] rounded-[12px] h-[220px]">
      {props.isFree === 2 && <div className="absolute top-[10px] right-[10px] bg-[#fff] text-[#3162FF] px-[8px] py-[2px] rounded-[2px]">免费</div>}
      <h4 className="text-[#140E35] text-[20px] pb-[8px]">{props.modelName}</h4>
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
        <Link href={`/model/${encodeURIComponent(props?.modelName)}`}
          className="flex-1 py-[10px] transition duration-150 ease-out hover:opacity-65 rounded-[8px] flex items-center justify-center text-[#333] bg-[#EEEEEE]">
          <div>
            查看详情
          </div>
        </Link>
        <Link className="text-[#fff] ml-[12px] flex-1 transition duration-150 ease-out hover:opacity-65 py-[10px] rounded-[8px] flex items-center justify-center bg-[#3162FF]"
          href={`/playground/?model=${props?.apiModelName}&modelType=message`}>
          <div>
            立即体验
          </div>
        </Link>
      </div>
    </div>
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
    <div className="h-screen overflow-auto pb-[100px] pt-[104px] lg:px-16 bg-[#F4F5FE]">
      {
        loading ?
          <Loading />
          :
          <>
            <TagListComponent {...modalPriceTag} />
            <TagListComponent {...{
              title: '使用场景',
              current: queryParams.typeId,
              setCurrent: (v) => setQueryParams({ ...queryParams, typeId: v }),
              list: handleList(typeData.cateList, (list) => [{
                name: '全部',
                value: 0
              }].concat(list.map(item => ({ name: item.cateName, value: item.cateId }))))
            }} />
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
                  modelDataRes && modelDataRes.length > 0 ? modelDataRes?.map(item => {
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <Col lg={8} xs={24} md={12}>
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
  )
}


export default Model;
