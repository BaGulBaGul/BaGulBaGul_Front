import type { Metadata } from 'next'
import { SubTopHeader } from '@/components/layout/subHeader';
import { WriteAPage } from '@/components/pages/write/_WriteAPage';

export const metadata: Metadata = {
  title: '게시글 작성 • 바글바글',
  description: '모여봐요 바글바글',
}

export default function Page() {
  return (<div className='bg-p-white'>
    <SubTopHeader name='게시글 작성' />
    <WriteAPage />
  </div>);
}