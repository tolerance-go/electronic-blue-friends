import dayjs from 'dayjs'
import { getMenstruationDate } from './getMenstruationDate'

/**
 * 根据当前日历经期范围，获得当前日历上显示的排卵日
 * 经期前 14 天为排卵日
 */
export const getOvulationWithNext = (
   year: number,
   month: number,
   durationOfMenstrualPeriod: number,
   cycleLength: number,
   lastAuntDay: {
      year: number
      month: number
      date: number
   },
) => {
   const target = dayjs(`${year}-${month}`, 'YYYY-M')

   const nextMonthTarget = target.add(1, 'M')

   const nextMens = getMenstruationDate(
      nextMonthTarget.year(),
      nextMonthTarget.month() + 1,
      durationOfMenstrualPeriod,
      cycleLength,
      lastAuntDay,
   )

   const startLen = nextMens[0][0]

   return target.daysInMonth() - (14 - startLen)
}

/**
 * 根据当前日历经期范围，获得当前日历上显示的排卵日
 * 经期前 14 天为排卵日
 */
export const getOvulation = (year: number, month: number, mens: number[][]) => {
   const dist: number[] = []
   mens.forEach((ranges) => {
      const date = dayjs(`${year}-${month}-${ranges[0]}`, 'YYYY-M-D')
      const next = date.subtract(14, 'd')
      if (next.isSame(date, 'month')) {
         dist.push(next.date())
      }
   })

   return dist
}
