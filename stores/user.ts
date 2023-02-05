import {
   appStorageKey,
   defaultAuntCycleLength,
   defaultContinuousAuntDays,
   getTodayColsPickerValue,
   today,
} from '@/constants/keys'
import { User } from '@/prisma/client'
import { YMDDate } from '@/types/global'
import { getDayjs } from '@/utils/getDayjs'
import produce, { Draft } from 'immer'
import invariant from 'invariant'
import { uid } from 'uid'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserStore = {
   setUsername: (name: string) => void
   init: (user: User) => void
   setAuntDate: (date: YMDDate) => void
   setContinuousAuntDays: (value: number) => void
   setAuntCycleLength: (val: number) => void
   addAnAuntDayPeriod: (val: YMDDate) => void
   // 历史姨妈日时间段
   timePeriodOfHistoricalAuntDay: {
      id: string
      from: YMDDate
      to: YMDDate
   }[]
   setAreYouComingToMyAuntNow: (val: YMDDate) => void
   // 当前是否来姨妈了
   areYouComingToMyAuntNow?: YMDDate
} & Omit<User, 'id' | 'createTime'>

const todayColsPickerValue = getTodayColsPickerValue()

export const useUserStore = create<UserStore>()(
   persist(
      (set) => ({
         areYouComingToMyAuntNow: undefined,
         timePeriodOfHistoricalAuntDay: [],
         username: uid(),
         theDateWhenMyAuntCameRecentlyYear: todayColsPickerValue[0],
         theDateWhenMyAuntCameRecentlyMonth: todayColsPickerValue[1],
         theDateWhenMyAuntCameRecentlyDate: todayColsPickerValue[2],
         continuousAuntDays: defaultContinuousAuntDays,
         auntCycleLength: defaultAuntCycleLength,
         setAreYouComingToMyAuntNow: (val) => {
            set({
               areYouComingToMyAuntNow: val,
               theDateWhenMyAuntCameRecentlyYear: val.year,
               theDateWhenMyAuntCameRecentlyMonth: val.month,
               theDateWhenMyAuntCameRecentlyDate: val.date,
            })
         },
         setAuntCycleLength: (val) => set({ auntCycleLength: val }),
         /** 添加一个姨妈日时间段 */
         addAnAuntDayPeriod: (end) => {
            set(
               produce((state: Draft<UserStore>) => {
                  invariant(
                     state.areYouComingToMyAuntNow,
                     'areYouComingToMyAuntNow empty',
                  )
                  state.timePeriodOfHistoricalAuntDay.push({
                     id: uid(),
                     from: state.areYouComingToMyAuntNow,
                     to: end,
                  })
                  state.areYouComingToMyAuntNow = undefined
               }),
            )
         },
         setAuntDate: (date: YMDDate) => {
            if (today.isSame(getDayjs(date.year, date.month, date.date), 'D')) {
               set({
                  areYouComingToMyAuntNow: date,
               })
            }

            set({
               theDateWhenMyAuntCameRecentlyYear: date.year,
               theDateWhenMyAuntCameRecentlyMonth: date.month,
               theDateWhenMyAuntCameRecentlyDate: date.date,
            })
         },
         setContinuousAuntDays: (val) => set({ continuousAuntDays: val }),
         setUsername: (name: string) => set({ username: name }),
         init: (user: User) => set(user),
      }),
      {
         name: appStorageKey,
      },
   ),
)
