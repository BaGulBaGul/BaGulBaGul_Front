"use client";
import useLoginInfo from "@/hooks/useLoginInfo";
import { MutableRefObject, useRef } from "react";

export function EditProfilePage() {
  const userinfo = useLoginInfo()

  const nameRef = useRef<any>(null)
  const emailRef = useRef<any>(null)
  const descRef = useRef<any>(null)

  const handleDeleteProfilePic = () => {
    alert('이미지 삭제')
  }
  const handleDeleteAccount = () => {
    alert('탈퇴하기')
  }
  const handleDoneEditing = () => {
    alert('수정 완료')
  }

  return (
    <>
      <div className='flex flex-col w-full mt-[60px] mb-[77px] bg-p-white'>
        <div className='flex flex-col w-full items-center py-[18px] gap-[8px]' id='edit-profile-pic'>
          <div className="relative w-[77px] h-[70px] rounded-full">
            <img src={userinfo?.imageURI ?? "/default_icon.svg"} className="w-[70px] h-[70px] rounded-full" />
            <IconChangeButton />
          </div>
          <div className="text-12 text-gray3 cursor-pointer" onClick={handleDeleteProfilePic}>이미지 삭제</div>
        </div>
        <EditBlock title='닉네임' placeholder="바글바글에서 사용할 닉네임을 입력해주세요" ref={nameRef} />
        <EditBlock title='이메일' placeholder="bageul01@naver.com" ref={emailRef} />
        <EditBlock title='1줄 소개' placeholder="바글이의 한마디를 적어주세요.(최대 50자)" ref={descRef} />
        <div className="px-[16px] pt-[10px] pb-[20px] text-12 text-gray3">
          <button className="flex flex-row items-center" onClick={handleDeleteAccount}>
            <p>탈퇴하기</p><ArrowIcn />
          </button>
        </div>
      </div>
      <button className="footer-btn" onClick={handleDoneEditing}>완료</button>
    </>
  )
}

function IconChangeButton() {
  return (
    <button className="absolute right-0 bottom-0 w-[30px] h-[30px] z-10">
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="15" r="15" fill="#FCFCFC" />
        <path d="M23 19.6364C23 20.0221 22.8468 20.3921 22.574 20.6649C22.3012 20.9377 21.9312 21.0909 21.5455 21.0909H8.45455C8.06878 21.0909 7.69881 20.9377 7.42603 20.6649C7.15325 20.3921 7 20.0221 7 19.6364V11.6364C7 11.2506 7.15325 10.8806 7.42603 10.6078C7.69881 10.3351 8.06878 10.1818 8.45455 10.1818H11.3636L12.8182 8H17.1818L18.6364 10.1818H21.5455C21.9312 10.1818 22.3012 10.3351 22.574 10.6078C22.8468 10.8806 23 11.2506 23 11.6364V19.6364Z" fill="#6C6C6C" />
        <path d="M14.9989 18.1815C16.6056 18.1815 17.908 16.879 17.908 15.2724C17.908 13.6657 16.6056 12.3633 14.9989 12.3633C13.3923 12.3633 12.0898 13.6657 12.0898 15.2724C12.0898 16.879 13.3923 18.1815 14.9989 18.1815Z" stroke="#FCFCFC" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
};

function EditBlock(props: { title: string; placeholder: string; ref: MutableRefObject<any>; defautValue?: string; }) {
  return (
    <div className="flex flex-col p-[16px] gap-[8px] w-full text-14 text-black">
      <p>{props.title}</p>
      <input className='join-input' ref={props.ref} placeholder={props.placeholder} />
    </div>
  )
}

function ArrowIcn() {
  return (
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M7.05469 14.6822L7.94863 15.5762L12.9486 10.5762L7.94863 5.57617L7.05469 6.47011L11.1607 10.5762L7.05469 14.6822H7.05469Z" fill="#6C6C6C" />
    </svg>
  )
}