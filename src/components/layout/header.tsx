import React, { useState } from 'react'

import { IconButton } from '@mui/material';
import { AlarmIcn } from '../common/Icon';
// import { isSigned } from '@/service/ApiService';

async function Header() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0
      flex-row flex w-full justify-between px-[24px] pt-[10px] lg:pt-[58px] pb-[10px] bg-[#FFF]
      lg:px-[360px]">
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
    </>
  )
}

export function HeaderNonMain() {
  return (
    <header className="fixed top-0 left-0 right-0
      flex-row flex w-full justify-between px-[24px] py-[10px] bg-[#FFFFFF] z-10">
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

export function HeaderNotFixed() {
  return (
    <header className="flex-row flex w-full justify-between px-[24px] py-[10px] bg-[#FFFFFF] z-10">
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
      flex-row flex w-full h-[60px] justify-between px-[24px] py-[10px] bg-[#FFFFFF]">
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
      <div className="fixed z-30 top-0 left-0 right-0 flex-row flex w-full h-[60px] justify-between px-[24px] py-[10px] place-items-center bg-[#FFFFFF]">
        <a href='/'><img src='/arrow_prev.svg' /></a>
        <div className='text-[18px]'>마이페이지</div>
        <a href='/alarm' className='relative w-[24px] h-[24px]'>
          <AlarmIcn />
          {!props.isAlarm ? <></>
            : <div id='alarm-check' className="absolute w-[8px] h-[8px] bg-primary-blue rounded-full z-10 top-0 right-[3px]"></div>
          }
        </a>
      </div>
    )
  } else if (props.opt === "USR") {
    return (
      <div className="fixed z-30 top-0 left-0 right-0 flex-row flex w-full h-[60px] justify-between px-[24px] py-[10px] place-items-center bg-[#FFFFFF]">
        <a href='/'><img src='/arrow_prev.svg' /></a>
        <div className='text-[18px]'>프로필</div>
        <div className='w-[24px] h-[24px]' />
      </div>
    )
  }
}

export default Header;