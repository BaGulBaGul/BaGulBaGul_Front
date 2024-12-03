import React from "react";
import { useUserInfo } from "@/hooks/useInUser";
import { UserPostPage } from "./UserPostPage";

export function UserPage(props: { userId: number }) {
  const { data: userinfo, isLoading, isError } = useUserInfo(props.userId)
  return (
    <div className="flex flex-col pt-[60px] gap-[8px]">
      <div className="flex flex-row px-[16px] py-[18px] gap-[16px] bg-p-white" id='userpage-profile'>
        <div className="relative w-[77px] h-[70px] rounded-full">
          <img src={userinfo?.imageURI ?? "/default_icon.svg"} className="w-[70px] h-[70px] rounded-full object-cover" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-18 text-black">{userinfo?.nickname}</span>
          <span className="text-14 text-gray3">{userinfo?.email}</span>
          <span className="text-14 text-gray3">{userinfo?.profileMessage ?? '-'}</span>
        </div>
      </div>
      <UserPostPage userId={props.userId} />
    </div>
  )
}