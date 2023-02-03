'use client'
import { Transition } from '@headlessui/react'
import { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import MultiPicker from 'rmc-picker/es/MultiPicker'
import Picker from 'rmc-picker/es/Picker'

import { isSSR } from '@/constants/keys'
import './ColumnsPicker.scss'

export type ColumnsPickerValue = string | number

export const ColumnsPicker = <T extends ColumnsPickerValue>({
   columns,
   defaultValue,
   format,
   onConfirm,
   placeholder,
   getContainer,
}: {
   getContainer?: () => HTMLElement | null
   placeholder?: string
   columns?: { value: T; title: string | number }[][]
   defaultValue?: T[]
   format?: (value?: T[]) => string
   onConfirm?: (value?: T[]) => void
}) => {
   const [open, setOpen] = useState(false)
   const [value, setValue] = useState<T[] | undefined>(defaultValue)

   const prevValueRef = useRef<T[] | undefined>(value)
   return (
      <>
         <div
            className='relative flex h-14 items-center bg-black px-4'
            onClick={() => setOpen(!open)}
         >
            <div className='w-full text-3xl text-white'>
               {format?.(value) ?? value?.join('/') ?? placeholder ?? '请选择'}
            </div>
            <svg
               className='absolute right-4 text-white'
               width='0.6em'
               height='1.2em'
               viewBox='0 0 10 20'
               xmlns='http://www.w3.org/2000/svg'
            >
               <path d='M5 20L0 15H10L5 20Z' fill='currentColor' />
               <path
                  d='M5 4.37114e-07L10 5L0 5L5 4.37114e-07Z'
                  fill='currentColor'
               />
            </svg>
         </div>
         {!isSSR &&
            ReactDOM.createPortal(
               <Transition
                  show={open}
                  className={'absolute inset-x-0 bottom-0 z-10 w-screen'}
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 translate-y-0'
                  leaveTo='transform opacity-0 translate-y-full'
               >
                  <div className='relative bg-black'>
                     <div className='flex justify-end space-x-2 px-3 py-1 text-white'>
                        <button
                           className='p-2 focus:outline-none'
                           onClick={() => {
                              onConfirm?.(value)
                              prevValueRef.current = value
                              setOpen(false)
                           }}
                        >
                           确认
                        </button>
                        <button
                           className='p-2 focus:outline-none'
                           onClick={() => {
                              setOpen(false)
                              setValue(prevValueRef.current)
                           }}
                        >
                           取消
                        </button>
                     </div>
                     <MultiPicker
                        selectedValue={value}
                        onValueChange={(next, colIndex) => {
                           setValue(next)
                        }}
                     >
                        {columns?.map((cols, index) => {
                           return (
                              <Picker key={index}>
                                 {cols.map((col) => {
                                    return (
                                       <Picker.Item
                                          key={col.value}
                                          value={col.value}
                                       >
                                          {col.title}
                                       </Picker.Item>
                                    )
                                 })}
                              </Picker>
                           )
                        })}
                     </MultiPicker>
                  </div>
               </Transition>,
               getContainer?.() ?? document.body,
            )}
      </>
   )
}
