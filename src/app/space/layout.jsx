'use client'
import { Fragment, useState, createContext, useEffect } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, Cog6ToothIcon, DocumentDuplicateIcon, FolderIcon, HomeIcon, UsersIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { RiCustomerService2Line } from 'react-icons/ri'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import CustomerModal from "../../components/common/CustomerModal"
import baseHooks from '../../components/hooks/base'
import navigation from './const'
import { checkServer } from '../../utils/index'
import { icon_logo_color } from '../../consts/img'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const SpaceContext = createContext()

export default function SpaceLayout({ children }) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [customerOpen, setCustomerOpen] = useState(false)
  const { userInfo } = baseHooks()

  const currentPath = usePathname()
  const currentTitle = navigation?.find(item => item?.href === currentPath)?.title
  const currentEnTitle = navigation?.find(item => item?.href === currentPath)?.enTitle

  useEffect(() => {
    if (!checkServer() && !localStorage.getItem('token')) {
      router.push('/login')
    }
  }, [userInfo])

  return (
    <>
      <CustomerModal isOpen={customerOpen} setIsOpen={setCustomerOpen} />
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                    <a href="/" className="flex h-16 shrink-0 items-center">
                      <img className="h-[25px]" src={icon_logo_color} alt="" />
                    </a>

                    <nav className="flex flex-1 flex-col">
                      <div className="pb-6 border-b-[2px] border-[#EAEAEA]">
                        <div className="text-[#545759] text-center mb-4">{userInfo?.name || 'loading...'}</div>
                        <div className="flex justify-between text-[14px] text-white items-center bg-gradient-to-r px-[15px] py-[5px] rounded-md	from-[#3162FF] to-[#7AA9FF]">
                          <span>剩余金额</span>
                          <span>{userInfo?.apiNum}</span>
                        </div>
                      </div>
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map(item => {
                              return item?.isMenu ? (
                                <li key={item.name}>
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      item.current ? 'bg-gray-50 text-blue-600' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50',
                                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                    )}
                                  >
                                    <item.icon
                                      className={classNames(
                                        item.current ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600',
                                        'h-6 w-6 shrink-0'
                                      )}
                                      aria-hidden="true"
                                    />
                                    {item.name}
                                  </a>
                                </li>
                              ) : null
                            })}
                          </ul>
                        </li>

                        <li className="mt-auto">
                          <a
                            href="/login"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                          >
                            <Cog6ToothIcon className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-blue-600" aria-hidden="true" />
                            退出登录
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-[240px] lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto   bg-white px-6 pb-4">
            <a href="/" className="flex h-16 shrink-0 items-center">
              <img className="w-auto h-[35px]" src={icon_logo_color} alt="" />
            </a>
            <nav className="flex flex-1 flex-col">
              <div className="pb-6 border-b-[2px] border-[#EAEAEA]">
                <div className="text-[#545759] text-center mb-4">{userInfo?.name || 'loading...'}</div>
                <div className="flex justify-between text-[14px] text-white items-center bg-gradient-to-r px-[15px] py-[5px] rounded-md	from-[#3162FF] to-[#7AA9FF]">
                  <span>剩余金额</span>
                  <span>{userInfo?.apiNum}</span>
                </div>
              </div>
              <ul role="list" className="flex flex-1 flex-col gap-y-7 pt-6">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map(item => {
                      if (!item?.isMenu) return null
                      const current = currentPath === item.href

                      return (
                        <li key={item.name}>
                          <a
                            href={item?.href}
                            className={classNames(
                              current ? 'bg-[#EFF3FF] text-blue-600' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50',
                              'group flex gap-x-3 text-[16px] rounded-lg px-[22px] py-[11px] text-sm leading-6  '
                            )}
                          >
                            <item.icon
                              className={classNames(
                                current ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600',
                                'h-6 w-6 shrink-0'
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-[240px]">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

            <div className="flex items-center flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="flex flex-1">
                <nav className="flex flex-1 flex-col lg:block hidden">
                  <div role="list" className="-mx-2  flex items-center  justify-center">
                    <a
                      href="/"
                      className={classNames('text-gray-700', 'group flex  flex items-center h-[64px] text-sm leading-6 font-semibold')}
                    >
                      AGICTO
                    </a>

                    <a
                      href="https://docs.agicto.com"
                      className={classNames(
                        'text-gray-700',
                        'group flex  flex items-center h-[63px] mx-[33px] text-sm leading-6 font-semibold'
                      )}

                      target='_blank'
                    >
                      开发文档
                    </a>

                    <a
                      href="/space"
                      className={classNames(
                        'text-[#3162FF]',
                        'group flex  flex items-center h-[64px] text-sm leading-6 font-semibold',
                        'border-b-2 border-[#3162FF]'
                      )}
                    >
                      个人中心
                    </a>
                  </div>
                </nav>
                {/* <h1 className="flex font-bold items-center">{currentTitle}</h1> */}
              </div>
              <div className="flex items-center ">
                <button type="button" className="flex items-center mr-4" onClick={() => setCustomerOpen(true)}>
                  <RiCustomerService2Line />
                  <span className="font-bold text-[#545759] ml-1">客服</span>
                </button>
                <Link href="/login" className="flex items-center hover:font-bold text-[#545759] font-bold">
                  <RiLogoutBoxRLine className="mr-1" /> 退出登录
                </Link>
              </div>
            </div>
          </div>

          <main className="py-10 bg-[#f3f8fe] h-[calc(100vh_-_64px)] overflow-scroll">
            <SpaceContext.Provider value={userInfo}>
              <div className="px-4 sm:px-6 lg:px-8 ">
                <div className="flex items-center justify-center flex-col">
                  <h2 className="text-[24px] text-gray-900 font-semibold tracking-widest	">{currentTitle}</h2>
                  <span className="text-[#A3C6FF]">{currentEnTitle}</span>
                </div>
                {children}
              </div>
            </SpaceContext.Provider>
          </main>
        </div>
      </div>
    </>
  )
}
