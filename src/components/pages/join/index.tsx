"use client";
import { Button, IconButton, TextField, ThemeProvider } from '@mui/material';
import { FooterBtnTheme, joinTheme, JoinBtnTheme } from '@/components/common/Themes';
import { MutableRefObject, useRef, useState } from 'react';
import { call } from '@/service/ApiService';
import { useSearchParams, useRouter } from 'next/navigation';


const index = () => {
  const [nameChecked, setNameChecked] = useState<boolean>()
  const [emailChecked, setEmailChecked] = useState<boolean>()
  const [toP1, setToP1] = useState(false)
  const [toP2, setToP2] = useState(false)
  const btnActive = !toP2 ? !nameChecked : !(nameChecked && emailChecked)

  const searchParams = useSearchParams()
  const nameRef = useRef<any>(null)
  const emailRef = useRef<any>(null)

  console.log('toP1, toP2 :', toP1, toP2)
  const handlePrev = () => {
    if (toP2) {
      setToP1(true)
      setToP2(false)
    }
  }
  const handleNext = () => {
    if (!toP2 && nameChecked) {
      setToP1(false)
      setToP2(true)
    }
  }

  const router = useRouter();
  const handleJoin = (opt: number, e: any) => {
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
      <div className="fixed top-0 left-0 right-0 flex-row flex w-full h-[60px] justify-between px-[17.84px] py-[15.6px] bg-[#FFF]">
        <IconButton onClick={handlePrev} className='p-0' disableRipple><img src='/arrow_prev.svg' /></IconButton>
      </div>
      <div className='flex flex-col w-full mt-[60px]'>
        <div className='flex flex-col items-center pt-[41.42px] gap-[4px] pointer-events-none' id='join-head'>
          <div className='flex flex-row items-center gap-[4px]'>
            {/* <PartyEmoji /> */}
            <span role="img" aria-label="party-popper" className='text-[18px]'>🎉</span>
            <p className='text-[18px] font-semibold leading-[140%]'>바글이가 되신 것을 환영합니다!</p>
          </div>
          <p className='text-[14px] leading-[160%]'>곧 회원가입이 완료됩니다.</p>
        </div>
        <div className='w-full px-[28px] py-[39px] max-w-full overflow-hidden'>
          <div className={toP1 ? 'flex flex-col items-center slideInLeft animated' : toP2 ? 'slideOutLeft animated hidden' : 'flex flex-col items-center'}>
            <JoinBlock opt='nnm' nameChecked={nameChecked} setNameChecked={setNameChecked} nameRef={nameRef} />
          </div>
          <div className={toP1 ? 'slideOutRight animated hidden' : toP2 ? 'flex flex-col items-center slideInRight animated' : 'hidden'}>
            <JoinBlock opt='eml' emailChecked={emailChecked} setEmailChecked={setEmailChecked} emailRef={emailRef} />
          </div>
        </div>
        <JoinFooter opt={toP2 ? 'eml' : 'nnm'} handleNext={handleNext} handleJoin={handleJoin} btnActive={btnActive} />
      </div>
    </>
  )
}
export default index;

