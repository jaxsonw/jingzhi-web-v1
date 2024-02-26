import { home_bottom_bg, agicto_product_agent_wechat } from '../../consts/img'
import { TITLE, RECORD_NUMBER } from '../../../config'


export default function Footer() {
    return (
      <div className="relative bg-[#F2F8FF] h-screen p-4 w-full">
        <img src={home_bottom_bg} alt="" className="absolute z-1 w-[44rem] top-10 left-1/2  -translate-x-1/2 " />
        <div className="absolute w-[30%] z-1  top-[9.2rem] left-1/2 -translate-x-[124%]  flex items-end ">
          <div className="border-[#3162FF] shrink-0 border-b border-b-[2px] px-6 py-2 text-gray-900 pb-[27px] font-bold text-xl">
            我们的优势
          </div>
          <span className="h-[1px] w-[100%] bg-[#98E2FF]" />
        </div>
        <div className="absolute w-[30%] z-1  top-[9.2rem] right-1/2 translate-x-[124%]  flex  flex-row-reverse items-end ">
          <div className="border-[#3162FF] shrink-0 border-b border-b-[2px] px-6 py-2 text-gray-900 pb-[27px] font-bold text-xl">
            AGICTO的愿景
          </div>
          <span className="h-[1px] w-[100%] bg-[#98E2FF] " />
        </div>
        <div className="absolute w-[30%] z-1  top-[20rem] flex  flex-col   left-1/2 -translate-x-[124%]">
          <span className="border rounded-full text-gray-900  text-center py-2 w-[10rem] border-[#98E2FF]">多样化的AI服务</span>
          <span className="border rounded-full text-gray-900  text-center py-2 w-[10rem] border-[#98E2FF] my-8">多样化的AI服务</span>
          <span className="border rounded-full text-gray-900  text-center py-2 w-[10rem] border-[#98E2FF]">多样化的AI服务</span>
        </div>
        <div className="text-right absolute w-[30%] z-1  top-[20rem] leading-10		 right-1/2 translate-x-[124%]  flex  flex-row-reverse items-end ">
          成为全球领先的AI聚合平台
          <br /> 推动人工智能技术的广泛应用
          <br /> 为领域开发人员提供更智慧的LLM调用枢纽
        </div>
        <div className="absolute flex text-black flex-col z-1 w-full bottom-[10px] left-1/2  -translate-x-1/2">
          <span className="text-[#B5B5B5] text-center">2024 · {TITLE}</span>
          <span className="text-[#9E9E9E] text-center">{RECORD_NUMBER}</span>
        </div>
 
          <img className="absolute right-16 bottom-16 w-[132px]" src={agicto_product_agent_wechat} alt={TITLE} />
      
      </div>
    )
}