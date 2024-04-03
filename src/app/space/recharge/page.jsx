/* This example requires Tailwind CSS v2.0+ */
'use client'
import { useState, useEffect, useContext } from 'react'
import { RadioGroup } from '@headlessui/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { createOrder, getOrderStatus, getWechatSign, getAuthCode } from '../../../services/recharge'
import Loading from '../../../components/common/Loading'
import AliPay from '../../../icons/aliPay'
import WeChatPay from '../../../icons/wechatPay'
import PayModal from '../../../components/recharge/payModal'
import {
  recharge_center_bg1,
  agicto_product_agent_wechat,
  recharge_50,
  recharge_100,
  recharge_500,
  recharge_1000,
  recharge_5000,
  recharge_custom_price,
  recharge_yuan
} from '../../../consts/img'
import { isPc, isWeixin, checkServer } from '../../../utils/index'
import { SpaceContext } from '../layout'
import { title } from '../../../../config'

const appid = 'wx45ecf372ff70d541' // 微信appid，测试 wx847c9937877744e5

const pricePlan = [
  { label: recharge_50, value: 50, give: 0, headColor: 'bg-gradient-to-r from-[#7AA9FF] to-[#3162FF]' },
  { label: recharge_100, value: 100, give: 5, headColor: 'bg-gradient-to-r from-[#7AA9FF] to-[#3162FF]' },
  { label: recharge_500, value: 500, give: 50, headColor: 'bg-gradient-to-r from-[#7AA9FF] to-[#3162FF]' },
  { label: recharge_1000, value: 1000, give: 150, headColor: 'bg-gradient-to-r from-[#FEE4B6] to-[#FDCD79]', isHaveSupport: true },
  { label: recharge_5000, value: 5000, give: 1000, headColor: 'bg-gradient-to-r from-[#FEE4B6] to-[#FDCD79]', isHaveSupport: true }
  // { label: recharge_custom_price, value: 0, headColor: ['#8331FF', '#2BB1F8', '#00D9B6'] }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const rechargeType = [
  {
    name: '微信',
    value: 1,
    disabled: !isPc() && !isWeixin(),
    icon: <WeChatPay size={20} className="mr-2 text-green-400" />
  },
  {
    name: '支付宝',
    value: 2,
    disabled: isWeixin(),
    icon: <AliPay size={20} className="mr-2 text-[#327af6]" />
  }
]

