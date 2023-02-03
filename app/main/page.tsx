import { PageLoading } from '@/components/PageLoading'
import dynamic from 'next/dynamic'

const MainPage = dynamic(import('@/components/pages/MainPage'), {
   ssr: false,
   loading: () => (
      <div className='flex h-screen w-full items-center justify-center'>
         <PageLoading />
      </div>
   ),
})

export default function Home() {
   return <MainPage />
}
