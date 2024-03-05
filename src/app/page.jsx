'use client'
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel, Pagination } from 'swiper/modules'
import Hero from '../components/homePage/HeroHome'
import Footer from "../components/homePage/Footer" 
import HowUse from '../components/homePage/HowUse' 

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
        simulateTouch={false}
        touchAngle={30}
        threshold={10}
        touchRatio={0.5}
        touchStartPreventDefault={false}
        mousewheel={{
           sensitivity: 0.1 // 鼠标滚轮事件敏感度，值越大滚动越快
        }}
        allowTouchMove={false}
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
