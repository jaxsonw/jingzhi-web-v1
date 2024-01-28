/* This example requires Tailwind CSS v2.0+ */
'use client'
import { useState, useEffect, useContext } from 'react'
import { RadioGroup } from '@headlessui/react'
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "react-toastify"

import { createOrder, getOrderStatus, getWechatSign, getAuthCode } from "../../../services/recharge"
import Loading from "../../../components/common/Loading"
import AliPay from "../../../icons/aliPay"
import WeChatPay from "../../../icons/wechatPay"
import { isPc, isWeixin, checkServer } from "../../../utils/index"
import { SpaceContext } from "../layout"



const appid = 'wx45ecf372ff70d541' // 微信appid，测试 wx847c9937877744e5


const pricePlan = [
  { label: '50元', value: 50 },
  { label: '100元', value: 100 },
  { label: '150元', value: 150 },
  { label: '200元', value: 200 },
  { label: '自定义金额', value: 0 }
]




function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const rechargeType = [
  {
    name: '微信',
    value: 1,
    disabled: !isPc() && !isWeixin(),
    icon: <WeChatPay size={20} className="mr-2 text-green-400" />,
  },
  {
    name: '支付宝',
    value: 2,
    disabled: isWeixin(),
    icon: <AliPay size={20} className="mr-2 text-[#327af6]" />,
  },
]

export default function Example() {
  const spaceData = useContext(SpaceContext)
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedPrice, setSelectedPrice] = useState(pricePlan[0]?.value)
  const [inputPrice, setInputPrice] = useState(0)

  const [selectedType, setSelectedType] = useState(rechargeType[0]?.value)
  const [createOrderLoading, setCreateOrderLoading] = useState(false)

  const onAmountChange = (e) => {
    // 移除非数字字符
    // const cleanedValue = e.target.value.replace(/\D/g, '');
    // const finalValue = cleanedValue.replace(/^0+/, '');
    // 更新输入框的值
    setInputPrice(e.target.value);

  }



  const wxLogoin = async (price) => {
    const url = window.location.href
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
      url
    )}&response_type=code&scope=snsapi_userinfo&state=${price}#wechat_redirect`
    console.log("href", `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
      url
    )}&response_type=code&scope=snsapi_userinfo&state=${price}#wechat_redirect`)
  }

  const onCreateOrder = async () => {
    setCreateOrderLoading(true)
    let price = selectedPrice
    if (selectedPrice === 0) {
      price = inputPrice
    }
    // if (price < 10) {
    //   toast.error("最低充值金额10元～")
    //     setCreateOrderLoading(false)

    //   return
    // }
    const osType = isWeixin() ? 3 : isPc() ? 1 : 2

    const params = {
      money: price,
      payType: selectedType,
      osType
    }

    if (!isPc() && isWeixin()) {
      console.log("price", price)
      wxLogoin(price)
      return
    }

    const res = await createOrder(params)
    setCreateOrderLoading(false)

    if (res?.code !== 0) {
      toast.error(res?.data?.message || '创建订单失败，请稍后再试～')
      return
    }


    router.push(`/space/recharge/pay?orderSn=${res?.data?.orderSn}&payType=${selectedType}&osType=${osType}`)
  }

  const init = async () => {
    if (!checkServer()) {
      // 普通浏览器环境
      if (!isWeixin() && !isPc()) {
        setSelectedType(2)
      }

      // 微信环境
      if (isWeixin() && !isPc()) {
        setSelectedType(1)
        // 如果返回有code，授权成功
        const code = searchParams.get('code')
        const payFee = searchParams.get('state')

        if (code) {
          // const res = await getAuthCode({ code })
          // if (res?.code !== 0) {
          //   toast.error(res?.message || '授权失败～')
          //   return
          // }

          const params = {
            payFee,
            osType: 3,
            payType: 1
          }

          const createOrderRes = await createOrder(params)
          setCreateOrderLoading(false)

          if (createOrderRes?.code !== 0) {
            toast.error(createOrderRes?.message || '创建订单失败，请稍后再试～')
            return
          }
          router.push(`/space/recharge/pay?orderSn=${createOrderRes?.data?.orderSn}&payType=${1}&osType=${3}`)

        }
      }
    }
  }

  useEffect(() => {
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div>
      {createOrderLoading ? <Loading /> : null}
      <div className="mb-10">
        <h3 className="text-lg leading-6 font-medium text-gray-900">账户总览</h3>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6 flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-gray-500 truncate">可用余额</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">¥{spaceData?.apiNum || 0}</dd>
            </div>
          </div>
        </dl>
      </div>
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">充值</h3>
        <RadioGroup value={selectedType} onChange={e => setSelectedType(e?.value)}>
          <RadioGroup.Label>充值方式</RadioGroup.Label>
          <div className=" flex flex-wrap items-center">
            {rechargeType.map(item => {
              const active = selectedType === item.value
              return (
                <div key={item.value} className='flex items-center'>
                  <RadioGroup.Option
                    disabled={item?.disabled}

                    value={item}
                    className={classNames(
                      active ? 'border-indigo-500 ring-2 ring-indigo-500' : '',
                      'relative w-fit mr-4 mt-4 block bg-white border rounded-lg shadow-sm px-6 py-4 cursor-pointer sm:flex sm:justify-between focus:outline-none'
                    )}
                  >
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label as="p" className="flex w-[100px] items-center font-medium text-gray-900">
                          {item?.icon}<span className='ml-4'> {item.name}</span>

                        </RadioGroup.Label>
                      </div>
                    </div>
                  </RadioGroup.Option>
                </div>
              )
            })}
            {(rechargeType?.[0]?.disabled) && <span className="text-gray-400 text-md ml-2 mt-4">当前环境不支持微信支付方式</span>}
            {(rechargeType?.[1]?.disabled) && <span className="text-gray-400 text-md ml-2 mt-4">当前环境不支持支付宝支付方式</span>}




          </div>
        </RadioGroup>
        <RadioGroup className="my-4" value={selectedPrice} onChange={e => {
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
                className="block w-[150px] text-xl font-semibold px-6 py-3 mr-4 mt-4   rounded-md border-0 py-1.5 pl-7   text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                placeholder="0.00"
              /> : null
            }
          </div>
        </RadioGroup>

      </div>
      <div className="flex mt-10">
        <button
          disabled={createOrderLoading}
          onClick={onCreateOrder}
          type="button"
          className={`inline-flex h-[45px] text-center items-center justify-center w-full  lg:w-[250px] px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none ${createOrderLoading ? "bg-[#fafafa] text-[#ccc]" : ""} `}
        >
          立即支付
        </button>
      </div>
    </div>
  )
}
