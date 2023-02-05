import dayjs from 'dayjs'
import {
   getCurMonthEasyPregnancyByNextMonthOvulation,
   getCurMonthEasyPregnancyByPrevMonthOvulation,
   getPregnancyPronePeriodOfTheMonth,
} from 'utils/getPregnancyPronePeriodOfTheMonth'
import { describe, expect, test } from 'vitest'

describe('getPregnancyPronePeriodOfTheMonth', async () => {
   test('getPregnancyPronePeriodOfTheMonth', async () => {
      expect(getPregnancyPronePeriodOfTheMonth(dayjs('2023-07-09')))
         .toMatchInlineSnapshot(`
           [
             8,
             7,
             6,
             5,
             4,
             10,
             11,
             12,
             13,
           ]
         `)

      expect(getPregnancyPronePeriodOfTheMonth(dayjs('2023-02-19')))
         .toMatchInlineSnapshot(`
           [
             18,
             17,
             16,
             15,
             14,
             20,
             21,
             22,
             23,
           ]
         `)

      expect(getCurMonthEasyPregnancyByPrevMonthOvulation(dayjs('2023-01-30')))
         .toMatchInlineSnapshot(`
           [
             1,
             2,
             3,
           ]
         `)

      expect(getCurMonthEasyPregnancyByNextMonthOvulation(dayjs('2023-03-01')))
         .toMatchInlineSnapshot(`
           [
             28,
             27,
             26,
             25,
             24,
           ]
         `)
   })
})
