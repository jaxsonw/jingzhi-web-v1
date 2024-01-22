'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { toast as Toast } from 'react-toastify'
import { getEmailCode, login } from '../../services/index'
import { vaildEmail, checkServer } from '../../utils/index'
import Logo from '/public/logo.jpeg'
import LoginBg from '/public/login_bg.png'

export default function Login() {
  const searchParams = useSearchParams()
  const [sendLoading, setSendLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [countdown, setCountdown] = useState(60)

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
    // TODO: Implement code sending logic here
  }

  const onSubmit = async () => {
    const params = {
      email,
      verify_code: code
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

  useEffect(() => {
    if (!checkServer()) {
      window?.localStorage?.clear()
    }
  }, [])
  return (
    <>
      <div className="flex min-h-[calc(100vh_-_82px)] flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="flex items-center">
              {/* <img
                className="h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              /> */}
              <Image className="w-[35px]" src={Logo} alt="" />
              <h2 className="ml-[10px] text-2xl font-bold leading-9 tracking-tight text-gray-900">登录&注册</h2>
            </div>

            <div className="mt-10">
              <div>
                <form action="#" method="POST" className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                      邮箱
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={e => setEmail(e?.target?.value)}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block px-2 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      验证码
                    </label>
                    <div className="mt-2 flex items-center">
                      <input
                        onChange={e => setCode(e?.target?.value)}
                        id="password"
                        name="password"
                        type="text"
                        autoComplete="current-password"
                        required
                        className="block px-2 w-2/3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <button
                        disabled={sendLoading || isCodeSent}
                        onClick={handleSendCode}
                        type="button"
                        className="rounded h-[35px] w-1/3 bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        {isCodeSent ? `${countdown} s` : '发送'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={onSubmit}
                      className="flex  w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      登入
                    </button>
                  </div>
                </form>
              </div>

              <div className="mt-10">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <Image src={LoginBg} className="absolute inset-0 h-full w-full object-cover" />
          {/* <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          /> */}
        </div>
      </div>
    </>
  )
}
