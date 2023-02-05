'use client'
import { Transition } from '@headlessui/react'
import {
   forwardRef,
   ReactElement,
   Ref,
   useImperativeHandle,
   useRef,
   useState,
} from 'react'
import ReactDOM from 'react-dom'
import MultiPicker from 'rmc-picker/es/MultiPicker'
import Picker from 'rmc-picker/es/Picker'

import { isSSR } from '@/constants/keys'
import './ColumnsPicker.scss'

export type ColumnsPickerValue = string | number

export type ColumnsPickerProps<T> = {
   getContainer?: () => HTMLElement | null
   columns?: { value: T; title: string | number }[][]
   defaultValue?: T[]
   onConfirm?: (value?: T[]) => void
}

export type ColumnsPickerAPI = {
   open: () => void
   close: () => void
   switch: () => void
}

const ColumnsPicker_ = <T extends ColumnsPickerValue>(
   { columns, defaultValue, onConfirm, getContainer }: ColumnsPickerProps<T>,
   ref: Ref<ColumnsPickerAPI>,
) => {
   const [open, setOpen] = useState(false)
   const [value, setValue] = useState<T[] | undefined>(defaultValue)
   const prevValueRef = useRef<T[] | undefined>(value)

   useImperativeHandle(ref, () => {
      return {
         open: () => setOpen(true),
         close: () => setOpen(false),
         switch: () => setOpen((prev) => !prev),
      }
   })

   return (
      <>
         {!isSSR &&
            ReactDOM.createPortal(
               <Transition
                  show={open}
                  className={'absolute inset-x-0 bottom-0 z-10 w-full'}
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

export const ColumnsPicker = forwardRef(ColumnsPicker_) as <
   T extends ColumnsPickerValue,
>(
   p: ColumnsPickerProps<T> & { ref?: Ref<ColumnsPickerAPI> },
) => ReactElement
