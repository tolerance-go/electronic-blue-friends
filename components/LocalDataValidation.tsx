'use client'

import { tagAppStorageKey } from '@/constants/keys'
import { useRouter } from 'next/navigation'
import { useIsomorphicLayoutEffect } from 'react-use'
import store from 'store2'

// 本地数据验证
export const LocalDataValidation = () => {
   const router = useRouter()

   useIsomorphicLayoutEffect(() => {
      if (!store.get(tagAppStorageKey)) {
         router.push('/')
      }
   }, [])

   return null
}
