import config from '../../config'
import OpenAI from '../../icons/openai'

export default function FeedList() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto  px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
          <div className="mx-auto w-full max-w-xl lg:mx-0">
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-left">什么是{config.title}?</p>

            <p className="mt-6 text-lg leading-8 text-gray-600  text-left">
              在AGICTO上，我们汇集了来自各个领域的优秀AI模型，并为其提供了统一的接口调用方式。这种整合的方式使得您无需耗费大量时间和精力去逐个了解和学习不同的AI模型接口调用方法，而是通过一个统一的接口直接进行调用和使用。
            </p>
          </div>
          <div className="mx-auto grid w-full max-w-xl grid-cols-2 items-center gap-y-12 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:pl-8 ">
            <OpenAI />
            <img className="max-h-12  w-auto h-[38px] object-contain object-left" src="https://ew6.cn/360.png" alt="Reform" />
            <img
              className="max-h-12  w-auto h-[38px] object-contain object-left"
              src="https://ebui-cdn.bj.bcebos.com/yiyan-logo.png"
              alt="Reform"
            />
            <img
              className="max-h-12  w-auto h-[38px] object-contain object-left"
              src="https://ebui-cdn.bj.bcebos.com/yiyan-logo.png"
              alt="Reform"
            />
            <img className="max-h-12 w-auto h-[38px] object-contain object-left" src="https://ew6.cn/xunfei.png" alt="xunfei" />
            <div className="flex items-center relative">
              <img
                className="max-h-12 w-full object-contain object-left"
                src="https://img.alicdn.com/imgextra/i1/O1CN01RBdOZH1DiXtigOchP_!!6000000000250-54-tps-200-200.apng"
                alt="Laravel"
                width={136}
                height={48}
              />
              <span className="absolute text-2xl left-[55px] font-bold">通义千问</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
