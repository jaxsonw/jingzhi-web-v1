/* This example requires Tailwind CSS v2.0+ */
'use client'
import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import AliPay from "../../../icons/aliPay"
import WeChatPay from "../../../icons/weChatPay"


const pricePlan = [
  { label: '50元', value: 50 },
  { label: '100元', value: 100 },
  { label: '150元', value: 150 },
  { label: '200元', value: 200 },
  { label: '自定义金额', value: 0 }
]
const rechargeType = [
  {
    value: 1,
    name: '微信',
    icon: <WeChatPay />
  },
  {
    value: 2,
    name: '支付宝',
    icon: <AliPay />
  }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const stats = [
  { name: 'Total Subscribers', stat: '71,897' },
  { name: 'Avg. Open Rate', stat: '58.16%' },
  { name: 'Avg. Click Rate', stat: '24.57%' }
]

export default function Example() {
  const [selectedPrice, setSelectedPrice] = useState(pricePlan[0]?.value)
  const [inputPrice, setInputPrice] = useState(0)

  const [selectedType, setSelectedType] = useState(rechargeType[0]?.value)

  const onAmountChange = (e) => {
    // 移除非数字字符
    const cleanedValue = e.target.value.replace(/\D/g, '');
    const finalValue = cleanedValue.replace(/^0+/, '');


    // 更新输入框的值
    setInputPrice(finalValue);

  }

  const onCreateOrder = () => {
    let price = selectedPrice
    if (selectedPrice === 0) {
      price = inputPrice
    }

  }


  return (
    <div>
      <div className="mb-10">
        <h3 className="text-lg leading-6 font-medium text-gray-900">账户总览</h3>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">可用余额</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">¥100</dd>
          </div>
        </dl>
      </div>
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">充值</h3>
        <RadioGroup className="mb-4" value={selectedPrice} onChange={e => {
          setInputPrice(0)
          setSelectedPrice(e?.value)
        }}>
          <RadioGroup.Label>充值金额</RadioGroup.Label>
          <div className=" flex flex-wrap items-center">
            {pricePlan?.map(plan => {
              const currentChecked = selectedPrice === plan?.value
              return (
                <RadioGroup.Option
                  key={plan.value}
                  value={plan}
                  className={classNames(
                    currentChecked ? 'border-indigo-500 ring-2 ring-indigo-500' : '',
                    'relative mr-4 mt-4 block bg-white border rounded-lg shadow-sm px-6 py-4 cursor-pointer flex justify-between focus:outline-none'
                  )}
                >
                  <RadioGroup.Description as="div" className=" flex text-sm mt-0 block   text-right">
                    <div className="font-medium text-gray-900">{plan.label}</div>
                  </RadioGroup.Description>
                </RadioGroup.Option>
              )
            })}
            {
              selectedPrice === 0 ? <input
                type="number"
                name="price"
                value={inputPrice}
                onChange={onAmountChange}
                className="block w-[150px] text-xl font-semibold px-6 py-4 mr-4 mt-4   rounded-md border-0 py-1.5 pl-7   text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                placeholder="0.00"
              /> : null
            }
          </div>
        </RadioGroup>
        <RadioGroup value={selectedType} onChange={e => setSelectedType(e?.value)}>
          <RadioGroup.Label>充值方式</RadioGroup.Label>
          <div className=" flex flex-wrap items-center">
            {rechargeType.map(item => {
              const active = selectedType === item.value
              return (
                <RadioGroup.Option
                  key={item.value}
                  value={item}
                  className={classNames(
                    active ? 'border-indigo-500 ring-2 ring-indigo-500' : '',
                    'relative mr-4 mt-4 block bg-white border rounded-lg shadow-sm px-6 py-4 cursor-pointer sm:flex sm:justify-between focus:outline-none'
                  )}
                >
                  <div className="flex items-center">
                    <div className="text-sm">
                      <RadioGroup.Label as="p" className="font-medium text-gray-900">
                        {item.name}
                      </RadioGroup.Label>
                    </div>
                  </div>
                </RadioGroup.Option>
              )
            })}
          </div>
        </RadioGroup>
      </div>
      <div className="flex justify-end">
        <button
          onClick={onCreateOrder}
          type="button"
          className="inline-flex text-center items-center justify-center w-[150px] px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          立即支付
        </button>
      </div>
    </div>
  )
}
