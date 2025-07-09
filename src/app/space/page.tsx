'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import navigation from './const'

export default function Example() {
  const router = useRouter()

  useEffect(() => {
    router.push(navigation[0]?.href)
  }, [router])
  return <>loading...</>
}
