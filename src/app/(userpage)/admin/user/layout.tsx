import { SubTopHeader } from '@/components/layout/subHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '유저 관리 | 바글바글 관리',
  description: '모여봐요 바글바글',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SubTopHeader name='유저 관리' />
      {children}
    </>
  )
}