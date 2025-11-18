"use client";
import { call } from "@/service/ApiService";
import { MutableRefObject, useState } from "react";

interface InfoInputProps {
  opt: 'nnm' | 'eml'; placeholder: string; innerRef: MutableRefObject<any>; defaultValue?: string;
  checked?: boolean; handleChecked?: (t: boolean | undefined) => void;
}

export function InfoInput(props: InfoInputProps) {
  const nameRegEx = /^(?=.*[A-z0-9가-힣])[A-z0-9가-힣]{2,12}$/
  const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const [usableName, setUsableName] = useState({ regex: false, unique: false })
  const handleNameCheck = () => {
    if (props.innerRef && props.innerRef.current !== null && !!props.handleChecked) {
      if (!!props.defaultValue && props.innerRef.current.value === props.defaultValue) {
        setUsableName({ regex: true, unique: true })
        props.handleChecked(undefined);
      }
      else if (nameRegEx.test(props.innerRef.current.value)) {
        call(`/api/user/join/check-duplicate-username?username=${props.innerRef.current.value}`, "GET", null)
          .then((response) => {
            if (response.errorCode === 'C00000' && !!props.handleChecked) {
              setUsableName({ regex: true, unique: !response.data.duplicate })
              props.handleChecked(!response.data.duplicate);
            }
          })
      } else {
        setUsableName({ regex: false, unique: false })
        props.handleChecked(false);
      }
    }
  }
  const handleEmailCheck = () => {
    if (!!props.handleChecked) {
      if (props.innerRef && props.innerRef.current !== null) {
        if (emailRegEx.test(props.innerRef.current.value)) {
          props.handleChecked(true);
        } else { props.handleChecked(false); }
      } else { props.handleChecked(false); }
    }
  }

  return (
    <div className="flex flex-col gap-[8px] w-full">
      <input className='join-input' ref={props.innerRef} placeholder={props.placeholder} defaultValue={props.defaultValue}
        onChange={props.opt === 'nnm' ? handleNameCheck : handleEmailCheck} />
      <CheckText usableName={props.opt === 'nnm' ? usableName : undefined} checked={props.checked} />
    </div>
  )
}

function CheckText(props: { usableName?: { regex: boolean, unique: boolean }; checked?: boolean; }) {
  if (props.usableName !== undefined) {
    return (
      <>{!!props.checked
        ? <p className='text-[12px] text-primary-blue'>사용가능한 아이디입니다.</p>
        : props.checked === undefined ? <></>
          : <div className='text-[12px] text-[#FF0000]'>
            {!!props.usableName.regex && !props.usableName.unique ? <p>이미 존재하는 닉네임입니다.</p> : <></>}
            {!!props.usableName.regex ? <></>
              : <>
                <p>닉네임은 한글/영어 2~12글자, 숫자를 입력해주세요.</p>
                <p>공백, 특수문자는 닉네임으로 사용할 수 없습니다.</p>
              </>
            }
          </div>
      }</>
    )
  } else {
    return (<>{props.checked === false ? <p className='text-[12px] text-[#FF0000]'>유효한 이메일 주소를 작성해주세요.</p> : <></>}</>)
  }
}