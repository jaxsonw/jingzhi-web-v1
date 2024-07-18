'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { FaRegCopy } from "react-icons/fa";
import EditKeyModal from '../../../components/apiKeys/EditKeyModal'
import DeleteConfirm from '../../../components/apiKeys/DeleteConfirm'
import { getKeyList, editKey } from '../../../services/key'
import { copyValue } from "../../../utils/index"
import { Link } from '@nextui-org/react';

const statuses = {
  1: {
    class: 'text-green-700 bg-green-50 ring-green-600/20',
    text: '启用'
  },
  2: {
    class: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
    text: '禁用'
  }
}


export default function APIKeys() {
  const [open, setOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [currentDeleteData, setCurrentDeleteData] = useState(null)
  const [tableData, setTableData] = useState([])

  const init = async () => {
    const res = await getKeyList()
    if (res?.code === 0) {
      setTableData(res?.data?.recordList)
    } else {
      toast.error('获取key数据失败')
    }
  }

  const onCreate = () => setOpen(true)
  const onCreateCb = () => {
    init()
  }

  const onDeleteClick = item => {
    setDeleteOpen(true)
    setCurrentDeleteData(item)
  }

  const onDelete = async () => {
    const res = await editKey({
      id: currentDeleteData?.id,
      name: currentDeleteData?.name,

      status: 3
    })

    if (res?.code === 0) {
      toast.success('删除成功')
      setDeleteOpen(false)
      init()
    } else {
      toast.error(res?.message || '删除失败')
    }
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div>
      <div className="absolute top-[90px] right-[80px] text-[14px] text-gray-500 cursor-pointer hover:text-blue-500">
        <Link href="/docs">
          如何使用你的key?
        </Link>
      </div>
      <DeleteConfirm open={deleteOpen} setOpen={setDeleteOpen} onOk={onDelete} onCancel={() => setDeleteOpen(false)} />
      <EditKeyModal open={open} setOpen={setOpen} onOk={onCreateCb} />

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className='flex items-center'>
            <span className='text-[16px] font-bold mr-2'>Base URL:</span>
            <span className='text-[16px] text-blue-500 mr-2'>https://api.agicto.cn/v1</span>
            <div
              className='cursor-pointer'
              onClick={() => {
                copyValue("https://api.agicto.cn/v1")
                message.success('复制成功')
              }} >
              <FaRegCopy color="gray" size={16} />
            </div>
          </div>
          <button
            onClick={onCreate}
            type="button"
            className="inline-flex text-center items-center justify-center w-[150px] px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-[#3162FF] hover:bg-[#3162FF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            创建key
          </button>
        </div>
        <div className="mt-4 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-md">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-[#3162FF] text-white ">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white  sm:pl-6">
                        自定义名称
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white ">
                        Key
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white ">
                        状态
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white ">
                        创建时间
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white ">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {tableData?.map(item => (
                      <tr key={item.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{item.name}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm  flex items-center text-gray-500">
                          <button
                            onClick={() => copyValue(item.openKey)}
                            type="button"
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium "
                          >
                            <FaRegCopy color="black" size={16} />
                          </button>
                          {item.openKey}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{statuses[item.status]?.text}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item?.createTime}</td>

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className="relative z-0 inline-flex">
                            <button
                              onClick={() => onDeleteClick(item)}
                              type="button"
                              className="inline-flex items-center px-2.5 py-1.5   text-xs font-medium shandow-none  text-[#F52F3E]"
                            >
                              删除
                            </button>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
