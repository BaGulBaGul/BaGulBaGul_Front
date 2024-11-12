import React from "react";
import Link from "next/link";
import { PostEditIcn } from "@/components/common/styles/Icon";
import { useUserInfo } from "@/hooks/useInUser";

export function UserPage(props: { userId: number }) {
  const { data: userinfo, isLoading, isError } = useUserInfo(props.userId)
  return (
    <div className="pt-[60px]">
      <div className="flex flex-col mb-[11px]">
        <div className="flex flex-col gap-[8px]">
          <div className="flex flex-row px-[16px] py-[18px] gap-[16px] bg-p-white" id='userpage-profile'>
            <div className="relative w-[77px] h-[70px] rounded-full">
              <img src={userinfo?.imageURI ?? "/default_icon.svg"} className="w-[70px] h-[70px] rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-18 text-black">{userinfo?.nickname}</span>
              <span className="text-14 text-gray3">{userinfo?.email}</span>
              <span className="text-14 text-gray3">{userinfo?.profileMessage ?? '-'}</span>
            </div>
          </div>
          <div className="flex flex-col bg-p-white" id='userpage-set1'>
            <div className="p-[16px] text-14 font-semibold text-black">바글이의 정보</div>
            {/* <SetBlock opt={1} icon={<LikeIcn color='#6C6C6C' />} title='좋아요' count={12} url={`/user/${props.userId}/liked`} /> */}
            <SetBlock opt={0} icon={<PostEditIcn />} title='작성글' count={userinfo?.writingCount} url={`/user/${props.userId}/post`} />
          </div>
        </div>
      </div>
    </div>
  )
}

function SetBlock(props: { opt: 0 | 1; icon?: any; title: string; count?: number; url: string; }) {
  return (
    <Link href={props.url}
      className="flex flex-row justify-between p-[16px] text-14 text-black">
      <div className="flex flex-row items-center gap-[8px]">
        {props.icon ? <div className="w-[24px] h-[24px]">{props.icon}</div> : <></>}
        <span>{props.title}</span>
      </div>
      <div className="flex flex-row items-center gap-[8px]">
        {props.opt === 1 ? <></> : <span>{props.count || props.count === 0 ? props.count : '-'}개</span>}
        <img src='/arrow_next.svg' className="p-[4px] w-[24px] h-[24px]" />
      </div>
    </Link>
  )
}