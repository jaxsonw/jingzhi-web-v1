'use client'
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel, Pagination } from 'swiper/modules'
import Hero from '../../components/homePage/HeroHome'
import Footer from "../../components/homePage/Footer" 
import HowUse from '../../components/homePage/HowUse' 
import { isPc } from '../../utils'

export default function Example() {
  return (
    <div className="h-screen  bg-[#3162FF]">
      <Hero />
      <HowUse />
      <Footer/>
     
    </div>
  )
}
