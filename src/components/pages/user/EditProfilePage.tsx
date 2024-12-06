"use client";
import { ImageUploader } from "@/components/common/input/ImageUploader";
import { useEditProfile } from "@/hooks/useInUser";
import useLoginInfo from "@/hooks/useLoginInfo";
import { MutableRefObject, useRef, useState } from "react";

export function EditProfilePage() {
  let userinfo = useLoginInfo()
  let userdata = userinfo.data

  const nameRef = useRef<any>(null)
  const emailRef = useRef<any>(null)
  const descRef = useRef<any>(null)

  const [profileImage, setProfileImage] = useState(userdata?.imageURI)
  const [imageKey, setImageKey] = useState<Number | undefined>(undefined)

  const handleDeleteProfilePic = () => {
    setProfileImage(undefined)
    setImageKey(undefined)
  }
  const mutateEditProfile = useEditProfile();
  const handleDoneEditing = () => {
    console.log(profileImage, imageKey)
    let body: any = { "email": emailRef.current.value, "profileMessage": descRef.current.value }
    if (!(!!profileImage && imageKey === undefined)) { body.imageResourceId = imageKey ?? null }
    else if (userdata.nickname !== nameRef.current.value) { body.username = nameRef.current.value }
    console.log(body)
    mutateEditProfile.mutate(body)

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
        <EditBlock title='닉네임' placeholder="바글바글에서 사용할 닉네임을 입력해주세요" defaultValue={userdata.nickname ?? undefined} innerRef={nameRef} />
        <EditBlock title='이메일' placeholder="bageul01@naver.com" defaultValue={userdata.email ?? undefined} innerRef={emailRef} />
        <EditBlock title='1줄 소개' placeholder="바글이의 한마디를 적어주세요.(최대 50자)" defaultValue={userdata.profileMessage ?? undefined} innerRef={descRef} />
      </div>
      <button className="footer-btn" onClick={handleDoneEditing}>완료</button>
    </>
  )
}

function EditBlock(props: { title: string; placeholder: string; innerRef: MutableRefObject<any>; defaultValue?: string; }) {
  return (
    <div className="flex flex-col p-[16px] gap-[8px] w-full text-14 text-black">
      <p>{props.title}</p>
      <input className='join-input' ref={props.innerRef} placeholder={props.placeholder} defaultValue={props.defaultValue} />
    </div>
  )
}