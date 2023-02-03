import { Frame } from '@/components/Frame'
import { LocalDataValidation } from '@/components/LocalDataValidation'
import './globals.css'

export default function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <html lang='zh-CN'>
         <head />
         <body className='h-screen w-screen'>
            <LocalDataValidation />
            <Frame>{children}</Frame>
         </body>
      </html>
   )
}
