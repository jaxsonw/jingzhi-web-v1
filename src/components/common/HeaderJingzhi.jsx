import Link from "next/link";
import { useState } from "react";


const HeaderJingzhi = () => {
    const [showChildren, setShowChildren] = useState(false)
    let showTimer
    const navArray = [
        { title: '首页', href: '/' },
        { title: '模型仓库', href: '/models' },
        { title: '数据集库', href: '/datasets' },
        {
            title: '供需对接', href: '#', children: [
                { title: '需求卡片', href: '/ai_issues/new' },
                { title: '供给卡片', href: '/organizations/collection' }
            ]
        },
        { title: '应用集合（即将上线）', href: '#' },
        { title: '算力资源（即将上线）', href: '#' },
        { title: '社区活动', href: '/salons' },
        { title: '知识宝库', href: '/daily_papers' },
        { title: '大模型广场', href: '#', active: true },
        { title: 'API', href: '#' }
    ];

    return <div className="absolute top-0 bg-white w-full">
        <div className="px-[32px] h-[56px] max-w-[1440px] mx-auto flex md:justify-between justify-start items-center gap-[16px] border-b border-solid border-[#dcdfe6aa]">
            <div>
                <div>
                    <a href="/">
                        <img
                            src="https://caict-llm-portal-storage-test.oss-cn-beijing.aliyuncs.com/eed9cb99-84a1-45dc-bd58-a0c581a4bf8e"
                            alt="Community Logo"
                            className="h-[36px]"
                        />
                    </a>
                </div>
            </div>
            <div className="w-full h-[60px]">
                <ul
                    className="flex w-full text-[14px] h-full leading-[58px]"
                    role="menubar"
                >
                    {navArray.map((item, index) => (
                        item.children ? <li
                            key={index}
                            role="menuitem"
                            className="pl-[20px] pr-[44px] h-full hover:text-[#ff5005] relative"
                            tabIndex="-1"
                            onMouseEnter={() => {
                                if (showTimer) clearTimeout(showTimer)
                                setShowChildren(index)
                            }}
                            onMouseLeave={() => {
                                showTimer = setTimeout(() => {
                                    setShowChildren(false)
                                }, 200)
                            }}
                        >
                            <div
                                className="flex items-center"
                            >
                                {item.title}
                                <i
                                    className={`w-[12px] h-[12px] absolute right-[20px] transition-transform duration-200 ${showChildren === index?"transform rotate-180":""} `}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 1024 1024">
                                        <path fill="currentColor" d="M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z">
                                        </path>
                                    </svg>
                                </i>
                            </div>
                            <div
                                className={`absolute top-[64px] left-0 overflow-hidden text-black shadow-lg bg-white transition-all duration-200 rounded border border-[#ccc] ${showChildren === index ? "py-1 border-solid" : "h-0"}`}
                            >
                                {item.children.map((child, index) => <div
                                    key={index}
                                    className="w-[200px] text-[14px] leading-[36px] hover:bg-[#ff500530] hover:text-[#ff5005]"
                                >
                                    <Link
                                        className="w-full h-full px-[10px] block"
                                        href={child.href}
                                    >
                                        {child.title}
                                    </Link>
                                </div>)}
                            </div>
                        </li> : <li
                            key={index}
                            role="menuitem"
                            className={`px-[20px] h-full hover:bg-[#ff500530] hover:text-[#ff5005] cursor-pointer ${item.active ? "text-[#FF5005] font-bold border-solid border-b-2 border-[#FF5005]" : ""}`}
                            tabIndex="-1"
                        >
                            {item.active ? item.title : <Link
                                className="h-full"
                                href={item.href}
                            >
                                {item.title}
                            </Link>}
                        </li>
                    ))}

                </ul>
            </div>
            <div className="flex items-center">
                <div className="el-dropdown pl-1">
                    <div className="el-dropdown-link el-tooltip__trigger el-tooltip__trigger" id="el-id-8837-1" role="button" tabIndex="0" aria-controls="el-id-8837-2" aria-expanded="false" aria-haspopup="menu">
                        <div className="relative">
                            <div
                                className="rounded-full h-[40px] w-[40px] overflow-hidden bg-[#c0c4cc]"
                            >
                                <img src="https://cdn.casbin.org/img/casbin.svg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

}

export { HeaderJingzhi }