"use client"

import { Link } from "@nextui-org/react"
import { useRouter } from "next/navigation";
import { useState } from "react"
import Markdown from "react-markdown";
import "./style.model.css"

const ModelDetail = ({ data, status }) => {
    const router = useRouter()
    const modelData = data
    const [pageStatus, setPageState] = useState(status)

    const setUrl = (status) => {
        const url = window.location
        const arr = url.pathname.split('?')
        arr.pop()
        history.pushState("", "", `?status=${status}`)
    }

    return <div className="min-w-[1440px] max-w-[1440px] m-auto px-[120px] pt-[90px]">
        <title>{modelData.modelName + "模型详情"}</title>
        <meta name="description" content={modelData.desc} />
        <meta name="keywords" content={`${modelData.modelName}`} />
        <div className="flex justify-between leading-[22px] text-base mb-[37px]">
            <div className="cursor-pointer flex items-center" onClick={() => { router.back() }}>
                <img className="w-[10px] h-[14px] mr-[4px]" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAcCAYAAABh2p9gAAACC0lEQVRIS62WvU7bUBSAz73XJrabOA1UhAxUNDRLt1ZN2foWeQcYujAwAlHHUjWo7QaiUtWtQ4r6AB2glSqVBbGgVFilYgQSHP/c3JtUrhMnim4SG9mz9fn8fOccI7jdg9Pa4uMOyPsyUXOUXW/d2GdrHgpF55VIUjl6jrH8SZaSOQQIKKvXGtZp4RbAEplWj5cY6nz2YRh4m3KXXZYt5/xlVCDW1UdFhDsfJaIVfJjLW6yxYzrGCgB0IgF1dWEJkFKVpTtzPsyhjDffZG28UYOa2ytdqBomEvOLipT6LhNt1is7b7uUcbOSymTKFxe/rME+TAQqyv28QrQDiSRzPoxyxpuvZmxWNsBwhps6DojTWv4JIOWrTLSsD3MY5fX3TfvPKgC0RYaMAJaIrp48BdSuylJyzlPDg7V4/Z3pw/43ICTQV4Nj9KHfTcopv3rbjWwkTNTlUWrsmo6xPC4yYZd19cEzQIkvk9QYN11BDQVqcMbNrbSdLf+FH3bYEQ2Aulb4OSWliz01Wux6756DXojUCBVh7MBuyod951wv5deiaQgVofeSruWLAFP7Q02pZG28PjivoYEAEK82/pfjFbubTayjF1QozuXQL3uc6yugihdsczuVubsZecH2qOITYFVm7PkNA74Fi3bixh5wLpRSUYCBUnGd0UApwaH/3bBOH0Y6o0PjNvJX5B/ruW4syLef1AAAAABJRU5ErkJggg==" />
                <span>返回</span>
            </div>
            <Link href="/docs">
                <div className="flex items-center">
                    <img className="w-[12px] h-[14px] " src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAAAAXNSR0IArs4c6QAAAhhJREFUSEu11snLzVEcx/HXg5AyLWSjCFGysGFrY4qFEhY2LAwLMpQiREQRZSgrGywsKGWjiH9AyFyEpRILQ+Ex9+HcerrufZzr5tTtV797zvf9+46f0+P3GoJDWINh5V3N4zbW4Wa7zT3ljyW4gAd4iR8V1idgCu5idTtIAPntwhbMwtMK49myCYcxCA+xCreaz8b4AOzBSszDkwpAzm3DRlzGMjwrkHt9z/cF5AsCeNwBYH05Mw7n8Rp5d7VhoxvAdmzAXDzCIpzDC2zGlUD+FZCzK3AWZ3AHAzEfC0qYl+J+N4CxxfjMEo5UXuyl5FPqO1L63QBiN4ZmYHQp7W8Yj4M4gX3dAlrVwyRcL97t/R+AqaWKTqMtIL2RpluIuN3fSnLTCzfwHVWAJGo/tlb0RLYcKdOgtxaQ0I3BxErAc7wqia7yIIARGFkJeIt3nQAGYzd2VgIOpCTxuTZESdwcLK5M8iVcK3urQtT48FEV2pBwvunjaRUgVZR5n3nzN/EJIEPuOKqrKCKyvEhoTR+cKuP6a20O4nESPbyNB/Eq4MaA+4gvJUxVIUqSZyMjN93ZLFLvi4b/IZG1HgwtJRoZbc5BYp5YH8PJFmVc5UHOJTzT2njwqYhKns2rLaAT0e+v/3KViSZH6X5N03+9trSDTC6T9WgGZjcXr1aA2IuUTi9XmYsNQBorMre2w6tjK8gHpC9yb+r9CYTzsEFYol9MAAAAAElFTkSuQmCC" />
                    <span className="ml-[4px]">帮助文档</span>
                </div>
            </Link>
        </div>
        <div className="flex justify-between">
            <div className="flex flex-col">
                <div className="flex items-center">
                    <div className="leading-[33px] text-2xl mr-[8px] font-bold">
                        {modelData.modelName}
                    </div>
                    {modelData.isFree === 1 && <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="80px" height="26px" viewBox="0 0 80 26" version="1.1">
                        <title>free</title>
                        <defs>
                            <linearGradient x1="0%" y1="44.71875%" x2="100%" y2="55.28125%" id="linearGradient-1">
                                <stop stopColor="#46AD76" offset="0%" />
                                <stop stopColor="#46CA92" offset="100%" />
                            </linearGradient>
                        </defs>
                        <g id="模型详情" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="模型详情-模型介绍" transform="translate(-305.000000, -157.000000)">
                                <g id="free" transform="translate(305.000000, 157.000000)">
                                    <path d="M0,0 L68,0 C74.627417,-1.21743675e-15 80,5.372583 80,12 L80,26 L80,26 L12,26 C5.372583,26 2.18216909e-15,20.627417 0,14 L0,0 L0,0 Z" id="Rectangle" fill="url(#linearGradient-1)" />
                                    <text id="免费使用" fontFamily="Alibaba-PuHuiTi-R, Alibaba PuHuiTi" fontSize="14" fontWeight="normal" letterSpacing="0.000311111111" fill="#FFFFFF">
                                        <tspan x="12" y="18">免费使用</tspan>
                                    </text>
                                </g>
                            </g>
                        </g>
                    </svg>}
                </div>
                <div className="flex items-center">
                    <div>
                        <div className="text-[#80838A] text-xs mb-[8px]">
                            <span>{`由${modelData.companyName}提供`}</span>
                            {modelData.tagList?.map((item, index) => <span key={`modelDetailTags${index}`}>
                                {` | ${item}`}
                            </span>)}
                        </div>
                        <ul>
                            {
                                modelData.attrList?.map((Item, index) => <li className="flex items-center" key={"modelDetailAttr" + index}>
                                    <div className="w-[7px] h-[7px] rounded-full bg-[#30BD71] mr-[6px]" />
                                    <span>{Item}</span>
                                </li>)
                            }
                        </ul>
                    </div>
                    <Link href={`/playground/?model=${modelData?.apiModelName}&modelType=message`}>
                        <div className="bg-[#3162FF] w-[201px] h-[42px] ml-[81px] rounded-lg leading-[42px] text-center text-[#fff] text-[16px]">
                            立即体验
                        </div>
                    </Link>
                </div>
            </div>
        </div>
        <div className="flex w-full mt-[28px] relative z-1 text-[16px]">
            <div className={`px-[33px] py-[6px]  ${pageStatus == 1 ? "border-b-[3px] border-[#3162FFFF] border-solid text-[#3162FFFF] cursor-default" : "cursor-pointer"} `}
                onClick={() => {
                    if (pageStatus != 1) {
                        setPageState(1)
                        setUrl(1)
                    }
                }}
            >
                模型介绍
            </div>
            <div className={`px-[33px] py-[6px]  ${pageStatus == 2 ? "border-b-[3px] border-[#3162FFFF] border-solid text-[#3162FFFF] cursor-default" : "cursor-pointer"}`}
                onClick={() => {
                    if (pageStatus != 2) {
                        setPageState(2)
                        setUrl(2)
                    }
                }}
            >
                API调用
            </div>
        </div>
        <div className="relative top-[-1px] w-full h-[2px] bg-[#140E3533] z-0"></div>
        <div className="w-full px-[32px]">
            {
                pageStatus == 1 && <Markdown className="mdrom">{modelData.mdContent}</Markdown>
            }
            {
                pageStatus == 2 && <Markdown className="mdrom">{modelData.code_content}</Markdown>
            }

        </div>
    </div>
}

export default ModelDetail