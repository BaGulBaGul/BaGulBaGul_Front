"use client";
import { useEffect, useRef, useState } from 'react';
import { call } from "@/service/ApiService";
import { Button, ThemeProvider, TextField } from '@mui/material';
import { commentTheme } from '@/components/common/styles/Themes';
import ScrollToTop from './ScrollToTop';
import { useNewComment } from '@/hooks/useInComment';

export function CommentFooter(props: { url: string; qKey: any; }) {
  const cmtRef = useRef<HTMLInputElement>(null);
  const mutateComment = useNewComment(`/api/${props.url}/comment`, props.qKey, cmtRef)
  const handleComment = () => {
    if (cmtRef.current && cmtRef.current.value.length > 0) {
      console.log(cmtRef.current.value)
      mutateComment.mutate()
    }
  }

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = (e: any) => {
      setScrolled(e.target.documentElement.scrollTop > 150);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className='comment-wrap'>
      <ThemeProvider theme={commentTheme}>
        {!scrolled ? <></> :
          <div className='flex justify-end pb-[16px] pe-[15px]'><ScrollToTop /></div>}
        <div className="comment-input flex flex-row">
          <TextField placeholder='댓글을 입력해주세요.' fullWidth multiline inputRef={cmtRef} maxRows={5} />
          <Button onClick={handleComment}>등록</Button>
        </div>
      </ThemeProvider>
    </div>
  )
}