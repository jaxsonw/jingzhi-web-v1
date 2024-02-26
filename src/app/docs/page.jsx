
'use client'
import { useEffect } from "react"
import { useRouter } from 'next/navigation'
import { navigation } from './const'
export default function Layout() {

  const router = useRouter()

  useEffect(() => {
    router.push(navigation[0]?.children?.[0]?.href)
  }, [])
  return (
    <>
      loading..
      {/* <iframe className="w-full h-full" src="https://tauacgr5lqv.feishu.cn/docx/ZnPedHE3loaQ5MxwE7TctC6PnNh"></iframe> */}
    </>
  )
}
