import { PoliceBadge } from '@/src/icons/police_badge';
import Link from 'next/link';

const FooterJingzhi = () => {
    return (
        <div className="w-full bg-[#181f31]">
            <div className="pt-[64px] bg-[#181f31] text-white max-w-[1440px] m-auto w-full">
                <div className="px-[64px] md:px-[16px] m-auto">
                    <div className="flex justify-between md:flex-wrap md:gap-[16px]">
                        <div className="flex flex-col gap-[16px] md:gap-[8px] w-[320px]">
                            <div>
                                <img src="https://caict-llm-portal-storage-test.oss-cn-beijing.aliyuncs.com/8c9b3fa0-b324-4f5c-b403-d8f386b988bc" alt="Community Logo" className="" />
                            </div>
                            <div className="text-[16px] font-[300] leading-[24px] opacity-60">
                                人工智能开源开放产业生态的赋能者和护航者，聚集产业资源，推动完善技术生态，促进大模型产业落地。
                            </div>
                            <div className="text-[16px] font-[300] leading-[24px] opacity-60">
                                项目来源：2023年产业技术基础公共服务平台-面向人工智能大模型工程化技术及应用的产业公共服务平台
                            </div>
                        </div>
                        <div className="flex gap-[32px] justify-end">
                            <div className="flex md:basis-1/3 flex-col gap-[16px]">
                                <div className="text-[14px] font-[500] leading-[20px] opacity-60">关注我们</div>
                                <div className="flex flex-col gap-[12px]">
                                    <Link href="javascript:;" className="text-white inline-block text-[16px] font-[500] leading-[24px] ">公众号</Link>
                                </div>
                            </div>
                            <div className="flex md:basis-1/3 flex-col gap-[16px]">
                                <div className="text-[14px] font-[500] leading-[20px] opacity-60">联系我们</div>
                                <div className="flex flex-col gap-[12px]">
                                    <Link href="javascript:;" className="text-white inline-block text-[16px] font-[500] leading-[24px] ">邮箱</Link>
                                </div>
                            </div>
                            <div className="flex md:basis-1/3 flex-col gap-[16px]">
                                <div className="text-[14px] font-[500] leading-[20px] opacity-60">政府机构</div>
                                <div className="flex flex-col gap-[12px]">
                                    <Link href="javascript:;" className="text-white inline-block text-[16px] font-[500] leading-[24px] text-nowrap">中华人民共和国工业和信息化部</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-[64px] border-t pb-[48px] opacity-60 border-solid">
                        <div className="pt-[32px] flex justify-between">
                            <div className="flex items-center text-[12px] font-[400] text-[#223B99] leading=[20px]">
                                <PoliceBadge />
                                <Link href="https://beian.mps.gov.cn/" target="_blank" className="text-white inline-block ml-[8px]">京公网安备11010802027721号</Link>
                                <span className="inline-block">｜</span>
                                <Link href="https://beian.miit.gov.cn/" target="_blank" className="text-white inline-block">京ICP备09013372号</Link>
                            </div>
                            <div className="flex text-white text-[14px] font-[400] leading-[22px]">
                                Copyright © 2018-{new Date().getFullYear()} 中国信息通信研究院 版权所有
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}

export { FooterJingzhi }

