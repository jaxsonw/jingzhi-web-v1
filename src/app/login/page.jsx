'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay } from 'swiper/core'
import { Mousewheel, Pagination } from 'swiper/modules'
import { toast as Toast } from 'react-toastify'
import BackgroundFirst from '../../components/login/BackgroundHeroFirst'
import BackgroundSecond from '../../components/login/BackgroundHeroSecond'
import BackgroundThird from '../../components/login/BackgroundHeroThird'
import { getEmailCode, getMobileCode, login, loginByMobile } from '../../services/index'
import { vaildEmail, checkServer, isPc } from '../../utils/index'
import { icon_logo_color } from '../../consts/img'
import { title } from '../../../config'
import 'swiper/bundle'
import { Segmented } from 'antd';

SwiperCore.use([Autoplay])

export default function Login() {
  const searchParams = useSearchParams()
  const [sendLoading, setSendLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [code, setCode] = useState('')
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [pageStatus, setPageStatus] = useState(0)

  const handleSendCode = async () => {
    if (!vaildEmail(email)) {
      Toast.error('请检查您的邮箱格式')
      return
    }
    if (isCodeSent) return

    setSendLoading(true)
    const res = await getEmailCode({
      email: email,
      channel: searchParams.get('channel') || ''
    })
    setSendLoading(false)
    setIsCodeSent(true)

    if (res?.code === 0) {
      Toast.success('验证码发送成功～')
    } else {
      Toast.error(res?.message)
    }
  }

  const handleSendMobileCode = async () => {
    const regex = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    if (!regex.test(mobile)) {
      Toast.error('请检查手机号格式')
      return
    }
    if (isCodeSent) return

    setSendLoading(true)
    const res = await getMobileCode({
      mobile: mobile,
    })
    setSendLoading(false)
    setIsCodeSent(true)

    if (res?.code === 0) {
      Toast.success('验证码发送成功～')
    } else {
      Toast.error(res?.message)
    }
  }

  const onSubmit = async () => {
    //邮箱登录
    if (pageStatus === 0) {
      const params = {
        email,
        verify_code: code,
        invite_code: sessionStorage.getItem('invite_code') || searchParams.get('channel') || ''
      }
      if (!email || !code || submitLoading) return
      setSubmitLoading(true)
      const res = await login(params)
      setSubmitLoading(false)
      if (res?.code !== 0) {
        Toast.error(res?.message || '登录失败～')
        return
      }
      if (res?.code === 0) {
        localStorage.setItem('token', res?.data?.access_token)
        location.href = '/'
        Toast.success('登录成功～')
      }
    }
    //手机号登录
    if (pageStatus === 1) {
      const params = {
        mobile,
        verify_code: code,
        invite_code: sessionStorage.getItem('invite_code') || searchParams.get('channel') || ''
      }
      if (!mobile || !code || submitLoading) return
      setSubmitLoading(true)
      const res = await loginByMobile(params)
      setSubmitLoading(false)
      if (res?.code !== 0) {
        Toast.error(res?.message || '登录失败～')
        return
      }
      if (res?.code === 0) {
        localStorage.setItem('token', res?.data?.access_token)
        location.href = '/'
        Toast.success('登录成功～')
      }
    }
  }

  useEffect(() => {
    let timer
    if (isCodeSent && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    } else if (countdown === 0) {
      setCountdown(60)
      setIsCodeSent(false)
    }
    return () => clearTimeout(timer)
  }, [countdown, isCodeSent])

  // useEffect(() => {
  //   if (!checkServer()) {
  //     window?.localStorage?.clear()
  //   }
  // }, [])
  return (
    <>
      <div className="flex min-h-[calc(100vh_-_82px)] flex-1">
        <div className="flex flex-col w-full lg:w-2/5 p-6">
          <a href="/" className="flex h-[45px] items-center">
            <img className="h-[45px]" src={icon_logo_color} alt={title} />
          </a>
          <div className="flex flex-1 flex-col justify-center sm:px-6 ">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div className="flex flex-col items-center">
                <h2 className="  text-[32px]   leading-9 tracking-tight text-[#3162FF]">欢迎访问</h2>
                <span className="spacing-10 text-[#8c8c8c] mt-2 tracking-widest	">大模型调用枢纽</span>
              </div>
              <div className='mt-5'>
                <Segmented
                  options={["邮箱登录", "手机号登录"]}
                  onChange={(value) => {
                    switch (value) {
                      case "邮箱登录":
                        setPageStatus(0);
                        break
                      case "手机号登录":
                        setPageStatus(1);
                        break
                      default:
                    }
                  }}
                />
              </div>
              <div className="mt-5">
                <div>
                  <div action="#" method="POST" className="space-y-6">
                    <div>
                      {/* <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        邮箱
                      </label> */}
                      <div className="mt-2 border-b-2">
                        <input
                          value={pageStatus === 0 ? email : pageStatus === 1 ? mobile : ""}
                          onChange={e => {
                            if (pageStatus === 0) {
                              setEmail(e?.target?.value)
                            } else if (pageStatus === 1) {
                              setMobile(e?.target.value)
                            }
                          }}
                          autoComplete={pageStatus === 0 ? "email" : pageStatus === 1 ? "mobile tel" : ""}
                          placeholder={pageStatus === 0 ? "请输入邮箱" : pageStatus === 1 ? "请输入手机号" : ""}
                          required
                          className="block px-2 w-full  py-1.5 shadow-sm border-none focus:ring-0 shadow-none border-b border !foucs:outline-offset-0 !foucs:outline-0 		 text-gray-600 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="mt-2 flex items-center border-b-2">
                        <input
                          onChange={e => setCode(e?.target?.value)}
                          placeholder="请输入验证码"
                          autoComplete="current-password"
                          required
                          className="block px-2 w-full  py-1.5 shadow-sm border-none focus:ring-0 shadow-none border-b border !foucs:outline-offset-0 !foucs:outline-0 		 text-gray-600 placeholder:text-gray-400 sm:text-sm sm:leading-6"

                        // className="block px-2 w-2/3 h-[45px]   py-1.5 shadow-sm border-none focus:ring-0 shadow-none border-b border !foucs:outline-offset-0 !foucs:outline-0 		  text-gray-600 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                        <button
                          disabled={sendLoading || isCodeSent}
                          onClick={() => {
                            if (pageStatus === 0) {
                              handleSendCode()
                            } else if (pageStatus === 1) {
                              handleSendMobileCode()
                            }
                          }}
                          type="button"
                          className="rounded h-[45px] w-1/3  px-2 py-1 text-xs text-right font-semibold text-[#B5B5B5]   "
                        >
                          {isCodeSent ? `${countdown} s` : '获取验证码'}
                        </button>
                      </div>
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={onSubmit}
                        className="flex bg-gradient-to-l from-[#7A81FF] to-[#3162FF]  h-[45px] w-full justify-center items-center rounded-md bg-blue-600   text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      >
                        登录
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block ">
          <Swiper
            loop
            slidesPerView={1}
            mousewheel={true}
            autoplay={{ delay: 3000 }}
            // pagination={{
            //   clickable: false
            // }}
            modules={[Mousewheel]}
          >
            <SwiperSlide>
              <BackgroundFirst />
            </SwiperSlide>
            <SwiperSlide>
              <BackgroundSecond />
            </SwiperSlide>
            <SwiperSlide>
              <BackgroundThird />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  )
}
