"use client";

import React, { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import MobelTable from '../../components/common/ModelTable'
import { getModelFilterList, getModelList } from "../../services/overflow"
import { PRICE_HEADER } from '../../consts/modelheaderData'

const Model = () => {
  const [typeData, setTypeData] = useState()
  const [modelSelected, setModelSelected] = useState({ typeName: '选择类型' })
  const [companySelected, setCompanySelected] = useState({ companyName: '选择服务商' })
  const [modelData, setModelData] = useState({})



  const init = async () => {
    const res = await getModelFilterList()


    setTypeData(res?.data)
    // setModelSelected(res?.data?.modelTypeList[0])
    // setCompanySelected(res?.data?.companyList[0])

  }

  const getModelData = async () => {
    const modelData = await getModelList({
      companyId: companySelected?.companyId,
      typeId: modelSelected?.typeId
    })
    setModelData(modelData?.data)
  }

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    getModelData()
  }, [modelSelected, companySelected])
  return (
    <div className="h-screen pt-[104px] lg:px-16">
      <h1 className="text-[36px] text-[#101828] pt-[33px] mb-[20px] sm:flex sm:flex-auto sm:justify-center">浏览基础设施模型:</h1>
      <h2 className="text-[20px] text-[#475467] font-normal	 sm:flex sm:flex-auto sm:justify-center">所有模型都可以在Agicto中试用并直接使用:</h2>
      <div className="sm:flex pt-[22px]">
        {/* <Button>123</Button> */}
        {/* <div className=" sm:flex flex-auto sm:justify-end  sm:flex-grow-[1.78]">
            <button className="w-[120px] h-[40px] mr-[23px] bg-[#fff] text-[#1A1A1A] border-2 border-[#98E2FF] rounded-full" >
              重要参数
            </button>
            <button className="w-[120px] h-[40px] bg-[#3162FF] text-white rounded-full">
              费用介绍
            </button>
          </div> */}
        <div className="flex flex-wrap gap-4">
          <a className="font-mono	 px-[14px] py-[10px] text-sm	cursor-pointer	font-medium	border border-solid	border-[#2a3275] text-[#667085]  hover:text-blue-600 hover:bg-sky-400/10	">Viewing all</a>
          <a className="font-mono	 px-[14px] py-[10px] text-sm	cursor-pointer	font-medium	border border-solid	border-[#2a3275] text-[#667085]  hover:text-blue-600 hover:bg-[#1e80ff]">Viewing all</a>
          <a className="font-mono	 px-[14px] py-[10px] text-sm	cursor-pointer	font-medium	border border-solid	border-[#2a3275] text-[#667085]  hover:text-blue-600 hover:bg-[#1e80ff]">Viewing all</a>
          <a className="font-mono	 px-[14px] py-[10px] text-sm	cursor-pointer	font-medium	border border-solid	border-[#2a3275] text-[#667085]  hover:text-blue-600 hover:bg-[#1e80ff]">Viewing all</a>
          <a className="font-mono	 px-[14px] py-[10px] text-sm	cursor-pointer	font-medium	border border-solid	border-[#2a3275] text-[#667085]  hover:text-blue-600 hover:bg-[#1e80ff]">Viewing all</a>
          <a className="font-mono	 px-[14px] py-[10px] text-sm	cursor-pointer	font-medium	border border-solid	border-[#2a3275] text-[#667085]  hover:text-blue-600 hover:bg-[#1e80ff]">Viewing all</a>
          <a className="font-mono	 px-[14px] py-[10px] text-sm	cursor-pointer	font-medium	border border-solid	border-[#2a3275] text-[#667085]  hover:text-blue-600 hover:bg-[#1e80ff]">Viewing all</a>
          <a className="font-mono	 px-[14px] py-[10px] text-sm	cursor-pointer	font-medium	border border-solid	border-[#2a3275] text-[#667085]  hover:text-blue-600 hover:bg-[#1e80ff]">Viewing all</a>
          <a className="font-mono	 px-[14px] py-[10px] text-sm	cursor-pointer	font-medium	border border-solid	border-[#2a3275] text-[#667085]  hover:text-blue-600 hover:bg-[#1e80ff]">Viewing all</a>

        </div>

      </div>
      <MobelTable
        // TableHeaderList
        headerData={PRICE_HEADER}
        modelData={modelData?.recordList}
      />
    </div>
  )
}

export default Model
