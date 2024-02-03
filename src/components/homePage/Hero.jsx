


import { Fragment, useState } from 'react'
import Image from "next/image"
import config from "../../../config"


export default function Hero() {
    return <div className="w-full h-[calc(100vh_-_82px)] relative bg-gray-900">
        {/* Decorative image and overlay */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
            <img
                src="https://ew6.cn/home-bg1.png"
                alt=""
                className="h-full w-full object-cover object-center"
            />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gray-900 opacity-50" />



        <div className="relative mx-auto flex max-w-full flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
            <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">{config.title}</h1>
            <p className="mt-4 text-xl text-white">
                快速接入和使用各种优秀的AI模型的终极智能枢纽

            </p>
            <a
                href="/docs"
                className="mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
            >
                立即开始
            </a>
        </div>
    </div>
}  
