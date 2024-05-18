import React from 'react'
import Image from 'next/image'

const InvoicePage = () => {
  return (
    <div className="flex px-16 min-h-full items-center flex-col max-w-6xl m-auto">
      <h1 className="text-2xl font-bold text-center pt-[60px]">请扫描下方二维码申请发票</h1>
      <Image src="https://ew6.cn/stark_qrcode.jpg" className="my-4" width={350} height={400} />
      <div className="text-xl text-center">
        请提前准备好<span className="text-rose-900 font-bold">支付截图</span>、
        <span className="text-rose-900 font-bold">发票抬头等信息</span>
        发送客服
      </div>
    </div>
  )
}

export default InvoicePage
