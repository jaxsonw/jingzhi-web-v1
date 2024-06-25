"use client";

import { getModelDetail } from "@/src/services/overflow";
import { copyValue } from "@/src/utils";
import { Link } from "@nextui-org/react"
import { Skeleton, message } from "antd";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import Markdown from "react-markdown";

const TAG_COLOR = {
    1: {
        color: '#1c67e1',
        bg: '#e9f0fc'
    },
    2: {
        color: '#a27851',
        bg: '#f6f1ee'
    },
    3: {
        color: '#0edc5e',
        bg: '#e7fbee'
    },
    4: {
        color: '#688653',
        bg: '#eff3ec'
    },
    5: {
        color: '#70d024',
        bg: '#f1fbeb'
    },
    6: {
        color: '#03487b',
        bg: '#e7ecf2'
    },
    7: {
        color: '#c780bc',
        bg: '#f9f2f8'
    },
    8: {
        color: '#102fc5',
        bg: '#e6ebf9'
    },
    9: {
        color: '#97c1cf',
        bg: '#f4f9fa'
    },
    10: {
        color: '#d43117',
        bg: '#fcece8'
    }
}

const getRandomIntegerFromArray = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const PromptDetail = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        const data = JSON.parse(searchParams.get("data"))
        if (searchParams.get("data")) {
            setPromptData(data)
            setIsLoading(false)
        } else {
            message.error("数据获取失败")
        }
    }, [])

    const [promptData, setPromptData] = useState({
        appId: "",
        name: "",
        desc: "",
        icon: "",
        iconBackground: "",
        type: 0,
        isWorkSpace: false,
        status: 0,
        copyright: "",
        uid: 0,
        cid: 0,
        cName: "",
        userPeople: 0,
        open: 0,
        chatNum: 0,
        prompt: "",
        tagList: []
    })

    const [pageState, setPageState] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    return <div className="min-w-[1200px] max-w-[1200px] m-auto px-[120px] pt-[90px]">
        <div className="flex justify-between leading-[22px] text-base mb-[37px]">
            <div className="cursor-pointer flex items-center" onClick={() => { router.back() }}>
                <img className="w-[10px] h-[14px] mr-[4px]" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAcCAYAAABh2p9gAAACC0lEQVRIS62WvU7bUBSAz73XJrabOA1UhAxUNDRLt1ZN2foWeQcYujAwAlHHUjWo7QaiUtWtQ4r6AB2glSqVBbGgVFilYgQSHP/c3JtUrhMnim4SG9mz9fn8fOccI7jdg9Pa4uMOyPsyUXOUXW/d2GdrHgpF55VIUjl6jrH8SZaSOQQIKKvXGtZp4RbAEplWj5cY6nz2YRh4m3KXXZYt5/xlVCDW1UdFhDsfJaIVfJjLW6yxYzrGCgB0IgF1dWEJkFKVpTtzPsyhjDffZG28UYOa2ytdqBomEvOLipT6LhNt1is7b7uUcbOSymTKFxe/rME+TAQqyv28QrQDiSRzPoxyxpuvZmxWNsBwhps6DojTWv4JIOWrTLSsD3MY5fX3TfvPKgC0RYaMAJaIrp48BdSuylJyzlPDg7V4/Z3pw/43ICTQV4Nj9KHfTcopv3rbjWwkTNTlUWrsmo6xPC4yYZd19cEzQIkvk9QYN11BDQVqcMbNrbSdLf+FH3bYEQ2Aulb4OSWliz01Wux6756DXojUCBVh7MBuyod951wv5deiaQgVofeSruWLAFP7Q02pZG28PjivoYEAEK82/pfjFbubTayjF1QozuXQL3uc6yugihdsczuVubsZecH2qOITYFVm7PkNA74Fi3bixh5wLpRSUYCBUnGd0UApwaH/3bBOH0Y6o0PjNvJX5B/ruW4syLef1AAAAABJRU5ErkJggg==" />
                <span>返回</span>
            </div>
        </div>
        <Skeleton active={true} paragraph={{ rows: 3, width: [220, 150, 180] }} title={{ width: 250 }} loading={isLoading}>
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <div className="flex items-center mb-[4px]">
                        {promptData.name &&
                            <div className="leading-[33px] text-2xl mr-[8px] font-bold">
                                {promptData.name}
                            </div>}
                        {promptData.cName && <div className='cursor-default border border-solid border-[#140E351A] flex items-center bg-[#FFFFFFFF] rounded leading-[20px] text-[14px] text-[#140E35FF] px-[8px] py-[4px]'>
                            <span className={`block rounded-[100px] w-[8px] h-[8px] mt-[2px]`} style={{ backgroundColor: "#30C8AEFF" }}></span>
                            <span className='ml-[8px]'>{promptData.cName}</span>
                        </div>}
                    </div>
                    <div className='flex items-center text-[12px] text-[#140E3580] leading-[17px] mb-[16px]'>
                        {
                            promptData.viewNum &&
                            <div className='flex items-center mr-[8px]'>
                                <svg className='icon' xmlns="http://www.w3.org/2000/svg" width="12px" height="9px" viewBox="0 0 12 9" version="1.1">
                                    <title>查看</title>
                                    <g id="prompt" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" fillOpacity="0.5">
                                        <g id="Prompt工程" transform="translate(-136.000000, -359.000000)" fillRule="nonzero">
                                            <g id="Group-4" transform="translate(120.000000, 306.000000)">
                                                <g id="查看" transform="translate(16.000000, 53.000000)">
                                                    <path d="M12,4.40130686 C12,4.32924701 11.9878182,4.26897128 11.9843566,4.2617977 C11.9817346,4.22609185 11.9695528,4.16101409 11.9582253,4.12685489 C11.9551909,4.1183556 11.951258,4.10944387 11.9477964,4.10094457 C11.9416834,4.08135349 11.9351727,4.06220431 11.9277781,4.04697334 C10.8212353,1.62669352 8.43885613,0 6.00031096,0 C3.56220768,0 1.18003474,1.62519105 0.0785148755,4.03237577 C0.0652430179,4.05850704 0.0558746452,4.08353354 0.049997322,4.1053047 C0.0473900901,4.11247827 0.0443409422,4.11922467 0.0419546683,4.12554391 C0.0201835153,4.18932542 0.0197563539,4.23370732 0.0214945085,4.22217364 C0.0112717843,4.26897129 0.00190342611,4.36212469 0.00190342611,4.36212469 C-0.000703805798,4.3901856 -0.000703805798,4.41260488 0.00234532763,4.44047431 C0.00234532763,4.44047431 0.0116989601,4.52187306 0.0162800447,4.53840028 C0.0175762978,4.56146769 0.0232326775,4.59499348 0.0299790781,4.62547014 L0.0295371766,4.62547014 C0.0354144999,4.65158668 0.0434718937,4.67683414 0.0545636808,4.70163969 C0.0602347863,4.72078887 0.0669811869,4.7386418 0.0728585102,4.75213461 C1.18090381,7.17282686 3.56264958,8.7999623 6.00031096,8.7999623 C8.43929805,8.7999623 10.8216772,7.17415258 11.9155963,4.77912023 C11.9325507,4.74777449 11.943451,4.71818164 11.9508455,4.69249227 C11.9543218,4.68467056 11.9573857,4.67770322 11.959551,4.67073586 C11.978715,4.61499701 11.9826185,4.56669688 11.9808803,4.56669688 L11.9804678,4.56712406 C11.9882748,4.52841323 12,4.47052379 12,4.40130686 Z M11.1921107,4.4308997 C11.1916836,4.43265258 11.1907998,4.43481792 11.1899307,4.43657081 C11.1886344,4.44178527 11.1864691,4.44788355 11.1851434,4.45398184 C10.2004925,6.57604997 8.12152472,7.9999242 6.00031094,7.9999242 C3.88432636,7.9999242 1.80904115,6.57999765 0.814594677,4.45050553 C0.812193663,4.44311099 0.810455508,4.43612891 0.807848276,4.42917629 C0.807406375,4.42220893 0.806110122,4.41655257 0.805682946,4.41261962 C0.804813869,4.40828895 0.803944791,4.40219067 0.803281932,4.39694674 L0.803281932,4.39151132 C0.805682946,4.38258485 0.807406375,4.37367312 0.808290178,4.36387759 C0.810028332,4.35866312 0.811339311,4.35365486 0.813298424,4.3479985 C1.7983618,2.22482559 3.87908244,0.800303225 6.00029622,0.800303225 C8.12236435,0.800303225 10.2026725,2.22612184 11.1847015,4.34602464 C11.1855706,4.35016381 11.1864544,4.35365486 11.1877654,4.35648304 C11.1886344,4.35995935 11.1894888,4.3634504 11.1912269,4.36714766 C11.193407,4.38304148 11.1951452,4.39871435 11.1973252,4.40653606 C11.194718,4.41479967 11.1934217,4.42263611 11.1921107,4.4308997 Z" id="Shape" fill="#140E35" />
                                                    <path d="M6.00029622,2.40001115 C4.89768633,2.40001115 4.00009053,3.29716504 4.00009053,4.39999588 C4.00009053,5.50260576 4.89768633,6.40020157 6.00029622,6.40020157 C7.1029061,6.40020157 8.00050191,5.50260576 8.00050191,4.39999588 C8.00050191,3.29716504 7.1029061,2.40001115 6.00029622,2.40001115 Z M6.00029622,5.60011928 C5.33907497,5.60011928 4.80018753,5.06165903 4.80018753,4.4000106 C4.80018753,3.7385684 5.33907497,3.20012288 6.00029622,3.20012288 C6.66194464,3.20012288 7.20043436,3.73858314 7.20043436,4.4000106 C7.20043436,5.06165903 6.66194464,5.60011928 6.00029622,5.60011928 Z" id="Shape" fill="#272536" />
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                <span className='ml-[2px] '>{promptData.viewNum || 0}</span>
                            </div>
                        }
                        {
                            promptData.praiseNum &&
                            <div className='flex items-center mr-[8px]'>
                                <svg className='icon' xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" viewBox="0 0 12 11" version="1.1">
                                    <title>喜欢</title>
                                    <g id="prompt" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" fillOpacity="0.5">
                                        <g id="Prompt工程" transform="translate(-189.000000, -359.000000)" fill="#140E35" fillRule="nonzero">
                                            <g id="Group-4" transform="translate(120.000000, 306.000000)">
                                                <g id="喜欢" transform="translate(69.000000, 53.074512)">
                                                    <path d="M5.99785022,10.0007166 C5.63668934,10.0007166 5.27337871,9.84163381 4.9143676,9.4826227 L0.928699381,5.45180938 C0.45145109,4.8563239 0,4.29308491 0,3.20100323 C0,1.43604443 1.43604443,0.00214977822 3.19885345,0.00214977822 C3.86313148,0.00214977822 4.49946255,0.204227881 5.0390541,0.584736665 C5.21963453,0.71157293 5.26262987,0.960945904 5.13579362,1.14152635 C5.00895735,1.32210678 4.75958438,1.36510212 4.57900393,1.23826587 C4.17484771,0.952346841 3.69759942,0.801863153 3.19885345,0.801863153 C1.87459691,0.801863153 0.799713362,1.87889647 0.799713362,3.20100324 C0.799713362,3.96847009 1.05338588,4.3274812 1.53923325,4.93371553 L5.48405589,8.91723398 C5.68398423,9.11716231 5.84521677,9.1967037 6,9.19885346 C6.15908276,9.20100323 6.31171623,9.12146184 6.51809388,8.9150842 L10.4758151,4.91651737 C10.80043,4.56395557 11.2002866,3.96847008 11.2002866,3.19885346 C11.2002866,1.87459692 10.1232533,0.799713375 8.80114654,0.799713375 C8.20136151,0.799713375 7.62522394,1.02328915 7.18237191,1.42744537 L5.50770334,3.10426371 C5.35077034,3.2611967 5.09924759,3.2611967 4.94231459,3.10426371 C4.78538159,2.94733071 4.78538159,2.69580796 4.94231459,2.53887496 L6.62988177,0.849158011 C7.23396633,0.29666787 8.00143319,0 8.80114655,0 C10.5661053,0 12,1.43604443 12,3.19885345 C12,4.22859189 11.4862057,5.00250805 11.0541025,5.46900752 L7.08348261,9.48047295 C6.72232173,9.84163381 6.36116087,10.0007166 5.99785022,10.0007166 Z" id="Path" />
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                <span className='ml-[2px] '>{promptData.praiseNum || 0}</span>
                            </div>
                        }
                        {
                            promptData.collectNum &&
                            <div className='flex items-center mr-[8px]'>
                                <svg className='icon' xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" viewBox="0 0 12 12" version="1.1">
                                    <title>收藏 (1)</title>
                                    <g id="prompt" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" fillOpacity="0.5">
                                        <g id="Prompt工程" transform="translate(-232.000000, -358.000000)" fill="#140E35" fillRule="nonzero">
                                            <g id="Group-4" transform="translate(120.000000, 306.000000)">
                                                <g id="收藏-(1)" transform="translate(112.000000, 52.000000)">
                                                    <path d="M11.9761695,4.34195598 C11.9189447,4.1658303 11.7666897,4.03746685 11.583425,4.01084014 L8.02680898,3.49404212 L6.43624303,0.271206774 C6.35429372,0.105139138 6.18516708,0 5.99998029,0 C5.8147935,0 5.64566686,0.105139138 5.56371755,0.271206774 L3.9731516,3.49405744 L0.416535552,4.01085545 C0.233288108,4.03750258 0.0810537956,4.16586138 0.0238290694,4.34197222 C-0.0333956568,4.51808305 0.0143114238,4.71140998 0.146895147,4.84068199 L2.72050146,7.34932099 L2.11296056,10.891556 C2.08164274,11.074079 2.15666977,11.2585532 2.30649201,11.3674052 C2.45631424,11.4762572 2.65494424,11.4906061 2.81885604,11.404418 L5.99998795,9.73200732 L9.18111985,11.404418 C9.28702485,11.4603179 9.53113472,11.4732754 9.69347644,11.3673857 C9.84794612,11.2666266 9.91831972,11.0740832 9.88701534,10.891556 L9.27947443,7.34932099 L11.8530654,4.84068199 C11.9856787,4.71142073 12.0334027,4.51807839 11.9761695,4.34195598 Z M8.41714892,6.83109866 C8.30248586,6.9428659 8.25016188,7.10389846 8.27722874,7.26171772 L8.76135931,10.0844726 L6.22636275,8.75173902 C6.15654865,8.71502723 6.0788508,8.69585244 5.99997263,8.69586896 C5.92109514,8.69585796 5.84339859,8.71503243 5.77358251,8.75173902 L3.23858596,10.0844726 L3.72271653,7.26171772 C3.74978727,7.10390105 3.69746915,6.9428689 3.58281166,6.83109866 L1.53194568,4.83199824 L4.36615639,4.42017099 C4.52461688,4.39714987 4.66160183,4.29762702 4.7324667,4.15403778 L5.99998795,1.58579181 L7.26749388,4.15402247 C7.33835577,4.29760766 7.47533407,4.39712983 7.63378887,4.42015568 L10.4680149,4.83198292 L8.41714892,6.83109866 Z" id="Shape" />
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                <span className='ml-[2px] '>{promptData.collectNum || 0}</span>
                            </div>
                        }
                    </div>
                    <div className='content flex flex-wrap w-full'>
                        {
                            promptData?.tagList?.map((item) => {
                                const randomNumber = getRandomIntegerFromArray(numbers);
                                return (
                                    <div key={item.id} className={`flex items-center justify-center py-[2px] px-[6px] rounded mr-[5px] text-[12px]`} style={{ backgroundColor: TAG_COLOR[randomNumber].bg }}>
                                        <span className={`block rounded-[100px] w-[6px] h-[6px]`} style={{ backgroundColor: TAG_COLOR[randomNumber].color }}></span>
                                        <span className={`text-nowrap ml-[6px] leading-[17px]`} style={{ color: TAG_COLOR[randomNumber].color }}>{item.name}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Skeleton>
        <div className="flex w-full mt-[28px] relative z-1 text-[16px]">
            <div className={`px-[33px] py-[6px]  ${pageState === 0 ? "border-b-[3px] border-[#3162FFFF] border-solid text-[#3162FFFF] cursor-default" : "cursor-pointer"} `}
                onClick={() => { if (pageState !== 0) setPageState(0) }}>
                模板内容
            </div>
        </div>
        <div className="relative top-[-1px] w-full h-[2px] bg-[#140E3533] z-0"></div>
        <div className="w-full p-[20px]">
            <div>
                <div className="flex items-center">
                    <span className="text-[24px] leading-[33px] mr-[10px]">模板ID</span>
                    <span className="cursor-pointer"
                        onClick={() => {
                            if (promptData.appId) copyValue(promptData.appId)
                            message.success('复制成功')
                        }}
                    >
                        <svg className='icon' xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 12 12" version="1.1">
                            <title>复制</title>
                            <g id="prompt" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" fillOpacity="0.5">
                                <g id="Prompt工程" transform="translate(-323.000000, -328.000000)" fill="#140E35" fillRule="nonzero">
                                    <g id="Group-4" transform="translate(120.000000, 306.000000)">
                                        <g id="Group-6" transform="translate(199.000000, 16.000000)">
                                            <g id="复制" transform="translate(4.000000, 6.000000)">
                                                <path d="M4.2631579,0 L10.8947369,0 C11.5051568,0 12,0.494843171 12,1.10526315 L12,7.7368421 C12,8.34726209 11.5051568,8.84210527 10.8947369,8.84210527 L4.2631579,8.84210527 C3.65273791,8.84210527 3.15789473,8.34726209 3.15789473,7.7368421 L3.15789473,1.10526315 C3.15789473,0.494843165 3.65273791,0 4.2631579,0 Z M4.2631579,0.947368422 C4.17595505,0.947368422 4.10526316,1.0180603 4.10526316,1.10526315 L4.10526316,7.7368421 C4.10526316,7.82404496 4.17595504,7.89473684 4.2631579,7.89473684 L10.8947369,7.89473684 C10.9819397,7.89473684 11.0526316,7.82404495 11.0526316,7.7368421 L11.0526316,1.10526315 C11.0526316,1.0180603 10.9819397,0.947368422 10.8947369,0.947368422 L4.2631579,0.947368422 Z M7.89473684,9.78947369 C7.89473684,9.52786512 8.10681249,9.31578948 8.36842105,9.31578948 C8.63002962,9.31578948 8.84210527,9.52786512 8.84210527,9.78947369 L8.84210527,10.8947369 C8.84210527,11.5051568 8.34726209,12 7.7368421,12 L1.10526315,12 C0.494843171,12 0,11.5051568 0,10.8947369 L0,4.2631579 C0,3.65273791 0.494843165,3.15789473 1.10526315,3.15789473 L2.21052631,3.15789473 C2.47213488,3.15789473 2.68421052,3.36997038 2.68421052,3.63157895 C2.68421052,3.89318751 2.47213488,4.10526316 2.21052631,4.10526316 L1.10526315,4.10526316 C1.0180603,4.10526316 0.947368422,4.17595505 0.947368422,4.2631579 L0.947368422,10.8947369 C0.94736843,10.9819397 1.0180603,11.0526316 1.10526315,11.0526316 L7.7368421,11.0526316 C7.82404495,11.0526316 7.89473684,10.9819397 7.89473684,10.8947369 L7.89473684,9.78947369 Z" id="Shape" />
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </span>
                </div>
                {promptData.appId && <div className="text-[18px] leading-[25px] text-[#3162FFFF] mt-[8px] mb-[28px]">
                    {promptData.appId}
                </div>}
                <div className="flex items-center">
                    <span className="text-[24px] leading-[33px] mr-[10px]">Prompt</span>
                    <span className="cursor-pointer"
                        onClick={() => {
                            if (promptData.prompt) copyValue(promptData.prompt)
                            message.success('复制成功')
                        }}
                    >
                        <svg className='icon' xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 12 12" version="1.1">
                            <title>复制</title>
                            <g id="prompt" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" fillOpacity="0.5">
                                <g id="Prompt工程" transform="translate(-323.000000, -328.000000)" fill="#140E35" fillRule="nonzero">
                                    <g id="Group-4" transform="translate(120.000000, 306.000000)">
                                        <g id="Group-6" transform="translate(199.000000, 16.000000)">
                                            <g id="复制" transform="translate(4.000000, 6.000000)">
                                                <path d="M4.2631579,0 L10.8947369,0 C11.5051568,0 12,0.494843171 12,1.10526315 L12,7.7368421 C12,8.34726209 11.5051568,8.84210527 10.8947369,8.84210527 L4.2631579,8.84210527 C3.65273791,8.84210527 3.15789473,8.34726209 3.15789473,7.7368421 L3.15789473,1.10526315 C3.15789473,0.494843165 3.65273791,0 4.2631579,0 Z M4.2631579,0.947368422 C4.17595505,0.947368422 4.10526316,1.0180603 4.10526316,1.10526315 L4.10526316,7.7368421 C4.10526316,7.82404496 4.17595504,7.89473684 4.2631579,7.89473684 L10.8947369,7.89473684 C10.9819397,7.89473684 11.0526316,7.82404495 11.0526316,7.7368421 L11.0526316,1.10526315 C11.0526316,1.0180603 10.9819397,0.947368422 10.8947369,0.947368422 L4.2631579,0.947368422 Z M7.89473684,9.78947369 C7.89473684,9.52786512 8.10681249,9.31578948 8.36842105,9.31578948 C8.63002962,9.31578948 8.84210527,9.52786512 8.84210527,9.78947369 L8.84210527,10.8947369 C8.84210527,11.5051568 8.34726209,12 7.7368421,12 L1.10526315,12 C0.494843171,12 0,11.5051568 0,10.8947369 L0,4.2631579 C0,3.65273791 0.494843165,3.15789473 1.10526315,3.15789473 L2.21052631,3.15789473 C2.47213488,3.15789473 2.68421052,3.36997038 2.68421052,3.63157895 C2.68421052,3.89318751 2.47213488,4.10526316 2.21052631,4.10526316 L1.10526315,4.10526316 C1.0180603,4.10526316 0.947368422,4.17595505 0.947368422,4.2631579 L0.947368422,10.8947369 C0.94736843,10.9819397 1.0180603,11.0526316 1.10526315,11.0526316 L7.7368421,11.0526316 C7.82404495,11.0526316 7.89473684,10.9819397 7.89473684,10.8947369 L7.89473684,9.78947369 Z" id="Shape" />
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </span>
                </div>
                {promptData.prompt && <div className="border-solid border-[#979797FF] border rounded-[8px] p-[15px] mt-[10px] mb-[28px]">
                    <Markdown className="text-[18px] leading-[22px]">
                        {promptData.prompt}
                    </Markdown>
                </div>}
                <div className="flex items-center">
                    <span className="text-[24px] leading-[33px] mr-[10px]">代码示例</span>
                </div>
            </div>
        </div>
    </div>
}

export default PromptDetail