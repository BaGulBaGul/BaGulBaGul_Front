import React, { useState } from 'react'
import { AlarmIcn } from '../common/Icon';
// import { isSigned } from '@/service/ApiService';

async function Header() {
  return (
    <div className='relative z-30'>
      <header className="fixed top-0 left-0 right-0 flex flex-row justify-between w-full px-[24px] pt-[10px] pb-[10px] bg-p-white
      lg:px-[360px] lg:pt-[58px]">
        <p className="flex w-[120.77px] relative">
          <a href="/"><img src="/logo_s.svg" width='120.77' /></a>
        </p>
        <div className='flex flex-row gap-[10px]'>
          <p className="flex w-6 h-6 relative">
            <a href="/search"><img src="/main_icon_search.svg" /></a>
          </p>
          <a className="flex place-items-center" href="/user/mypage">
            <img src="/profile_main.svg" alt="마이페이지 아이콘" width={24} height={24} />
          </a>
          {/* <IconButton onClick={handleProfile} className='p-0' disableRipple>
          </IconButton> */}
        </div>
      </header>
    </div>
  )
}

export function HeaderNotFixed() {
  return (
    <header className="flex flex-row justify-between w-full px-[24px] py-[10px] bg-p-white z-10">
      <p className="flex w-[120.77px] relative">
        <a href="/"><img src="/logo_s.svg" width='120.77' /></a>
      </p>
      <div className='flex flex-row gap-[10px]'>
        <p className="flex w-6 h-6 relative">
          <a href="/search"><img src="/main_icon_search.svg" /></a>
        </p>
        <a className="flex place-items-center" href="/mypage">
          <img src="/profile_main.svg" alt="마이페이지 아이콘" width={24} height={24} />
        </a>
      </div>
    </header>
  )
}

export function MypageHeader() {
  return (
    <header className="fixed top-0 left-0 right-0
      flex-row flex justify-between w-full h-[60px] px-[24px] py-[10px] bg-p-white">
      <p className="flex relative place-items-center text-[18px]">
        마이페이지
      </p>
      <div className='flex flex-row gap-[10px]'>
        <a className="flex place-items-center" href="/">
          <img src="/X.svg" alt="창닫기" width={40} height={40} />
        </a>
      </div>
    </header>
  )
}

export function HeaderMyPage(props: { opt: string; isAlarm?: boolean }) {
  if (props.opt === "MY") {
    return (
      <div className="fixed top-0 left-0 right-0 flex flex-row justify-between place-items-center w-full h-[60px] px-[24px] py-[10px] bg-p-white z-30">
        <a href='/'><img src='/arrow_prev.svg' /></a>
        <div className='text-18'>마이페이지</div>
        <a href='/user/mypage/alarm' className='relative w-[24px] h-[24px]'>
          <AlarmIcn />
          {!props.isAlarm ? <></>
            : <div id='alarm-check' className="absolute top-0 right-[3px] w-[8px] h-[8px] bg-primary-blue rounded-full z-10"></div>
          }
        </a>
      </div>
    )
  } else if (props.opt === "USR") {
    return (
      <div className="fixed top-0 left-0 right-0 flex flex-row justify-between place-items-center w-full h-[60px] px-[24px] py-[10px] bg-p-white z-30">
        <a href='/'><img src='/arrow_prev.svg' /></a>
        <div className='text-18'>프로필</div>
        <div className='w-[24px] h-[24px]' />
      </div>
    )
  }
}

export default Header;