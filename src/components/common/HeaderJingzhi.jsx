import { getNavList, getUserInfo } from "@/src/services";
import { getCookie, setCookie } from "@/src/utils";
import Link from "next/link";
import { useEffect, useState } from "react";


const HeaderJingzhi = ({ active }) => {

    const [showChildren, setShowChildren] = useState(false)
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [userData, setUserData] = useState(null)
    let showTimer = ""
    const [navArray, setNavArrary] = useState([])

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

    return <div className="absolute top-0 bg-white w-full z-[100] md:min-w-[1024px]">
        <div className="px-[32px] h-[56px] max-w-[1440px] mx-auto flex md:justify-between justify-start items-center gap-[16px] border-b border-solid border-[#dcdfe6aa]">
            {process.env.NEXT_PUBLIC_OTHER_USE !== "wuhan" && <div>
                <div>
                    <a href="/">
                        <img
                            src="https://caict-llm-portal-storage-test.oss-cn-beijing.aliyuncs.com/eed9cb99-84a1-45dc-bd58-a0c581a4bf8e"
                            alt="Community Logo"
                            className="h-[32px]"
                        />
                    </a>
                </div>
            </div>}
            <div className="w-full flex-1 h-[60px] justify-between hidden md:block">
                <ul
                    className="flex w-full text-[14px] h-full leading-[58px]"
                    role="menubar"
                >
                    {navArray.length == 0 ? "" : navArray.map((item, index) => (
                        item.subs ? <li
                            key={index}
                            role="menuitem"
                            className={`pl-[20px] pr-[44px] h-full hover:text-[#ff5005] relative shrink-0 ${item.subs.some(child => activeRegex.test(child.index)) ? "text-[#FF5005] font-bold border-solid border-b-2 border-[#FF5005]" : ""}`}
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
                            role="menuitem"
                            className={`h-full hover:bg-[#ff500530] hover:text-[#ff5005] cursor-pointer ${activeRegex.test(item.index) ? "text-[#FF5005] font-bold border-solid border-b-2 border-[#FF5005]" : ""}`}
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

                </ul>
            </div>
            <div className="w-full flex-1 h-[60px] block md:hidden">
                <ul
                    className="flex flex-1 justify-between text-[14px] h-full leading-[58px] mx-auto relative"
                    role="menubar"
                >
                    {navArray.length != 0 && <li
                        role="menuitem"
                        className={`h-full flex-1 hover:bg-[#ff500530] hover:text-[#ff5005] cursor-pointer text-center`}
                        tabIndex="-1"
                    >
                        <Link
                            className="h-full px-[20px] w-full block text-nowrap"
                            href={navArray[0].index}
                            target={navArray[0].target ? navArray[0].target : "_self"}
                        >
                            {navArray[0].title}
                        </Link>
                    </li>}
                    <div
                        className="w-full flex-1 flex justify-center items-center text-[#FF5005] font-bold border-solid border-b-2 border-[#FF5005]"
                        onClick={() => {
                            setShowMobileMenu(!showMobileMenu)
                            // console.log(showMobileMenu)
                        }}
                    >
                        <i className="w-[18px] h-[18px]">
                            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 1024 1024"><path fill="currentColor" d="M176 416a112 112 0 1 1 0 224 112 112 0 0 1 0-224m336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224m336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224"></path></svg>
                        </i>
                    </div>
                    <div className={`absolute w-[200px] top-[64px] right-0 ${showMobileMenu ? "" : "overflow-hidden"} text-black shadow-lg bg-white transition-all duration-200 rounded border border-[#ccc] ${showMobileMenu ? "py-1 border-solid" : "h-0"}`}>
                        {navArray.length <= 1 ? "" : navArray.map((item, index) => (
                            index === 0 ? "" : item.subs ? <li
                                key={index}
                                role="menuitem"
                                className={`pl-[20px] pr-[44px] h-[36px] relative ${item.subs.some(child => activeRegex.test(child.index)) ? "text-[#FF5005] font-bold" : ""}`}
                                tabIndex="-1"
                                onClick={() => {
                                    if (showChildren === index) setShowChildren(false)
                                    else setShowChildren(index)
                                }}
                            >
                                <div
                                    className="flex items-center h-[36px]"
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
                                    className={`absolute z-10 top-[36px] left-0 overflow-hidden text-black shadow-lg bg-white transition-all duration-200 rounded border border-[#ccc] ${showChildren === index ? "py-1 border-solid" : "h-0"}`}
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
                                role="menuitem"
                                className={`h-[36px] hover:bg-[#ff500530] hover:text-[#ff5005] cursor-pointer ${activeRegex.test(item.index) ? "text-[#FF5005] font-bold border-solid border-b-2 border-[#FF5005]" : ""}`}
                                tabIndex="-1"
                            >
                                {activeRegex.test(item.index) ? <span className="h-[36px] px-[20px] w-full block">{item.title}</span> : <Link
                                    className="h-[36px] px-[20px] w-full block leading-[36px]"
                                    href={item.index}
                                    target={item.target ? item.target : "_self"}
                                >
                                    {item.title}
                                </Link>}
                            </li>
                        ))}
                    </div>
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
                                    // href="/logout"
                                    >
                                        退出登录
                                    </span>
                                </div>
                                {/* <div className="w-[120px] text-[14px] leading-[36px] hover:bg-[#ff500530] hover:text-[#ff5005]" >
                                    <span
                                        className="w-full h-full px-[10px] block"
                                        onClick={
                                            () => {
                                                setCookie({ ['idToken']: "" }, { days: -1, secure: true, sameSite: 'Strict' })
                                                location.reload()
                                            }
                                        }
                                    >
                                        退出登录
                                    </span>
                                </div> */}
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