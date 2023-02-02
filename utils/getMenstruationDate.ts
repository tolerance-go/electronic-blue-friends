import dayjs, { Dayjs } from "dayjs";
import { flatten, last, range } from "lodash-es";

/**
 * 根据月份中的日期几号，和一个持续长度，返回在这个月份内的日期
 */
export const getDateRangeInMonth = (item: Dayjs, len: number) => {
  const date = item.date();
  const daysInMonth = item.daysInMonth();
  const dist: number[] = [];

  Array(len)
    .fill(null)
    .forEach((_, index) => {
      if (date + index <= daysInMonth) {
        dist.push(date + index);
      }
    });

  return dist;
};

/** 根据前一个月返回当前月份应该显示的月经期 */
export const getMenstruationDateWithPrevMonth = (
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
  const dates: number[][] = [];
  const target = dayjs(`${year}-${month}`, "YYYY-M");

  const prevMonthTarget = target.subtract(1, "M");

  const prevMens = getMenstruationDate(
    prevMonthTarget.year(),
    prevMonthTarget.month() + 1,
    durationOfMenstrualPeriod,
    cycleLength,
    lastAuntDay
  );
  // console.log('prevMens', prevMens)
  // console.log('prevMonthTarget.date()', prevMonthTarget.daysInMonth())
  if (last(flatten(prevMens)) === prevMonthTarget.daysInMonth()) {
    if (prevMens[prevMens.length - 1].length < durationOfMenstrualPeriod) {
      dates.push(
        range(
          1,
          durationOfMenstrualPeriod - prevMens[prevMens.length - 1].length + 1
        )
      );
    }
  }

  return dates;
};

/**
 * 根据周期长度，经期持续天数和最近一次姨妈日返回当前月份下的姨妈日是几号
 * 周期长度 - cycleLength
 * 最近一次姨妈日 - lastAuntDay
 * 经期持续天数 - durationOfMenstrualPeriod
 */
export const getMenstruationDate = (
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
  let lastAunt = dayjs(
    `${lastAuntDay.year}-${lastAuntDay.month}-${lastAuntDay.date}`,
    "YYYY-M-D"
  );

  const target = dayjs(`${year}-${month}`, "YYYY-M");

  const dates: number[][] = [];

  const isAfter = lastAunt.isAfter(target);

  while (
    lastAunt[isAfter ? "isAfter" : "isBefore"](target, "month") ||
    lastAunt.isSame(target, "month")
  ) {
    if (lastAunt.isSame(target, "month")) {
      dates.push(getDateRangeInMonth(lastAunt, durationOfMenstrualPeriod));
    }

    lastAunt = lastAunt[isAfter ? "subtract" : "add"](cycleLength, "d");
  }

  return dates;
};
