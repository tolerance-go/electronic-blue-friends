'use client'

import { today } from '@/constants/keys'
import { useUserStore } from '@/stores/user'
import { getTheIntervalBetweenTheNextAuntSDay } from '@/utils/getTheIntervalBetweenTheNextAuntSDay'
import Link from 'next/link'

export const EstimatedMenstrualPeriodLink = () => {
   const auntCycleLength = useUserStore((state) => state.auntCycleLength)
   const continuousAuntDays = useUserStore((state) => state.continuousAuntDays)
   const date = useUserStore((state) => state.theDateWhenMyAuntCameRecentlyDate)
   const month = useUserStore(
      (state) => state.theDateWhenMyAuntCameRecentlyMonth,
   )
   const year = useUserStore((state) => state.theDateWhenMyAuntCameRecentlyYear)
   return (
      <div className='py-4 text-center'>
         <Link href={'/date'} className='text-xl underline underline-offset-2'>
            预计经期开始日为{' '}
            {getTheIntervalBetweenTheNextAuntSDay(
               today,
               continuousAuntDays,
               auntCycleLength,
               {
                  date,
                  month,
                  year,
               },
            ).format('M 月 DD 日')}
         </Link>
      </div>
   )
}
