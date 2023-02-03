import {
   appStorageKey,
   defaultAuntCycleLength,
   defaultContinuousAuntDays,
   today,
   todayColsPickerValue,
} from '@/constants/keys'
import { User } from '@/prisma/client'
import { YMDDate } from '@/types/global'
import { getDayjs } from '@/utils/getDayjs'
import { uid } from 'uid'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserStore = {
   setUsername: (name: string) => void
   init: (user: User) => void
   setAuntDate: (date: YMDDate) => void
   setContinuousAuntDays: (value: number) => void
   setAuntCycleLength: (val: number) => void
   // 历史姨妈日时间段
   timePeriodOfHistoricalAuntDay: {
      id: string
      from: YMDDate
      to: YMDDate
   }[]
   setAreYouComingToMyAuntNow: (val: boolean) => void
   // 当前是否来姨妈了
   areYouComingToMyAuntNow: boolean
} & Omit<User, 'id' | 'createTime'>

export const useUserStore = create<UserStore>()(
   persist(
      (set) => ({
         areYouComingToMyAuntNow: false,
         timePeriodOfHistoricalAuntDay: [],
         username: uid(),
         theDateWhenMyAuntCameRecentlyYear: todayColsPickerValue[0],
         theDateWhenMyAuntCameRecentlyMonth: todayColsPickerValue[1],
         theDateWhenMyAuntCameRecentlyDate: todayColsPickerValue[2],
         continuousAuntDays: defaultContinuousAuntDays,
         auntCycleLength: defaultAuntCycleLength,
         setAreYouComingToMyAuntNow: (val) =>
            set({ areYouComingToMyAuntNow: val }),
         setAuntCycleLength: (val) => set({ auntCycleLength: val }),
         setAuntDate: (date: YMDDate) => {
            if (today.isSame(getDayjs(date.year, date.month, date.date), 'D')) {
               set({
                  areYouComingToMyAuntNow: true,
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
