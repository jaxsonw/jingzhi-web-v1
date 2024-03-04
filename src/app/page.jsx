'use client'
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel, Pagination } from 'swiper/modules'
import Hero from '../components/homePage/HeroHome'
import Footer from "../components/homePage/Footer"
import FeedList from '../components/homePage/feedList'
import HowUse from '../components/homePage/HowUse'
import Advantage from '../components/homePage/Advantage'
import Mission from '../components/homePage/Mission'
import Vision from '../components/homePage/Vision'
import Values from '../components/homePage/Values'

import config from '../../config'
import { isPc } from '../utils'

export default function Example() {
  return (
    <div className="h-screen  bg-[#3162FF]">
      {/* <Hero />
      <HowUse />
      <Footer/> */}
      <Swiper
        direction={'vertical'}
        slidesPerView={1}
        freeMode
        mousewheel={{
          // invert: false, // true为鼠标滚轮往下是向上滑，false相反
          sensitivity: 0.1, // 鼠标滚轮事件敏感度，值越大滚动越快
          releaseOnEdges: true // 当滑动到Swiper的边缘时释放滚轮控制，这样页面会继续滚动
        }}
        allowTouchMove={false}
        touchRatio={0.2}
        pagination={{
          clickable: false
        }}
        modules={[Mousewheel]}
        className={`mySwiper ${isPc() ? 'swiper-no-swiping' : ''}`}
      >
        <SwiperSlide>
          <Hero />
        </SwiperSlide>
        <SwiperSlide>
          <HowUse />
        </SwiperSlide>
        <SwiperSlide>
          <Footer />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
