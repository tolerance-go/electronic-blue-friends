'use client'

import { PageLoading } from '@/components/PageLoading'
import dynamic from 'next/dynamic'

const StepsPage = dynamic(import('@/components/pages/StepsPage'), {
   ssr: false,
   loading: () => (
      <div className='flex h-screen w-full items-center justify-center'>
         <PageLoading />
      </div>
   ),
})

export default function Steps() {
   return <StepsPage />
}
