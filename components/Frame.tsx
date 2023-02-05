'use client'

import {
   createContext,
   MutableRefObject,
   PropsWithChildren,
   useContext,
   useRef,
} from 'react'

const FrameRefContext = createContext<MutableRefObject<HTMLDivElement | null>>({
   current: null,
})

export const useFrameRefContext = () => useContext(FrameRefContext)

export const Frame = (props: PropsWithChildren) => {
   const ref = useRef<HTMLDivElement>(null)
   return (
      <FrameRefContext.Provider value={ref}>
         <div ref={ref} className='mx-auto h-full max-w-screen-sm border-4 border-black bg-[#FF7272] relative'>
            {props.children}
         </div>
      </FrameRefContext.Provider>
   )
}
