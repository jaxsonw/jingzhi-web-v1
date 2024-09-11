'use client'
import React, { useEffect } from 'react'
import { getLoginUrl, loginByCode } from '../../services/index'

import 'swiper/bundle'
import { setCookie } from '@/src/utils'
import { toast } from 'react-toastify'

//获取查询参数
function getQueryParams(url) {
  const queryParams = {};
  const queryString = url.split('?')[1];

  if (queryString) {
    const params = queryString.split('&');

    params.forEach(param => {
      const [key, value] = param.split('=');
      queryParams[key] = decodeURIComponent(value);
    });
  }

  return queryParams;
}


export default function Login() {

  const gotoLogin = async () => {
    try {
      // console.log(window.location.href)
      const res = await getLoginUrl({
        // url: window.location.href
      })
      if (res.code == 0) {
        // console.log("loginUrl", res?.data?.loginUrl)
        location.href = res.data.loginUrl
      }
    } catch (err) {
      toast.error("地址获取失败")
      setTimeout(() => {
        location.href = "/modelplaza/"
      }, 1500)
    }
  }

  const getToken = async (code) => {
    const res = await loginByCode({ code: code })
    // console.log("loginRes", res)
    if (res.code == 0) {
      setCookie('idToken', res?.data?.accessToken, 30)
      const cb_url = localStorage.getItem("cb_url")
      if (cb_url) localStorage.removeItem("cb_url")
      location.href = cb_url || "/modelplaza/"
      // localStorage.setItem('token', res?.data?.accessToken)
      // location.href = "/space"
    } else {
      toast.error(res?.message || "登录失败")

      //获取来源页地址
      const cb_url = localStorage.getItem("cb_url")
      if (cb_url) localStorage.removeItem("cb_url")
      setTimeout(() => {
        location.href = "/modelplaza/"
      }, 1500)
    }
  }

  useEffect(() => {
    const searchParams = getQueryParams(window.location.href)
    if (searchParams.code) {
      console.log("code", searchParams.code)
      getToken(searchParams.code)
    } else {
      gotoLogin()
    }
  }, [])

  return <div></div>
}
