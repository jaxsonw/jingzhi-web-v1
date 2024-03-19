'use client'

import { FaRegCopy } from "react-icons/fa";
import { copyValue } from "../../utils/index"



export default function ModelTable({modelData, headerData}) {


    return (
         <div className="h-screen pt-[16px]">
            <div className="mt-8 flow-root">
                <div className="overflow-x-auto ">
                    <div className="inline-block min-w-full align-middle ">
                        <table className="min-w-full divide-y divide-gray-300 ">
                            <thead className="bg-[#3162FF] text-[#ffffff]"> 
                                <tr>
                                    {
                                        headerData?.map((item) => {
                                            return (
                                                <th key={item?.name} scope="col" className="whitespace-nowrap py-3.5 pl-4 pr-3 text-center text-sm font-semibold sm:pl-0">
                                                    {item?.name}
                                                </th>
                                            )
                                        })
                                    }
                                  
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {modelData?.map((item) => {
                                    return (
                                        <tr key={item.model_name}>
                                            <td className="whitespace-nowrap py-2 pl-4 pr-3 flex justify-center text-center text-sm text-gray-500 sm:pl-0">
                                                {item.modelName}
                                                <button
                                                    onClick={() => copyValue(item.modelName)}
                                                    type="button"
                                                    className="inline-flex items-center px-2.5 border border-transparent text-sm  font-medium "
                                                >
                                                    <FaRegCopy color="black" size={14} />
                                                </button>
                                            </td>
                                            <td className="whitespace-nowrap py-2 pl-4 pr-3  text-center text-sm text-gray-500 sm:pl-0">{item.companyName}</td>
                                            <td className="whitespace-nowrap px-2 py-2 text-center text-sm font-medium text-gray-900">{item.typeName || "/"}</td>
                                            <td className="whitespace-nowrap px-2 py-2 text-center text-sm text-gray-900">{item.inputPrice || "/"}</td>
                                            <td className="whitespace-nowrap px-2 py-2 text-center text-sm text-gray-900">{item.outputPrice || "/"}</td>
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
    )
}

