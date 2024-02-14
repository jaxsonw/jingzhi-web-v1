import { Inter } from 'next/font/google'
import { ToastContainer, toast } from 'react-toastify'
import Header from '../components/common/Header'
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js" />
      <Script
        dangerouslySetInnerHTML={{
          __html: ` 
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?983fca994414ee989e1b88bd0193f557";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();`
        }}
      />
      <body className={inter.className}>
        <ToastContainer
          style={{
            zIndex: 999999
          }}
        />
        <Header />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  )
}
