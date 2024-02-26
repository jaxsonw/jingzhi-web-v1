import Link from "next/link"
import CustomerModal from '../common/CustomerModal'
import HeaderBlue from "../common/HeaderBlue"
import {
  home_hero_slide,
  gpt_icon_color_white,
  sanliuling_icon_color_white,
  wenxin_icon_color_white,
  baichuan_icon_color_white,
  hunyuan_icon_color_white,
  tongyi_icon_color_white,
  xunfei_icon_color_white,
  llma_icon_color_white,
  home_hero_bg
} from '../../consts/img'



const iconList = [
  gpt_icon_color_white,
  wenxin_icon_color_white,
  baichuan_icon_color_white,
  llma_icon_color_white,
  hunyuan_icon_color_white,
  sanliuling_icon_color_white,
  xunfei_icon_color_white,
  tongyi_icon_color_white,
]

export default function HeroHome() {

  return (
    <div className="w-full flex flex-col text-left h-screen relative">
      <img src={home_hero_bg} className="absolute bottom-0 z-1  w-[61rem]  left-[50%] -translate-x-1/2		" />
      <HeaderBlue />
      <div className="px-[127px] py-8 relative">
        <div className="flex flex-col pt-[90px]">
          <span className=" font-[16px] leading-8 opacity-[0.7] text-white">
            AGICTO汇集了来自各个领域的优秀AI模型
            <br /> 您无需耗费大量时间和精力去逐一了解和学习不同的AI模型接口调用方法
            <br />
            现在，您只需要通过一个接口便可对众多模型进行调用和使用
          </span>
          <div className="pt-[45px] text-[24px] text-white">易用 / 稳定 / 全面 / 优价 </div>
          <div className="text-[80px] font-bold mt-[45px]">
            AGICTO大模型调用基座 
          </div>
          <span
            style={{
              backgroundImage: 'linear-gradient(97deg, #5F9BFF 3%, #3162FF 100%)'
            }}
            className="border flex items-center justify-center w-[400px] text-white rounded-full mt-[68px] px-10 py-3"
          >
            已经产生 <strong className="text-[#8FDFFF]  tracking-widest		">124,443,938,23</strong> 次AI交流
          </span>
        </div>
        <div className="flex justify-between mt-[67px] items-center">
          <div className="flex items-center">
            <img className="w-[25px]" src={home_hero_slide} />
            <span className="text-[12px] ml-2  text-white ">下滑进入首页</span>
          </div>
          <div className="flex items-center justify-start  pb-10">
            {iconList?.map((item, index) => (
              <img key={index} className="w-[45px] mr-[33px]" src={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
