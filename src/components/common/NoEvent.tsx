'use client';
import { ThemeProvider, Button } from '@mui/material';
import { noEventButtonTheme } from '@/components/common/Themes'

interface NoEventProps { text1: string; text2: string; buttonText: string; }
export default function NoEvent(props: NoEventProps) {
  return (
    <div className='flex flex-col justify-center items-center gap-[32px] mt-[121px] mb-[317px]'>
      <img className='w-[75px] h-[140px]' src='/no_event.svg' />
      <div className='flex flex-col gap-[16px] justify-center items-center'>
        <div className='flex flex-col gap-[4px] justify-center items-center'>
          <span className='text-[16px] font-semibold leading-[140%] text-gray3-text'>{props.text1}</span>
          <span className='text-[16px] leading-[140%] text-gray2-text'>{props.text2}</span>
        </div>
        <ThemeProvider theme={noEventButtonTheme}>
          <Button>{props.buttonText}</Button>
        </ThemeProvider>
      </div>
    </div>
  )
} 