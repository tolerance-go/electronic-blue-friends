import dayjs from "dayjs";

/**
 * 计算一个月多少天，返回一个二维数组数据结构，
 * 每行从周日开始，和日期不对应的地方就自动补 null
 */
export const getMonthDays = (year: number, month: number) => {
  const date = dayjs(`${year}-${month}-1`, "YYYY-M-D");
  const daysInMonth = date.daysInMonth();
  const day = date.day();

  let tag = day === 7 ? 0 : day;

  const dist: (null | number)[][] = [];
  Array(daysInMonth)
    .fill(null)
    .forEach((_, index) => {
      if (index === 0) {
        dist.push([]);
      }

      const lastLine = dist[dist.length - 1];

      const num = index + 1;

      /** 在第一行的时候，需要在头部填充 null */
      if (dist.length === 1) {
        while (index < tag) {
          lastLine.push(null);
          tag--;
        }
      }

      lastLine.push(num);

      if (lastLine.length === 7) {
        dist.push([]);
      }
    });

  const lastLine = dist[dist.length - 1];

  Array(7)
    .fill(null)
    .forEach((_, index) => {
      if (lastLine[index] === undefined) {
        lastLine[index] = null;
      }
    });

  return dist;
};
