'use client'

import { dateColumnDataOfRecentAunt } from '@/constants/keys'
import { useUserStore } from '@/stores/user'
import { useRef } from 'react'
import Slider from 'react-slick'
import { shallow } from 'zustand/shallow'
import { ColumnsPickerInput } from './ColumnsPickerInput'
import { NextStepBtn } from './NextStepBtn'

export default function Step0({
   sliderRef,
}: {
   sliderRef: React.MutableRefObject<Slider | null>
}) {
   const user = useUserStore(
      (state) => ({
         setAuntDateAndComingAuntNow: state.setAuntDateAndComingAuntNow,
         year: state.theDateWhenMyAuntCameRecentlyYear,
         month: state.theDateWhenMyAuntCameRecentlyMonth,
         date: state.theDateWhenMyAuntCameRecentlyDate,
      }),
      shallow,
   )

   const wrapRef = useRef<HTMLDivElement>(null)

   return (
      <div
         ref={wrapRef}
         className='relative flex h-full flex-col justify-center p-12'
      >
         <div className='relative -top-10'>
            <div className='text-8xl'>最近</div>
            <div className='mt-2 text-2xl'>姨妈是哪天来的？</div>
            <div className='mt-10'>
               <ColumnsPickerInput<number>
                  defaultValue={[user.year, user.month, user.date]}
                  columns={dateColumnDataOfRecentAunt}
                  onConfirm={(value) => {
                     user.setAuntDateAndComingAuntNow({
                        year: value![0],
                        month: value![1],
                        date: value![2],
                     })
                  }}
                  getContainer={() => wrapRef.current}
               />
            </div>
            <NextStepBtn
               onClick={() => {
                  user.setAuntDateAndComingAuntNow({
                     year: user.year,
                     month: user.month,
                     date: user.date,
                  })
                  sliderRef.current?.slickNext()
               }}
            >
               下一步 1 / 3
            </NextStepBtn>
         </div>
      </div>
   )
}
