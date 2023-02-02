import dayjs from "dayjs";
import {
  getDateRangeInMonth,
  getMenstruationDate,
  getMenstruationDateWithPrevMonth,
} from "utils/getMenstruationDate";
import { describe, expect, test } from "vitest";

describe("month-days", async () => {
  test("getDateRangeInMonth", async () => {
    expect(getDateRangeInMonth(dayjs("2023-02-26"), 5)).toMatchInlineSnapshot(
      `
      [
        26,
        27,
        28,
      ]
    `
    );

    expect(getDateRangeInMonth(dayjs("2023-02-01"), 5)).toMatchInlineSnapshot(
      `
      [
        1,
        2,
        3,
        4,
        5,
      ]
    `
    );
  });

  test("basic", async () => {
    expect(dayjs("2023-1-4", "YYYY-M-D").add(28, "d")).toMatchInlineSnapshot(
      '"2023-01-31T16:00:00.000Z"'
    );

    expect(
      dayjs("2023-2-4", "YYYY-M-D").subtract(1, "M")
    ).toMatchInlineSnapshot('"2023-01-03T16:00:00.000Z"');
    expect(
      getMenstruationDate(2023, 1, 5, 28, {
        year: 2023,
        month: 1,
        date: 4,
      })
    ).toMatchInlineSnapshot(`
      [
        [
          4,
          5,
          6,
          7,
          8,
        ],
      ]
    `);
    expect(
      getMenstruationDate(2023, 2, 5, 28, {
        year: 2023,
        month: 1,
        date: 4,
      })
    ).toMatchInlineSnapshot(`
      [
        [
          1,
          2,
          3,
          4,
          5,
        ],
      ]
    `);

    expect(
      getMenstruationDateWithPrevMonth(2023, 3, 5, 28, {
        year: 2023,
        month: 1,
        date: 4,
      })
    ).toMatchInlineSnapshot("[]");

    expect(
      getMenstruationDate(2023, 3, 5, 28, {
        year: 2023,
        month: 1,
        date: 4,
      })
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
    `);

    expect(
      getMenstruationDateWithPrevMonth(2023, 4, 5, 28, {
        year: 2023,
        month: 1,
        date: 4,
      })
    ).toMatchInlineSnapshot(`
      [
        [
          1,
          2,
        ],
      ]
    `);

    expect(
      getMenstruationDate(2023, 4, 5, 28, {
        year: 2023,
        month: 1,
        date: 4,
      })
    ).toMatchInlineSnapshot(`
      [
        [
          26,
          27,
          28,
          29,
          30,
        ],
      ]
    `);
  });
});
