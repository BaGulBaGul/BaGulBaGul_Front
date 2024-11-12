import React from 'react'
import { MagnifyingIcn } from '../common/styles/Icon';
import useLoginInfo from '@/hooks/useLoginInfo';
import Link from 'next/link';

function Header(props: { opt?: 'NF' }) {
  const data = useLoginInfo().data
  return (
    <header className={`${props.opt && props.opt === 'NF' ? '' : 'fixed top-0 left-0 right-0 '}flex flex-row justify-between w-full px-[16px] py-[10px] bg-p-white
      lg:px-[360px] lg:pt-[58px] z-30`}>
      <p className="flex w-[120.77px] relative">
        <a href="/"><img src="/logo_s.svg" width='120.77' /></a>
      </p>
      <div className='flex flex-row gap-[10px]'>
        <p className="flex w-6 h-6 relative">
          <Link href="/search"><MagnifyingIcn size={24} /></Link>
        </p>
        <Link className="flex place-items-center" href="/mypage">
          <img className='w-[24px] h-[24px] rounded-full' src={!!data && !!data.imageURI ? '/images/profile_pic.png' : "/profile_main.svg"} alt="마이페이지 아이콘" />
        </Link>
      </div>
    </header>
  )
}
export default Header;