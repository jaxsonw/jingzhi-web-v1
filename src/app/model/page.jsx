// import React, { Fragment, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LogoIcon from '/public/favicon.ico'
import { useSearchParams } from 'next/navigation'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import MobelTable from '../../components/common/ModelTable'
import { getServerModelFilterList, getServerModelList, getServerModelCateList } from '../../services/overflow'
import { PRICE_HEADER } from '../../consts/modelheaderData'

const Model = async ({ params, searchParams }) => {
  const typeDataRes = await getServerModelFilterList()
  const typeData = typeDataRes?.data
  const { company, type, cate } = searchParams

  const modelDataRes = await getServerModelList({
    companyId: company || '',
    typeId: type || '',
    cid: cate
  })

  const modelCateListRes = await getServerModelCateList()
  const modelCateList = modelCateListRes?.data
  const modelData = modelDataRes?.data

  // const params = useSearchParams()
  console.log('params', modelData)
  // const [typeData, setTypeData] = useState()
  // const [modelSelected, setModelSelected] = useState({ typeName: '选择类型' })
  // const [companySelected, setCompanySelected] = useState({ companyName: '选择服务商' })
  // const [modelData, setModelData] = useState({})

  const init = async () => {
    const res = await getServerModelFilterList()
    // const resData = await getModelCateList()
    // console.log(resData, 'resDataresData')
    // setTypeData(res?.data)
    // setModelSelected(res?.data?.modelTypeList[0])
    // setCompanySelected(res?.data?.companyList[0])
  }

  // const getModelData = async () => {
  //   const modelData = await getModelList({
  //     companyId: companySelected?.companyId,
  //     typeId: modelSelected?.typeId
  //   })
  //   setModelData(modelData?.data)
  // }

  // useEffect(() => {
  //   init()
  // }, [])

  // useEffect(() => {
  //   getModelData()
  // }, [modelSelected, companySelected])
  return (
    <div className="h-screen pt-[104px] lg:px-16">
      <h1 className="text-[30px] text-[#000B4D] pt-[33px]  sm:flex sm:flex-auto sm:justify-center">大模型广场</h1>
      <h2 className="text-[16px] text-[#A3C6FF] sm:flex sm:flex-auto sm:justify-center">LARGEMMODEL HUB</h2>

      <div className="flex w-full">
        <div className="basis-1/6 h-[calc(100vh_-_185px)] overflow-scroll sticky top-[130px] mr-[24px] border-r border-solid border-[#eaedf1]">
          <div className="px-[24px] py-[6px]">
            {/* <section className="mb-[24px]">
              <h3 className="text-lg	font-bold	mb-[6px]">模型类型</h3>
              <div className="flex flex-col">
                <Link
                  className={`my-1 py-2 px-2 font-semibold text-gray-700 rounded-md hover:bg-[#3162FF]/90 hover:text-white ${
                    Number(type) === 0 ? 'bg-[#3162FF] text-white' : ''
                  }`}
                  href={`/model?cate=${cate || ''}&type=&company=${company || ''}`}
                >
                  全部
                </Link>
                {typeData?.modelTypeList?.map((item, index) => (
                  <Link
                    className={`my-1 py-2 px-2 font-semibold text-gray-700 rounded-md hover:bg-[#3162FF]/90 hover:text-white ${
                      Number(type) === item?.typeId ? 'bg-[#3162FF] text-white' : ''
                    }`}
                    key={index}
                    href={`/model?cate=${cate || ''}&type=${item?.typeId}&company=${company || ''}`}
                  >
                    {item?.typeName}
                  </Link>
                ))}
              </div>
            </section> */}
            <section className="mb-[24px]">
              <h3 className="text-lg	font-bold	mb-[6px]">使用场景</h3>
              <div className="flex flex-col">
                <Link
                  className={`my-1 py-2 px-2 font-semibold text-gray-700 rounded-md hover:bg-[#3162FF]/90 hover:text-white ${
                    Number(cate) === 0 ? 'bg-[#3162FF] text-white' : ''
                  }`}
                  href={`/model?cate=&company=${company || ''}`}
                >
                  全部
                </Link>
                {modelCateList?.map((item, index) => (
                  <Link
                    className={`my-1 py-2 px-2 font-semibold text-gray-700 rounded-md hover:bg-[#3162FF]/90 hover:text-white ${
                      Number(cate) === item?.id ? 'bg-[#3162FF] text-white' : ''
                    }`}
                    key={index}
                    href={`/model?cate=${item?.id}&company=${company || ''}`}
                  >
                    {item?.cate_name}
                  </Link>
                ))}
              </div>
            </section>
            <section className="mb-[24px]">
              <h3 className="text-lg	font-bold	mb-[6px]">模型提供方</h3>
              <div className="flex flex-col">
                <Link
                  className={`my-1 py-2 px-2 font-semibold text-gray-700 rounded-md hover:bg-[#3162FF]/90 hover:text-white ${
                    Number(company) === 0 ? 'bg-[#3162FF] text-white' : ''
                  }`}
                  href={`/model?type=${type}`}
                >
                  全部
                </Link>
                {typeData?.companyList?.map((item, index) => (
                  <Link
                    className={`my-1 py-2 px-2 font-semibold text-gray-700 rounded-md hover:bg-[#3162FF]/90 hover:text-white ${
                      Number(company) === item?.companyId ? 'bg-[#3162FF] text-white' : ''
                    }`}
                    key={index}
                    href={`/model?cate=${cate || ''}&company=${item?.companyId}`}
                  >
                    {item?.companyName}
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
        <div className="grid grid-cols-3 py-4 gap-4	 basis-5/6">
          {modelData?.recordList?.map((item, index) => {
            return (
              <Link
                href={`/playground/?model=${item?.apiModelName}&modelType=message`}
                key={index}
                className="h-[228px] cursor-pointer border border-solid border-1 border-gray-100  hover:border-[#3162FF] bg-white rounded-lg shadow-lg  min-w-100 overflow-hidden p-[20px] relative transition-all duration-300 ease-in-out"
              >
                <div>
                  <div className="flex mb-[16px] items-center">
                    <Image
                      className="border-[0.5px] border-solid border-gray-200 rounded overflow-hidden"
                      width="48"
                      height="48"
                      src={LogoIcon}
                    />
                    <div
                      className="text-gray-900 font-roboto text-base font-medium leading-28 ml-[12px] w-full"
                      style={{ width: 'calc(100% - 60px)' }}
                    >
                      {item?.modelName}
                    </div>
                  </div>
                  <div className="items-center text-gray-700 flex h-[20px]">
                    <div className="flex-1">
                      <div className="flex gap-1">
                        <span className="flex items-center">
                          {item?.tags?.map((v, i) => (
                            <div key={i} className="font-normal bg-gray-200 text-gray-900 rounded-md text-xs h-5 leading-5 px-6">
                              {v}
                            </div>
                          ))}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-700 text-sm font-normal h-[40px] leading-5 my-[10px] mb-[32px] truncate line-clamp-2	whitespace-normal	">
                    <span>{item?.detail}</span>
                  </div>
                  <div className="flex items-center color-[#737a87] text-sm font-normal justify-between leading-5 opacity-100 transition-all duration-100 ease-in-out delay-300">
                    <span className="text-gray-700 text-sm">@ {item?.companyName}</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Model
