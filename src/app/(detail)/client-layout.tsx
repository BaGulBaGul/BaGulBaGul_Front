"use client";
import Header from '@/components/layout/header';

export function ClientRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}