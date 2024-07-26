import { TITLE } from "@/config"
import { icon_logo_white } from "@/src/consts/img"
import HoverLink from "../common/HoverLink"

const HomeFooter = () => {
    const quickEntry = [{
        title: "调试平台",
        href: "/playground"
    }, {
        title: "查看文档",
        href: "/docs"
    }, {
        title: "模型广场",
        href: "/model"
    }, {
        title: "Prompt工程",
        href: "/prompt"
    }]

    const companyInformation = [{
        title: "AGICTO官网",
        href: "/"
    }, {
        title: "关于我们",
        href: "/about"
    }]

    const qrcodeArr = [{
        title: "企业客服",
        src: "/server_wechat.jpg"
    }, {
        title: "开发者交流群",
        src: "/agicto_groupChat.png"
    }]

    return <div className="w-full bg-[#1a1e24] px-[150px] pt-[50px] pb-[30px]">
        <div className="flex text-white text-[14px]">
            <div className="w-[150px] mr-[100px]">
                <img
                    src={icon_logo_white}
                    alt={TITLE} />
            </div>
            <div className="w-[150px] text-start">
                <div className="mb-[20px]">快速入口</div>
                <div className="text-[#eeeeee] font-sans">
                    {
                        quickEntry.map((item, index) => <div
                            key={"quick" + index}
                            className="mb-[15px]"
                        >
                            <HoverLink
                                href={item.href}
                                title={item.title}
                            />

                        </div>)
                    }
                </div>
            </div>
            <div className="w-[150px] text-start">
                <div className="mb-[20px]">公司信息</div>
                <div className="text-[#eeeeee] font-sans">
                    {
                        companyInformation.map((item, index) => <div
                            key={"comp" + index}
                            className="mb-[15px]"
                        >
                            <HoverLink
                                href={item.href}
                                title={item.title}
                            />
                        </div>)
                    }
                </div>
            </div>
            <div className="w-[250px] text-start">
                <div className="mb-[20px]">联系方式</div>
                <div className="text-[#eeeeee] font-sans">
                    <div>商务合作: agictolab@gmail.com</div>
                </div>
            </div>
            <div className="flex flex-1 ml-[80px]">
                {qrcodeArr.map((item, index) => <div
                    key={"qrcode" + index}
                    className="mr-[40px]"
                >
                    <div className="w-[80px] h-[80px] rounded-md overflow-hidden mb-[10px]">
                        <img src={item.src} alt={TITLE} />
                    </div>
                    <div>{item.title}</div>
                </div>)}
            </div>
        </div>
        <div className="mt-[50px] pt-[20px] border-t-[1px] border-solid border-[rgba(255,255,255,0.3)] text-[#C8C8C8] text-[14px]">
            <p>Copyright © 2024 AGICTO</p>
            <a href="https://beian.miit.gov.cn/" target="_blank">冀ICP备2023005620号-4</a>
        </div>
    </div>
}

export default HomeFooter