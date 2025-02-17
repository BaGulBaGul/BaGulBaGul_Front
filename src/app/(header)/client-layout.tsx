"use client";
import { usePathname } from 'next/navigation'
import Header from '@/components/layout/header';

export function ClientRootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <>
      {
        !pathname.includes('/comments')
          ? <body>
            <Header />
            {children}
          </body>
          : <body style={{ backgroundColor: '#ECECEC' }}>
            <Header opt='NF' />
            {children}
          </body>
      }
    </>
  )
}