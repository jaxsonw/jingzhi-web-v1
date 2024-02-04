'use client'
import { usePathname } from 'next/navigation'
import { navigation } from './const'
import { Navigation } from '../../components/docs/Navigation'
import { MobileNavigation } from '../../components/docs/MobileNavigation'

export default function Layout({ children }) {
    const pathName = usePathname()
    return (
        <>
            <div className="p-5 pb-0 lg:hidden">
                <MobileNavigation navigation={navigation} />
            </div>
            <div className="relative flex  lg:max-w-[80%] h-[calc(100vh_-_82px)]  overflow-y-hidden  mx-auto sm:px-2 lg:px-8 xl:px-5">
                <div className="hidden lg:block  w-64 h-[calc(100vh_-_82px)]  overflow-y-scroll scrollbar  shrink-0  bg-white z-0">
                    <div className="h-full py-10 border-r">

                        {navigation?.map((item, index) => <div key={index} className="mb-5">
                            <h4 className="w-full cursor-default">
                                <div className="flex justify-between">
                                    <p className="text-slate-800 mb-4 tracking-wide font-semibold text-md lg:text-sm">{item?.title}</p>
                                </div>
                            </h4>
                            <ul>
                                {
                                    item?.children?.map((child, ind) => <li key={ind} className="items-center">
                                        <a href={child?.href}>
                                            <span
                                                className={`text-slate-500 hover:text-slate-700 hover:border-slate-400 relative block border-l-2 ml-1 pl-4 py-1.5  font-normal text-md lg:text-sm transition-all ${pathName === child?.href ? "text-blue-500 border-current" : ""}`}
                                                aria-hidden="true"
                                            > {child?.title}
                                            </span>
                                        </a>
                                    </li>)
                                }
                            </ul>

                        </div>)}

                    </div>
                </div>
                <div className="h-[calc(100vh_-_82px)] grow overflow-y-scroll scrollbar lg:px-10 px-5 py-5">{children}</div>
            </div>
        </>
    )
}
