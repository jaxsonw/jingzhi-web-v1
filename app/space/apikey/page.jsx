'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { FaRegCopy } from "react-icons/fa";
import EditKeyModal from '../../../components/apiKeys/EditKeyModal'
import DeleteConfirm from '../../../components/apiKeys/DeleteConfirm'
import { getKeyList, editKey } from '../../../services/key'
import { copyValue } from "../../../utils/index"

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
      <DeleteConfirm open={deleteOpen} setOpen={setDeleteOpen} onOk={onDelete} onCancel={() => setDeleteOpen(false)} />
      <EditKeyModal open={open} setOpen={setOpen} onOk={onCreateCb} />
      <h4 className="font-bold">请勿与他人共享API密钥，或在浏览器或其他客户端代码中公开该密钥。</h4>
      <div className="flex items-center justify-end">
        <button
          onClick={onCreate}
          type="button"
          className="inline-flex text-center items-center justify-center w-[150px] px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          创建key
        </button>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    名称
                  </th>
                  <th scope="col" className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    key
                  </th>
                  <th scope="col" className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    状态
                  </th>
                  <th scope="col" className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    创建时间
                  </th>
                  <th scope="col" className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {tableData?.map(item => (
                  <tr key={item.id}>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">{item.name}</td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">{item.openKey}    <button
                      onClick={() => copyValue(item.openKey)}
                      type="button"
                      className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white  box-shadow  "
                    >
                      <FaRegCopy color='black' size={16} />
                    </button> </td>
                    <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">{statuses[item.status]?.text}</td>
                    <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{item?.createTime}</td>

                    <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">
                      <span className="relative z-0 inline-flex shadow-sm rounded-md">
                        <button
                          onClick={() => onDeleteClick(item)}
                          type="button"
                          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
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
  )
}
