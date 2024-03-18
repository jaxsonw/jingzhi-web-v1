'use client'
import { useState, useEffect } from "react"
import { Badge } from "@tremor/react"
import { getModelPriceList } from "../../services/overflow"

const colors = ["blue", "violet", "cyan", "rose"]


export default function ModelTable({modelData, headerData}) {


    return (
         <div className="h-screen pt-[16px]">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300 ">
                                <thead className="bg-[#3162FF] text-[#ffffff]"> 
                                    <tr>
                                        {
                                            headerData?.map((item, itemIndex) => {
                                                return (
                                                    <th key={itemIndex} scope="col" className="whitespace-nowrap py-3.5 pl-4 pr-3 text-center text-sm font-semibold sm:pl-0">
                                                        {item?.name}
                                                    </th>
                                                )
                                            })
                                        }
                                        {/* <th scope="col" className="whitespace-nowrap py-3.5 pl-4 pr-3 text-center text-sm font-semibold sm:pl-0">
                                            品牌
                                        </th>
                                        <th scope="col" className="whitespace-nowrap py-3.5 pl-4 pr-3 text-center text-sm font-semibold sm:pl-0">
                                            模型
                                        </th>
                                        <th scope="col" className="whitespace-nowrap px-2 py-3.5 text-center text-sm font-semibold">
                                            输入价格
                                        </th>
                                        <th scope="col" className="whitespace-nowrap px-2 py-3.5 text-center text-sm font-semibold">
                                            输出价格
                                        </th>
                                        <th scope="col" className="whitespace-nowrap px-2 py-3.5 text-center text-sm font-semibold">
                                            备注
                                        </th> */}
                        
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {modelData?.map((item) => {
                                        const currentRemark = item?.remark?.split(",")
                                        console.log(item, 'itemitemitem')
                                        return (
                                            <tr key={item.name}>
                                                <td className="whitespace-nowrap py-2 pl-4 pr-3  text-center text-sm text-gray-500 sm:pl-0">{item.model_name}</td>
                                                <td className="whitespace-nowrap py-2 pl-4 pr-3  text-center text-sm text-gray-500 sm:pl-0">{item.companyName}</td>
                                                <td className="whitespace-nowrap px-2 py-2 text-center text-sm font-medium text-gray-900">{item.typeName || "/"}</td>
                                                <td className="whitespace-nowrap px-2 py-2 text-center text-sm text-gray-900">{item.input_price || "/"}</td>
                                                <td className="whitespace-nowrap px-2 py-2 text-center text-sm text-gray-900">{item.output_price || "/"}</td>
                                                <td className="whitespace-nowrap px-2 py-2 text-center text-sm text-gray-900">{item.discount || "/"}</td>

                                                {/* <td className="whitespace-nowrap px-2 py-2 text-center text-sm text-gray-900">{item?.remark ? currentRemark?.map((val, index) => <Badge color={colors[index] || "#3b82f6"} key={val} className="mr-2">{val}</Badge>) : ""}</td> */}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

