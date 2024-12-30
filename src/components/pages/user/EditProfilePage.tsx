"use client";
import { ImageUploader } from "@/components/common/input/ImageUploader";
import { InfoInput } from "@/components/common/input/InfoInput";
import { useEditProfile } from "@/hooks/useInUser";
import useLoginInfo from "@/hooks/useLoginInfo";
import { useEffect, useRef, useState } from "react";

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
            <ImageUploader setImage={setProfileImage} setImageKey={setImageKey} multiple={false} />
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
      <button className="footer-btn" onClick={handleDoneEditing}>완료</button>
    </>
  )
}