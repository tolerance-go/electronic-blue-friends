'use client'

import { ButtonHTMLAttributes } from 'react'

export const NextStepBtn = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
   return (
      <div className='mt-3'>
         <button
            {...props}
            className='w-full border border-black py-2 px-4 font-medium italic text-black focus:outline-none'
         ></button>
      </div>
   )
}
