"use client";

import React from "react";
import { HeadlessButton } from '@headlessui/react'

const model = () => {
  return (
    <div className="h-screen pt-[104px] ">
      {/* <div className="h-screen pt-[104px] "> */}
        <h1 className=" text-[30px] text-[#000B4D] sm:flex sm:flex-auto sm:justify-center">大模型广场</h1>
        
      {/* </div> */}
      <div className=" sm:flex sm:flex-auto sm:justify-center">
        <button className="bg-[#3162FF] text-white p-3 rounded-full">
          重要参数
        </button>
        <button className="bg-[#fff] text-[#1A1A1A] border-[#3162FF] p-3 rounded-full">
          费用介绍
        </button>
      </div>
    </div>
   
    
  )
};

export default model;
