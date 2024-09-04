'use client'
import React, { useEffect, useState } from 'react'
import qrcode from 'qrcode'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { HomeIcon } from '@heroicons/react/20/solid'
import { PulseLoader } from 'react-spinners'
import { PiShieldCheckeredFill } from 'react-icons/pi'
import { RiWechatPayFill } from 'react-icons/ri'
import { SiAlipay } from 'react-icons/si'
import { toast } from 'react-toastify'
import { getOrderStatus, getWechatSign, getOrderPayInfo } from '../../../../services/recharge'
import { checkServer, isWeixin, isPc } from '../../../../utils/index'

let countdown = null
const PayPage = () => {


    const searchParams = useSearchParams()
    const [createOrderLoading, setCreateOrderLoading] = useState(false)
    const [startCount, setStartCount] = useState(false)
    const [aliPayForm, setAliPayForm] = useState('')
    const [payModel, setPayModel] = useState(1) // 1 微信扫码 2 微信跳转 3 支付宝跳转
    const [imgUrl, setImgUrl] = useState('')
    const [orderStatus, setOrderStatus] = useState(0)
    const [count, setCount] = useState(180)

    const autoChangePayType = () => {
        let payType = 1
        // h5 支付宝
        if (!isPc() && !isWeixin()) payType = 2
        return payType
        // if(isWeixin())
    }
    const osType = isWeixin() ? 3 : isPc() ? 1 : 2
    const payType = Number(searchParams.get('payType')) || autoChangePayType()
    const orderSn = searchParams.get('orderSn')
    const [payFee, setPayFee] = useState(0)
    const [codeUrl, setCodeUrl] = useState("")



    // pc微信
    const pcWechat = () => {
        setStartCount(true)
        setPayModel(1)
        qrcode
            .toDataURL(codeUrl, {
                errorCorrectionLevel: 'H',
                type: 'image/jpeg',
                quality: 0.3,
                margin: 1,
                color: {
                    dark: '#111111'
                    // light: '#FFBF60FF',
                }
            })
            .then(url => {
                setImgUrl(url)
            })
    }
    // pc h5支付宝
    const aliPay = () => {
        setPayModel(3)
        setAliPayForm(codeUrl)
    }

    // h5 微信
    const weixinPay = async (sign) => {

        if (!checkServer()) {
            const wehchatRes = await getWechatSign({ url: window.location.href })
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
                    timestamp: codeUrl?.timeStamp, // 支付签名时间戳，注意微信 jssdk 中的所有使用 timestamp 字段均为小写。但最新版的支付后台生成签名使用的 timeStamp 字段名需大写其中的 S 字符
                    nonceStr: codeUrl?.nonceStr, // 支付签名随机串，不长于 32 位
                    package: codeUrl?.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                    signType: codeUrl?.signType, // 微信支付V3的传入 RSA ,微信支付V2的传入格式与V2统一下单的签名格式保持一致
                    paySign: codeUrl?.paySign, // 支付签名
                    success: res => {
                        toast.success('支付成功～')
                        window.location.href = '/space/recharge/'
                    },
                    error: err => {
                        console.log('err', err)
                    },
                    finally: final => {
                        console.log('finally', final)
                    }
                })
            })
        }
    }

    const getOrderInfo = async () => {
        const res = await getOrderPayInfo({
            orderSn,
            payType,
            osType
        })
        if (res?.code !== 0) {
            toast.error(res?.message || "订单错误")
        }
        setPayFee(res?.data?.payFee)
        setCodeUrl(res?.data?.codeUrl)


    }



    const init = async () => {
        setCreateOrderLoading(true)

        await checkOrderStatus()
        // pc微信支付
        if (osType === 1 && payType === 1) {
            pcWechat()
        }
        // pc 支付宝支付
        if (payType === 2) {
            aliPay()
        }
        // h5 微信
        if (osType === 3) {
            weixinPay()
        }
        setCreateOrderLoading(false)

    }

    useEffect(() => { getOrderInfo() }, [])

    useEffect(() => {
        if (!payFee || !codeUrl) {
            return
        }
        init()
    }, [payFee, codeUrl])



    useEffect(() => {
        if (!aliPayForm) return
        const dom = document.getElementById('alipay_submit')
        if (dom) {
            dom?.submit()
        }
    }, [aliPayForm])


    const checkOrderStatus = async () => {
        const res = await getOrderStatus({ orderSn })
        if (res?.data?.orderStatus === 1) {
            setStartCount(false)
            clearInterval(countdown)
            setOrderStatus(1)
            setCount(0)
            toast.success('支付成功～')
            window.location.href = "/space/recharge/"
        }
    }

    useEffect(() => {
        if (!startCount) return
        checkOrderStatus()
        countdown = setInterval(() => {
            if (count <= 0) {
                clearInterval(countdown)
                setStartCount(false)
                window.location.reload()
            } else {
                setCount(count - 1)
            }
        }, 1000)
        return () => clearInterval(countdown) // 清理函数
    }, [count, startCount, orderSn])





    const getTwoDigitString = num => (num < 10 ? '0' + num : num)

    const min = getTwoDigitString(Math.floor(count / 60))
    const sec = getTwoDigitString(count % 60)

    return (
        <>
            <div className='max-w-[1040px]'>
                <nav className="flex" aria-label="Breadcrumb">
                    <ol role="list" className="bg-white rounded-md shadow px-6 flex space-x-4">
                        <li className="flex">
                            <div className="flex items-center">
                                <a href="/space/" className="text-gray-400 hover:text-gray-500">
                                    <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                                    <span className="sr-only">Home</span>
                                </a>
                            </div>
                        </li>
                        <li className="flex">
                            <div className="flex items-center">
                                <svg
                                    className="flex-shrink-0 w-6 h-full text-gray-200"
                                    viewBox="0 0 24 44"
                                    preserveAspectRatio="none"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                                </svg>
                                <a href="/space/recharge/" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                                    充值中心
                                </a>
                            </div>
                        </li>
                        <li className="flex">
                            <div className="flex items-center">
                                <svg
                                    className="flex-shrink-0 w-6 h-full text-gray-200"
                                    viewBox="0 0 24 44"
                                    preserveAspectRatio="none"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                                </svg>
                                <span className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">订单支付</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                {imgUrl && payModel === 1 && (
                    <>
                        <div className=" flex flex-col justify-center mt-20 w-[240px] h-[240px] relative items-center m-auto">
                            {payFee ? <div className="text-lg font-bold mb-4 text-rose-700">支付金额：{payFee}元</div> : null}
                            {orderStatus === 1 && (
                                <div className="absolute w-[240px] h-[240px] font-bold bg-[rgba(0,0,0,0.8)] z-10 text-white text-xl flex justify-center items-center">
                                    <PiShieldCheckeredFill size={20} className="mr-2" /> 支付成功
                                </div>
                            )}
                            {payType === 1 ? (
                                <RiWechatPayFill className="text-[#51a738] z-9 bg-white rounded mr-2 absolute top-[110px] left-[100px]" size={50} />
                            ) : (
                                <SiAlipay className="text-[#51a2d8] z-9 bg-white rounded mr-2 absolute top-[95px] left-[100px]" size={50} />
                            )}
                            <Image src={imgUrl} className="m-auto" width={240} height={240} />
                        </div>
                        <span className="flex m-auto flex-wrap justify-center text-center font-bold text-xl mt-10">
                            请使用{payType === 1 ? '微信' : '支付宝'}扫码支付,订单支付剩余时间
                            <span className="text-rose-800 flex">
                                {min}:{sec}
                            </span>
                            ,请尽快支付
                        </span>
                    </>
                )}

                {/* 微信支付模式 */}
                {payModel === 2 && (
                    <div className="w-full flex-col pt-10 flex justify-center font-bold items-center">
                        <PulseLoader color="#4f46e5" />

                        <span className="mt-4">正在跳转到微信支付，请稍后...</span>
                    </div>
                )}
                {/* 跳转支付宝模式 */}
                {payModel === 3 && (
                    <div className="w-full flex-col pt-10 flex justify-center font-bold items-center">
                        <PulseLoader color="#4f46e5" />

                        <span className="mt-4">正在跳转到支付宝，请稍后...</span>
                    </div>
                )}


            </div>

        </>
    )
}

export default PayPage
