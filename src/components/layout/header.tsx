import React from 'react'

function Header() {
  return (
    <header className="fixed top-0 lg:top-[48px] left-0 right-0
      flex-row flex w-full justify-between px-[24px] py-[10px] lg:px-[360px] lg:mt-[48px] bg-[#FFFFFF]">
      <p className="flex w-[120.77px] relative">
        <a href="/"><img src="/logo_s.svg" width='120.77'/></a>
      </p>
      <div className='flex flex-row gap-[10px]'>
        <p className="flex w-6 h-6 relative">
          <a href="/"><img src="/main_icon_search.svg" /></a>
        </p>
        <a className="flex place-items-center" href="/">
          <img src="/main_profile.svg" alt="마이페이지 아이콘" width={24} height={24} />
        </a>
      </div>
    </header>
  )
}

export default Header;