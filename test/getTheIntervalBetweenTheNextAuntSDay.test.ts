import dayjs from 'dayjs'
import { getMenstruationDate } from 'utils/getMenstruationDate'
import { getTheIntervalBetweenTheNextAuntSDay } from 'utils/getTheIntervalBetweenTheNextAuntSDay'
import { describe, expect, test } from 'vitest'

describe('getTheIntervalBetweenTheNextAuntSDay', async () => {
   test('diff month', async () => {
      const m1 = dayjs()
      const m2 = m1.add(1, 'M')

      expect(m2.diff(m1, 'd')).toMatchInlineSnapshot('28')
      expect(m2.diff(m2, 'd')).toMatchInlineSnapshot('0')
   })

   test('getTheIntervalBetweenTheNextAuntSDay', async () => {
      const today = dayjs('2023-02-05')

      expect(
         getMenstruationDate(today.year(), today.month() + 1, 5, 28, {
            year: 2023,
            month: 2,
            date: 5,
         }),
      ).toMatchInlineSnapshot(`
        [
          [
            5,
            6,
            7,
            8,
            9,
          ],
        ]
      `)

      expect(
         getTheIntervalBetweenTheNextAuntSDay(today, 5, 28, {
            year: 2023,
            month: 2,
            date: 5,
         }).format('YYYY-MM-DD'),
      ).toMatchInlineSnapshot('"2023-03-05"')
   })
})
