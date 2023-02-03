'use client'

import { getDayjs } from '@/utils/getDayjs'
import clsx from 'clsx'
import Link from 'next/link'
import { Fragment, useId } from 'react'

export default function Date() {
   const list = [
      {
         id: useId(),
         from: {
            year: 2022,
            month: 12,
            date: 24,
         },
         to: {
            year: 2023,
            month: 1,
            date: 2,
         },
      },
      {
         id: useId(),
         from: {
            year: 2023,
            month: 1,
            date: 24,
         },
         to: {
            year: 2023,
            month: 2,
            date: 24,
         },
      },

      {
         id: useId(),
         from: {
            year: 2023,
            month: 2,
            date: 26,
         },
         to: {
            year: 2023,
            month: 3,
            date: 12,
         },
      },
      {
         id: useId(),
         from: {
            year: 2023,
            month: 2,
            date: 26,
         },
         to: {
            year: 2023,
            month: 3,
            date: 12,
         },
      },
      {
         id: useId(),
         from: {
            year: 2023,
            month: 2,
            date: 26,
         },
         to: {
            year: 2023,
            month: 2,
            date: 27,
         },
      },
   ]
   return (
      <div className='relative flex h-full flex-col overflow-hidden'>
         <div className='flex flex-none p-5'>
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
         </div>
         <div className='flex-auto overflow-auto p-5'>
            {list.map((item, index) => {
               return (
                  <Fragment key={item.id}>
                     {(index === 0 ||
                        list[index - 1].to.year !== item.from.year) && (
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
                              {item.from.month} / {item.from.date}
                           </div>
                           <div className='self-end text-xs italic'>开始</div>
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
                              {item.to.month} / {item.to.date}
                           </div>
                           <div className='self-end text-xs italic'>结束</div>
                        </div>
                     </div>
                     {index === list.length - 1 ? null : (
                        <div className='mb-5 border-b border-b-black pb-5'></div>
                     )}
                  </Fragment>
               )
            })}
         </div>
      </div>
   )
}
