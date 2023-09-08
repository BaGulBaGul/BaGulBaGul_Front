"use client";
import React, { useState } from "react";
import { accompanyData } from '@/components/common/Data'
import { ViewButton, ViewSelect } from "@/components/common/ViewFilter";
import { ThemeProvider, Divider, FormControl, FormControlLabel, Checkbox, Chip, Backdrop } from '@mui/material';
import { doneChipTheme, viewCheckTheme } from '@/components/common/Themes'
import HashtagAccordion from '@/components/common/HashtagAccordion';

const index = () => {
  const [view, setView] = useState(false);

  const [sort, setSort] = useState('createdAt,desc');

  const [open, setOpen] = useState(false);
  const handleOpen = () => { setOpen(true) }
  const handleClose = () => { setOpen(false) }

  return (
    <>
      <div className="relative z-20">
        <Header />
      </div>
      <ViewsCheck />
      <Backdrop open={open} onClick={handleClose} className='z-50'>
          <ViewSelect sort={sort} setSort={setSort} handleClose={handleClose} />
      </Backdrop>
      <div className='flex flex-col w-full pt-[104px] pb-[44px]'>
        {
          accompanyData.map((post, idx) => {
            if (view) {
              return (
                !post.done
                  ? <>
                    {idx === 0 ? <></> : <Divider />}
                    <AccompanyBlock name={post.name} date={post.date} username={post.username} done={post.done} tags={post.tags} key={`accompany-${idx}`} />
                  </>
                  : <></>
              )
            } else {
              return (
                <>
                  {idx === 0 ? <></> : <Divider />}
                  <AccompanyBlock name={post.name} date={post.date} username={post.username} done={post.done} tags={post.tags} key={`accompany-${idx}`} />
                </>
              )
            }
          }
          )}
      </div>
    </>
  )

  function Header() {
    return (
      <div className="fixed top-[44px] left-0 right-0 flex-row flex w-full h-[60px] justify-between px-[17px] place-items-center bg-[#FFFFFF]">
        <a href={'/'} className="me-[46px]"><img src='/arrow_prev.svg' /></a>
        <div className='text-[18px]'>모집글</div>
        {/* <div className='w-[24px]'></div> */}
        <ViewButton sort={sort} handleOpen={handleOpen} />
      </div>
    )
  }

  function ViewsCheck() {
    const handleView = (e: React.ChangeEvent<HTMLInputElement>) => {
      setView(e.target.checked);
    }
    return (
      <div className='sticky top-[104px] bg-[#FFF] relative z-10'>
        <div className='flex flex-row justify-end gap-[8px] px-[16px] pb-[10px]'>
          <ThemeProvider theme={viewCheckTheme}>
            <FormControl>
              <FormControlLabel control={<Checkbox checked={view} value='festival' onChange={handleView} />} label="모집 중만 보기" />
            </FormControl>
          </ThemeProvider>
        </div>
      </div>
    )
  }

  interface AccompanyProps { name: string; date: string; username: string; done: Boolean; tags?: string[]; }
  function AccompanyBlock(props: AccompanyProps) {
    return (
      <div className='flex flex-col py-[18px] px-[16px]'>
        <div className='flex flex-col gap-[4px]'>
          <p className='truncate text-[16px]'>{props.name}</p>
          <p className='text-[14px] text-gray3-text'>{props.date}</p>
          <div className='flex flex-row items-center gap-[8px]'>
            <div className='flex flex-row items-center gap-[4px]'>
              <img className='w-[24px] h-[24px]' src="/main_profile.svg" />
              <p className="text-[14px] text-gray3-text">{props.username}</p>
            </div>
            {
              props.done ? <ThemeProvider theme={doneChipTheme}><Chip label="모집완료" /></ThemeProvider> : <></>
            }
          </div>
          {props.tags ? <HashtagAccordion tag={props.tags} /> : <></>}
        </div>
      </div>
    )
  }
};
export default index;
