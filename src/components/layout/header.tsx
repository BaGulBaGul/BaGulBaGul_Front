import React from 'react'
import Image from 'next/image'

function Header() {
  return (
    <header className="flex-row flex w-full justify-between px-[24px] py-[10px] lg:px-[360px] lg:mt-[48px]">
      <p className="flex w-[112.22px] relative">
        <a href="/"><Image src="/logo_s.svg" alt="바글바글 로고" fill /></a>
      </p>
      <div className='flex flex-row gap-[10px]'>
        <p className="flex w-6 h-6 relative">
          <a href="/"><Image src="/main_icon_search.svg" alt="검색창 아이콘" fill /></a>
        </p>
        <p className="flex w-6 h-6 relative">
          <a href="/"><Image src="/main_icon_edit.svg" alt="글작성 아이콘" fill /></a>
        </p>
        <a className="flex place-items-center" href="/">
          <Image src="/main_profile.svg" alt="마이페이지 아이콘" width={24} height={24} />
        </a>
      </div>
    </header>
  )
}

export default Header;