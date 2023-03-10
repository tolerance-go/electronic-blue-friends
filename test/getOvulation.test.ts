import { getMenstruationDate } from 'utils/getMenstruationDate'
import { getOvulation, getOvulationWithNext } from 'utils/getOvulation'
import { describe, expect, test } from 'vitest'

describe('getOvulation', async () => {
   test('getOvulation', async () => {
      expect(
         getMenstruationDate(2023, 3, 5, 28, {
            year: 2023,
            month: 1,
            date: 4,
         }),
      ).toMatchInlineSnapshot(`
      [
        [
          1,
          2,
          3,
          4,
          5,
        ],
        [
          29,
          30,
          31,
        ],
      ]
    `)

      expect(
         getOvulation(2023, 3, [
            [1, 2, 3, 4, 5],
            [29, 30, 31],
         ]),
      ).toMatchInlineSnapshot(
         `
      [
        15,
      ]
    `,
      )
   })

   test('getOvulationWithNext', async () => {
      expect(
         getMenstruationDate(2023, 3, 5, 28, {
            year: 2023,
            month: 1,
            date: 4,
         }),
      ).toMatchInlineSnapshot(`
      [
        [
          1,
          2,
          3,
          4,
          5,
        ],
        [
          29,
          30,
          31,
        ],
      ]
    `)

      expect(
         getOvulationWithNext(2023, 2, 5, 28, {
            year: 2023,
            month: 1,
            date: 4,
         }),
      ).toMatchInlineSnapshot('15')
   })

   /** 下个月经期开始日大于 14 号 */
   test('theStartDateOfTheNextMonthSMenstrualPeriodIsGreaterThanThe_14th', async () => {
      expect(
         getMenstruationDate(2023, 3, 5, 28, {
            year: 2023,
            month: 1,
            date: 20,
         }),
      ).toMatchInlineSnapshot(`
        [
          [
            17,
            18,
            19,
            20,
            21,
          ],
        ]
      `)

      expect(
         getOvulationWithNext(2023, 2, 5, 28, {
            year: 2023,
            month: 1,
            date: 20,
         }),
      ).toMatchInlineSnapshot('null')
   })
})
