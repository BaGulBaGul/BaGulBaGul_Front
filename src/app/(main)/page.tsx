import { UserInfoProps } from '@/components/common';
import Header from '@/components/layout/header'
import Main from '@/components/pages/main'
import { headers } from 'next/headers';
import { useState } from 'react';

export default async function Page(req: Request) {
  const head = headers();
  console.log('*** headers: ', head.has('x-user'));
  console.log('*** headers: ', head);
  console.log('&&& ', req.headers)

  return (
    <div>
      <div className='relative z-10'>
        <Header />
      </div>
      <Main />
    </div>
  )
}