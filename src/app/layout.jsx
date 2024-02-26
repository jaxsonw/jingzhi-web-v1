"use client"
import { Inter } from 'next/font/google'
import { ToastContainer, toast } from 'react-toastify'
import {usePathname } from "next/navigation"
import Header from '../components/common/Header'
import HeaderBule from "../components/common/HeaderBlue"
import Footer from '../components/common/Footer'
import Head from 'next/head'
import Script from 'next/script'

import 'react-toastify/dist/ReactToastify.css'
import 'swiper/css'
import 'swiper/css/pagination'
import './globals.css'
// import '../styles/markdown.css'

import config from '../../config'

const inter = Inter({ subsets: ['latin'] })
const hiddenHeaderPage = ["/","/demo"]

export default function RootLayout({ children,page }) {
    const pathname = usePathname()

  return (
    <html lang="en">
      <Script id="weixinopenjs" src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js" />
      <Script id="feishusdk" src="https://lf1-cdn-tos.bytegoofy.com/goofy/locl/lark/external_js_sdk/h5-js-sdk-1.2.12.js" />

      <Script
        id="baidutongji"
        //   dangerouslySetInnerHTML={{
        //     __html: `
        //  `
        //   }}
      >
        {`var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?983fca994414ee989e1b88bd0193f557";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();`}
      </Script>
      <body className={inter.className}>
        <ToastContainer
          style={{
            zIndex: 999999
          }}
        />
        {hiddenHeaderPage?.includes(pathname) ? null : <Header />}
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  )
}
