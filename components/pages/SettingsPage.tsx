import {
   auntCycleLengthColumnData,
   auntCycleLengthKey,
   continuousAuntDaysColumnData,
   continuousAuntDaysKey,
   dateColumnDataOfRecentAunt,
   theDateWhenMyAuntCameRecentlyKey,
} from '@/constants/keys'
import { useUserStore } from '@/stores/user'
import Link from 'next/link'
import shallow from 'zustand/shallow'
import { ColumnsPickerInput } from '../ColumnsPickerInput'

export const SettingsPage = () => {
   const username = useUserStore((state) => state.username)
   const auntCycleLength = useUserStore((state) => state.auntCycleLength)
   const continuousAuntDays = useUserStore((state) => state.continuousAuntDays)
   const date = useUserStore((state) => state.theDateWhenMyAuntCameRecentlyDate)
   const month = useUserStore(
      (state) => state.theDateWhenMyAuntCameRecentlyMonth,
   )
   const year = useUserStore((state) => state.theDateWhenMyAuntCameRecentlyYear)
   const sets = useUserStore(
      (state) => ({
         setAuntCycleLength: state.setAuntCycleLength,
         setAuntDate: state.setAuntDate,
         setContinuousAuntDays: state.setContinuousAuntDays,
      }),
      shallow,
   )

   return (
      <div className='relative flex h-full flex-col justify-center p-12'>
         <div className='absolute top-0 left-0 flex px-5 py-5'>
            <Link href={'/main'}>
               <svg
                  width='1em'
                  height='1em'
                  className='text-4xl'
                  viewBox='0 0 29 29'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
               >
                  <path
                     d='M28.1666 12.7917H7.37623L16.9258 3.24209L14.5 0.833344L0.833313 14.5L14.5 28.1667L16.9087 25.7579L7.37623 16.2083H28.1666V12.7917Z'
                     fill='black'
                  />
               </svg>
            </Link>
         </div>
         <div className='relative divide-y divide-black'>
            {[
               {
                  title: '最近姨妈来的日期',
                  columns: dateColumnDataOfRecentAunt,
                  name: theDateWhenMyAuntCameRecentlyKey,
               },
               {
                  title: '持续姨妈天数',
                  columns: continuousAuntDaysColumnData,
                  name: continuousAuntDaysKey,
               },
               {
                  name: auntCycleLengthKey,
                  title: '姨妈周期长度',
                  columns: auntCycleLengthColumnData,
               },
            ].map((item) => {
               return (
                  <div key={item.title} className='py-5'>
                     <div className='mt-2 text-3xl'>{item.title}</div>
                     <div className='mt-5'>
                        {
                           {
                              [theDateWhenMyAuntCameRecentlyKey]: (
                                 <ColumnsPickerInput<number>
                                    defaultValue={[year, month, date]}
                                    columns={item.columns}
                                    onConfirm={(value) => {
                                       if (value) {
                                          sets.setAuntDate({
                                             year: value[0],
                                             month: value[1],
                                             date: value[2],
                                          })
                                       }
                                    }}
                                 />
                              ),
                              [continuousAuntDaysKey]: (
                                 <ColumnsPickerInput<number>
                                    defaultValue={[continuousAuntDays]}
                                    columns={item.columns}
                                    onConfirm={(value) => {
                                       if (value) {
                                          sets.setContinuousAuntDays(value[0])
                                       }
                                    }}
                                 />
                              ),
                              [auntCycleLengthKey]: (
                                 <ColumnsPickerInput<number>
                                    defaultValue={[auntCycleLength]}
                                    columns={item.columns}
                                    onConfirm={(value) => {
                                       if (value) {
                                          sets.setAuntCycleLength(value[0])
                                       }
                                    }}
                                 />
                              ),
                           }[item.name]
                        }
                     </div>
                  </div>
               )
            })}
         </div>
         <div className='py-5 text-right text-sm'>用户名：{username}</div>
      </div>
   )
}

export default SettingsPage
