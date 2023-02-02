import dayjs from "dayjs";
import { dropRightWhile, dropWhile, first, last, range } from "lodash-es";
import { getMenstruationDate } from "./getMenstruationDate";

/**
 * 返回当前日历显示上下一个月的安全日
 */
export const getSafeDaysWithNextMonth = (
  year: number,
  month: number,
  durationOfMenstrualPeriod: number,
  cycleLength: number,
  lastAuntDay: {
    year: number;
    month: number;
    date: number;
  }
) => {
  const target = dayjs(`${year}-${month}`, "YYYY-M");

  const nextMonthTarget = target.add(1, "M");

  const nextSafeDays = getSafeDays(
    nextMonthTarget.year(),
    nextMonthTarget.month() + 1,
    getMenstruationDate(
      nextMonthTarget.year(),
      nextMonthTarget.month() + 1,
      durationOfMenstrualPeriod,
      cycleLength,
      lastAuntDay
    )
  );

  //   console.log("nextSafeDays", nextSafeDays);
  const firstItem = first(nextSafeDays);
  //   console.log("firstItem", firstItem);
  //   console.log('nextMonthTarget.daysInMonth()', nextMonthTarget.daysInMonth())
  if (firstItem) {
    if (firstItem.length < 7) {
      return range(
        target.daysInMonth() - (7 - firstItem.length) + 1,
        target.daysInMonth() + 1
      );
    }
  }

  return [];
};

/**
 * 返回当前日历显示上一个月的安全日
 */
export const getSafeDaysWithPrevMonth = (
  year: number,
  month: number,
  durationOfMenstrualPeriod: number,
  cycleLength: number,
  lastAuntDay: {
    year: number;
    month: number;
    date: number;
  }
) => {
  const target = dayjs(`${year}-${month}`, "YYYY-M");

  const prevMonthTarget = target.subtract(1, "M");

  const prevSafeDays = getSafeDays(
    prevMonthTarget.year(),
    prevMonthTarget.month() + 1,
    getMenstruationDate(
      prevMonthTarget.year(),
      prevMonthTarget.month() + 1,
      durationOfMenstrualPeriod,
      cycleLength,
      lastAuntDay
    )
  );

  // console.log("prevSafeDays", prevSafeDays);
  const lastItem = last(prevSafeDays);
  // console.log("lastItem", lastItem);
  if (lastItem) {
    if (lastItem.length < 8) {
      return range(1, 8 - lastItem.length + 1);
    }
  }

  return [];
};

/**
 * 根据日历应该显示的月经期范围，返回日历上应该显示的安全期几号
 * 规则为月经来潮时，前 7 天，后 8 天
 */
export const getSafeDays = (
  year: number,
  month: number,
  mensDate: number[][]
) => {
  const dist: number[][] = [];
  mensDate.forEach((mens) => {
    const dateItem = dayjs(`${year}-${month}`, "YYYY-M-D");
    const daysInMonth = dateItem.daysInMonth();

    // 前 7 天
    const first = mens[0];
    dist.push(dropWhile(range(first - 7, first), (item) => item <= 0));

    // 后 8 天
    const lastItem = mens[0];
    dist.push(
      dropRightWhile(
        range(lastItem, lastItem + 8),
        (item) => item > daysInMonth
      )
    );
  });

  return dist;
};
