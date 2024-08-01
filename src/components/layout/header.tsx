import React, { useState, useEffect } from 'react'
import { call } from '@/service/ApiService';
// import { isSigned } from '@/service/ApiService';

function Header(props: { opt?: string }) {
  // opt 'NF' -> non fixed
  const [profileURL, setProfileURL] = useState('')
  useEffect(() => {
    call('/api/user/info', "GET", null)
      .then((response) => {
        if (response.errorCode === 'C00000') {
          if (setProfileURL) { setProfileURL(response.data.imageURI) }
        }
      }).catch((error) => { return null });
  }, [])

  return (
    <header className={`${props.opt && props.opt === 'NF' ? '' : 'fixed top-0 left-0 right-0 '}flex flex-row justify-between w-full px-[16px] py-[10px] bg-p-white
      lg:px-[360px] lg:pt-[58px] z-30`}>
      <p className="flex w-[120.77px] relative">
        <a href="/"><img src="/logo_s.svg" width='120.77' /></a>
      </p>
      <div className='flex flex-row gap-[10px]'>
        <p className="flex w-6 h-6 relative">
          <a href="/search"><img src="/main_icon_search.svg" /></a>
        </p>
        <a className="flex place-items-center" href="/user/mypage">
          {/* <img className='w-[24px] h-[24px] rounded-full' src={profileURL && profileURL.length > 0 ? profileURL : "/profile_main.svg"} alt="마이페이지 아이콘" /> */}
          <img className='w-[24px] h-[24px] rounded-full' src={profileURL && profileURL.length > 0 ? '/images/profile_pic.png' : "/profile_main.svg"} alt="마이페이지 아이콘" />
        </a>
      </div>
    </header>
    // </div>
  )
}
export default Header;