interface JoinBlockProps {
  opt: string; nameChecked?: boolean; setNameChecked?: any; nameRef?: MutableRefObject<any>;
  emailChecked?: boolean; setEmailChecked?: any; emailRef?: MutableRefObject<any>
}
function JoinBlock(props: JoinBlockProps) {
  const nameRegEx = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,12}$/
  const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const [usableName, setUsableName] = useState({ regex: false, unique: false })

  const handleNameCheck = () => {
    if (props.nameRef && props.nameRef.current !== null) {
      if (nameRegEx.test(props.nameRef.current.value)) {
        call(`/api/user/join/check-duplicate-username?username=${props.nameRef.current.value}`, "GET", null)
          .then((response) => {
            console.log(response.data);
            if (response.errorCode === 'C00000') {
              setUsableName({ regex: true, unique: !response.data.duplicate })
              props.setNameChecked(!response.data.duplicate);
            }
          })
      } else {
        setUsableName({ regex: false, unique: false })
        props.setNameChecked(false);
      }
    }
  }
  const handleEmailCheck = () => {
    if (props.emailRef && props.emailRef.current !== null) {
      if (emailRegEx.test(props.emailRef.current.value)) {
        props.setEmailChecked(true);
      } else { props.setEmailChecked(false); }
    } else { props.setEmailChecked(false); }
  }

  return (
    <div className='flex flex-col gap-[8px] max-w-[500px] w-full'>
      <p className='text-[18px] leading-[140%] font-semibold'>
        {props.opt === 'nnm' ? '닉네임을 기입해주세요.' : '이메일을 기입해주세요.'}
      </p>
      <p className='text-[12px] text-gray3'>
        {props.opt === 'nnm' ? '바글바글에서 사용할 닉네임을 지어주세요!' : '이메일로 필요한 정보 및 알림을 전달드려요!'}
      </p>
      <ThemeProvider theme={joinTheme}>
        {props.opt === 'nnm'
          ? <TextField variant="outlined" placeholder='bageul01' inputRef={props.nameRef} onChange={handleNameCheck} />
          : <TextField variant="outlined" inputRef={props.emailRef} type="email" placeholder='bageul01@naver.com' onChange={handleEmailCheck} />
        }
      </ThemeProvider>
      <CheckText opt={props.opt} usableName={usableName} nameChecked={props.nameChecked} emailChecked={props.emailChecked} />
    </div>
  )
}

function CheckText(props: { opt: string; usableName: { regex: boolean, unique: boolean }; nameChecked?: boolean; emailChecked?: boolean; }) {
  if (props.opt === 'nnm') {
    return (
      <>
        {props.nameChecked
          ? <p className='text-[12px] text-primary-blue'>사용가능한 아이디입니다.</p>
          : props.nameChecked === false
            ? <div className='text-[12px] text-[#FF0000]'>
              {props.usableName.regex && !props.usableName.unique
                ? <p>-이미 존재하는 닉네임입니다.</p> : <></>
              }
              {props.usableName.regex ? <></>
                : <>
                  <p>-닉네임은 2~12글자, 숫자를 입력해주세요.</p>
                  <p>-공백, 특수문자는 닉네임으로 사용할 수 없습니다.</p>
                </>
              }
            </div>
            : <></>
        }
      </>
    )
  } else if (props.opt === 'eml') {
    return (
      <>
        {props.emailChecked === false
          ? <p className='text-[12px] text-[#FF0000]'>유효한 이메일 주소를 작성해주세요.</p>
          : <></>
        }
      </>
    )
  }
}

function JoinFooter(props: { opt: string; handleNext: any; handleJoin: any; btnActive: boolean }) {
  return (
    props.opt === 'nnm'
      ? <ThemeProvider theme={FooterBtnTheme}>
        <Button onClick={props.handleNext} disabled={props.btnActive}>다음</Button>
      </ThemeProvider>
      : <div className='flex flex-row justify-center gap-[16px] px-[16px] py-[24px] fixed bottom-0 right-0 left-0'>
        <ThemeProvider theme={JoinBtnTheme}>
          <Button className='join-skip' onClick={(e) => { props.handleJoin(0, e) }}>건너뛰기</Button>
          <Button className='join-email' onClick={(e) => { props.handleJoin(1, e) }} disabled={props.btnActive}>회원가입 완료</Button>
        </ThemeProvider>
      </div>

  )
}

// const PartyEmoji = () => {
//   return (
//     <svg width="18" height="18" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
//       <rect width="72" height="72" fill="url(#pattern0_22_1734)" />
//       <defs>
//         <pattern id="pattern0_22_1734" patternContentUnits="objectBoundingBox" width="1" height="1">
//           <use xlinkHref="#image0_22_1734" transform="scale(0.0138889)" />
//         </pattern>
//         <image id="image0_22_1734" width="72" height="72" xlinkHref="data:image/png;base64,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" />
//       </defs>
//     </svg>
//   )
// }