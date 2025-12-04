import { getNavList, getUserInfo } from "@/src/services";
import { getCookie, setCookie } from "@/src/utils";
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";

const HeaderJingzhi = ({ active }) => {

    const [showChildren, setShowChildren] = useState(false)
    const [showOverflowMenu, setShowOverflowMenu] = useState(false)
    const [submenuPosition, setSubmenuPosition] = useState({}) // 存储子菜单位置
    const [userData, setUserData] = useState(null)
    let showTimer = ""
    const [navArray, setNavArrary] = useState([])
    const [visibleCount, setVisibleCount] = useState(-1) // -1 表示未计算
    const navContainerRef = useRef(null)
    const navItemsRef = useRef([])
    const itemWidthsRef = useRef([]) // 存储每个项目的宽度
    const moreButtonRef = useRef(null)
    const resizeTimerRef = useRef(null)

    const menuItem = [
        [
            { title: '个人信息', href: userData ? `/profile/${userData.id}` : "/login" },
            { title: '账号设置', href: '/settings/profile' },
        ], [
            { title: '+ 新建模型', href: '/models/new' },
            { title: '+ 新建数据集', href: '/datasets/new' },
        ], [
            { title: '+ 新建组织', href: '/organizations/new' },
        ]
    ]

    const [isLogin, setIsLogin] = useState(false)

    const getUserData = async () => {
        try {
            if (getCookie('idToken')) {
                setIsLogin(true)
                const res = await getUserInfo()
                if (res.code === 0) {
                    setUserData(res.data)
                } else {
                    //message.error("用户信息获取失败")
                    localStorage.setItem("cb_url", window.location.href)
                    setTimeout(() => {
                        location.href = '/signin/'
                    }, 1000)
                }
            }
        } catch (err) {

        }
    }

    const getNavData = async () => {
        try {
            const res = await getNavList()
            if (res.code === 0) {
                setNavArrary(res.data)
            }
        } catch (err) {

        }
    }

    useEffect(() => {
        getUserData()
        getNavData()
    }, [])

    // 测量并存储项目宽度（只在首次或数据变化时）
    const measureItemWidths = useCallback(() => {
        if (navArray.length === 0) return
        const widths = []
        for (let i = 0; i < navItemsRef.current.length; i++) {
            const item = navItemsRef.current[i]
            if (item) {
                // 临时移除 hidden 类以便测量
                const wasHidden = item.classList.contains('hidden')
                if (wasHidden) item.classList.remove('hidden')
                widths[i] = item.offsetWidth
                if (wasHidden) item.classList.add('hidden')
            }
        }
        itemWidthsRef.current = widths
    }, [navArray])

    // 计算可见导航项数量
    const calculateVisibleItems = useCallback(() => {
        if (!navContainerRef.current || navArray.length === 0) return

        // 如果没有存储宽度，先测量
        if (itemWidthsRef.current.length === 0) {
            measureItemWidths()
        }

        const containerWidth = navContainerRef.current.offsetWidth
        const moreButtonWidth = 60 // 图标按钮宽度
        let totalWidth = 0
        let count = 0

        for (let i = 0; i < itemWidthsRef.current.length; i++) {
            const itemWidth = itemWidthsRef.current[i] || 0
            if (itemWidth === 0) continue

            // 检查是否需要预留"更多"按钮空间
            const needMoreButton = i < navArray.length - 1
            const availableWidth = needMoreButton ? containerWidth - moreButtonWidth : containerWidth

            if (totalWidth + itemWidth > availableWidth) {
                break
            }
            totalWidth += itemWidth
            count++
        }

        // 如果所有项目都能显示，就显示全部
        setVisibleCount(count === navArray.length ? navArray.length : Math.max(count, 0))
    }, [navArray, measureItemWidths])

    // 监听窗口大小变化（带防抖）
    useEffect(() => {
        const handleResize = () => {
            if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current)
            resizeTimerRef.current = setTimeout(() => {
                calculateVisibleItems()
            }, 50)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
            if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current)
        }
    }, [calculateVisibleItems])

    // 导航数据加载后测量宽度并计算
    useEffect(() => {
        if (navArray.length > 0) {
            // 先显示所有项目，等待 DOM 渲染完成后测量
            setVisibleCount(-1)
            setTimeout(() => {
                measureItemWidths()
                calculateVisibleItems()
            }, 50)
        }
    }, [navArray, measureItemWidths, calculateVisibleItems])

    useEffect(() => {
        const handleClickOutside = (event) => {
            const targetElement = event.target;
            if (!targetElement.closest("#el-id-8837-1")) {
                // 这里是点击元素之外的区域，可以触发相应事件
                if (showChildren === "menu") setShowChildren(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const activeRegex = new RegExp(active)

    // 计算子菜单位置：右侧优先 -> 左侧 -> 下方
    const calculateSubmenuPosition = (parentEl, submenuWidth = 200) => {
        if (!parentEl) return { type: 'left', style: {} }
        const rect = parentEl.getBoundingClientRect()
        const viewportWidth = window.innerWidth
        const spaceRight = viewportWidth - rect.right
        const spaceLeft = rect.left

        // 优先右侧（留4px间隙）
        if (spaceRight >= submenuWidth + 4) {
            return { type: 'right', style: { left: 'calc(100% + 4px)', top: 0 } }
        }
        // 其次左侧（留4px间隙）
        if (spaceLeft >= submenuWidth + 4) {
            return { type: 'left', style: { right: 'calc(100% + 4px)', top: 0 } }
        }
        // 最后下方
        return { type: 'bottom', style: { left: 0, top: '36px' } }
    }

    return <div className="fixed top-0 bg-white w-full z-[100] md:min-w-[1024px]">
        <div className="px-[32px] h-[56px] mx-auto flex md:justify-between justify-start items-center gap-[16px] border-b border-solid border-[#dcdfe6aa]">
            <div>
                <a href="/">
                    <img
                        src={process.env.NEXT_PUBLIC_OTHER_USE !== "wuhan" ?
                            "https://caict-llm-portal-storage-test.oss-cn-beijing.aliyuncs.com/eed9cb99-84a1-45dc-bd58-a0c581a4bf8e" :
                            "http://caict-llm-portal-storage.oss-cn-beijing.aliyuncs.com/system-logo/7b5dc806-c024-43b6-806e-bf3dca49964a"
                        }
                        alt="Community Logo"
                        className="h-[32px]"
                    />
                </a>
            </div>
            <div className="w-0 grow h-[60px]" ref={navContainerRef}>
                <ul
                    className="flex w-full text-[14px] h-full leading-[58px] justify-start"
                    role="menubar"
                >
                    {navArray.length == 0 ? "" : navArray.map((item, index) => (
                        item.subs ? <li
                            key={index}
                            ref={el => navItemsRef.current[index] = el}
                            role="menuitem"
                            className={`pl-[20px] pr-[44px] h-full hover:text-[#ff5005] relative shrink-0 ${visibleCount > 0 && index >= visibleCount ? "hidden" : ""} ${item.subs.some(child => activeRegex.test(child.index)) ? "text-[#FF5005] font-bold border-solid border-b-2 border-[#FF5005]" : ""}`}
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
                                    className={`w-[12px] h-[12px] absolute right-[20px] transition-transform duration-200 ${showChildren === index ? "transform rotate-180" : ""} `}
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
                                {item.subs.map((child, index) => <div
                                    key={index}
                                    className="w-[200px] text-[14px] leading-[36px] hover:bg-[#ff500530] hover:text-[#ff5005]"
                                >
                                    {activeRegex.test(child.index) ? <span
                                        className="w-full h-full px-[10px] block text-[#ff5005] font-bold cursor-pointer"
                                    >
                                        {child.title}
                                    </span> : <Link
                                        className="w-full h-full px-[10px] block font-normal"
                                        href={child.index}
                                        target={child.target ? child.target : "_self"}
                                    >
                                        {child.title}
                                    </Link>}
                                </div>)}
                            </div>
                        </li> : <li
                            key={index}
                            ref={el => navItemsRef.current[index] = el}
                            role="menuitem"
                            className={`h-full hover:bg-[#ff500530] hover:text-[#ff5005] cursor-pointer shrink-0 ${visibleCount > 0 && index >= visibleCount ? "hidden" : ""} ${activeRegex.test(item.index) ? "text-[#FF5005] font-bold border-solid border-b-2 border-[#FF5005]" : ""}`}
                            tabIndex="-1"
                        >
                            {activeRegex.test(item.index) ? <span className="h-full px-[20px] w-full block">{item.title}</span> : <Link
                                className="h-full px-[20px] w-full block"
                                href={item.index}
                                target={item.target ? item.target : "_self"}
                            >
                                {item.title}
                            </Link>}
                        </li>
                    ))}

                    {/* 溢出菜单按钮 */}
                    {visibleCount > 0 && visibleCount < navArray.length && (
                        <li
                            ref={moreButtonRef}
                            role="menuitem"
                            className={`h-full hover:text-[#ff5005] cursor-pointer relative shrink-0 ${navArray.slice(visibleCount).some(item => item.subs ? item.subs.some(child => activeRegex.test(child.index)) : activeRegex.test(item.index)) ? "text-[#FF5005] border-solid border-b-2 border-[#FF5005]" : ""}`}
                            tabIndex="-1"
                            onMouseEnter={() => {
                                if (showTimer) clearTimeout(showTimer)
                                setShowOverflowMenu(true)
                            }}
                            onMouseLeave={() => {
                                showTimer = setTimeout(() => {
                                    setShowOverflowMenu(false)
                                }, 200)
                            }}
                        >
                            <div className={`flex items-center h-full px-[20px] ${navArray.slice(visibleCount).some(item => item.subs ? item.subs.some(child => activeRegex.test(child.index)) : activeRegex.test(item.index)) ? "text-[#FF5005] font-bold" : ""}`}>
                                <i className="w-[18px] h-[18px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 1024 1024"><path fill="currentColor" d="M176 416a112 112 0 1 1 0 224 112 112 0 0 1 0-224m336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224m336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224"></path></svg>
                                </i>
                            </div>
                            <div
                                className={`absolute top-[64px] right-0 text-black shadow-lg bg-white transition-all duration-200 rounded border border-[#ccc] ${showOverflowMenu ? "py-1 border-solid" : "h-0 overflow-hidden"}`}
                                onMouseEnter={() => {
                                    if (showTimer) clearTimeout(showTimer)
                                    setShowOverflowMenu(true)
                                }}
                                onMouseLeave={() => {
                                    showTimer = setTimeout(() => {
                                        setShowOverflowMenu(false)
                                    }, 200)
                                }}
                            >
                                {navArray.slice(visibleCount).map((item, idx) => {
                                    const originalIndex = visibleCount + idx
                                    return item.subs ? (
                                        <div
                                            key={originalIndex}
                                            className="relative"
                                            onMouseEnter={(e) => {
                                                const pos = calculateSubmenuPosition(e.currentTarget)
                                                setSubmenuPosition(prev => ({ ...prev, [`overflow-${originalIndex}`]: pos }))
                                                setShowChildren(`overflow-${originalIndex}`)
                                            }}
                                            onMouseLeave={() => setShowChildren(false)}
                                        >
                                            <div className={`w-[200px] text-[14px] leading-[36px] hover:bg-[#ff500530] hover:text-[#ff5005] px-[10px] flex items-center justify-between cursor-pointer ${item.subs.some(child => activeRegex.test(child.index)) ? "text-[#FF5005] font-bold" : ""}`}>
                                                <span>{item.title}</span>
                                                <i className={`w-[12px] h-[12px] transition-transform duration-200 ${showChildren === `overflow-${originalIndex}` ? "transform -rotate-90" : ""}`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 1024 1024">
                                                        <path fill="currentColor" d="M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"></path>
                                                    </svg>
                                                </i>
                                            </div>
                                            <div
                                                className={`absolute z-10 overflow-hidden text-black font-normal shadow-lg bg-white transition-[height,padding] duration-200 rounded border border-[#ccc] ${showChildren === `overflow-${originalIndex}` ? "py-1 border-solid" : "h-0"}`}
                                                style={submenuPosition[`overflow-${originalIndex}`]?.style || { right: 'calc(100% + 4px)', top: 0 }}
                                            >
                                                {item.subs.map((child, childIdx) => (
                                                    <div key={childIdx} className="w-[200px] text-[14px] leading-[36px] hover:bg-[#ff500530] hover:text-[#ff5005]">
                                                        {activeRegex.test(child.index) ? (
                                                            <span className="w-full h-full px-[10px] block text-[#ff5005] font-bold cursor-pointer">{child.title}</span>
                                                        ) : (
                                                            <Link className="w-full h-full px-[10px] block font-normal" href={child.index} target={child.target || "_self"}>{child.title}</Link>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div key={originalIndex} className={`w-[200px] text-[14px] leading-[36px] hover:bg-[#ff500530] hover:text-[#ff5005] ${activeRegex.test(item.index) ? "text-[#FF5005] font-bold" : ""}`}>
                                            {activeRegex.test(item.index) ? (
                                                <span className="w-full h-full px-[10px] block">{item.title}</span>
                                            ) : (
                                                <Link className="w-full h-full px-[10px] block" href={item.index} target={item.target || "_self"}>{item.title}</Link>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </li>
                    )}
                </ul>
            </div>
            <div className="flex items-center">
                <div className="pl-1">
                    <div className="" id="el-id-8837-1" role="button" tabIndex="0" aria-controls="el-id-8837-2" aria-expanded="false" aria-haspopup="menu">
                        {isLogin ? <div className="relative flex-col items-center ">
                            <div
                                className="rounded-full h-[40px] w-[40px] overflow-hidden bg-[#c0c4cc]"
                                onClick={() => {
                                    if (showTimer) clearTimeout(showTimer)
                                    if (showChildren === "menu") {
                                        setShowChildren(false)
                                    } else {
                                        setShowChildren("menu")
                                    }
                                }}
                            >
                                <img src={userData ? userData.avatar : ""} alt="avatar" />
                            </div>
                            <div
                                className={`absolute top-[54px] left-0 md:left-1/2 transform -translate-x-1/2 overflow-hidden text-black shadow-lg bg-white transition-all duration-200 rounded border border-[#ccc] ${showChildren === "menu" ? "py-1 border-solid" : "h-0"}`}
                            >
                                {menuItem.map((item, index) => <div key={"menuItems" + index} className="border-b border-[#ddd] border-solid">
                                    {item.map((it, id) => <div
                                        key={"menuItem" + id}
                                        className="w-[120px] text-[14px] leading-[36px] hover:bg-[#ff500530] hover:text-[#ff5005]"
                                    >
                                        <Link
                                            className="w-full h-full px-[10px] block"
                                            href={it.href}
                                        >
                                            {it.title}
                                        </Link>
                                    </div>)}
                                </div>
                                )}
                                <div
                                    className="w-[120px] text-[14px] leading-[36px] hover:bg-[#ff500530] hover:text-[#ff5005]"
                                    onClick={() => {
                                        setCookie("idToken", "", 0)
                                        location.reload()
                                    }}
                                >
                                    <span
                                        className="w-full h-full px-[10px] block"
                                    >
                                        退出登录
                                    </span>
                                </div>
                            </div>
                        </div> : <div>
                            <button
                                type="button"
                                className="inline-flex text-center items-center justify-center text-nowrap px-4 py-2 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-[#ff8035] hover:bg-[#ff5005]"
                                onClick={() => {
                                    localStorage.setItem("cb_url", window.location.href)
                                    location.href = "/signin/"
                                }}
                            >
                                登录
                            </button>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    </div>

}

export { HeaderJingzhi }