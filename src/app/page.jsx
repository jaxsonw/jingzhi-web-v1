'use client'
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel, Pagination } from 'swiper/modules'
import Hero from '../components/homePage/Hero'
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
    <div className="h-[calc(100vh_-_82px)] ">
      <Swiper
        direction={'vertical'}
        slidesPerView={1}
        spaceBetween={30}
        mousewheel={true}
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
          <FeedList />
        </SwiperSlide>
        <SwiperSlide>
          <HowUse />
        </SwiperSlide>
        <SwiperSlide>
          <Advantage />
        </SwiperSlide>
        <SwiperSlide>
          <Values />
        </SwiperSlide>
        <SwiperSlide>
          <Vision />
        </SwiperSlide>

        <SwiperSlide>
          <Mission />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
