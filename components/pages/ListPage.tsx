'use client'

import { useUserStore } from '@/stores/user'
import { getDayjs } from '@/utils/getDayjs'
import clsx from 'clsx'
import Link from 'next/link'
import { Fragment } from 'react'

export const ListPage = () => {
   const timePeriodOfHistoricalAuntDay = useUserStore(
      (state) => state.timePeriodOfHistoricalAuntDay,
   )
   const deleteHistoricalAuntTimePeriod = useUserStore(
      (state) => state.deleteHistoricalAuntTimePeriod,
   )

   const back = (
      <Link href={'/main'}>
         <svg
            width='1em'
            height='1em'
            className='text-4xl'
            viewBox='0 0 29 29'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
         >
            <path
               d='M28.1666 12.7917H7.37623L16.9258 3.24209L14.5 0.833344L0.833313 14.5L14.5 28.1667L16.9087 25.7579L7.37623 16.2083H28.1666V12.7917Z'
               fill='black'
            />
         </svg>
      </Link>
   )

   if (!timePeriodOfHistoricalAuntDay.length) {
      return (
         <div className='relative flex h-full flex-col'>
            <div className='absolute top-0 left-0 flex w-full flex-none p-5'>
               {back}
            </div>
            <div className='flex h-full flex-auto flex-col items-center justify-center overflow-auto font-medium'>
               暂无数据
            </div>
         </div>
      )
   }

   return (
      <div className='relative flex h-full flex-col'>
         <div className='flex flex-none p-5'>{back}</div>
         <div className='flex-auto overflow-auto p-5'>
            {timePeriodOfHistoricalAuntDay.map((item, index) => {
               return (
                  <Fragment key={item.id}>
                     {(index === 0 ||
                        timePeriodOfHistoricalAuntDay[index - 1].to.year !==
                           item.from.year) && (
                        <div className='sticky top-0 pt-2 text-sm'>
                           <span className='bg-[#FF7272] py-1'>
                              {item.from.year}
                           </span>
                        </div>
                     )}
                     <div
                        className={clsx(
                           'flex items-center justify-start',
                           index === 0 ? null : 'pt-4',
                        )}
                     >
                        <div className='h-4 w-4 flex-none rounded-full bg-black'></div>
                        <div className='flex flex-auto items-center justify-center space-x-2'>
                           <div className='pl-5 text-4xl font-bold italic'>
                              {item.from.month}
                              <span className='px-2 font-normal'>/</span>
                              {item.from.date}
                           </div>
                           <div className='self-end text-xs italic'>开始</div>
                        </div>
                        <div
                           className='absolute right-0 pr-4'
                           onClick={() => {
                              deleteHistoricalAuntTimePeriod(index)
                           }}
                        >
                           <svg
                              className='h-5 w-5'
                              viewBox='0 0 1024 1024'
                              version='1.1'
                              xmlns='http://www.w3.org/2000/svg'
                              p-id='2641'
                              width='200'
                              height='200'
                           >
                              <path
                                 d='M775.715 712.349l-63.366 63.366c-8.387 8.387-20.035 13.046-31.683 13.046-11.648 0-23.297-4.659-31.684-13.046L512 638.732 375.018 775.715c-8.387 8.387-20.035 13.046-31.683 13.046-11.648 0-23.297-4.659-31.684-13.046l-63.366-63.366c-8.387-8.387-13.046-20.035-13.046-31.683 0-11.648 4.659-23.297 13.046-31.684L385.268 512 248.285 375.018c-8.387-8.387-13.046-20.035-13.046-31.683 0-11.648 4.659-23.297 13.046-31.684l63.366-63.366c8.387-8.387 20.035-13.046 31.684-13.046 11.647 0 23.296 4.659 31.683 13.046L512 385.268l136.982-136.982c8.387-8.387 20.035-13.046 31.684-13.046 11.647 0 23.296 4.659 31.683 13.046l63.366 63.366c8.387 8.387 13.046 20.035 13.046 31.684 0 11.647-4.659 23.296-13.046 31.683L638.732 512l136.982 136.982c8.387 8.387 13.046 20.035 13.046 31.684C788.761 692.313 784.102 703.962 775.715 712.349z'
                                 p-id='2642'
                              ></path>
                           </svg>
                        </div>
                     </div>
                     <div className='flex items-center justify-start'>
                        <svg
                           className='w-4 flex-none'
                           viewBox='0 0 24 128'
                           fill='none'
                           xmlns='http://www.w3.org/2000/svg'
                        >
                           <path
                              d='M10.9393 127.061C11.5251 127.646 12.4749 127.646 13.0607 127.061L22.6066 117.515C23.1924 116.929 23.1924 115.979 22.6066 115.393C22.0208 114.808 21.0711 114.808 20.4853 115.393L12 123.879L3.51472 115.393C2.92894 114.808 1.97919 114.808 1.3934 115.393C0.807617 115.979 0.807617 116.929 1.3934 117.515L10.9393 127.061ZM10.5 6.55671e-08L10.5 126L13.5 126L13.5 -6.55671e-08L10.5 6.55671e-08Z'
                              fill='black'
                           />
                        </svg>
                        <div className='text-md flex flex-auto items-center justify-center'>
                           持续
                           <span className='px-2 text-yellow-300'>
                              {getDayjs(
                                 item.to.year,
                                 item.to.month,
                                 item.to.date,
                              ).diff(
                                 getDayjs(
                                    item.from.year,
                                    item.from.month,
                                    item.from.date,
                                 ),
                                 'd',
                              )}
                           </span>
                           天
                        </div>
                     </div>
                     {item.to.year !== item.from.year && (
                        <div className='sticky top-0 pt-2 text-sm'>
                           <span className='bg-[#FF7272] py-1'>
                              {item.to.year}
                           </span>
                        </div>
                     )}
                     <div className='flex items-center justify-start pb-4'>
                        <div className='h-4 w-4 flex-none rounded-full bg-black'></div>
                        <div className='flex flex-auto items-center justify-center space-x-2'>
                           <div className='pl-5 text-4xl font-bold italic'>
                              {item.to.month}
                              <span className='px-2 font-normal'>/</span>
                              {item.to.date}
                           </div>
                           <div className='self-end text-xs italic'>结束</div>
                        </div>
                     </div>
                     {index ===
                     timePeriodOfHistoricalAuntDay.length - 1 ? null : (
                        <div className='mb-5 border-b border-b-black pb-5'></div>
                     )}
                  </Fragment>
               )
            })}
         </div>
      </div>
   )
}

export default ListPage
