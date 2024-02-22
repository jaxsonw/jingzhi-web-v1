import {useState} from "react"
import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import {home_howuse_bg1,home_howuse_bg2,home_howuse_data,home_howuse_docs,home_howuse_pricing,home_howuse_recharge,home_howuse_registry,home_howuse_text_bg,home} from "../../consts/img"

const features = [
    {
        name: '注册账号',
        description: `操作指南： 点击页面右上角的“注册/登录”按钮。
        确认您的电子邮箱地址，激活账号。
        「提示： 提供真实准确的信息可帮助我们提供更个性化的服务。」`,
        icon: CloudArrowUpIcon,
    },
    {
        name: '选择合适的服务',
        description: `
        浏览我们提供的计费标准。
        根据需求对比不同的功能和定价计划。
        选择最适合您需求的服务。
        `,
        icon: LockClosedIcon,
    },
    {
        name: '配置您的项目',
        description:
            '查看开发文档，将我们的API接口及传参融合到您的项目中',
        icon: ArrowPathIcon,
    },
    {
        name: '充值您的账号',
        description:
            '如果您的账号余额不足，请您在使用前先进行充值',
        icon: FingerPrintIcon,
    },
]

export default function Example() {

    const [current,setCurrent] = useState(0)


    const handleHover = () => {
        
    }

    const handleLeave= ()=>setCurrent(0)

    return (
      <div className="relative w-full h-screen bg-[#F2F8FF]">
        <img src={home_howuse_bg1} className="absolute z-1 w-[68.125%] top-0 left-1/2  -translate-x-1/2" />
        <img src={home_howuse_bg2} className="absolute z-1 w-[65.125%] top-0 left-1/2  -translate-x-1/2" />
        <div className="relative" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
          <div className="w-10 h-10 bg-black rounded-full inline-block"></div>
          <div className="absolute top-6 left-5 w-1 h-16 border-t border-black"></div>
          <div className="absolute top-5 left-5 w-20 h-20 border border-black flex items-center justify-center">
            <span className="text-black">Some Text</span>
          </div>
        </div>
        {current === 0 ? (
          <div className="absolute z-1 w-[65.125%] top-0 left-1/2  -translate-x-1/2 flex flex-col justify-center items-center">
            <img src={home_howuse_data} className="w-[23.4285%]" />
            <span className="text-gray-900 font-bold">调用流程</span>
          </div>
        ) : null}
        {current === 1 ? (
          <div className="absolute z-1 w-[65.125%] top-0 left-1/2  -translate-x-1/2 flex flex-col justify-center items-center">
            <img src={home_howuse_registry} className="w-[23.4285%]" />
            <span className="">点击页面右上角，注册/登录按钮 输入邮箱验证码快速注册账号</span>
          </div>
        ) : null}
        {current === 2 ? (
          <div className="absolute z-1 w-[65.125%] top-0 left-1/2  -translate-x-1/2 flex flex-col justify-center items-center">
            <img src={home_howuse_pricing} className="w-[23.4285%]" />
            <span className="">浏览我们提供的计费标准 选择最适合您需求的服务</span>
          </div>
        ) : null}
        {current === 3 ? (
          <div className="absolute z-1 w-[65.125%] top-0 left-1/2  -translate-x-1/2 flex flex-col justify-center items-center">
            <img src={home_howuse_docs} className="w-[23.4285%]" />
            <span className="">查看开发文档 将我们的API接口传参融入到您的开发项目中</span>
          </div>
        ) : null}

        {current === 4 ? (
          <div className="absolute z-1 w-[65.125%] top-0 left-1/2  -translate-x-1/2 flex flex-col justify-center items-center">
            <img src={home_howuse_recharge} className="w-[23.4285%]" />
            <span className="">在使用前请先查看您的账户情况 可进入充值中心按需充值</span>
          </div>
        ) : null}
      </div>
      // <div className=" bg-white py-24 sm:py-32">
      //     <div className="absolute inset-0 z-20 bg-[radial-gradient(45rem_100rem_at_top,theme(colors.indigo.200),white)] opacity-20" />
      //     <div className="absolute inset-y-0 right-1/2 -z-10 mr-8 w-[300%] origin-top-left skew-x-[-40deg] skew-y-[0deg] bg-white shadow-xl shadow-blue-600/10 ring-1 ring-blue-50 sm:mr-28 lg:mr-0 xl:mr-8 xl:origin-center" />

      //     <div className="mx-auto max-w-7xl px-6 lg:px-8">
      //         <div className="mx-auto max-w-2xl lg:text-center">
      //             <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      //                 如何使用
      //             </p>
      //         </div>

      //         <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
      //             <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
      //                 {features.map((feature) => (
      //                     <div key={feature.name} className="relative pl-16">
      //                         <dt className="text-base font-semibold leading-7 text-gray-900 text-left">
      //                             <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
      //                                 <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
      //                             </div>
      //                             {feature.name}
      //                         </dt>
      //                         <dd className="mt-2 text-base leading-7 text-gray-600 text-left">{feature.description}</dd>
      //                     </div>
      //                 ))}
      //             </dl>
      //         </div>

      //     </div>
      // </div>
    )
}
