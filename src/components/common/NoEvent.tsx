'use client';
import { ThemeProvider, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { noUserDialogTheme } from '@/components/common/Themes'
import { useState } from 'react';

interface NoEventProps { text1: string; text2: string; buttonText: string; }
export function NoEvent(props: NoEventProps) {
  return (
    <div className='flex flex-col justify-center items-center gap-[32px] mt-[50px] mb-[317px]'>
      <div className='flex flex-col gap-[16px] justify-center items-center'>
        <div className='flex flex-col gap-[4px] justify-center items-center'>
          <span className='text-[16px] font-semibold leading-[140%] text-gray3'>{props.text1}</span>
          <span className='text-[16px] leading-[140%] text-gray2'>{props.text2}</span>
        </div>
        <a className='noevent-btn' href='/?sort=likeCount%2Cdesc'>{props.buttonText}</a>
      </div>
      <img className='w-[140px] h-[75px]' src='/no_event.svg' />
    </div>
  )
}

export function NoUser() {
  const [popopen, setPopopen] = useState(false);
  const handleOpen = (e: any) => { e.stopPropagation(); setPopopen(true) }
  const handleClose = (e: any) => { e.stopPropagation(); setPopopen(false) }
  return (
    <>
      <div className='flex flex-row items-center'>
        <img className='w-[24px] h-[24px]' src="/profile_ghost.svg" onClick={handleOpen} />
        <p className="text-[14px] ps-[8px] text-gray3">Ghost</p>
      </div>
      <ThemeProvider theme={noUserDialogTheme}>
        <Dialog onClose={handleClose} open={popopen} >
          <DialogTitle>
            <div className='w-[24px] h-[24px]' />
            <span>삭제된 유저입니다</span>
            <button onClick={handleClose}><img src='/popup_close.svg' /></button>
          </DialogTitle>
          <DialogContent>죄송합니다. 사용자를 찾을 수 없습니다.<br />삭제된 유저의 게시글은 확인할 수 있지만<br />사용자의 정보를 불러올 수 없습니다.</DialogContent>
          <DialogActions><Button onClick={handleClose} autoFocus>확인</Button></DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  )
} 