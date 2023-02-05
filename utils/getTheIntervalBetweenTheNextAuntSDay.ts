import { YMDDate } from '@/types/global'
import dayjs, { Dayjs } from 'dayjs'
import { getMenstruationDate } from './getMenstruationDate'

/**
 *  根据周期长度，经期持续天数和最近一次姨妈日返回距离下一次姨妈日的间隔
 */
export const getTheIntervalBetweenTheNextAuntSDay = (
   today: Dayjs,
   durationOfMenstrualPeriod: number,
   cycleLength: number,
   lastAuntDay: YMDDate,
) => {
   const date = today.date()
   const currentMonth = dayjs(`${today.year()}-${today.month() + 1}`, 'YYYY-M')

   const internal = (monthTime: Dayjs): Dayjs => {
      const ranges = getMenstruationDate(
         monthTime.year(),
         monthTime.month() + 1,
         durationOfMenstrualPeriod,
         cycleLength,
         lastAuntDay,
      )

      const diffs = monthTime.diff(currentMonth, 'd')

      const target = ranges
         .map((item) => item[0])
         .filter(Boolean)
         .find((item) => item + diffs > date)

      if (target === undefined) {
         return internal(monthTime.add(1, 'M'))
      }

      return monthTime.add(target - 1, 'd')
   }

   return internal(currentMonth)
}
