'use client'

import { today } from '@/constants/keys'
import { useUserStore } from '@/stores/user'
import { getTheSpecialDayOfTheCurrentMonth } from '@/utils/getTheSpecialDayOfTheCurrentMonth'
import clsx from 'clsx'

export const StatusDay = () => {
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

   const {
      allTheDaysThatShouldComeToMyAuntUnder,
      allSecurityDaysUnderTheCurrentCalendar,
      allOvulationDaysInTheCurrentCalendar,
      allPregnancyPronePeriodsDisplayedInTheCurrentMonth,
   } = getTheSpecialDayOfTheCurrentMonth({
      year: today.year(),
      month: today.month() + 1,
      continuousAuntDays,
      auntCycleLength,
      theDateWhenMyAuntCameRecentlyYear,
      theDateWhenMyAuntCameRecentlyMonth,
      theDateWhenMyAuntCameRecentlyDate,
   })

   const date = today.date()

   // 应该显示月经期
   const theMenstrualPeriodShouldBeDisplayed =
      date !== null && allTheDaysThatShouldComeToMyAuntUnder.includes(date)

   // 应该显示安全日
   const securityDayShouldBeDisplayed =
      date !== null && allSecurityDaysUnderTheCurrentCalendar.includes(date)

   //  应该显示排卵日
   const theOvulationDateShouldBeDisplayed =
      date !== null && allOvulationDaysInTheCurrentCalendar.includes(date)

   /**
    * 应该显示易孕日
    */
   const easyPregnancyDateShouldBeDisplayed =
      date !== null &&
      allPregnancyPronePeriodsDisplayedInTheCurrentMonth.includes(date)

   if (
      theMenstrualPeriodShouldBeDisplayed ||
      securityDayShouldBeDisplayed ||
      theOvulationDateShouldBeDisplayed ||
      easyPregnancyDateShouldBeDisplayed
   ) {
      return (
         <div className='relative w-24 text-center'>
            <span className='relative -top-1 z-10 text-2xl text-white'>
               {theMenstrualPeriodShouldBeDisplayed
                  ? '月经期'
                  : theOvulationDateShouldBeDisplayed
                  ? '排卵日'
                  : easyPregnancyDateShouldBeDisplayed
                  ? '易孕期'
                  : '安全期'}
            </span>
            <div
               className={clsx(
                  'absolute bottom-0 z-0 h-6 w-full bg-black',

                  theMenstrualPeriodShouldBeDisplayed
                     ? 'bg-pink-600'
                     : theOvulationDateShouldBeDisplayed
                     ? 'bg-yellow-500'
                     : easyPregnancyDateShouldBeDisplayed
                     ? 'bg-violet-600'
                     : 'bg-black',
               )}
            ></div>
         </div>
      )
   }

   return <div></div>
}
