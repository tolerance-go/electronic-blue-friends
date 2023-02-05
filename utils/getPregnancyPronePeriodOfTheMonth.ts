import { Dayjs } from 'dayjs'

/** 根据下一个月的排卵日，获取当前月的易孕期 */
export const getCurMonthEasyPregnancyByNextMonthOvulation = (
   /* 排卵日 */ nextMonthOvulation: Dayjs,
) => {
   return [
      ...Array(5)
         .fill(null)
         .map((_, index) => {
            return nextMonthOvulation.subtract(index + 1, 'd')
         }),
   ]
      .filter(
         (item) =>
            item.month() < nextMonthOvulation.month() ||
            item.year() < nextMonthOvulation.year(),
      )
      .map((item) => item.date())
}

/** 根据上一个月的排卵日，获取当前月的易孕期 */
export const getCurMonthEasyPregnancyByPrevMonthOvulation = (
   /* 排卵日 */ prevMonthOvulation: Dayjs,
) => {
   return [
      ...Array(4)
         .fill(null)
         .map((_, index) => {
            return prevMonthOvulation.add(index + 1, 'd')
         }),
   ]
      .filter(
         (item) =>
            item.month() > prevMonthOvulation.month() ||
            item.year() > prevMonthOvulation.year(),
      )
      .map((item) => item.date())
}

/** 返回当月的易孕期，根据排卵日 */
export const getPregnancyPronePeriodOfTheMonth = (
   /* 排卵日 */ ovulation: Dayjs,
) => {
   return [
      ...Array(5)
         .fill(null)
         .map((_, index) => {
            return ovulation.subtract(index + 1, 'd')
         }),
      ...Array(4)
         .fill(null)
         .map((_, index) => {
            return ovulation.add(index + 1, 'd')
         }),
   ]
      .filter((item) => item.month() === ovulation.month())
      .map((item) => item.date())
}
