'use client'

import {
   dateColumnDataOfRecentAunt,
   getTodayColsPickerValue,
} from '@/constants/keys'
import { useUserStore } from '@/stores/user'
import { useRef } from 'react'
import { ColumnsPicker, ColumnsPickerAPI } from './ColumnsPicker'

/**
 * 来姨妈了按钮逻辑
 */
export const HereComesAuntButtonLogic = () => {
   const setAreYouComingToMyAuntNow = useUserStore(
      (state) => state.setAreYouComingToMyAuntNow,
   )
   const areYouComingToMyAuntNow = useUserStore(
      (state) => state.areYouComingToMyAuntNow,
   )
   const addAnAuntDayPeriod = useUserStore((state) => state.addAnAuntDayPeriod)

   const colRef = useRef<ColumnsPickerAPI>(null)

   return (
      <>
         <button
            className='group relative inline-block focus:outline-none focus:ring'
            onClick={() => {
               colRef.current?.open()
            }}
         >
            <span className='absolute inset-0 translate-x-2 translate-y-2 bg-black transition-transform group-hover:translate-y-0 group-hover:translate-x-0'></span>
            <span className='relative inline-block border-2 border-current px-12 py-7 text-3xl font-medium uppercase tracking-widest text-white group-active:text-opacity-75'>
               <span>{areYouComingToMyAuntNow ? '姨妈走了' : '来姨妈了'}</span>
               {areYouComingToMyAuntNow ? <span className='inline-block text-xs'>最近姨妈日：{areYouComingToMyAuntNow.month}/{areYouComingToMyAuntNow.date}</span> : null}
            </span>
         </button>
         <ColumnsPicker<number>
            ref={colRef}
            defaultValue={[...getTodayColsPickerValue()]}
            columns={dateColumnDataOfRecentAunt}
            onConfirm={(val) => {
               if (!areYouComingToMyAuntNow) {
                  setAreYouComingToMyAuntNow({
                     year: val![0],
                     month: val![1],
                     date: val![2],
                  })
               } else {
                  addAnAuntDayPeriod({
                     year: val![0],
                     month: val![1],
                     date: val![2],
                  })
               }
            }}
         />
      </>
   )
}

export default HereComesAuntButtonLogic
