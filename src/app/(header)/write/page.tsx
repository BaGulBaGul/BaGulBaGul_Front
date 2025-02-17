'use client';
import SubHeader from '@/components/layout/subHeader'
import { WriteEPage, WriteRPage } from '@/components/pages/write';
import { useRouter } from 'next/navigation';

export default function Page({ searchParams }: { searchParams: { ['w']: 'p' | 'r', ['id']?: number, ['edit']?: number } }) {
  const router = useRouter();
  // if (searchParams.w === 'r' && searchParams.id === undefined ) {
  //   alert('잘못된 접근입니다.')
  //   router.replace('/')
  // } else {
  const text = `${searchParams.w === 'p' ? '파티글' : '모집글'} 작성하기`
  return (
    <>
      <SubHeader name={text} />
      {searchParams.w === 'p' ? <WriteEPage edit={searchParams.edit} /> : <WriteRPage eventId={searchParams.id} edit={searchParams.edit} />}
    </>
  )
  // }
}