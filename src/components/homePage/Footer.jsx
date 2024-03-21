import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { home_bottom_bg, agicto_product_agent_wechat, home_bottom_bg_mofang } from '../../consts/img'
import { TITLE, RECORD_NUMBER } from '../../../config'
 

export default function Footer() {
  // 处理鼠标移动的函数
  const handleMouseMove = e => {
    const { clientX, clientY, currentTarget } = e
    const { top, left, width, height } = currentTarget.getBoundingClientRect()

    // 计算鼠标相对于元素中心的位置
    const mouseX = clientX - left - width / 2
    const mouseY = clientY - top - height / 2

    // 设置元素的旋转和偏移
    // 你可以根据需要调整"20"的值来控制移动的幅度
    const xOffset = (mouseY / height) * 60
    const yOffset = (mouseX / width) * 60

    currentTarget.firstChild.style.transform = `translate(${yOffset}px, ${xOffset}px)`
  }

  return (
    <AnimatePresence mode="wait">
      <div className="relative bg-[#F2F8FF] h-screen p-2 lg:p-4 w-full">
        {/* <div
          onMouseMove={handleMouseMove}
          className="absolute z-10 w-[33%] top-[13rem] left-1/2 -translate-x-1/2"
          style={{ display: 'inline-block' }}
        >
          <motion.img
            className=" z-10 w-full top-[13rem] left-1/3 -translate-x-1/3"
            src={home_bottom_bg_mofang}
            style={{ willChange: 'transform' }} // 优化性能，告诉浏览器预期该元素将进行变化
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 100 }} // 确保图片移动平滑
          />
        </div> */}
        <motion.img
          onMouseMove={handleMouseMove}
          src={home_bottom_bg_mofang}
          className="absolute z-10 w-[33%] top-[13rem] left-1/2 -translate-x-1/2 scale-100	hover:scale-110 transition	"
          // whileHover={{ scale: 1.2 }}
          // whileTap={{ scale: 0.8 }}
        >
          {/* <img /> */}
        </motion.img>
        <img src={home_bottom_bg} alt="" className="absolute z-1 w-[44rem] top-10 left-1/2  -translate-x-1/2 " />
        <div className="absolute lg:w-[33%] z-1  lg:top-[9.2rem] top-[4.6rem] left-1/2 -translate-x-[144%]  flex items-end ">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 4, delay: 0, type: 'spring' }}
            className="box  shrink-0 pl-0  lg:px-6 px-8 py-2 text-gray-900 pb-[27px] font-bold text-xl"
          >
            我们的优势
          </motion.div>
          <div className="w-full absolute bottom-0">
            <motion.div
              className="box h-[1px] absolute bottom-[1px] right-0 w-[50%] lg:w-[70%] bg-[#98E2FF]"
              initial={{ x: '-100%' }}
              whileInView={{ x: '0%' }}
              transition={{ duration: 1, delay: 0, type: 'spring' }}
            />
            <motion.div
              className="box h-[2px] lg:w-[30%] w-[50%] bg-[#3162FF]"
              initial={{ x: '-100%' }}
              whileInView={{ x: '0%' }}
              transition={{ duration: 1, delay: 0, type: 'spring' }}
            />
          </div>
          {/* <span className="h-[1px] w-[100%] bg-[#98E2FF]" /> */}
        </div>

        <div className="absolute lg:w-[33%] z-1 lg:top-[9.2rem] top-[4.6rem] right-1/2 translate-x-[114%]  flex  flex-row-reverse items-end ">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 4, delay: 0, type: 'spring' }}
            className="box  shrink-0 text-right lg:px-6 px-8 py-2  pr-0 text-gray-900 pb-[27px] font-bold text-xl"
          >
            AGICTO的愿景
          </motion.div>
          <div className="w-full absolute bottom-0">
            <motion.div
              className="box h-[1px] absolute bottom-[1px] right-0  w-[80%] lg:w-[70%] bg-[#98E2FF]"
              initial={{ x: '-100%' }}
              whileInView={{ x: '0%' }}
              transition={{ duration: 1, delay: 0, type: 'spring' }}
            />
            <motion.div
              className="box h-[2px] absolute lg:w-[30%] w-[50%] bottom-0 right-0 bg-[#3162FF]"
              initial={{ x: '-100%' }}
              whileInView={{ x: '0%' }}
              transition={{ duration: 1, delay: 0, type: 'spring' }}
            />
            {/* <motion.div
              className="box h-[1px] absolute bottom-[1px] lg:w-[70%] w-[50%] bg-[#98E2FF]"
              initial={{ x: '100%' }}
              whileInView={{ x: '0%' }}
              transition={{ duration: 1, delay: 0, type: 'spring' }}
            />
            <motion.div
              className="box h-[2px] absolute right-0  bottom-0 w-[50%] bg-[#3162FF]"
              initial={{ x: '100%' }}
              whileInView={{ x: '0%' }}
              transition={{ duration: 1, delay: 0, type: 'spring' }}
            /> */}
          </div>
        </div>

        <div className="absolute w-[33%] z-1  lg:top-[20rem] top-[25rem] flex  flex-col   left-1/2 -translate-x-[124%]">
          <motion.div
            className="border rounded-full text-gray-900  text-center py-2 w-[10rem] border-[#98E2FF]"
            initial={{ x: '-100%' }}
            whileInView={{ x: '0%' }}
            transition={{ duration: 1, delay: 0 }}
          >
            <span>多样化的AI服务</span>
          </motion.div>
          <motion.div
            className="border rounded-full text-gray-900  text-center py-2 w-[10rem] border-[#98E2FF] my-8"
            initial={{ x: '-100%' }}
            whileInView={{ x: '0%' }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span>简单易用的界面</span>
          </motion.div>
          <motion.div
            className="border rounded-full text-gray-900  text-center py-2 w-[10rem] border-[#98E2FF]"
            initial={{ x: '-100%' }}
            whileInView={{ x: '0%' }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span>安全可靠的平台</span>
          </motion.div>
        </div>

        <div className="absolute w-[33%] z-1  lg:top-[9.2rem] top-[15rem] right-1/2 translate-x-[124%]  flex  flex-row-reverse items-end ">
          <motion.div
            className="text-right text-gray-900 absolute w-full z-1  top-[10rem] lg:leading-10		 flex  flex-row-reverse items-end "
            initial={{ x: '100%' }}
            whileInView={{ x: '0%' }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span>成为全球领先的AI聚合平台</span>
          </motion.div>
          <motion.div
            className="text-right text-gray-900 absolute w-full z-1  lg:top-[13rem] top-[14rem] lg:leading-10		 flex  flex-row-reverse items-end "
            initial={{ x: '100%' }}
            whileInView={{ x: '0%' }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span>推动人工智能技术的广泛应用</span>
          </motion.div>
          <motion.div
            className="text-right text-gray-900 absolute w-full z-1  lg:top-[16rem] top-[18rem] lg:leading-10		 flex  flex-row-reverse items-end "
            initial={{ x: '100%' }}
            whileInView={{ x: '0%' }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span>为领域开发人员提供更智慧的LLM调用枢纽</span>
          </motion.div>
        </div>

        <div className="absolute flex text-black flex-col z-1 w-full bottom-[10px] left-1/2  -translate-x-1/2">
          <span className="text-[#B5B5B5] text-center">2024 · {TITLE}</span>
          <span className="text-[#9E9E9E] text-center">{RECORD_NUMBER}</span>
        </div>

        <img
          className="absolute left-1/2 right-1/2 -translate-x-1/2	 lg:right-16 bottom-16 w-[132px]"
          src={agicto_product_agent_wechat}
          alt={TITLE}
        />
      </div>
    </AnimatePresence>
  )
}