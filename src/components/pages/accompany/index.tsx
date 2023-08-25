"use client";
import React from "react";
import { accompanyData } from '@/components/common/Data'
import { ThemeProvider, Button, Divider } from '@mui/material';
import { categoryButtonTheme } from '@/components/common/Themes'
import HashtagAccordion from '@/components/common/HashtagAccordion';

const index = () => {
  return (
    <div className='flex flex-col w-full pt-[104px] pb-[44px]'>
      {accompanyData.map((post, idx) => {
        return (
          <>
            {idx === 0 ? <></> : <Divider />}
            <AccompanyBlock name={post.name} date={post.date} tags={post.tags} key={`accompany-${idx}`} />
          </>
        )
      }
      )}
    </div>
  )
};
export default index;

interface AccompanyProps { name: string; date: string; tags?: string[]; }
function AccompanyBlock(props: AccompanyProps) {
  return (
      <div className='flex flex-col py-[18px] px-[16px]'>
        <div className='flex flex-col justify-between'>
          <div className='flex flex-row items-center pb-[10px]'>
            <img className='me-[8px] w-[24px] h-[24px]' src="/main_profile.svg" />
            <ThemeProvider theme={categoryButtonTheme}>
              <Button disabled>공연전시/행사</Button>
            </ThemeProvider>
          </div>
          <div className='flex flex-col gap-[2px]'>
            <p className='text-sm text-gray3-text'>{props.date}</p>
            <p className='truncate text-base'>{props.name}</p>
          </div>
          {props.tags ? <HashtagAccordion tag={props.tags} /> : <></>}
        </div>
      </div>
  )
}