export default function Example() {
  const spaceData = useContext(SpaceContext)
  const searchParams = useSearchParams()
  const router = useRouter()
  // const [selectedPrice, setSelectedPrice] = useState(pricePlan[0]?.value)
  const [inputPrice, setInputPrice] = useState()
  const [isOpenPayModal, setIsOpenPayModal] = useState(false)
  const [orderDetail, setOrderDetail] = useState(null)
  const [aliPayForm, setAliPayForm] = useState('')

  const [createOrderLoading, setCreateOrderLoading] = useState(false)

  const onAmountChange = e => {
    // 移除非数字字符
    // const cleanedValue = e.target.value.replace(/\D/g, '');
    // const finalValue = cleanedValue.replace(/^0+/, '');
    // 更新输入框的值
    setInputPrice(e.target.value)
  }

  const priceData = [
    {
      price: 50,
      give: 0
    }
  ]

  const wxLogoin = async price => {
    const url = window.location.href
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
      url
    )}&response_type=code&scope=snsapi_userinfo&state=${price}#wechat_redirect`
  }

  const onCreateOrder = async price => {
    setCreateOrderLoading(true)

    if (price < 10) {
      toast.error('最低充值金额10元～')
      setCreateOrderLoading(false)

      return
    }
    const osType = isWeixin() ? 3 : isPc() ? 1 : 2
    if (isPc()) {
      const params = {
        money: price,
        osType,
        payType: 1 // pc 1、2 都可以
      }
      const res = await createOrder(params)
      setCreateOrderLoading(false)

      if (res?.code !== 0) {
        toast.error(res?.data?.message || '创建订单失败，请稍后再试～')
        return
      }

      setOrderDetail(res?.data)
      setIsOpenPayModal(true)
      return
    }

    if (isWeixin() && !isPc()) {
      wxLogoin(price)
      setCreateOrderLoading(false)

      return
    }

    const params = {
      money: price,
      osType,
      payType: 2
    }
    const res = await createOrder(params)
    setAliPayForm(res?.data?.codeUrl)
  }

  // h5 微信
  const weixinPay = async sign => {
    if (!checkServer()) {
      const wehchatRes = await getWechatSign({ url: window.location.href })
      setCreateOrderLoading(false)

      window.wx.config({
        debug: false, // 开启调试模式,调用的所有 api 的返回值会在客户端 alert 出来，若要查看传入的参数，可以在 pc 端打开，参数信息会通过 log 打出，仅在 pc 端时才会打印。
        appId: wehchatRes.appId, // 必填，公众号的唯一标识
        timestamp: wehchatRes.timestamp, // 必填，生成签名的时间戳
        nonceStr: wehchatRes.nonceStr, // 必填，生成签名的随机串
        signature: wehchatRes.signature, // 必填，签名
        jsApiList: [...wehchatRes.jsApiList, 'chooseWXPay'] // 必填，需要使用的 JS 接口列表
      })
      window.wx?.ready(() => {
        window.wx.chooseWXPay({
          timestamp: sign?.timeStamp, // 支付签名时间戳，注意微信 jssdk 中的所有使用 timestamp 字段均为小写。但最新版的支付后台生成签名使用的 timeStamp 字段名需大写其中的 S 字符
          nonceStr: sign?.nonceStr, // 支付签名随机串，不长于 32 位
          package: sign?.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
          signType: sign?.signType, // 微信支付V3的传入 RSA ,微信支付V2的传入格式与V2统一下单的签名格式保持一致
          paySign: sign?.paySign, // 支付签名
          success: res => {
            toast.success('支付成功～')
            window.location.href = '/space/recharge'
          },
          error: err => {
            console.log('err', err)
          },
          finally: final => {
            setCreateOrderLoading(false)

            console.log('finally', final)
          }
        })
      })
    }
  }

  const init = async () => {
    if (!checkServer()) {
      // 微信环境
      if (isWeixin() && !isPc()) {
        // 如果返回有code，授权成功
        const code = searchParams.get('code')
        const payFee = searchParams.get('state')

        if (code) {
          setCreateOrderLoading(true)
          const res = await getAuthCode({ code })
          if (res?.code !== 0) {
            setCreateOrderLoading(false)
            toast.error(res?.message || '授权失败～')
            return
          }

          const params = {
            money: payFee,
            osType: 3,
            payType: 1
          }

          const createOrderRes = await createOrder(params)

          if (createOrderRes?.code !== 0) {
            toast.error(createOrderRes?.message || '创建订单失败，请稍后再试～')
            setCreateOrderLoading(false)

            return
          }
          weixinPay(createOrderRes?.data?.codeUrl)
        }
      }
    }
  }

  useEffect(() => {
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!aliPayForm) return
    const dom = document.getElementById('alipay_submit')
    if (dom) {
      dom?.submit()
    }
  }, [aliPayForm])

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      {aliPayForm && <div className="w-full h-40" dangerouslySetInnerHTML={{ __html: aliPayForm }}></div>}

      <PayModal orderDetail={orderDetail} isOpen={isOpenPayModal} setIsOpen={setIsOpenPayModal} />
      {createOrderLoading ? <Loading /> : null}
      <div className="w-full flex justify-end mb-[26px]">
        <Link href="/model" className="text-[#3162FF] underline">
          了解计费规则
        </Link>
      </div>
      <div className="w-full relative">
        <img src={agicto_product_agent_wechat} alt={title} className="absolute w-[8%] top-[14.28%] right-[5%]" />
        <img src={recharge_center_bg1} alt={title} className="w-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-[11] mt-[28px] ">
        {pricePlan?.map((item, index) => (
          <div key={index} className="rounded-md   overflow-hidden bg-white">
            <div className={`w-full h-[10px] ${item?.headColor}`}></div>
            <div className="p-[35px]">
              <div className="w-full  flex items-end justify-center mb-[35px]">
                <img src={item?.label} alt="agicto-icon" className="h-[55px]" />
                <img src={recharge_yuan} alt="agicto-icon" className="h-[30px]" />
              </div>
              <div className="mt-4  border-t-2 border-b-2 py-4 flex w-full justify-center">
                <span className="text-black">
                  赠送 <span className="text-rose-500">{item?.give}</span> 元
                </span>
              </div>
              {item?.isHaveSupport && (
                <div className="border-b-2 py-4 flex w-full justify-center">
                  <span className="text-black ">技术支持服务</span>
                </div>
              )}
              <div className="flex items-center justify-center mt-5">
                <button
                  disabled={createOrderLoading}
                  onClick={() => onCreateOrder(item?.value)}
                  type="button"
                  className={`inline-flex h-[45px] text-center items-center justify-center w-full  lg:w-[130px] px-2.5 py-1.5 border border-transparent text-xs font-medium rounded-lg shadow-sm text-white bg-[#3162FF] rounded-lg hover:bg-blue-700 focus:outline-none ${
                    createOrderLoading ? 'bg-[#fafafa] text-[#ccc]' : ''
                  } `}
                >
                  购买
                </button>
              </div>
            </div>
            {/* <span className={`text-[14px] mt-[17px] text-black ${item?.active ? 'text-[#3162FF]' : ''}`}>{item?.name}</span> */}
          </div>
        ))}
        <div className="rounded-md overflow-hidden bg-white">
          <div className={`w-full h-[10px] bg-gradient-to-r from-[#8331FF] to-[#2BB1F8] to-[#00D9B6]`}></div>
          <div className="p-[35px]">
            <div className="w-full  flex items-end justify-center  mb-[35px]">
              <img src={recharge_custom_price} alt="agicto-icon" className="h-[55px]" />
            </div>
            <div className="">
              <input
                type="number"
                name="price"
                value={inputPrice}
                onChange={onAmountChange}
                className="block w-full my-2 text-xl font-semibold px-6 py-3 mr-4 mt-4   rounded-md border-0 py-1.5 pl-7   text-gray-900 ring-1 ring-inset ring-gray-300   focus:ring-2 focus:ring-inset focus:ring-[#3162FF] "
                placeholder="输入金额"
              />
            </div>
            <div className="mt-4  py-4 flex w-full justify-center">
              <span className="text-black">输入自定义金额，最小金额为10元</span>
            </div>

            <div className="flex items-center justify-center mt-5">
              <button
                disabled={createOrderLoading}
                onClick={() => onCreateOrder(inputPrice)}
                type="button"
                className={`inline-flex h-[45px] text-center items-center justify-center w-full  lg:w-[130px] px-2.5 py-1.5 border border-transparent text-xs font-medium rounded-lg shadow-sm text-white bg-[#3162FF] rounded-lg hover:bg-blue-700 focus:outline-none ${
                  createOrderLoading ? 'bg-[#fafafa] text-[#ccc]' : ''
                } `}
              >
                购买
              </button>
            </div>
          </div>
          {/* <span className={`text-[14px] mt-[17px] text-black ${item?.active ? 'text-[#3162FF]' : ''}`}>{item?.name}</span> */}
        </div>
      </div>

      {/* <div>
         <RadioGroup value={selectedType} onChange={e => setSelectedType(e?.value)}>
          <RadioGroup.Label>充值方式</RadioGroup.Label>
          <div className=" flex flex-wrap items-center">
            {rechargeType.map(item => {
              const active = selectedType === item.value
              return (
                <div key={item.value} className="flex items-center">
                  <RadioGroup.Option
                    disabled={item?.disabled}
                    value={item}
                    className={classNames(
                      active ? 'border-blue-500 ring-2 ring-blue-500' : '',
                      'relative w-fit mr-4 mt-4 block bg-white border rounded-lg shadow-sm px-6 py-4 cursor-pointer sm:flex sm:justify-between focus:outline-none'
                    )}
                  >
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label as="p" className="flex w-[100px] items-center font-medium text-gray-900">
                          {item?.icon}
                          <span className="ml-4"> {item.name}</span>
                        </RadioGroup.Label>
                      </div>
                    </div>
                  </RadioGroup.Option>
                </div>
              )
            })}
            {rechargeType?.[0]?.disabled && <span className="text-gray-400 text-md ml-2 mt-4">当前环境不支持微信支付方式</span>}
            {rechargeType?.[1]?.disabled && <span className="text-gray-400 text-md ml-2 mt-4">当前环境不支持支付宝支付方式</span>}
          </div>
        </RadioGroup>
        <RadioGroup
          className="my-4"
          value={selectedPrice}
          onChange={e => {
            setInputPrice(0)
            setSelectedPrice(e?.value)
          }}
        >
          <RadioGroup.Label>充值金额</RadioGroup.Label>
          <div className=" flex flex-wrap items-center">
            {pricePlan?.map(plan => {
              const currentChecked = selectedPrice === plan?.value
              return (
                <RadioGroup.Option
                  key={plan.value}
                  value={plan}
                  className={classNames(
                    currentChecked ? 'border-blue-500 ring-2 ring-blue-500' : '',
                    'relative mr-4 mt-4 block bg-white border rounded-lg shadow-sm px-6 py-4 cursor-pointer flex justify-between focus:outline-none'
                  )}
                >
                  <RadioGroup.Description as="div" className=" flex text-sm mt-0 block   text-right">
                    <div className="font-medium text-gray-900">{plan.label}</div>
                  </RadioGroup.Description>
                </RadioGroup.Option>
              )
            })}
            {selectedPrice === 0 ? (
              <input
                type="number"
                name="price"
                value={inputPrice}
                onChange={onAmountChange}
                className="block w-[150px] text-xl font-semibold px-6 py-3 mr-4 mt-4   rounded-md border-0 py-1.5 pl-7   text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 "
                placeholder="0.00"
              />
            ) : null}
          </div>
        </RadioGroup>
      </div>
      <div className="flex mt-10">
        <button
          disabled={createOrderLoading}
          onClick={onCreateOrder}
          type="button"
          className={`inline-flex h-[45px] text-center items-center justify-center w-full  lg:w-[250px] px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none ${
            createOrderLoading ? 'bg-[#fafafa] text-[#ccc]' : ''
          } `}
        >
          立即支付
        </button>
      </div> */}
    </div>
  )
}
