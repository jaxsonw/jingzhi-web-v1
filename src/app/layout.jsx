'use client'
import { ToastContainer, toast } from 'react-toastify'
import Script from 'next/script'
import StyledComponentsRegistry from '../lib/AntdRegistry'
import 'react-toastify/dist/ReactToastify.css'
import 'swiper/css'
import 'swiper/css/pagination'

import '../styles/base.css'
// import './globals.css'
import '../styles/globals.css'
import '../styles/markdown.css'
import '../styles/animation.css'

// import '../styles/markdown.css'

function RootLayout({ children }) {
  // if (typeof window !== 'undefined') {
  //   console.log('widnow', window.__NEXT_DATA__)
  // }
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href={process.env.NEXT_PUBLIC_OTHER_USE !== "wuhan" ?
            "https://caict-portal-storage.oss-cn-beijing.aliyuncs.com/2bb87663-4a57-4692-9b5c-acd9b9b7df49" :
            "http://caict-llm-portal-storage.oss-cn-beijing.aliyuncs.com/system-logo/827a8ec5-2edf-46a3-9b90-5c54a1f6fd3b"
          }
          type="image/x-icon"
        />
      </head>
      <Script id="sse" src="https://ew6.cn/sse.js"></Script>
      <Script id="weixinopenjs" src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js" />
      <Script id="feishusdk" src="https://lf1-cdn-tos.bytegoofy.com/goofy/locl/lark/external_js_sdk/h5-js-sdk-1.2.12.js" />
      <body>
        <ToastContainer
          style={{
            zIndex: 999999
          }}
        />
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}

export default RootLayout
