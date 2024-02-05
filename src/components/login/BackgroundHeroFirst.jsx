import {
    login_huijujingcai,
    login_bg_round,
    gpt_icon_color,
    sanliuling_icon_color,
    wenxin_icon_color,
    baichuan_icon_color,
    hunyuan_icon_color,
    tongyi_icon_color,
    xunfei_icon_color,
    agicto_icon_color,
    llma_icon_color
} from '../../consts/img'

const modelList = [
    {
        icon: gpt_icon_color,
        name: 'Chat GPT'
    },
    {
        icon: baichuan_icon_color,
        name: '百川大模型'
    },
    {
        icon: sanliuling_icon_color,
        name: '360智脑'
    },
    {
        icon: llma_icon_color,
        name: 'LLMa2'
    },
    {
        icon: agicto_icon_color,
        name: 'AGICTO',
        active: true
    },
    {
        icon: hunyuan_icon_color,
        name: '混元大模型'
    },
    {
        icon: wenxin_icon_color,
        name: '文新一言'
    },
    {
        icon: xunfei_icon_color,
        name: '讯飞星火'
    },
    {
        icon: tongyi_icon_color,
        name: '通义千问'
    }
]

export default function BackgroundHeroFirst() {
    return (
        <div className="w-full h-screen pt-10 bg-gradient-to-t from-[#7A81FF] to-[#3162FF] relative flex justify-center items-center">
            <div className="w-[639px] relative">
                <div className="w-full flex justify-center items-center absolute -top-[170px] z-[10]">
                    <img src={login_huijujingcai} alt="AGICTO" className="w-[431px]" />
                </div>
                <div className="relative flex justify-center items-center">
                    <img src={login_bg_round} alt="AGICTO" className="w-[639px] absolute z-[9]" />
                    <div className="grid grid-cols-3 gap-12 relative z-[11] ">
                        {modelList?.map((item, index) => (
                            <div key={index} className={`bg-slate-200 drop-shadow-md p-4  w-[112px] h-[125px] flex items-center justify-center flex-col ${item?.active ? "bg-white shadow-3xl shadow-[#93F8FF]" : ""}`}>
                                <img src={item?.icon} alt="agicto-icon" className='w-[50px]' />
                                <span className={`text-[14px] mt-[17px] text-black ${item?.active ? "text-[#3162FF]" : ""}`}>{item?.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
