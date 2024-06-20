"use client";
import React, { Fragment, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LogoIcon from '/public/favicon.ico'
import { useSearchParams } from 'next/navigation'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import MobelTable from '../../components/common/ModelTable'
import { getServerModelFilterList, getServerModelList, getServerModelCateList } from '../../services/overflow'
import { PRICE_HEADER } from '../../consts/modelheaderData'
import { Button, Col, Row, Tag } from 'antd'
import { Card } from '@tremor/react'
// import { useState } from 'react'

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
      className="relative group shadow-xs cursor-pointer transition duration-150 ease-out hover:bg-gradient-to-b hover:from-[#c5d2fd] hover:to-[#FFFFFF] shadow-indigo-500/40 p-[20px] bg-[#fff] rounded-[12px] ">
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
        <Image className="w-[30px] h-[30px] rounded-[100px]" src="" alt="" />
        <span className="text-[12px] text-[#140E35]">{props.companyName}</span>
      </div>
      <div className="btn flex transition duration-150 ease-out hidden group-hover:flex items-center justify-between">
        <div
          className="flex-1 py-[10px] transition duration-150 ease-out hover:opacity-65 rounded-[8px] flex items-center justify-center text-[#333] bg-[#EEEEEE]">查看详情
        </div>
        <div
          className="ml-[12px] flex-1 transition duration-150 ease-out hover:opacity-65 py-[10px] rounded-[8px] flex items-center justify-center text-[#fff] bg-[#3162FF]">
          <Link className="text-[#fff]"
                href={`/playground/?model=${props?.apiModelName}&modelType=message`}>立即体验</Link>
        </div>
      </div>
    </div>
  )
}
const Model = ({ params, searchParams }) => {
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

  // const { company = null, cate = null } = searchParams

  // console.log('typeData', typeData)
  // const modelDataRes = await getServerModelList({
  //   companyId: company || '',
  //   cate: cate
  // })
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
  console.log('modelDataRes', modelDataRes)
  const modelData = []

  const handleList = (list, fn) => {
    if (!list || list.length === 0) return []
    return fn(list)
  }
  console.log('modelData', typeData)
  return (
    <div className="h-screen overflow-auto pb-[100px] pt-[104px] lg:px-16 bg-[#F4F5FE]">
      {
        loading ?
          <Loading/>
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
      {/*<div className="flex w-full">*/}
      {/*  <div className="overflow-scroll-class basis-1/6 h-[calc(100vh_-_220px)] overflow-scroll sticky top-[80px]  border-r border-solid border-[#eaedf1]">*/}
      {/*    <div className="px-[24px] py-[6px]">*/}
      {/*      <section className="mb-[24px]">*/}
      {/*        <h3 className="text-lg	font-bold	mb-[6px]">使用场景</h3>*/}
      {/*        <div className="flex flex-col">*/}
      {/*          <Link*/}
      {/*            className={`my-1 py-2 px-2 font-semibold text-gray-700 rounded-md hover:bg-[#3162FF]/90 hover:text-white ${Number(cate) === 0 ? 'bg-[#3162FF] text-white' : ''*/}
      {/*              }`}*/}
      {/*            href={`/model?cate=&company=${company || ''}`}*/}
      {/*          >*/}
      {/*            全部*/}
      {/*          </Link>*/}
      {/*          {typeData?.cateList?.map((item, index) => (*/}
      {/*            <Link*/}
      {/*              className={`my-1 py-2 px-2 font-semibold text-gray-700 rounded-md hover:bg-[#3162FF]/90 hover:text-white ${Number(cate) === item?.cateId ? 'bg-[#3162FF] text-white' : ''*/}
      {/*                }`}*/}
      {/*              key={index}*/}
      {/*              href={`/model?cate=${item?.cateId}&company=${company || ''}`}*/}
      {/*            >*/}
      {/*              {item?.cateName}*/}
      {/*            </Link>*/}
      {/*          ))}*/}
      {/*        </div>*/}
      {/*      </section>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className="w-full">*/}
      {/*    <section className="mb-2 px-4 flex items-center sticky overflow-x-scroll top-[65px] h-20 z-10 bg-white">*/}
      {/*      <div className="flex items-center text-md text-nowrap	">*/}
      {/*        <Link*/}
      {/*          className={`mr-1 py-2 px-2   text-sm font-semibold  text-gray-700 rounded-md hover:bg-[#3162FF]/90 hover:text-white ${Number(company) === 0 ? 'bg-[#3162FF]  text-white' : ''*/}
      {/*            }`}*/}
      {/*          href={`/model?cate=${cate}`}*/}
      {/*        >*/}
      {/*          全部*/}
      {/*        </Link>*/}
      {/*        {typeData?.companyList?.map((item, index) => (*/}
      {/*          <Link*/}
      {/*            className={`mr-1 text-sm py-2 px-2  text-gray-700 rounded-md font-semibold hover:bg-[#3162FF]/90 hover:text-white ${Number(company) === item?.companyId ? 'bg-[#3162FF] text-white ' : ''*/}
      {/*              }`}*/}
      {/*            key={index}*/}
      {/*            href={`/model?cate=${cate || ''}&company=${item?.companyId}`}*/}
      {/*          >*/}
      {/*            {item?.companyName}*/}
      {/*          </Link>*/}
      {/*        ))}*/}
      {/*      </div>*/}
      {/*    </section>*/}
      {/*    <div className="grid lg:grid-cols-3 grid-cols-1 py-4 gap-4	 px-4 basis-5/6 h-fit">*/}
      {/*      {modelData?.recordList?.map((item, index) => {*/}
      {/*        return (*/}
      {/*          <div*/}
      {/*            key={index}*/}
      {/*            className="max-h-[228px]  group cursor-pointer border border-solid border-1 border-gray-100  hover:border-[#3162FF] bg-white rounded-lg shadow-lg  min-w-100 overflow-hidden p-[20px] relative transition-all duration-300 ease-in-out"*/}
      {/*          >*/}
      {/*            <div className="absolute blur-md	 opacity-20	rounded-full -left-10 -top-40 z-0 bg-gradient-to-r from-sky-200 to-blue-200 w-60 h-60"></div>*/}
      {/*            <div className="absolute blur-md	 opacity-20	rounded-full -right-10 -top-40 z-0 bg-gradient-to-t from-sky-200 to-blue-200 w-80 h-80"></div>*/}

      {/*            <div className="relative">*/}
      {/*              <div className="flex mb-[16px] items-center">*/}
      {/*                <Image*/}
      {/*                  className="border-[0.5px] border-solid border-gray-200 rounded overflow-hidden"*/}
      {/*                  width="48"*/}
      {/*                  height="48"*/}
      {/*                  src={item?.icon || LogoIcon}*/}
      {/*                />*/}
      {/*                <div*/}
      {/*                  className="text-gray-900 font-roboto text-base font-medium leading-28 ml-[12px] w-full"*/}
      {/*                  style={{ width: 'calc(100% - 60px)' }}*/}
      {/*                >*/}
      {/*                  {item?.modelName}*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*              <div className="items-center text-gray-700 flex h-[20px]">*/}
      {/*                <div className="flex-1">*/}
      {/*                  <div className="flex gap-1">*/}
      {/*                    <span className="flex items-center">*/}
      {/*                      {item?.tagList?.map((v, i) => (*/}
      {/*                        <div key={i} className="font-normal mr-2 bg-gray-200 text-gray-900 rounded-md text-xs h-5 leading-5 px-6">*/}
      {/*                          {v}*/}
      {/*                        </div>*/}
      {/*                      ))}*/}
      {/*                    </span>*/}
      {/*                  </div>*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*              <div className="w-full h-14  overflow-hidden group-hover:bottom-0 duration-500	absolute left-0 -bottom-full bg-white shadow-[-5_35px_60px_-15px_rgba(0,0,0,0.3)]">*/}
      {/*                <Link*/}
      {/*                  href={`/playground/?model=${item?.apiModelName}&modelType=message`}*/}
      {/*                  className="absolute font-bold text-md rounded flex items-center justify-center bg-[#3162FF] text-white shadow-md left-1/2 transform -translate-x-1/2 bottom-2 h-10 w-2/3 "*/}
      {/*                >*/}
      {/*                  立即体验*/}
      {/*                </Link>*/}
      {/*              </div>*/}
      {/*              <div className="text-gray-400 text-sm text-wrap font-normal h-[40px] leading-5 my-[10px] mb-[32px] truncate line-clamp-2	whitespace-wrap	">*/}
      {/*                {item?.detail}*/}
      {/*              </div>*/}
      {/*              <div className="flex group-hover:opacity-0 duration-200 items-center text-sm font-normal justify-between leading-5 opacity-100 transition-all duration-100 ease-in-out delay-300">*/}
      {/*                <span className="text-gray-400 text-sm">@ {item?.companyName}</span>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        )*/}
      {/*      })}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  )
}

export default Model
