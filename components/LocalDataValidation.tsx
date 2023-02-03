'use client'

import { tagAppStorageKey } from '@/constants/keys'
import { useRouter } from 'next/navigation'
import { useEffect, useLayoutEffect } from 'react'
import store from 'store2'

// 本地数据验证
export const LocalDataValidation = () => {
   const router = useRouter()

   useLayoutEffect(() => {
      if (!store.get(tagAppStorageKey)) {
         router.push('/')
      }
   }, [])

   return null
}
