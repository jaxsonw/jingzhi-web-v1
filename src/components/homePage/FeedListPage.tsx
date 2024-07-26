'use client'
import React from 'react'
import Image from 'next/image'
import { NavLinks } from './NavLinks'
import { agicto_product_agent_wechat, agicto_icon_color } from '../../consts/img'
import { TITLE, RECORD_NUMBER } from '../../../config'

const faqs = [
  {
    question: 'AGICTO可以干什么?',
    answer: '我们提供了超过50种国内外主流人工智能模型，覆盖了开源和闭源选项，用户可以通过API接口轻松调用，满足不同场景和需求。'
  },
  // {
  //   question: '企业可以使用吗?',
  //   answer:
  //     '当然可以，我们的服务可实现高达每分钟40,000次的并发请求处理能力，远超过一般服务水平的每分钟100次，保证了即使在高负载情况下也能提供稳定、迅速的响应。'
  // },
  {
    question: '如果前期充值了，后面的新模型也可以用吗?',
    answer: '当然可以，我们提供的是按量计费，也就是说你只需要为你实际使用的模型付费，而不会因为预购模型而产生额外的费用。'
  },
  {
    question: '刚接触AI，如何选择模型?',
    answer: '我们提供了模型调试广场，可以根据你的需求和预算进行调试，帮助你快速找到适合的模型。'
  },
  {
    question: '如果开发过程中遇到问题，你们可以提供帮助吗?',
    answer: '当然可以，我们客服7*24小时在线，随时为你解答问题，并提供免费的专业技术支持。'
  }
  // {
  //   question: '对于开发语言有限制吗?',
  //   answer: '我们支持多种开发语言，包括Python、Java、C++、Go等，你可以根据自己的需求选择适合的编程语言进行对接。'
  // }
]

function QrCodeBorder(props: any) {
  return (
    <svg viewBox="0 0 96 96" fill="none" aria-hidden="true" {...props}>
      <path
        d="M1 17V9a8 8 0 0 1 8-8h8M95 17V9a8 8 0 0 0-8-8h-8M1 79v8a8 8 0 0 0 8 8h8M95 79v8a8 8 0 0 1-8 8h-8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function FeedListPage() {
  return (
    <div className="w-screen h-screen  bg-[#F2F8FF]">
      <div className="bg-[#F2F8FF] text-left">
        <div className="mx-auto max-w-7xl px-6 pt-10  lg:px-8 ">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">常见问题</h2>
              <p className="mt-4 text-base leading-7 text-gray-600">
                如果这里不能解决你的问题，移步
                <a href="https://agicto.com/docs/" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  开发文档
                </a>
                ，或者联系客服
              </p>
            </div>
            <div className="mt-10 lg:col-span-7 lg:mt-0">
              <dl className="lg:space-y-10 space-y-2">
                {faqs.map(faq => (
                  <div key={faq.question}>
                    <dt className="text-base font-semibold leading-7 text-gray-900">{faq.question}</dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">{faq.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="flex border-1 border-y border-[#333] flex-col items-start justify-between gap-y-12 px-20 pb-6 pt-16 lg:flex-row lg:items-center lg:py-8 mt-4">
        <div>
          <div className="flex items-center text-gray-900">
            <img src={agicto_icon_color} alt={TITLE} className="h-10 w-10 flex-none fill-cyan-500" />
            <div className="ml-4 text-left">
              <p className="text-base font-semibold">AGICTO</p>
              <p className="mt-1 text-sm">{RECORD_NUMBER}</p>
            </div>
          </div>
          <nav className="mt-11 flex gap-8">
            <NavLinks />
          </nav>
        </div>
        <div className="group relative -mx-4 flex items-center self-stretch p-4 transition-colors hover:bg-gray-100 sm:self-auto sm:rounded-2xl lg:mx-0 lg:self-auto lg:p-6">
          <div className="relative flex h-36 w-36 flex-none items-center justify-center">
            <QrCodeBorder className="absolute inset-0 h-full w-full stroke-gray-300 transition-colors group-hover:stroke-cyan-500" />
            {/* <Image src={qrCode} alt="" unoptimized /> */}
            <img
              width="120"
              height="120"
              // className="absolute left-1/2 right-1/2 -translate-x-1/2	 lg:right-16 bottom-16 w-[132px]"
              src={agicto_product_agent_wechat}
              alt={TITLE}
            />
          </div>
          <div className="ml-8 text-left lg:w-64">
            <p className="text-base font-semibold text-gray-900">
              <span>
                <span className="absolute inset-0 sm:rounded-2xl" />
                联系客服
              </span>
            </p>
            <p className="mt-1 text-sm text-gray-700">任何问题均可扫描此二维码联系客服</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedListPage
