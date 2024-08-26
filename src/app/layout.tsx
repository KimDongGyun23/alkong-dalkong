import type { PropsWithChildren } from 'react'

import { LazyMotionProvider, QueryProvider } from '@/hooks'

import { notoSansKR } from '../../public/app/font'

import './globals.css'

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} font-notoSansKR`}>
      <head />
      <body className="flex-center font-medium">
        <QueryProvider>
          <LazyMotionProvider>
            <div className="relative h-svh w-full min-w-[320px] max-w-[450px] overflow-y-scroll border-x scrollbar-hide">
              {children}
            </div>
          </LazyMotionProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
