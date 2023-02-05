'use client'

import { PageLoading } from '@/components/PageLoading'
import dynamic from 'next/dynamic'

const SettingsPage = dynamic(import('@/components/pages/SettingsPage'), {
   ssr: false,
   loading: () => (
      <div className='flex h-screen w-full items-center justify-center'>
         <PageLoading />
      </div>
   ),
})

export default function Settings() {
   return <SettingsPage />
}
