import { PropsWithChildren } from 'react'

export const Frame = (props: PropsWithChildren) => {
   return (
      <div className='h-full border-4 border-black bg-[#FF7272]'>
         {props.children}
      </div>
   )
}
