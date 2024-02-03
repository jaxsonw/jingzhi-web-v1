'use client'
import { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import navigation from './const'

export default function Example() {
  const router = useRouter()

  useEffect(() => {
    router.push(navigation[0]?.href)
  }, [])
  return <>loading...</>
}
