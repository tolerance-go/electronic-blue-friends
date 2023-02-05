'use client'

import { useUserStore } from '@/stores/user'
import { getMonthDays } from '@/utils/getMonthDays'
import { getTheSpecialDayOfTheCurrentMonth } from '@/utils/getTheSpecialDayOfTheCurrentMonth'
import clsx from 'clsx'
import dayjs from 'dayjs'
import Link from 'next/link'
import { Fragment, useState } from 'react'

export const DatePage = () => {
   const auntCycleLength = useUserStore((state) => state.auntCycleLength)
   const continuousAuntDays = useUserStore((state) => state.continuousAuntDays)
   const theDateWhenMyAuntCameRecentlyDate = useUserStore(
      (state) => state.theDateWhenMyAuntCameRecentlyDate,
   )
   const theDateWhenMyAuntCameRecentlyMonth = useUserStore(
      (state) => state.theDateWhenMyAuntCameRecentlyMonth,
   )
   const theDateWhenMyAuntCameRecentlyYear = useUserStore(
      (state) => state.theDateWhenMyAuntCameRecentlyYear,
   )

   const [year, setYear] = useState(() => dayjs().year())
   const [month, setMonth] = useState(() => dayjs().month() + 1)

   const today = dayjs().date()
   // 是否是相同的年份和月份
   const isItTheSameYearAndMonth = dayjs().isSame(
      dayjs(`${year}-${month}`, 'YYYY-M'),
      'month',
   )

   return (
      <div className='relative flex h-full flex-col overflow-auto'>
         <div className='flex px-5 pt-5 pb-4'>
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
         <div className='flex items-center justify-between p-8'>
            <div className='flex space-x-10 text-5xl font-medium italic'>
               <span>{month}</span>
               <span>{year}</span>
            </div>
            <div className='flex space-x-8'>
               <svg
                  width='1em'
                  height={`${27 / 16}em`}
                  viewBox='0 0 16 27'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  onClick={() => {
                     const next = dayjs(`${year}-${month}`, 'YYYY-M').subtract(
                        1,
                        'M',
                     )
                     setMonth(next.month() + 1)
                     setYear(next.year())
                  }}
               >
                  <path
                     d='M15.7463 23.2537L6.01375 13.5L15.7463 3.74625L12.75 0.75L0 13.5L12.75 26.25L15.7463 23.2537Z'
                     fill='#FBBF24'
                  />
               </svg>
               <svg
                  width='1em'
                  height={`${27 / 16}em`}
                  viewBox='0 0 16 27'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  onClick={() => {
                     const next = dayjs(`${year}-${month}`, 'YYYY-M').add(
                        1,
                        'M',
                     )
                     setMonth(next.month() + 1)
                     setYear(next.year())
                  }}
               >
                  <path
                     d='M0.253752 3.74625L9.98625 13.5L0.25375 23.2537L3.25 26.25L16 13.5L3.25 0.749999L0.253752 3.74625Z'
                     fill='#FBBF24'
                  />
               </svg>
            </div>
         </div>
         <div>
            <div className='mt-4 flex px-2 pb-4 text-2xl'>
               {['日', '一', '二', '三', '四', '五', '六'].map((item) => {
                  return (
                     <div
                        className='flex-auto text-center font-medium'
                        key={item}
                     >
                        {item}
                     </div>
                  )
               })}
            </div>
            <div className='border-t-2 border-t-black'></div>
            <div>
               {getMonthDays(year, month)
                  .filter((item) => item.some((item) => item !== null))
                  .map((line, index) => {
                     const {
                        allTheDaysThatShouldComeToMyAuntUnder,
                        allSecurityDaysUnderTheCurrentCalendar,
                        allOvulationDaysInTheCurrentCalendar,
                        allPregnancyPronePeriodsDisplayedInTheCurrentMonth,
                     } = getTheSpecialDayOfTheCurrentMonth({
                        year,
                        month,
                        continuousAuntDays,
                        auntCycleLength,
                        theDateWhenMyAuntCameRecentlyYear,
                        theDateWhenMyAuntCameRecentlyMonth,
                        theDateWhenMyAuntCameRecentlyDate,
                     })

                     return (
                        <Fragment key={year + month + index}>
                           <div className='flex px-2'>
                              {line.map((num, index) => {
                                 // 应该显示月经期
                                 const theMenstrualPeriodShouldBeDisplayed =
                                    num !== null &&
                                    allTheDaysThatShouldComeToMyAuntUnder.includes(
                                       num,
                                    )

                                 // 应该显示安全日
                                 const securityDayShouldBeDisplayed =
                                    num !== null &&
                                    allSecurityDaysUnderTheCurrentCalendar.includes(
                                       num,
                                    )

                                 //  应该显示排卵日
                                 const theOvulationDateShouldBeDisplayed =
                                    num !== null &&
                                    allOvulationDaysInTheCurrentCalendar.includes(
                                       num,
                                    )

                                 /**
                                  * 应该显示易孕日
                                  */
                                 const easyPregnancyDateShouldBeDisplayed =
                                    num !== null &&
                                    allPregnancyPronePeriodsDisplayedInTheCurrentMonth.includes(
                                       num,
                                    )

                                 return (
                                    <div
                                       className='flex w-5 flex-auto items-center justify-center px-2 py-4 text-2xl italic'
                                       key={index}
                                    >
                                       {(isItTheSameYearAndMonth &&
                                          num === today) ||
                                       theMenstrualPeriodShouldBeDisplayed ||
                                       securityDayShouldBeDisplayed ||
                                       theOvulationDateShouldBeDisplayed ||
                                       easyPregnancyDateShouldBeDisplayed ? (
                                          <div className='relative w-full text-center'>
                                             <span
                                                className={clsx(
                                                   'relative z-10 p-1 text-white',
                                                   isItTheSameYearAndMonth &&
                                                      num === today &&
                                                      'border-2',
                                                )}
                                             >
                                                {num}
                                             </span>
                                             <div
                                                className={clsx(
                                                   'absolute bottom-0 z-0 h-4 w-full -skew-x-6',
                                                   {
                                                      'bg-pink-600':
                                                         theMenstrualPeriodShouldBeDisplayed,
                                                      'bg-black':
                                                         !theMenstrualPeriodShouldBeDisplayed &&
                                                         securityDayShouldBeDisplayed,
                                                      'bg-yellow-500':
                                                         theOvulationDateShouldBeDisplayed,
                                                      'bg-violet-600':
                                                         !theOvulationDateShouldBeDisplayed &&
                                                         easyPregnancyDateShouldBeDisplayed,
                                                   },
                                                )}
                                             ></div>
                                          </div>
                                       ) : (
                                          num
                                       )}
                                    </div>
                                 )
                              })}
                           </div>
                           <div
                              className={clsx(
                                 'border-t-2 border-t-black',
                                 index % 2 ? 'rotate-1' : '-rotate-1',
                              )}
                           ></div>
                        </Fragment>
                     )
                  })}
            </div>
         </div>

         <div className='mt-2 flex space-x-4 py-10 px-5'>
            {[
               {
                  title: '月经期',
                  type: 'moon',
               },
               {
                  title: '排卵日',
                  type: 'ovulation',
               },
               {
                  title: '易孕期',
                  type: 'easyPregnancyDay',
               },
               {
                  title: '安全期',
                  type: 'safe',
               },
            ].map((item) => {
               return (
                  <div key={item.type} className='relative w-20 text-center'>
                     <span className='relative -top-1 z-10 text-xl text-white'>
                        {item.title}
                     </span>
                     <div
                        className={clsx('absolute bottom-0 z-0 h-5 w-full', {
                           'bg-black': item.type === 'safe',
                           'bg-pink-600': item.type === 'moon',
                           'bg-yellow-500': item.type === 'ovulation',
                           'bg-violet-600': item.type === 'easyPregnancyDay',
                        })}
                     ></div>
                  </div>
               )
            })}
         </div>
         <div className='py-2 px-4 pb-10 text-sm'>
            <div className='pb-1'>
               月经期：最近一次姨妈日到距离周期长度最近一段经期持续天数
            </div>
            <div className='pb-1'>排卵日：下次月经来潮前 14 天左右</div>
            <div className='pb-1'>易孕期：排卵日前 5 天，后 4 天左右</div>
            <div className='pb-1'>安全日：月经来潮前 7 天，后 8 天左右</div>
         </div>
      </div>
   )
}

export default DatePage
