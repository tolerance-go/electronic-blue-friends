'use client'
import { useRef, useState } from 'react'

import {
   ColumnsPicker,
   ColumnsPickerAPI,
   ColumnsPickerProps,
   ColumnsPickerValue,
} from './ColumnsPicker'

export const ColumnsPickerInput = <T extends ColumnsPickerValue>({
   format,
   placeholder,
   defaultValue,
   ...rest
}: {
   placeholder?: string
   format?: (value?: T[]) => string
} & ColumnsPickerProps<T>) => {
   const [value, setValue] = useState<T[] | undefined>(defaultValue)

   const ref = useRef<ColumnsPickerAPI>(null)

   return (
      <>
         <div
            className='relative flex h-14 items-center bg-black px-4'
            onClick={() => ref.current?.switch()}
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
         <ColumnsPicker<T>
            ref={ref}
            {...rest}
            defaultValue={defaultValue}
            onConfirm={(val) => {
               setValue(val)
               rest.onConfirm?.(val)
            }}
         />
      </>
   )
}
