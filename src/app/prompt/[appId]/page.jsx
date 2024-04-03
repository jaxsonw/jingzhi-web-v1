'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, usePathname, useSearchParams, NextRequest } from 'next/navigation'
import Avatar from 'react-avatar'
import { toast } from 'react-toastify'
import copy from 'copy-to-clipboard'
import ChatModal from './chat'
import TextGenerate from './text/index'
import { getChatAppConfig, getAppList } from '../../../services/promptService'
// import { AppAvatorColors } from '../../consts/index'

const DetailLayout = ({ params: { appId } }) => {
  const router = useRouter()
  const [appDetail, setAppDetail] = useState({})

  const [currentAppId, setCurrentAppId] = useState('')
  const [appList, setAppList] = useState([])
  const [detailLoading, setDetailLoading] = useState(false)
  const [appListLoading, setAppListLoading] = useState(false)

  const init = async () => {
    console.log(appId, 'appId')
    setCurrentAppId(appId)

    if (!appId) return
    setAppListLoading(true)
    const res = await getAppList()
    setAppListLoading(false)
    setAppList(res?.data?.recordList || [])
  }

  useEffect(() => {
    init()
  }, [])

  const reload = async () => {
    setDetailLoading(true)
    const detail = await getChatAppConfig(appId)
    setDetailLoading(false)
    if (detail?.code !== 0) {
      // router.push(`/login?redirect=${window.location.href || '/'}`)
      return
    }
    setAppDetail(detail?.data)
  }
  useEffect(() => {
    reload()
  }, [appId])

  const appColor = '#3162FF'

  const onShare = () => {
    copy(window.location.href)
    toast.success('复制成功，快去分享吧～')
  }

  return (
    <div>
      {/* <div className="h-[10px]">{detailLoading && <Progress size="xs" indeterminated={true} value={99} status="primary" />}</div> */}

      {/* <!-- Breadcrumb --> */}
      <nav
        className="flex px-5 py-2 items-center  justify-between  text-gray-700 border border-gray-200   bg-gray-50 dark:bg-gray-800 dark:border-gray-700 mt-[68px]"
        aria-label="Breadcrumb"
      >
        <ol className="inline-flex list-none	  items-center space-x-1 md:space-x-3">
          <li className="inline-flex list-none	 items-center hover:text-[#3162FF] ">
            <a href="/" className="inline-flex  items-center text-sm font-medium text-gray-700  dark:text-gray-400 dark:hover:text-white">
              <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              主页
            </a>
          </li>
          <li className="list-none">
            <div className="flex items-center hover:text-[#3162FF]  ">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                // cliprule="evenodd"
                ></path>
              </svg>
              <a href="/explore" className="ml-1 text-sm font-medium text-gray-700 hover:text-[#3162FF] md:ml-2  dark:hover:text-white">
                应用中心
              </a>
            </div>
          </li>
          <li aria-current="page" className="list-none">
            <div className="flex items-center">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">{appDetail.name}</span>
            </div>
          </li>
        </ol>

        <div className="flex items-center">
          <span
            onClick={onShare}
            className="flex w-[120px] border border-solid border-[#3162FF] mr-2 md:flex hidden cursor-pointer h-[40px] md:h-[40px]  justify-center items-center p-3 border   font-bold  rounded-md  shadow-sm text-[#3162FF] border border-[#3162FF]   hover:shadow  "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
              />
            </svg>
            分享该应用
          </span>
          <span onClick={onShare} className="md:hidden flex text-[#3162FF]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
              />
            </svg>
          </span>
          <a
            href="/personal/apps"
            className="flex w-[120px] md:flex hidden cursor-pointer h-[40px] md:h-[40px]  justify-center items-center p-3 border border-transparent font-bold  rounded-md  shadow-sm text-white bg-[#3162FF] hover:shadow  "
          >
            创建我的应用
          </a>
          <a href="/personal/apps" className="md:hidden flex text-[#3162FF]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </a>
        </div>
      </nav>

      <div className="flex">
        <div className="h-[calc(100vh_-_145px)] overflow-scroll flex-auto  rounded-md p-5">
          <div className="h-full">
            {appDetail.type === 1 && <ChatModal appColor={appColor} loading={detailLoading} appDetail={appDetail} />}
            {appDetail.type === 2 && <TextGenerate appColor={appColor} loading={detailLoading} appDetail={appDetail} />}
          </div>
        </div>
      </div>
    </div>
  )
}

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       appId: context.query.appId,
//     }, // will be passed to the page component as props
//   }
// }

export default DetailLayout









