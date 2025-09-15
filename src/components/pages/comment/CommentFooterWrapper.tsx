"use client";
import { ReactNode, useEffect, useState } from "react";
import { ScrollToTop, CommentFooterLogin } from ".";

interface Props { isLogin: boolean; entered: boolean; handleComment: any; children: ReactNode }
export function CommentFooterWrapper({ isLogin, entered, handleComment, children }: Props) {
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
      {!scrolled ? <></> :
        <div className='flex justify-end pb-[16px] pe-[15px]'><ScrollToTop /></div>}
      <div className="comment-input">
        {isLogin
          ? <>
            {children}
            <button onClick={handleComment} className={'w-[70px] min-w-[70px] h-[48px] text-16 ' + (entered ? 'text-primary-blue' : '')}>등록</button>
          </>
          : <CommentFooterLogin />
        }
      </div>
    </div>
  )
}