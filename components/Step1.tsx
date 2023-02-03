'use client'

import { continuousAuntDaysColumnData } from '@/constants/keys'
import { useUserStore } from '@/stores/user'
import { useRef } from 'react'
import Slider from 'react-slick'
import { shallow } from 'zustand/shallow'
import { ColumnsPicker } from './ColumnsPicker'
import { NextStepBtn } from './NextStepBtn'

export default function Step1({
   sliderRef,
}: {
   sliderRef: React.MutableRefObject<Slider | null>
}) {
   const user = useUserStore(
      (state) => ({
         setContinuousAuntDays: state.setContinuousAuntDays,
         continuousAuntDays: state.continuousAuntDays,
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
            <div className='text-8xl'>持续</div>
            <div className='mt-2 text-2xl'>姨妈天数是多少？</div>
            <div className='mt-10'>
               <ColumnsPicker<number>
                  defaultValue={[user.continuousAuntDays]}
                  columns={continuousAuntDaysColumnData}
                  onConfirm={(value) => {
                     if (value) {
                        user.setContinuousAuntDays(value[0])
                     }
                  }}
                  getContainer={() => wrapRef.current}
               />
            </div>
            <NextStepBtn
               onClick={() => {
                  sliderRef.current?.slickNext()
               }}
            >
               下一步 2 / 3
            </NextStepBtn>
         </div>
      </div>
   )
}
