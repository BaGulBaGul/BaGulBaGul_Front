'use client';
import Link from "next/link";
import { useState } from "react";
import { ThemeProvider, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { dialogTheme } from "../styles/Themes";

export function UserProfile(props: { userId?: number; userName?: string; userProfileImageUrl?: string; color?: string; gap?: string }) {
  const blockstyle = `flex flex-row items-center gap-[${props.gap ?? '4px'}]`
  const textstyle = `text-14 text-${props.color ?? 'black'}`
  return (
    <>
      {!!props.userId
        ? <Link onClick={(e) => { e.stopPropagation(); }} href={`/user/${props.userId}`} className={blockstyle}>
          <img className='rounded-full w-[24px] h-[24px]' src={props.userProfileImageUrl ?? '/profile_main.svg'} />
          <p className={textstyle}>{props.userName ?? '-'}</p>
        </Link>
        : <NoUser />
      }
    </>
  )
}

function NoUser() {
  const [popopen, setPopopen] = useState(false);
  const handleOpen = (e: any) => { e.stopPropagation(); setPopopen(true) }
  const handleClose = (e: any) => { e.stopPropagation(); setPopopen(false) }
  return (
    <>
      <div className='flex flex-row items-center'>
        <img className='w-[24px] h-[24px]' src="/profile_ghost.svg" onClick={handleOpen} />
        <p className="text-14 ps-[4px] text-gray3">Ghost</p>
      </div>
      <ThemeProvider theme={dialogTheme}>
        <Dialog onClose={handleClose} open={popopen} >
          <DialogTitle>삭제된 유저입니다</DialogTitle>
          <DialogContent>죄송합니다. 사용자를 찾을 수 없습니다.<br />삭제된 유저의 게시글은 확인할 수 있지만<br />사용자의 정보를 불러올 수 없습니다.</DialogContent>
          <DialogActions><button onClick={handleClose} autoFocus>확인</button></DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  )
}