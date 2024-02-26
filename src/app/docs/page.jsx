
'use client'
import { useEffect } from "react"
import { useRouter } from 'next/navigation'
import { navigation } from './const'
export default function Layout() {

  const router = useRouter()

  // useEffect(() => {
  //   router.push(navigation[0]?.children?.[0]?.href)
  // }, [])
  return (
    <>
      {/* loading.. */}
      <iframe id="feishudocs" className="w-screen h-screen pt-[84px]" src="https://agictolab.feishu.cn/wiki/space/7338943089559470082"></iframe>
    </>
  )
}
