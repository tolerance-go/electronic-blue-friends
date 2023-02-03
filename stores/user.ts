import {
   appStorageKey,
   defaultAuntCycleLength,
   defaultContinuousAuntDays,
   todayColsPickerValue,
} from '@/constants/keys'
import { User } from '@/prisma/client'
import { YMDDate } from '@/types/global'
import { uid } from 'uid'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserStore = {
   setUsername: (name: string) => void
   init: (user: User) => void
   setAuntDate: (date: YMDDate) => void
   setContinuousAuntDays: (value: number) => void
   setAuntCycleLength: (val: number) => void
} & Omit<User, 'id' | 'createTime'>

export const useUserStore = create<UserStore>()(
   persist(
      (set) => ({
         username: uid(),
         theDateWhenMyAuntCameRecentlyYear: todayColsPickerValue[0],
         theDateWhenMyAuntCameRecentlyMonth: todayColsPickerValue[1],
         theDateWhenMyAuntCameRecentlyDate: todayColsPickerValue[2],
         continuousAuntDays: defaultContinuousAuntDays,
         auntCycleLength: defaultAuntCycleLength,
         setAuntCycleLength: (val) => set({ auntCycleLength: val }),
         setAuntDate: (date: YMDDate) => {
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
