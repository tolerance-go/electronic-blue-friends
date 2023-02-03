import { auntCycleLengthColumnData } from '@/constants/keys'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import Slider from 'react-slick'
import { shallow } from 'zustand/shallow'
import { ColumnsPicker } from './ColumnsPicker'
import { NextStepBtn } from './NextStepBtn'

export default function Step2({
   sliderRef,
}: {
   sliderRef: React.MutableRefObject<Slider | null>
}) {
   const user = useUserStore(
      (state) => ({
         setAuntCycleLength: state.setAuntCycleLength,
         auntCycleLength: state.auntCycleLength,
      }),
      shallow,
   )
   const wrapRef = useRef<HTMLDivElement>(null)
   const router = useRouter()
   return (
      <div
         ref={wrapRef}
         className='relative flex h-full flex-col justify-center p-12'
      >
         <div className='relative -top-10'>
            <div className='text-8xl'>周期</div>
            <div className='mt-2 text-2xl'>姨妈周期长度是多少？</div>
            <div className='mt-10'>
               <ColumnsPicker<number>
                  defaultValue={[user.auntCycleLength]}
                  columns={auntCycleLengthColumnData}
                  onConfirm={(value) => {
                     if (value) {
                        user.setAuntCycleLength(user.auntCycleLength)
                     }
                  }}
                  getContainer={() => wrapRef.current}
               />
            </div>
            <NextStepBtn
               onClick={() => {
                  router.push('/main')
               }}
            >
               开始使用
            </NextStepBtn>
         </div>
      </div>
   )
}
