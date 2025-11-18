"use client";
import { useRef, useState } from "react";
import { DialogFull, DialogHeader } from "@/components/common";
import { ImageUploader, InfoInput } from "@/components/common/input";
import { IconCameraProfile } from "@/components/common/styles/Icon";
import { useAddOrganizer } from "@/hooks/useInAdmin";

export function OrganizerProfileDialog({ open, toggleOpen }: { open: boolean; toggleOpen: (open: boolean) => void; }) {
  const [profileImage, setProfileImage] = useState()
  const nameRef = useRef<any>(null)
  const emailRef = useRef<any>(null)
  const [emailChecked, setEmailChecked] = useState<boolean>()

  const [imageKey, setImageKey] = useState<Number | undefined>(undefined)
  const handleDeleteProfilePic = () => {
    setProfileImage(undefined)
    setImageKey(undefined)
  }

  const mutateAddOrganizer = useAddOrganizer(() => toggleOpen(false))
  const handleDoneEditing = () => {
    if (!nameRef.current.value) { alert('주최자의 소속명을 반드시 입력해주세요!') }
    if (emailChecked === false) { alert('유효한 이메일 주소를 입력해주세요!') }
    else {
      let body = { "email": emailRef.current.value, "nickname": nameRef.current.value ?? null }
      mutateAddOrganizer.mutate(body)
    }
  }
  return (
    <DialogFull open={open} footerText='완료' handleFooter={handleDoneEditing} handleDialogChange={() => { toggleOpen(false); }}>
      <DialogHeader headerText='주최자 프로필' />
      <div className='flex flex-col mt-[60px]'>
        <div className='flex flex-col w-full items-center py-[18px] gap-[8px]' id='edit-profile-pic'>
          <div className="relative w-[70px] h-[70px] rounded-full">
            <img src={profileImage ?? "/default_icon.svg"} className="w-[70px] h-[70px] rounded-full object-cover" />
            <ImageUploader setImage={setProfileImage} setImageKey={setImageKey} multiple={false} uploadBtn={<IconCameraProfile />} />
          </div>
          <div className="text-12 text-gray3 cursor-pointer" onClick={handleDeleteProfilePic}>이미지 삭제</div>
        </div>
        <div className="flex flex-col p-[16px] gap-[8px] w-full text-14 text-black">
          <p>소속명</p>
          {/* <InfoInput opt='nnm' placeholder='bageul01' innerRef={nameRef} defaultValue={undefined} /> */}
          <input className='join-input' ref={nameRef} placeholder='bageul01' defaultValue={undefined} />
        </div>
        <div className="flex flex-col pt-[10px] p-[16px] gap-[8px] w-full text-14 text-black">
          <p>이메일</p>
          <InfoInput opt='eml' placeholder='bageul01@naver.com' innerRef={emailRef} defaultValue={undefined}
            checked={emailChecked} handleChecked={(t: boolean | undefined) => setEmailChecked(t)} />
        </div>
      </div>
    </DialogFull>
  )
}