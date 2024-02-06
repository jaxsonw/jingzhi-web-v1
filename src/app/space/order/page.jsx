'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { orderList } from '../../../services/recharge'

/* This example requires Tailwind CSS v2.0+ */
const people = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' }
  // More people...
]

export default function Example() {
  const router = useRouter()
  const [orderListData, setOrderListData] = useState([])

  const init = async () => {
    const res = await orderList()
    setOrderListData(res?.data?.orderList)
  }

  const onPay = item => {
    router.push(`/space/recharge/pay?orderSn=${item?.orderSn}`)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-md">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-[#3162FF] text-white ">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white  sm:pl-6">
                      订单编号
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white ">
                      订单状态
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white ">
                      支付金额
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white ">
                      充值金额
                    </th>
                    {/* <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white ">
                                            操作
                                        </th> */}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {orderListData?.map(item => (
                    <tr key={item.orderSn}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{item.orderSn}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {' '}
                        {item.orderStatus === 0 ? '未支付' : ''}
                        {item.orderStatus === 2 ? '支付过期' : ''} {item.orderStatus === 1 ? '已支付' : ''}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.payFee ? `${item.payFee}元` : '--'}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.payFee ? `${item.payFee}元` : '--'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
