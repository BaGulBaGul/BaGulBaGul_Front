"use client";
import { useEffect, useRef, useState } from "react";
import { useEditProfile } from "@/hooks/useInUser";
import useLoginInfo from "@/hooks/useLoginInfo";
import { ImageUploader, InfoInput } from "@/components/common/input";
import { FooterButton } from "@/components/common";

export function EditProfilePage() {
  let userinfo = useLoginInfo()
  let userdata = userinfo.data

  const initRef = useRef(false)
  const nameRef = useRef<any>(null)
  const emailRef = useRef<any>(null)
  const descRef = useRef<any>(null)
  const [profileImage, setProfileImage] = useState()
  useEffect(() => {
    if (!initRef.current && !userinfo.isLoading) { setProfileImage(userdata.imageURI); initRef.current = true; }
  }, [userinfo.isLoading])

  const [imageKey, setImageKey] = useState<Number | undefined>(undefined)
  const handleDeleteProfilePic = () => {
    setProfileImage(undefined)
    setImageKey(undefined)
  }
  const [nameChecked, setNameChecked] = useState<boolean>()
  const [emailChecked, setEmailChecked] = useState<boolean>()

  const mutateEditProfile = useEditProfile();
  const handleDoneEditing = () => {
    console.log(profileImage, imageKey)
    if (nameChecked === false) { alert('사용가능한 닉네임을 입력해주세요!') }
    else if (emailChecked === false) { alert('유효한 이메일 주소를 입력해주세요!') }
    else {
      let body: any = { "email": emailRef.current.value, "profileMessage": descRef.current.value }
      if (!(!!profileImage && imageKey === undefined)) { body.imageResourceId = imageKey ?? null }
      else if (userdata.nickname !== nameRef.current.value) { body.username = nameRef.current.value }
      console.log(body)
      mutateEditProfile.mutate(body)
    }
  }
  if (userinfo.isLoading) {
    return (
      <> </>
    )
  }
  return (
    <>
      <div className='flex flex-col w-full mt-[60px] mb-[77px] bg-p-white'>
        <div className='flex flex-col w-full items-center py-[18px] gap-[8px]' id='edit-profile-pic'>
          <div className="relative w-[77px] h-[70px] rounded-full">
            <img src={profileImage ?? "/default_icon.svg"} className="w-[70px] h-[70px] rounded-full object-cover" />
            <ImageUploader setImage={setProfileImage} setImageKey={setImageKey} multiple={false} uploadBtn={<ProfileImgUploadBtn />} />
          </div>
          <div className="text-12 text-gray3 cursor-pointer" onClick={handleDeleteProfilePic}>이미지 삭제</div>
        </div>
        <div className="flex flex-col p-[16px] gap-[8px] w-full text-14 text-black">
          <p>닉네임</p>
          <InfoInput opt='nnm' placeholder='바글바글에서 사용할 닉네임을 입력해주세요' innerRef={nameRef} defaultValue={userdata.nickname ?? undefined} checked={nameChecked} setChecked={setNameChecked} />
        </div>
        <div className="flex flex-col pt-[10px] p-[16px] gap-[8px] w-full text-14 text-black">
          <p>이메일</p>
          <InfoInput opt='eml' placeholder='bageul01@naver.com' innerRef={emailRef} defaultValue={userdata.email ?? undefined} checked={emailChecked} setChecked={setEmailChecked} />
        </div>
        <div className="flex flex-col pt-[10px] p-[16px] gap-[8px] w-full text-14 text-black">
          <p>1줄 소개</p>
          <input className='join-input' ref={descRef} placeholder='바글이의 한마디를 적어주세요.(최대 50자)' defaultValue={userdata.profileMessage ?? undefined} />
        </div>
      </div>
      <FooterButton text='완료' handleClick={handleDoneEditing} />
    </>
  )
}

const ProfileImgUploadBtn = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="15" cy="15" r="15" fill="#FCFCFC" />
    <path d="M23 19.6364C23 20.0221 22.8468 20.3921 22.574 20.6649C22.3012 20.9377 21.9312 21.0909 21.5455 21.0909H8.45455C8.06878 21.0909 7.69881 20.9377 7.42603 20.6649C7.15325 20.3921 7 20.0221 7 19.6364V11.6364C7 11.2506 7.15325 10.8806 7.42603 10.6078C7.69881 10.3351 8.06878 10.1818 8.45455 10.1818H11.3636L12.8182 8H17.1818L18.6364 10.1818H21.5455C21.9312 10.1818 22.3012 10.3351 22.574 10.6078C22.8468 10.8806 23 11.2506 23 11.6364V19.6364Z" fill="#6C6C6C" />
    <path d="M14.9989 18.1815C16.6056 18.1815 17.908 16.879 17.908 15.2724C17.908 13.6657 16.6056 12.3633 14.9989 12.3633C13.3923 12.3633 12.0898 13.6657 12.0898 15.2724C12.0898 16.879 13.3923 18.1815 14.9989 18.1815Z" stroke="#FCFCFC" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)