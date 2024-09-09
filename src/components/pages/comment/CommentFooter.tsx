"use client";
import { useEffect, useRef, useState } from 'react';
import { call } from "@/service/ApiService";
import { Button, ThemeProvider, TextField } from '@mui/material';
import { commentTheme } from '@/components/common/styles/Themes';
import ScrollToTop from './ScrollToTop';

export function CommentFooter(props: { url: string; setLoading: any; setTmp: any; setTmpP: any; }) {
  const cmtRef = useRef<HTMLInputElement>(null);
  const handleComment = () => {
    if (cmtRef.current && cmtRef.current.value.length > 0) {
      console.log(cmtRef.current.value)
      call(`/api/${props.url}/comment`, "POST", { "content": cmtRef.current.value })
        .then((response) => {
          console.log(response)
          props.setTmp([])
          props.setTmpP(undefined)
          props.setLoading(true)
          if (cmtRef.current) { cmtRef.current.value = '' }
        }).catch((error) => console.error(error));
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