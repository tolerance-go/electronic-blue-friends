import dayjs from 'dayjs'
import { getMenstruationDate } from './getMenstruationDate'

/**
 * 获取当前日历月份的排卵日，根据下个月经期开始日计算
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
   const currentMonth = dayjs(`${year}-${month}`, 'YYYY-M')

   const nextMonth = currentMonth.add(1, 'M')

   const nextMonthMens = getMenstruationDate(
      nextMonth.year(),
      nextMonth.month() + 1,
      durationOfMenstrualPeriod,
      cycleLength,
      lastAuntDay,
   )

   const startLen = nextMonthMens[0][0]

   if (startLen < 14) {
      return currentMonth.daysInMonth() - (14 - startLen)
   }

   return null
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
