'use client'
import { useState, useEffect } from "react"
import { Badge } from "@tremor/react"
import { getModelPriceList } from "../../../services/overflow"

const colors = ["blue", "violet", "cyan", "rose"]


export default function Pricing() {
    const [data, setData] = useState()

    const init = async () => {
        const res = await getModelPriceList()
        setData(res?.data?.modelPriceList)
    }

    useEffect(() => {
        init()
    }, [])

    return (
         <div className="h-screen pt-[104px]">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-bold leading-6 text-gray-900">计费规则</h1>
                    </div>
                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th scope="col" className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                            品牌
                                        </th>
                                        <th scope="col" className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                            模型
                                        </th>
                                        <th scope="col" className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            输入价格
                                        </th>
                                        <th scope="col" className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            输出价格
                                        </th>
                                        <th scope="col" className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            备注
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {data?.map((item) => {
                                        const currentRemark = item?.remark?.split(",")
                                        console.log("currentRemark", currentRemark)
                                        return (
                                            <tr key={item.name}>
                                                <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">{item.source}</td>
                                                <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">{item.model}</td>
                                                <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">{item.inputPrice || "/"}</td>
                                                <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{item.outputPrice || "/"}</td>
                                                <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{item?.remark ? currentRemark?.map((val, index) => <Badge color={colors[index] || "#3b82f6"} key={val} className="mr-2">{val}</Badge>) : ""}</td>
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

