"use client";
import { useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { call } from '@/service/ApiService';
import { JoinFooter } from '@/components/pages/join'
import { HeaderBackIcn } from '@/components/common/styles/Icon';
import { InfoInput } from '@/components/common/input/InfoInput';

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [nameChecked, setNameChecked] = useState<boolean>()
  const [emailChecked, setEmailChecked] = useState<boolean>()
  const [toP1, setToP1] = useState(false)
  const [toP2, setToP2] = useState(false)
  const btnActive = !toP2 ? !nameChecked : !(nameChecked && emailChecked)

  const nameRef = useRef<any>(null)
  const emailRef = useRef<any>(null)

  console.log('toP1, toP2 :', toP1, toP2)
  const handlePrev = () => {
    if (toP2) { setToP1(true); setToP2(false); }
    else { router.replace('/signin') }
  }
  const handleNext = () => {
    if (!toP2 && nameChecked) { setToP1(false); setToP2(true); }
  }

  const handleJoin = (opt: 0 | 1, e: any) => {
    if (toP2 && nameChecked && searchParams.get('join_token') !== null) {
      if (opt === 0) {
        call('/api/user/join/social', "POST", { "joinToken": searchParams.get('join_token'), "nickname": nameRef.current.value })
          .then((response) => {
            if (response.errorCode === 'C00000') {
              alert('회원가입이 완료되었습니다.')
              router.replace('/')
            } else {
              alert('잘못된 접근 또는 인증토큰이 만료되었습니다. 다시 시도해주세요.')
              router.replace('/')
            }
          })
      } else if (opt === 1 && emailChecked) {
        call('/api/user/join/social', "POST", { "email": emailRef.current.value, "joinToken": searchParams.get('join_token'), "nickname": nameRef.current.value })
          .then((response) => {
            if (response.errorCode === 'C00000') {
              alert('회원가입이 완료되었습니다.')
              router.replace('/')
            } else {
              alert('잘못된 접근 또는 인증토큰이 만료되었습니다. 다시 시도해주세요.')
              router.replace('/')
            }
          })
      }
    } else if (searchParams.get('join_token') === null) {
      alert('잘못된 접근입니다. 다시 시도해주세요.')
      router.replace('/')
    }
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 flex flex-row w-full justify-between h-[60px] px-[17px] py-[15.5px] bg-p-white">
        <button onClick={handlePrev}><HeaderBackIcn /></button>
      </header>
      <div className='flex flex-col w-full mt-[60px]'>
        <div className='flex flex-col items-center pt-[41.42px] gap-[4px] pointer-events-none' id='join-head'>
          <div className='flex flex-row items-center gap-[4px] text-18'>
            {/* <PartyEmoji /> */}
            <span role="img" aria-label="party-popper">🎉</span>
            <p className='font-semibold'>바글이가 되신 것을 환영합니다!</p>
          </div>
          <p className='text-14'>곧 회원가입이 완료됩니다.</p>
        </div>
        <div className='w-full max-w-full px-[28px] py-[39px] overflow-hidden'>
          <div className={toP1 ? 'flex flex-col items-center slideInLeft animated' : toP2 ? 'slideOutLeft animated hidden' : 'flex flex-col items-center'}>
            <div className='flex flex-col gap-[8px] w-full max-w-[500px]'>
              <p className='text-18 font-semibold'>닉네임을 기입해주세요.</p>
              <p className='text-[12px] text-gray3'>바글바글에서 사용할 닉네임을 지어주세요!</p>
              <InfoInput opt='nnm' placeholder='bageul01' innerRef={nameRef} checked={nameChecked} setChecked={setNameChecked} />
            </div>
          </div>
          <div className={toP1 ? 'slideOutRight animated hidden' : toP2 ? 'flex flex-col items-center slideInRight animated' : 'hidden'}>
            <div className='flex flex-col gap-[8px] w-full max-w-[500px]'>
              <p className='text-18 font-semibold'>이메일을 기입해주세요.</p>
              <p className='text-[12px] text-gray3'>이메일로 필요한 정보 및 알림을 전달드려요!</p>
              <InfoInput opt='eml' placeholder='bageul01@naver.com' innerRef={emailRef} checked={emailChecked} setChecked={setEmailChecked} />
            </div>
          </div>
        </div>
        <JoinFooter opt={toP2 ? 'eml' : 'nnm'} handleNext={handleNext} handleJoin={handleJoin} btnActive={btnActive} />
      </div>
    </>
  );
}