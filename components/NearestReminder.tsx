'use client'

import { today } from '@/constants/keys'
import { useUserStore } from '@/stores/user'
import { getTheIntervalBetweenTheNextAuntSDay } from '@/utils/getTheIntervalBetweenTheNextAuntSDay'

// 距离最近提示器
export const NearestReminder = () => {
   const auntCycleLength = useUserStore((state) => state.auntCycleLength)
   const continuousAuntDays = useUserStore((state) => state.continuousAuntDays)
   const date = useUserStore((state) => state.theDateWhenMyAuntCameRecentlyDate)
   const month = useUserStore(
      (state) => state.theDateWhenMyAuntCameRecentlyMonth,
   )
   const year = useUserStore((state) => state.theDateWhenMyAuntCameRecentlyYear)

   // 最近近期开始日
   const recentStartDate = getTheIntervalBetweenTheNextAuntSDay(
      today,
      continuousAuntDays,
      auntCycleLength,
      {
         date,
         month,
         year,
      },
   )
   return (
      <div className='pt-24 pb-20 text-center italic'>
         <span className='text-9xl font-bold'>
            {recentStartDate.diff(today, 'd')}
         </span>
         <span className='align-text-bottom text-xl'>天后</span>
      </div>
   )
}
