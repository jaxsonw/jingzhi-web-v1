"use client";

import React, { useState, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams, NextRequest } from 'next/navigation'

import AppContent from './appContent'
import { getUserAppList } from '../../../services/promptService'

const AppList = ({params }) => {
  const router = useRouter()
  const pathName = usePathname()
  const [appList, setAppList] = useState([])
  const [reloadList, setReloadList] = useState(false)

  const init = async () => {
    console.log(router.query, 'router')
    console.log(params, 'params')

    const res = await getUserAppList()
    if (res?.code === 40001) {
      router.push(`/login?redirect=${window.location.href || '/'}`)
      return
    }
    setAppList(res?.data?.recordList || [])
  }

  useEffect(() => {
    init()
  }, [reloadList])

  return (
    <div className="h-full flex">
      <div className="w-full relative">
        <AppContent appId={params?.appId} appList={appList} />
      </div>
    </div>
  )
}



// export function getServerSideProps(req) {
//   return {
//     props: {
//       appId: req?.params?.appId || '',
//       // header: false,
//     },
//   }
// }

// export const getServerSideProps = async req => {
//   return { props: { code: req.query.code || '', bindphone: req.query.bindphone || '' } }
// }

export default AppList
