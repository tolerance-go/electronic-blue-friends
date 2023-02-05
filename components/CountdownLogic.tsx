'use client'

import { tagAppStorageKey } from '@/constants/keys'
import { useRouter } from 'next/navigation'
import store from 'store2'
import { Countdown } from './Countdown'

export const CountdownLogic = () => {
   const router = useRouter()
   return (
      <Countdown
         className='absolute top-3 right-4 flex h-7 w-7 items-center justify-center rounded-full bg-black text-white'
         onDone={() => {
            if (store.get(tagAppStorageKey)) {
               router.push('/main')
               return
            }
            router.push('/steps')
         }}
      />
   )
}
