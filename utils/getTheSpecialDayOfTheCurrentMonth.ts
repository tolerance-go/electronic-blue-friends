import { flatten } from 'lodash-es'
import { getDayjs } from './getDayjs'
import {
   getMenstruationDate,
   getMenstruationDateWithPrevMonth,
} from './getMenstruationDate'
import { getOvulation, getOvulationWithNext } from './getOvulation'
import {
   getCurMonthEasyPregnancyByPrevMonthOvulation,
   getPregnancyPronePeriodOfTheMonth,
} from './getPregnancyPronePeriodOfTheMonth'
import {
   getSafeDays,
   getSafeDaysWithNextMonth,
   getSafeDaysWithPrevMonth,
} from './getSafeDays'

/**
 * 获取当前月份的特殊日
 */
export const getTheSpecialDayOfTheCurrentMonth = ({
   year,
   month,
   continuousAuntDays,
   auntCycleLength,
   theDateWhenMyAuntCameRecentlyYear,
   theDateWhenMyAuntCameRecentlyMonth,
   theDateWhenMyAuntCameRecentlyDate,
}: {
   year: number
   month: number
   continuousAuntDays: number
   auntCycleLength: number
   theDateWhenMyAuntCameRecentlyYear: number
   theDateWhenMyAuntCameRecentlyMonth: number
   theDateWhenMyAuntCameRecentlyDate: number
}) => {
   // 当前日历下应该显示的上一个月姨妈日
   const theAuntDayOfThePreviousMonthThatShouldBeDisplayed =
      getMenstruationDateWithPrevMonth(
         year,
         month,
         continuousAuntDays,
         auntCycleLength,
         {
            year: theDateWhenMyAuntCameRecentlyYear,
            month: theDateWhenMyAuntCameRecentlyMonth,
            date: theDateWhenMyAuntCameRecentlyDate,
         },
      )
   // 当前日历下应该来姨妈的日子
   const theDayWhenYouShouldComeToMyAunt = getMenstruationDate(
      year,
      month,
      continuousAuntDays,
      auntCycleLength,
      {
         year: theDateWhenMyAuntCameRecentlyYear,
         month: theDateWhenMyAuntCameRecentlyMonth,
         date: theDateWhenMyAuntCameRecentlyDate,
      },
   )

   // 全部当前日历下应该来姨妈的日子
   const allTheDaysThatShouldComeToMyAuntUnder = flatten([
      ...theAuntDayOfThePreviousMonthThatShouldBeDisplayed,
      ...theDayWhenYouShouldComeToMyAunt,
   ])

   // 当前日历显示下一个月的安全日
   const theCurrentCalendarShowsTheSecurityDayOfTheNextMonth =
      getSafeDaysWithNextMonth(
         year,
         month,
         continuousAuntDays,
         auntCycleLength,
         {
            year: theDateWhenMyAuntCameRecentlyYear,
            month: theDateWhenMyAuntCameRecentlyMonth,
            date: theDateWhenMyAuntCameRecentlyDate,
         },
      )

   // 当前日历显示上一个月的安全日
   const theCurrentCalendarShowsTheSecurityDayOfThePreviousMonth =
      getSafeDaysWithPrevMonth(
         year,
         month,
         continuousAuntDays,
         auntCycleLength,
         {
            year: theDateWhenMyAuntCameRecentlyYear,
            month: theDateWhenMyAuntCameRecentlyMonth,
            date: theDateWhenMyAuntCameRecentlyDate,
         },
      )

   // 当前日历下安全日
   const safetyDayUnderCalendar = getSafeDays(year, month, [
      ...theAuntDayOfThePreviousMonthThatShouldBeDisplayed,
      ...theDayWhenYouShouldComeToMyAunt,
   ])

   // 所有当前日历下的安全日
   const allSecurityDaysUnderTheCurrentCalendar = flatten([
      ...safetyDayUnderCalendar,
      theCurrentCalendarShowsTheSecurityDayOfTheNextMonth,
      theCurrentCalendarShowsTheSecurityDayOfThePreviousMonth,
   ])

   // 当前日历应该显示的排卵日
   const ovulationDayOfTheCurrentCalendar = getOvulation(
      year,
      month,
      theDayWhenYouShouldComeToMyAunt,
   )

   // 当前日历应该显示的经期开始日在下个月的排卵日
   const theCurrentCalendarDisplaysTheOvulationDateOfTheNextMonth =
      getOvulationWithNext(year, month, continuousAuntDays, auntCycleLength, {
         year: theDateWhenMyAuntCameRecentlyYear,
         month: theDateWhenMyAuntCameRecentlyMonth,
         date: theDateWhenMyAuntCameRecentlyDate,
      })

   // 所有当前日历下的排卵日
   const allOvulationDaysInTheCurrentCalendar = [
      ...ovulationDayOfTheCurrentCalendar,
      theCurrentCalendarDisplaysTheOvulationDateOfTheNextMonth,
   ].filter((item): item is number => item !== null)

   //====================== 易孕期计算 * 开始 ======================
   /**
    * 易孕期，排卵日在当前月
    * 当前月应该显示的易孕期，排卵日在当前月
    */
   const easyPregnancyOvulationDateInTheCurrentMonth = flatten(
      allOvulationDaysInTheCurrentCalendar.map((item) =>
         getPregnancyPronePeriodOfTheMonth(getDayjs(year, month, item)),
      ),
   )

   /**
    * 上个月
    */
   const lastMonth = getDayjs(year, month).subtract(1, 'M')
   /**
    * 上个月的排卵日
    */
   const ovulationDateOfLastMonth = getOvulation(
      lastMonth.year(),
      lastMonth.month() + 1,
      theDayWhenYouShouldComeToMyAunt,
   )

   /**
    * 易孕期，排卵日在上个月
    * 当前月显示的易孕期
    */
   const easyPregnancyOvulationDateLastMonth = flatten(
      ovulationDateOfLastMonth.map((item) =>
         getCurMonthEasyPregnancyByPrevMonthOvulation(
            getDayjs(lastMonth.year(), lastMonth.month() + 1, item),
         ),
      ),
   )

   /**
    * 下个月
    */
   const nextMonth = getDayjs(year, month).add(1, 'M')
   /**
    * 下个月的排卵日
    */
   const ovulationDayOfNextMonth = getOvulation(
      nextMonth.year(),
      nextMonth.month() + 1,
      theDayWhenYouShouldComeToMyAunt,
   )
   /**
    * 易孕期，排卵日在下个月
    * 当前月显示的易孕期
    */
   const easyPregnancyOvulationDateIsNextMonth = flatten(
      ovulationDayOfNextMonth.map((item) =>
         getCurMonthEasyPregnancyByPrevMonthOvulation(
            getDayjs(nextMonth.year(), nextMonth.month() + 1, item),
         ),
      ),
   )

   /**
    * 计算易孕期，这里不用考虑排卵日在下下个月的情况，因为
    * 排卵日前 5 天，远小于一个月的间隔
    */

   /**
    * 当前月显示的全部易孕期
    */
   const allPregnancyPronePeriodsDisplayedInTheCurrentMonth = [
      ...easyPregnancyOvulationDateInTheCurrentMonth,
      ...easyPregnancyOvulationDateLastMonth,
      ...easyPregnancyOvulationDateIsNextMonth,
   ]
   //====================== 易孕期计算 * 结束 ======================

   return {
      allTheDaysThatShouldComeToMyAuntUnder,
      allSecurityDaysUnderTheCurrentCalendar,
      allOvulationDaysInTheCurrentCalendar,
      allPregnancyPronePeriodsDisplayedInTheCurrentMonth,
   }
}
