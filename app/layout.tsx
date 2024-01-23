import { Inter } from 'next/font/google'
import { ToastContainer, toast } from 'react-toastify'
import type { Metadata } from 'next'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import Head from 'next/head'

import 'react-toastify/dist/ReactToastify.css'
import './globals.css'
import '../styles/markdown.css'
import 'swiper/css'
import config from '../config'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: config.title,
  description: config.title
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
