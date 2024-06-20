"use client";

import React, { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import MobelTable from '../../components/common/ModelTable'
import { getModelFilterList, getModelList, getModelCateList } from "../../services/overflow"
import { PRICE_HEADER } from '../../consts/modelheaderData'

const Model = () => {
    const [typeData, setTypeData] = useState()
    const [modelSelected, setModelSelected] = useState({ typeName: '选择类型' })
    const [companySelected, setCompanySelected] = useState({ companyName: '选择服务商' })
    const [modelData, setModelData] = useState({})



    const init = async () => {
        const res = await getModelFilterList()
        const resData = await getModelCateList()
        // console.log(resData, 'resDataresData')
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
            <h1 className="text-[30px] text-[#000B4D]  sm:flex sm:flex-auto sm:justify-center">大模型广场</h1>
            <h2 className="text-[16px] text-[#A3C6FF] sm:flex sm:flex-auto sm:justify-center">LARGEMMODEL HUB</h2>
            <div className="sm:flex pt-[22px]">
                {/* <div className=" sm:flex flex-auto sm:justify-end  sm:flex-grow-[1.78]">
            <button className="w-[120px] h-[40px] mr-[23px] bg-[#fff] text-[#1A1A1A] border-2 border-[#98E2FF] rounded-full" >
              重要参数
            </button>
            <button className="w-[120px] h-[40px] bg-[#3162FF] text-white rounded-full">
              费用介绍
            </button>
          </div> */}
                <div className="sm:flex sm:flex-auto sm:justify-end">
                    <Listbox value={modelSelected} onChange={setModelSelected}>
                        <div className="relative mt-1">
                            <Listbox.Button
                                style={{ border: '1px solid #E4E4E4' }}
                                className="sm:flex sm:flex-auto  items-center w-[153px] h-[40px] mr-[21px] bg-[#fff] border-2  border-[#E4E4E4] border-solid hover:border-[#3162FF] text-[rgba(0, 0, 0, 0.65)] rounded-full"
                            // className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                            >
                                <span className="sm:flex-grow-[1] truncate indent-4">{modelSelected?.typeName}</span>
                                <span className="pointer-events-none flex items-center pr-2">
                                    <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </Listbox.Button>
                            <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 pl-4 pr-4 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm border-1 border-[#3162FF]">
                                    {typeData?.modelTypeList.map((person, personIdx) => (
                                        <Listbox.Option
                                            key={personIdx}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 text-center border-b-2 border-[#E4E4E4]
                        last:border-b-0
                        ${active ? 'text-[#3162FF]' : 'text-gray-900'}`
                                            }
                                            value={person}
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${selected ? 'text-[#3162FF]' : 'font-normal'
                                                            }`}
                                                    >
                                                        {person.typeName}
                                                    </span>
                                                    {/* {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null} */}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                    <Listbox value={companySelected} onChange={setCompanySelected}>
                        <div className="relative mt-1">
                            <Listbox.Button
                                style={{ border: '1px solid #E4E4E4' }}
                                className="sm:flex sm:flex-auto  items-center w-[153px] h-[40px]  bg-[#fff] border-2  border-[#E4E4E4] hover:border-[#3162FF] text-[rgba(0, 0, 0, 0.65)] rounded-full"
                            // className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                            >
                                <span className="sm:flex-grow-[1] truncate indent-4">{companySelected?.companyName}</span>
                                <span className="pointer-events-none flex items-center pr-2">
                                    <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </Listbox.Button>
                            <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 pl-4 pr-4 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm border-1 border-[#3162FF]">
                                    {typeData?.companyList.map((companyItem, companyItemIdx) => (
                                        <Listbox.Option
                                            key={companyItemIdx}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 text-center border-b-2 border-[#E4E4E4]
                        last:border-b-0
                        ${active ? 'text-[#3162FF]' : 'text-gray-900'}`
                                            }
                                            value={companyItem}
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${selected ? 'text-[#3162FF]' : 'font-normal'
                                                            }`}
                                                    >
                                                        {companyItem?.companyName}
                                                    </span>

                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                </div>
            </div>
            {/* <MobelTable
        // TableHeaderList
        headerData={PRICE_HEADER}
        modelData={modelData?.recordList}
      /> */}
            <div className="flex w-full">
                <div className="basis-1/6 mr-[24px] border-r border-solid border-[#eaedf1]">
                    <div className="px-[24px] py-[6px]">
                        <section className="mb-[24px]">
                            <p className="text-sm	font-medium	mb-[6px]">模型列表</p>
                            <div className="p-[4px]">
                                大预言模型
                            </div>
                            <div>大预言模型</div>
                            <div>大预言模型</div>
                            <div>大预言模型</div>

                        </section>
                    </div>
                </div>
                <div className="grid grid-cols-3  gap-4	 basis-5/6">
                    {
                        modelData?.recordList?.map((item, index) => {
                            return (
                                <div key={index} class="animate-fadeIn-c41422 bg-white border-2 border-gray-200 rounded-lg shadow-md min-w-100 overflow-hidden p-[20px] relative transition-all duration-300 ease-in-out">
                                    <div></div>
                                    <div>
                                        <div className="flex mb-[16px] items-center">
                                            <img className="border-[0.5px] border-solid border-gray-200 rounded overflow-hidden" width="48" height="48" src="https://ark-auto-created-required-2100466578-cn-beijing.tos-cn-beijing.volces.com/model_card/1715683518355NKv3H5Tll6.png" />
                                            <div className="text-gray-900 font-roboto text-base font-medium leading-28 ml-[12px] w-full" style={{ width: "calc(100% - 60px)" }}

                                            >{item?.modelName}</div>
                                        </div>
                                        <div className="items-center text-gray-700 flex h-[20px]">
                                            <div className="flex-1">
                                                <div className="flex gap-1">
                                                    <span className="flex items-center">
                                                        <div className="font-normal bg-gray-200 text-gray-900 rounded-md text-xs h-5 leading-5 px-6">

                                                            大语言模型
                                                        </div>

                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-gray-700 text-sm font-normal h-[40px] leading-5 my-[10px] mb-[32px] truncate line-clamp-2	whitespace-normal	">
                                            <span>
                                                Doubao-lite，拥有极致的响应速度，更好的性价比，为客户不同场景提供更灵活的选择。支持4k上下文窗口的推理和精调。
                                            </span>
                                        </div>
                                        <div className="flex items-center color-[#737a87] text-sm font-normal justify-between leading-5 opacity-100 transition-all duration-100 ease-in-out delay-300">
                                            <span>{item?.companyName}</span>

                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>

            </div>
        </div>
    )
}

export default Model
