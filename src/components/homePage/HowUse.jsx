import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import {
  home_howuse_bg1,
  home_howuse_bg2,
  home_howuse_data,
  home_howuse_docs,
  home_howuse_pricing,
  home_howuse_recharge,
  home_howuse_registry,
  home_howuse_text_bg,
  home
} from '../../consts/img'

const features = [
  {
    name: '注册账号',
    description: `操作指南： 点击页面右上角的“注册/登录”按钮。
        确认您的电子邮箱地址，激活账号。
        「提示： 提供真实准确的信息可帮助我们提供更个性化的服务。」`,
    icon: CloudArrowUpIcon
  },
  {
    name: '选择合适的服务',
    description: `
        浏览我们提供的计费标准。
        根据需求对比不同的功能和定价计划。
        选择最适合您需求的服务。
        `,
    icon: LockClosedIcon
  },
  {
    name: '配置您的项目',
    description: '查看开发文档，将我们的API接口及传参融合到您的项目中',
    icon: ArrowPathIcon
  },
  {
    name: '充值您的账号',
    description: '如果您的账号余额不足，请您在使用前先进行充值',
    icon: FingerPrintIcon
  }
]

export default function Example() {
  const [current, setCurrent] = useState(0)

  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    // 如果isPaused为true，则不启动定时器
    if (isPaused) {
      return
    }

    // 设定定时器自动变换current
    const intervalId = setInterval(() => {
      setCurrent(prevCurrent => (prevCurrent + 1) % 5) // 更新current, 使其循环在到4之间
    }, 2500) // 每1秒变换一次

    // 清理函数，组件卸载或变更时清除定时器
    return () => clearInterval(intervalId)
  }, [isPaused]) // 依赖项为isPaused，若isPaused变化则重新运行effect

  const handleHover = index => {
    setIsPaused(true)
    setCurrent(index)
  }

  const handleLeave = () => {
    setIsPaused(false)
    setCurrent(0)
  }

  return (
    <div className="relative w-full h-screen bg-[#F2F8FF]">
      <img src={home_howuse_bg1} className="absolute z-1 w-[61rem] top-0 left-1/2  -translate-x-1/2" />
      <img src={home_howuse_bg2} className="absolute z-1 w-[59rem] top-0 left-1/2  -translate-x-1/2" />
      <div
        className="absolute z-1 group  top-[6rem] left-[10.5rem]  -translate-x-1/2 cursor-pointer flex items-center"
        onMouseEnter={() => handleHover(1)}
        onMouseLeave={handleLeave}
      >
        <div
          className={`border-[#98E2FF]  border px-6 py-2 text-gray-900 rounded-full ${
            current === 1 ? `border-[#3162FF] bg-[#3162FF] text-white` : ''
          } `}
        >
          注册账号
        </div>
        <span className={`h-[1px] w-10  bg-transparent	 ${current === 1 ? '!bg-[#3162FF]' : ''}`} />
        <div className={`w-[30px] h-[30px] border rounded-full border-[#98E2FF] ${current === 1 ? '!border-[#3162FF]' : ''}`} />
      </div>

      <div
        className="absolute z-[9] group  top-[21rem] left-[19.5rem]  -translate-x-1/2 cursor-pointer flex items-center"
        onMouseEnter={() => handleHover(2)}
        onMouseLeave={handleLeave}
      >
        <div
          className={`border-[#98E2FF]  border px-6 py-2 text-gray-900 rounded-full ${
            current === 2 ? `border-[#3162FF] bg-[#3162FF] text-white` : ''
          } `}
        >
          选择服务
        </div>
        <span className={`h-[1px] w-10  bg-transparent	 ${current === 2 ? '!bg-[#3162FF]' : ''}`} />
        <div className={`w-[30px] h-[30px] border rounded-full border-[#98E2FF] ${current === 2 ? '!border-[#3162FF]' : ''}`} />
      </div>

      <div
        className="absolute z-[9] group  top-[21rem] right-[7rem]  -translate-x-1/2 cursor-pointer flex flex-row-reverse items-center"
        onMouseEnter={() => handleHover(3)}
        onMouseLeave={handleLeave}
      >
        <div
          className={`border-[#98E2FF]  border px-6 py-2 text-gray-900 rounded-full ${
            current === 3 ? `border-[#3162FF] bg-[#3162FF] text-white` : ''
          } `}
        >
          配置项目
        </div>
        <span className={`h-[1px] w-10  bg-transparent	 ${current === 3 ? '!bg-[#3162FF]' : ''}`} />
        <div className={`w-[30px] h-[30px] border rounded-full border-[#98E2FF] ${current === 3 ? '!border-[#3162FF]' : ''}`} />
      </div>

      <div
        className="absolute z-[9] group  top-[6rem] -right-[1.6rem]  -translate-x-1/2 cursor-pointer flex flex-row-reverse	 items-center"
        onMouseEnter={() => handleHover(4)}
        onMouseLeave={handleLeave}
      >
        <div
          className={`border-[#98E2FF]  border px-6 py-2 text-gray-900 rounded-full ${
            current === 4 ? `border-[#3162FF] bg-[#3162FF] text-white` : ''
          } `}
        >
          充值使用
        </div>
        <span className={`h-[1px] w-10  bg-transparent	 ${current === 4 ? '!bg-[#3162FF]' : ''}`} />
        <div className={`w-[30px] h-[30px] border rounded-full border-[#98E2FF] ${current === 4 ? '!border-[#3162FF]' : ''}`} />
      </div>
      {current === 0 ? (
        <div className="absolute z-1 w-[65.125%] top-0 left-1/2  -translate-x-1/2 flex flex-col justify-center items-center">
          <img src={home_howuse_data} className="w-[21rem]" />
          <span className="text-gray-900 font-bold">调用流程</span>
        </div>
      ) : null}
      {current === 1 ? (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 4, delay: 0, type: 'spring' }}
          className="absolute z-1 w-[65.125%] top-0 left-1/2  -translate-x-1/2 flex flex-col justify-center items-center"
        >
          <img src={home_howuse_registry} className="w-[57.734%]" />
          <span className="text-gray-900 text-center">
            点击页面右上角，注册/登录按钮 <br /> 输入邮箱验证码快速注册账号
          </span>
        </motion.div>
      ) : null}
      {current === 2 ? (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 4, delay: 0, type: 'spring' }}
          className="absolute z-1 w-[65.125%] top-0 left-1/2  -translate-x-1/2 flex flex-col justify-center items-center"
        >
          <img src={home_howuse_pricing} className="w-[57.734%]" />
          <span className="text-gray-900 text-center">
            浏览我们提供的计费标准
            <br /> 选择最适合您需求的服务
          </span>
        </motion.div>
      ) : null}
      {current === 3 ? (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 4, delay: 0, type: 'spring' }}
          className="absolute z-1 w-[65.125%] top-0 left-1/2  -translate-x-1/2 flex flex-col justify-center items-center"
        >
          <img src={home_howuse_docs} className="w-[57.734%]" />
          <span className="text-gray-900 text-center">
            查看开发文档
            <br /> 将我们的API接口传参融入到您的开发项目中
          </span>
        </motion.div>
      ) : null}

      {current === 4 ? (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 4, delay: 0, type: 'spring' }}
          className="absolute z-1 w-[65.125%] top-0 left-1/2  -translate-x-1/2 flex flex-col justify-center items-center"
        >
          <img src={home_howuse_recharge} className="w-[57.734%]" />
          <span className="text-gray-900 text-center">
            在使用前请先查看您的账户情况
            <br /> 可进入充值中心按需充值
          </span>
        </motion.div>
      ) : null}

      <img src={home_howuse_text_bg} className="absolute bottom-[51px] w-2/3 left-1/2  -translate-x-1/2" />
    </div>
  )
}
