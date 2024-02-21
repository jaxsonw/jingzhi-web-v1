'use client'
import React, { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
// import Logo from '/public/logo.jpeg'
import baseHooks from '../hooks/base'
import { icon_logo_white } from '../../consts/img'

const hiddenPath = ['/space', '/login']

const navigation = [
  { name: '首页', href: '/' },
  // { name: '计费标准', href: '/pricing' },
  { name: '开发文档', href: '/docs', target: '__blank' }
  //   { name: "在线平台", href: "/playground" },
  //   { name: "商店", href: "/shop" },
]

const Header = () => {
  const { userInfo } = baseHooks()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  let isShowHeader = true
  hiddenPath.forEach(item => {
    if (pathname.includes(item)) {
      isShowHeader = false
    }
  })
  if (!isShowHeader) return null
  return (
    <header className="bg-white w-full z-[999] shadow top-0 left-0 bg-[#3162FF]">
      <nav className="flex items-center justify-between p-6 bg-[#3162FF] lg:px-8 " aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/" className="flex items-center w-full -m-1.5 p-1.5">
            <img className="h-[35px]" src={icon_logo_white} alt="" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map(item => (
            <a key={item.name} href={item.href} target={item?.target} className="text-sm font-semibold leading-6 text-white">
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
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
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center -m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-[35px]" src={icon_logo_white} alt="" />
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
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[white] hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                {userInfo?.name ? (
                  <a href="/space" className="text-sm font-semibold leading-6 text-[white]">
                    个人中心
                  </a>
                ) : (
                  <a href="/login" className="text-sm font-semibold leading-6 text-[white]">
                    注册/登录
                  </a>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}

export default Header
