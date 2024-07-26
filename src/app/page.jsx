'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel } from 'swiper/modules'
import Hero from '../components/homePage/HeroHome'
import Footer from "../components/homePage/Footer"
import HowUse from '../components/homePage/HowUse'
import FeedListPage from "../components/homePage/FeedListPage"
import HomeFooter from "../components/homePage/HomeFooter"
import { isPc } from '../utils'

export default function Example() {
  return (
    <div className="h-screen bg-[#3162FF]">
      <title>AGICTO</title>
      {/* <Hero />
      <HowUse />
      <Footer/> */}
      <Swiper
        direction={'vertical'}
        slidesPerView={1}
        freeMode
        touchAngle={30}
        threshold={10}
        touchRatio={0.5}
        touchStartPreventDefault={false}
        effect="fade"
        mousewheel={{
          sensitivity: 0.1 // 鼠标滚轮事件敏感度，值越大滚动越快
        }}
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
        <SwiperSlide>
          <FeedListPage />
        </SwiperSlide>
      </Swiper>

      {/* <div className='overflow-hidden'>
        <Hero />
      </div>
      <div className='overflow-hidden'>
        <HowUse />
      </div>
      <div className='overflow-hidden'>
        <Footer />
      </div>
      <div className='overflow-hidden'>
        <FeedListPage />
      </div>
      <div className='overflow-hidden'>
        <HomeFooter />
      </div> */}
    </div>
  )
}
