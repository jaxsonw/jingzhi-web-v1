'use client'
import { usePathname } from 'next/navigation'
import { navigation } from './const'
import { Navigation } from '../../components/docs/Navigation'
import { MobileNavigation } from '../../components/docs/MobileNavigation'

export default function Layout({ children }) {
    return (
        <>
            <div className="p-5 pb-0 lg:hidden">
                <MobileNavigation navigation={navigation} />
            </div>
            <div className="relative flex  lg:max-w-[80%] h-[calc(100vh_-_82px)]  overflow-y-hidden  mx-auto sm:px-2 lg:px-8 xl:px-5">
                <div className='hidden lg:block '>
                    <Navigation navigation={navigation} />
                </div>
                <div className="h-[calc(100vh_-_82px)] grow overflow-y-scroll scrollbar lg:px-10 px-5 py-5">{children}</div>
            </div>
        </>
    )
}
