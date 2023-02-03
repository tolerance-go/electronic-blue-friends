'use client'

import { useEffect, useRef, useState } from 'react'

export const Countdown = ({
   className,
   onDone,
}: {
   onDone?: () => void
   className: string
}) => {
   const [count, setCount] = useState(4)
   const tlRef = useRef<NodeJS.Timer>()

   useEffect(() => {
      const tl = setInterval(() => {
         setCount((prev) => prev - 1)
      }, 1000)

      tlRef.current = tl

      return () => clearInterval(tl)
   }, [])

   useEffect(() => {
      if (count <= 1) {
         clearInterval(tlRef.current)
         onDone?.()
      }
   }, [onDone, count])

   return <span className={className}>{count}</span>
}
