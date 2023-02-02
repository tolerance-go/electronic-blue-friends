import { getMonthDays } from "utils/getMonthDays";
import { describe, expect, test } from "vitest";

describe("month-days", async () => {
  test("basic", async () => {
    expect(getMonthDays(2023, 2)).toMatchInlineSnapshot(`
      [
        [
          null,
          null,
          null,
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
        ],
        [
          12,
          13,
          14,
          15,
          16,
          17,
          18,
        ],
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
          null,
          null,
          null,
          null,
        ],
      ]
    `);

    expect(getMonthDays(2029, 6)).toMatchInlineSnapshot(`
      [
        [
          null,
          null,
          null,
          null,
          null,
          1,
          2,
        ],
        [
          3,
          4,
          5,
          6,
          7,
          8,
          9,
        ],
        [
          10,
          11,
          12,
          13,
          14,
          15,
          16,
        ],
        [
          17,
          18,
          19,
          20,
          21,
          22,
          23,
        ],
        [
          24,
          25,
          26,
          27,
          28,
          29,
          30,
        ],
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
      ]
    `);
  });
});