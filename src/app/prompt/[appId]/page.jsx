"use client";

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
// import AppContent from './appContent'
import { getUserAppList } from '../../../services/promptService'

const AppList = ({ }) => {
  const router = useRouter()
  const [appList, setAppList] = useState([])
  const [reloadList, setReloadList] = useState(false)

  const init = async () => {
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
        {/* <AppContent appId={appId} appList={appList} /> */}
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


export default AppList
