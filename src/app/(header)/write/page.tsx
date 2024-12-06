'use client';
import SubHeader from '@/components/layout/subHeader'
import { WriteEPage } from '@/components/pages/write/WriteEPage';
import { WriteRPage } from '@/components/pages/write/WriteRPage';
import { useRouter } from 'next/navigation';

export default function Page({ searchParams }: { searchParams: { ['w']: 'p' | 'r', ['id']?: number } }) {
  const router = useRouter();
  if (searchParams.w === 'r' && searchParams.id === undefined) {
    alert('잘못된 접근입니다.')
    router.replace('/')
  } else {
    const text = `${searchParams.w === 'p' ? '파티글' : '모집글'} 작성하기`
    return (
      <>
        <SubHeader name={text} />
        {searchParams.w === 'p' ? <WriteEPage text={text} /> : <WriteRPage text={text} eventId={searchParams.id ?? 0} />}
      </>
    )
  }
}