"use client";
import { useEditProfile } from "@/hooks/useInUser";
import useLoginInfo from "@/hooks/useLoginInfo";
import { call } from "@/service/ApiService";
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
    mutateEditProfile.mutate({ "email": emailRef.current.value, "profileMessage": descRef.current.value, "imageResourceId": imageKey ?? null })
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
            <img src={profileImage ?? "/default_icon.svg"} className="w-[70px] h-[70px] rounded-full" />
            <ImageUploader setImage={setProfileImage} setImageKey={setImageKey} />
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

function ImageUploader(props: { setImage: any; setImageKey: any; }) {
  const handleImageUpload = (e: any) => {
    if (e.target.files.length === 0) return false;
    const file = e.target.files[0];
    if (!/^image\//.test(file.type)) {
      alert('이미지 형식의 파일만 선택 가능합니다.')
      return false;
    }
    const formData = new FormData();
    formData.append('imageFile', file)
    call('/api/upload/image', 'POST', formData, 'file')
      .then((response) => {
        if (response.errorCode === 'C00000') {
          props.setImage(response.data.url)
          props.setImageKey(response.data.resourceId)
        } else {
          alert('이미지 업로드를 실패했습니다. 다시 시도해주세요.')
        }
      })
  }
  return (
    <label className="upload-btn">
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="15" r="15" fill="#FCFCFC" />
        <path d="M23 19.6364C23 20.0221 22.8468 20.3921 22.574 20.6649C22.3012 20.9377 21.9312 21.0909 21.5455 21.0909H8.45455C8.06878 21.0909 7.69881 20.9377 7.42603 20.6649C7.15325 20.3921 7 20.0221 7 19.6364V11.6364C7 11.2506 7.15325 10.8806 7.42603 10.6078C7.69881 10.3351 8.06878 10.1818 8.45455 10.1818H11.3636L12.8182 8H17.1818L18.6364 10.1818H21.5455C21.9312 10.1818 22.3012 10.3351 22.574 10.6078C22.8468 10.8806 23 11.2506 23 11.6364V19.6364Z" fill="#6C6C6C" />
        <path d="M14.9989 18.1815C16.6056 18.1815 17.908 16.879 17.908 15.2724C17.908 13.6657 16.6056 12.3633 14.9989 12.3633C13.3923 12.3633 12.0898 13.6657 12.0898 15.2724C12.0898 16.879 13.3923 18.1815 14.9989 18.1815Z" stroke="#FCFCFC" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <input type='file' accept='image/*' onChange={(e) => handleImageUpload(e)} />
    </label>
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