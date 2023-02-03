import dayjs from 'dayjs'
import { getMenstruationDate } from 'utils/getMenstruationDate'
import {
   getSafeDays,
   getSafeDaysWithNextMonth,
   getSafeDaysWithPrevMonth,
} from 'utils/getSafeDays'
import { describe, expect, test } from 'vitest'

describe('getDateRangeInMonth', async () => {
   test('getDateRangeInMonth', async () => {
      expect(
         dayjs(`${2023}-${4}`, 'YYYY-M-D').daysInMonth(),
      ).toMatchInlineSnapshot('30')

      expect(getSafeDays(2023, 4, [[26, 27, 28, 29, 30]]))
         .toMatchInlineSnapshot(`
      [
        [
          19,
          20,
          21,
          22,
          23,
          24,
          25,
        ],
        [
          26,
          27,
          28,
          29,
          30,
        ],
      ]
    `)

      expect(getSafeDays(2023, 2, [[1, 2, 3, 4, 5]])).toMatchInlineSnapshot(`
      [
        [],
        [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
        ],
      ]
    `)

      expect(
         getSafeDays(2023, 3, [
            [1, 2, 3, 4, 5],
            [29, 30, 31],
         ]),
      ).toMatchInlineSnapshot(`
      [
        [],
        [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
        ],
        [
          22,
          23,
          24,
          25,
          26,
          27,
          28,
        ],
        [
          29,
          30,
          31,
        ],
      ]
    `)

      expect(getSafeDays(2023, 3, [[5, 6, 7, 8, 9]])).toMatchInlineSnapshot(`
      [
        [
          1,
          2,
          3,
          4,
        ],
        [
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
        ],
      ]
    `)
   })

   test('getSafeDaysWithNextMonth', async () => {
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
         getSafeDays(2023, 3, [
            [1, 2, 3, 4, 5],
            [29, 30, 31],
         ]),
      ).toMatchInlineSnapshot(
         `
      [
        [],
        [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
        ],
        [
          22,
          23,
          24,
          25,
          26,
          27,
          28,
        ],
        [
          29,
          30,
          31,
        ],
      ]
    `,
      )

      expect(
         getSafeDaysWithNextMonth(2023, 2, 5, 28, {
            year: 2023,
            month: 1,
            date: 4,
         }),
      ).toMatchInlineSnapshot(`
      [
        22,
        23,
        24,
        25,
        26,
        27,
        28,
      ]
    `)
   })

   test('getSafeDaysWithNextMonth start len > 0', async () => {
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
         getSafeDays(2023, 3, [
            [1, 2, 3, 4, 5],
            [29, 30, 31],
         ]),
      ).toMatchInlineSnapshot(
         `
      [
        [],
        [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
        ],
        [
          22,
          23,
          24,
          25,
          26,
          27,
          28,
        ],
        [
          29,
          30,
          31,
        ],
      ]
    `,
      )

      expect(
         getSafeDaysWithNextMonth(2023, 2, 5, 28, {
            year: 2023,
            month: 1,
            date: 4,
         }),
      ).toMatchInlineSnapshot(`
      [
        22,
        23,
        24,
        25,
        26,
        27,
        28,
      ]
    `)
   })

   test('getSafeDaysWithPrevMonth', async () => {
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
         getSafeDays(2023, 3, [
            [1, 2, 3, 4, 5],
            [29, 30, 31],
         ]),
      ).toMatchInlineSnapshot(
         `
      [
        [],
        [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
        ],
        [
          22,
          23,
          24,
          25,
          26,
          27,
          28,
        ],
        [
          29,
          30,
          31,
        ],
      ]
    `,
      )

      expect(
         getSafeDaysWithPrevMonth(2023, 4, 5, 28, {
            year: 2023,
            month: 1,
            date: 4,
         }),
      ).toMatchInlineSnapshot(`
      [
        1,
        2,
        3,
        4,
        5,
      ]
    `)
   })
})
