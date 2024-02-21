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
  agicto_icon_color_white,
  llma_icon_color_white
} from '../../consts/img'



const iconList = [
  gpt_icon_color_white,
  sanliuling_icon_color_white,
  wenxin_icon_color_white,
  baichuan_icon_color_white,
  hunyuan_icon_color_white,
  tongyi_icon_color_white,
  xunfei_icon_color_white,
  agicto_icon_color_white,
  llma_icon_color_white
]

export default function HeroHome() {
 
    return (
      <div>
        <HeaderBlue />
        <div className="p-10 flex flex-col">
          <span>
            AGICTO汇集了来自各个领域的优秀AI模型 您无需耗费大量时间和精力去逐一了解和学习不同的AI模型接口调用方法
            现在，您只需要通过一个接口便可对众多模型进行调用和使用
          </span>
          <div>易用 / 稳定 / 全面 / 优价 </div>
          <div>AGICTO大模型调用基座</div>
          <span>已经产生 124,443,938,23 次AI交流</span>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <img src={home_hero_slide} />
            <span>下滑进入首页</span>
                </div>
                <div>{iconList?.map(item => <img src={item} />)}</div>
        </div>
      </div>
    )
}
