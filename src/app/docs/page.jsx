
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
    </>
  )
}
