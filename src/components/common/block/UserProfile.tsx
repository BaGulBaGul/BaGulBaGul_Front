'use client';
import Link from "next/link";
import { Dialog } from "@base-ui-components/react";
import { DialogPopup, DialogPopupBody } from "..";

export function UserProfile(props: { userId?: number; userName?: string; userProfileImageUrl?: string; color?: string; gap?: string }) {
  const blockstyle = `flex flex-row items-center gap-[${props.gap ?? '4px'}]`
  const textstyle = `text-14 text-${props.color ?? 'black'}`
  return (
    <>
      {!!props.userId
        ? <Link onClick={(e) => { e.stopPropagation(); }} href={`/user/${props.userId}`} className={blockstyle}>
          <img className='rounded-full w-[24px] h-[24px] object-cover' src={props.userProfileImageUrl ?? '/profile_main.svg'} />
          <p className={textstyle}>{props.userName ?? '-'}</p>
        </Link>
        : <NoUser />
      }
    </>
  )
}

function NoUser() {
  const NoUserProfile = () => (
    <Dialog.Trigger >
      <div className='flex flex-row items-center'>
        <img className='w-[24px] h-[24px]' src="/profile_ghost.svg" />
        <p className="text-14 ps-[4px] text-gray3">Ghost</p>
      </div>
    </Dialog.Trigger>
  )

  return (
    <DialogPopup headText="삭제된 유저입니다" trigger={<NoUserProfile />}>
      <DialogPopupBody closeText="확인">
        <p>죄송합니다. 사용자를 찾을 수 없습니다.</p>
        <p>삭제된 유저의 게시글은 확인할 수 있지만</p>
        <p>사용자의 정보를 불러올 수 없습니다.</p>
      </DialogPopupBody>
    </DialogPopup>
  )
}