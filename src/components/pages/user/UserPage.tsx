import React from "react";
import Link from "next/link";
import { CalIcn, LikeIcn, PostEditIcn } from "@/components/common/styles/Icon";
import useLoginInfo from "@/hooks/useLoginInfo";
import { useUserInfo } from "@/hooks/useInUser";

export function MyPage() {
  const userinfo = useLoginInfo()
  return (
    <div className="pt-[60px]">
      <div className="flex flex-col mb-[11px]">
        <div className="flex flex-col gap-[8px]">
          <div className="flex flex-row px-[16px] py-[18px] gap-[16px] bg-p-white" id='mypage-profile'>
            <div className="relative w-[77px] h-[70px] rounded-full">
              <img src={userinfo?.data.imageURI ?? "/default_icon.svg"} className="w-[70px] h-[70px] rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-18 text-black">{userinfo?.data.nickname ?? '-'}</span>
              <span className="text-14 text-gray3">{userinfo?.data.email ?? '등록된 이메일이 없습니다.'}</span>
              <span className="text-14 text-gray3">{userinfo?.data.profileMessage ?? '바글이의 한마디를 적어주세요.'}</span>
            </div>
          </div>
          <div className="flex flex-col bg-p-white" id='mypage-set1'>
            <div className="p-[16px] text-14 font-semibold text-black">나의 바글바글</div>
            <SetBlock opt={0} icon={<LikeIcn color='#6C6C6C' />} title='좋아요' count={userinfo?.data.postLikeCount} url='/user/mypage/liked' />
            <SetBlock opt={0} icon={<PostEditIcn />} title='작성글' count={userinfo?.data.writingCount} url='/user/mypage/post' />
            <SetBlock opt={0} icon={<CalIcn val={false} color='#6C6C6C' />} title='캘린더' count={userinfo?.data.calendarCount} url='/user/mypage/calendar' />
          </div>
          <div className="flex flex-col bg-p-white" id='mypage-set2'>
            <div className="p-[16px] text-14 font-semibold text-black">계정 관리</div>
            <SetBlock opt={1} icon={<SmileIcn />} title='프로필 수정' url='/user/mypage/edit' />
          </div>
          <div className="flex flex-col bg-p-white" id='mypage-set3'>
            <div className="p-[16px] text-14 font-semibold text-black"> 이용 정보</div>
            <SetBlock opt={1} title='약관 및 정책' url='/' />
            <SetBlock opt={1} title='회원 탈퇴히기' url='/' />
          </div>
        </div>
        <div className="p-[24px]">
          <button className="w-full bg-p-white text-gray3 text-16 p-[16px]">로그아웃</button>
        </div>
      </div>
    </div>
  )
}

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

const SmileIcn = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.4041 2.47168C6.88406 2.47168 2.41406 6.95168 2.41406 12.4717C2.41406 17.9917 6.88406 22.4717 12.4041 22.4717C17.9341 22.4717 22.4141 17.9917 22.4141 12.4717C22.4141 6.95168 17.9341 2.47168 12.4041 2.47168ZM12.4141 20.4717C7.99406 20.4717 4.41406 16.8917 4.41406 12.4717C4.41406 8.05168 7.99406 4.47168 12.4141 4.47168C16.8341 4.47168 20.4141 8.05168 20.4141 12.4717C20.4141 16.8917 16.8341 20.4717 12.4141 20.4717ZM15.9141 11.4717C16.7441 11.4717 17.4141 10.8017 17.4141 9.97168C17.4141 9.14168 16.7441 8.47168 15.9141 8.47168C15.0841 8.47168 14.4141 9.14168 14.4141 9.97168C14.4141 10.8017 15.0841 11.4717 15.9141 11.4717ZM8.91406 11.4717C9.74406 11.4717 10.4141 10.8017 10.4141 9.97168C10.4141 9.14168 9.74406 8.47168 8.91406 8.47168C8.08406 8.47168 7.41406 9.14168 7.41406 9.97168C7.41406 10.8017 8.08406 11.4717 8.91406 11.4717ZM12.4141 17.9717C14.4441 17.9717 16.2141 16.8617 17.1641 15.2217C17.3541 14.8917 17.1141 14.4717 16.7241 14.4717H8.10406C7.72406 14.4717 7.47406 14.8917 7.66406 15.2217C8.61406 16.8617 10.3841 17.9717 12.4141 17.9717Z" fill="#6C6C6C" />
  </svg>
)

const MailIcn = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.6 6H18.4C19.28 6 20 6.72 20 7.6V17.2C20 18.08 19.28 18.8 18.4 18.8H5.6C4.72 18.8 4 18.08 4 17.2V7.6C4 6.72 4.72 6 5.6 6Z" stroke="#6C6C6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 7.59961L12 13.1996L4 7.59961" stroke="#6C6C6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)