import dayjs from 'dayjs'

export const getDayjs = (year: number, month: number, date: number) => {
   return dayjs(`${year}-${month}-${date}`, 'YYYY-M-D')
}
