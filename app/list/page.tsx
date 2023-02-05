'use client'

import { PageLoading } from '@/components/PageLoading'
import dynamic from 'next/dynamic'

const ListPage = dynamic(import('@/components/pages/ListPage'), {
   ssr: false,
   loading: () => (
      <div className='flex h-screen w-full items-center justify-center'>
         <PageLoading />
      </div>
   ),
})

export default function List() {
   return <ListPage />
}
