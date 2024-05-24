'use client'
import React, { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { FiMenu } from 'react-icons/fi'
import { usePathname } from 'next/navigation'
import { RiCustomerService2Line } from 'react-icons/ri'
// import Logo from '/public/logo.jpeg'
import CustomerModal from './CustomerModal'
import baseHooks from '../hooks/base'
import { useRouter } from 'next/navigation'

import { icon_logo_white, icon_logo_color } from '../../consts/img'
import InviteModal from './InviteModal'
const hiddenPath = ['/space', '/login']

const navigation = [
  { name: 'ACICTO', href: '/' },
  { name: '模型广场', href: '/model', target: '_self' },
  { name: '模型排行榜', href: '/llm-leaderboard', target: '_self' },
  { name: '调试平台', href: '/playground', target: '_self' },
  { name: 'Prompt工程', href: '/prompt', target: '_self' },
  { name: '开发文档', href: '/docs', target: '_self' },
  // { name: 'Chat Code', href: '/code', target: '_self' },
  // { name: '学习AGI', href: '/agi', target: '_self' },
  { name: '关于我们', href: '/about', target: '_self' }
]

const Header = () => {
  const { userInfo } = baseHooks()
  const router = useRouter()
  const pathname = usePathname()
  const [customerOpen, setCustomerOpen] = useState(false)
  const [inviteVisible, setInviteVisible] = useState(false)
  const [inviteUrl, setInviteUrl] = useState('')

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  let isShowHeader = true
  hiddenPath.forEach(item => {
    if (pathname.includes(item)) {
      isShowHeader = false
    }
  })

  useEffect(() => {
    setInviteUrl(`${window.origin}/?channel=${userInfo?.inviteCode}`)

  }, [userInfo])

  if (!isShowHeader) return null

  return (
    <>
      <InviteModal url={inviteUrl} open={inviteVisible} setOpen={setInviteVisible} />
      <header className="bg-white w-full bg-[#3162FF]">
        <CustomerModal isOpen={customerOpen} setIsOpen={setCustomerOpen} />

        <nav className=" flex items-center justify-between p-6 bg-[#3162FF] lg:px-8 " aria-label="Global">
          <div className="flex">
            <a href="/" className="flex items-center -m-1.5 p-1.5">
              <img className="h-[35px]" src={icon_logo_white} alt="" />
            </a>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map(item => {
              const isActive = item?.href === pathname
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target={item?.target}
                  className={`text-[16px] flex flex-col  items-center font-semibold leading-6 text-[rgba(255,255,255,0.5)] ${isActive ? 'text-[#fff]' : ''
                    }`}
                >
                  <span className={`${isActive ? 'text-[#fff]' : ''}`}>{item.name}</span>
                  {isActive ? <span className="block mt-3 w-2/3 rounded-full h-1 bg-white" /> : null}{' '}
                </a>
              )
            })}
          </div>
          <div className="flex items-center lg:flex hidden">
            <button type="button" className="flex items-center mr-4" onClick={() => setCustomerOpen(true)}>
              <RiCustomerService2Line color="#fff" />
              <span className="font-semibold text-[#fff] text-sm  ml-1">客服</span>
            </button>
            {

            }
            <button type="button" className="flex items-center mr-4" onClick={() => {
              if (userInfo?.name) {
                setInviteVisible(true)

              } else {
                router.push('/login?bindphone=1')

              }
            }}>
              {/* <RiCustomerService2Line color="#fff" /> */}
              <span className="font-semibold text-[#fff] text-sm  ml-1">领取免费额度</span>
            </button>
            {userInfo?.name ? (
              <a href="/space" className="text-sm font-semibold leading-6 text-white">
                个人中心
              </a>
            ) : (
              <a href="/login" className="text-sm font-semibold leading-6 text-white">
                注册/登录
              </a>
            )}
          </div>
          <FiMenu className="lg:hidden" onClick={() => setMobileMenuOpen(true)} />
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 text-black right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center outline-none -m-1.5 p-1.5">
                <span className="sr-only">AGICTO</span>
                <img className="h-[35px]" src={icon_logo_color} alt="" />
              </a>
              <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map(item => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  {userInfo?.name ? (
                    <a
                      href="/space"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black hover:bg-gray-50"
                    >
                      个人中心
                    </a>
                  ) : (
                    <a
                      href="/login"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black hover:bg-gray-50"
                    >
                      注册/登录
                    </a>
                  )}
                </div>
                <button type="button" className="flex items-center border-none" onClick={() => setCustomerOpen(true)}>
                  <RiCustomerService2Line color="black" />
                  <span className="font-semibold text-black text-lg ml-2">客服</span>
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>

  )
}

export default Header
