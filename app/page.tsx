/* eslint-disable @next/next/no-img-element */
import { CountdownLogic } from '@/components/CountdownLogic'

export default function Home() {
   return (
      <div className='relative h-full p-16'>
         <img
            src='/_assets/home-bg.jpg'
            alt='home-bg.jpg'
            className='h-full object-cover'
         />
         <span className='absolute top-32 right-5 text-8xl text-white'>
            欢迎
         </span>
         <span className='write-rl-upright absolute top-60 right-7 text-xl text-white'>
            use to
         </span>
         <span className='absolute bottom-[17rem] left-5 text-8xl font-bold text-white'>
            dianzi
         </span>
         <span className='absolute bottom-40 left-5 text-8xl text-white'>
            蓝朋友
         </span>
         <CountdownLogic />
      </div>
   )
}
