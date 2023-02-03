'use client'

import { useRouter } from 'next/navigation'
import { Countdown } from './Countdown'

export const CountdownLogic = () => {
   const router = useRouter()
   return (
      <Countdown
         className='absolute top-3 right-4 flex h-7 w-7 items-center justify-center rounded-full bg-black text-white'
         onDone={() => {
            router.push('/steps')
         }}
      />
   )
}
