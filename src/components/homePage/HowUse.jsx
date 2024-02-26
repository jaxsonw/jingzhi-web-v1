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


    const handleHover = (index) => {
        setCurrent(index)
        
    }

    const handleLeave= ()=>setCurrent(0)

    return (
      <div className="relative w-full h-screen bg-[#F2F8FF]">
        <img src={home_howuse_bg1} className="absolute z-1 w-[61rem] top-0 left-1/2  -translate-x-1/2" />
        <img src={home_howuse_bg2} className="absolute z-1 w-[59rem] top-0 left-1/2  -translate-x-1/2" />
        <div
          className="absolute z-1 group  top-[6rem] left-[10.5rem]  -translate-x-1/2 cursor-pointer flex items-center"
          onMouseEnter={() => handleHover(1)}
          onMouseLeave={handleLeave}
        >
          <div className="border-[#98E2FF]  border px-6 py-2 text-gray-900 rounded-full group-hover:border-[#3162FF] group-hover:bg-[#3162FF] group-hover:text-white">
            注册账号
          </div>
          <span className="h-[1px] w-10  bg-transparent	 group-hover:bg-[#3162FF]" />
          <div className="w-[30px] h-[30px] border rounded-full border-[#98E2FF] group-hover:border-[#3162FF]" />
        </div>

        <div
          className="absolute z-[9] group  top-[21rem] left-[19.5rem]  -translate-x-1/2 cursor-pointer flex items-center"
          onMouseEnter={() => handleHover(2)}
          onMouseLeave={handleLeave}
        >
          <div className="border-[#98E2FF]  border px-6 py-2 text-gray-900 rounded-full group-hover:border-[#3162FF] group-hover:bg-[#3162FF] group-hover:text-white">
            选择服务
          </div>
          <span className="h-[1px] w-10  bg-transparent	 group-hover:bg-[#3162FF]" />
          <div className="w-[30px] h-[30px] border rounded-full border-[#98E2FF] group-hover:border-[#3162FF]" />
        </div>

        <div
          className="absolute z-[9] group  top-[21rem] right-[7rem]  -translate-x-1/2 cursor-pointer flex flex-row-reverse items-center"
          onMouseEnter={() => handleHover(3)}
          onMouseLeave={handleLeave}
        >
          <div className="border-[#98E2FF]  border px-6 py-2 text-gray-900 rounded-full group-hover:border-[#3162FF] group-hover:bg-[#3162FF] group-hover:text-white">
            配置项目
          </div>
          <span className="h-[1px] w-10  bg-transparent	 group-hover:bg-[#3162FF]" />
          <div className="w-[30px] h-[30px] border rounded-full border-[#98E2FF] group-hover:border-[#3162FF]" />
        </div>

        <div
          className="absolute z-[9] group  top-[6rem] -right-[1.6rem]  -translate-x-1/2 cursor-pointer flex flex-row-reverse	 items-center"
          onMouseEnter={() => handleHover(4)}
          onMouseLeave={handleLeave}
        >
          <div className="border-[#98E2FF]  border px-6 py-2 text-gray-900 rounded-full group-hover:border-[#3162FF] group-hover:bg-[#3162FF] group-hover:text-white">
            充值使用
          </div>
          <span className="h-[1px] w-10  bg-transparent	 group-hover:bg-[#3162FF]" />
          <div className="w-[30px] h-[30px] border rounded-full border-[#98E2FF] group-hover:border-[#3162FF]" />
        </div>
        {current === 0 ? (
          <div className="absolute z-1 w-[65.125%] top-0 left-1/2  -translate-x-1/2 flex flex-col justify-center items-center">
            <img src={home_howuse_data} className="w-[21rem]" />
            <span className="text-gray-900 font-bold">调用流程</span>
          </div>
        ) : null}
        {current === 1 ? (
          <div className="absolute z-1 w-[65.125%] top-0 left-1/2  -translate-x-1/2 flex flex-col justify-center items-center">
            <img src={home_howuse_registry} className="w-[57.734%]" />
            <span className="text-gray-900 text-center">
              点击页面右上角，注册/登录按钮 <br /> 输入邮箱验证码快速注册账号
            </span>
          </div>
        ) : null}
        {current === 2 ? (
          <div className="absolute z-1 w-[65.125%] top-0 left-1/2  -translate-x-1/2 flex flex-col justify-center items-center">
            <img src={home_howuse_pricing} className="w-[57.734%]" />
            <span className="text-gray-900 text-center">
              浏览我们提供的计费标准
              <br /> 选择最适合您需求的服务
            </span>
          </div>
        ) : null}
        {current === 3 ? (
          <div className="absolute z-1 w-[65.125%] top-0 left-1/2  -translate-x-1/2 flex flex-col justify-center items-center">
            <img src={home_howuse_docs} className="w-[57.734%]" />
            <span className="text-gray-900 text-center">
              查看开发文档
              <br /> 将我们的API接口传参融入到您的开发项目中
            </span>
          </div>
        ) : null}

        {current === 4 ? (
          <div className="absolute z-1 w-[65.125%] top-0 left-1/2  -translate-x-1/2 flex flex-col justify-center items-center">
            <img src={home_howuse_recharge} className="w-[57.734%]" />
            <span className="text-gray-900 text-center">
              在使用前请先查看您的账户情况
              <br /> 可进入充值中心按需充值
            </span>
          </div>
        ) : null}

        <img src={home_howuse_text_bg} className="absolute bottom-[51px] w-2/3 left-1/2  -translate-x-1/2" />
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
