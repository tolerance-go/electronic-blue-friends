'use client'

import { PageLoading } from '@/components/PageLoading'
import dynamic from 'next/dynamic'

const DatePage = dynamic(import('@/components/pages/DatePage'), {
   ssr: false,
   loading: () => (
      <div className='flex h-screen w-full items-center justify-center'>
         <PageLoading />
      </div>
   ),
})

export default function Date() {
   return <DatePage />
}
