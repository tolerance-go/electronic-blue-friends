import dayjs from "dayjs";

// 最近姨妈来的日期
export const theDateWhenMyAuntCameRecentlyKey = "theDateWhenMyAuntCameRecently";

// 持续姨妈天数
export const continuousAuntDaysKey = "continuousAuntDays";

// 姨妈周期长度
export const auntCycleLengthKey = "auntCycleLength";

// 默认持续姨妈天数
export const defaultContinuousAuntDays = 5;

// 默认姨妈周期长度
export const defaultAuntCycleLength = 28;

export const isSSR = typeof window === "undefined";

export const today = dayjs();

export const todayColsPickerValue = [
  today.year(),
  today.month() + 1,
  today.date(),
];

// 最近姨妈来的日期列数据
export const dateColumnDataOfRecentAunt = [
  [
    {
      title: today.year() - 1,
      value: today.year() - 1,
    },
    {
      title: today.year(),
      value: today.year(),
    },
  ],
  Array(12)
    .fill(null)
    .map((_, index) => {
      return {
        title: index + 1,
        value: index + 1,
      };
    }),
  Array(31)
    .fill(null)
    .map((_, index) => {
      return {
        title: index + 1,
        value: index + 1,
      };
    }),
];

// 持续姨妈天数列数据
export const continuousAuntDaysColumnData = [
  Array(10)
    .fill(null)
    .map((_, index) => {
      return {
        title: index + 1,
        value: index + 1,
      };
    }),
];

// 姨妈周期长度列数据
export const auntCycleLengthColumnData = [
  Array(31)
    .fill(null)
    .map((_, index) => {
      return {
        title: index + 1,
        value: index + 1,
      };
    }),
];

export const appStorageKey = "app-storage";
