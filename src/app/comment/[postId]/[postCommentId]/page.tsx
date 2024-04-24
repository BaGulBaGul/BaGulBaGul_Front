"use client";
import { HeaderNotFixed } from "@/components/layout/header";
import Reply from '@/components/pages/comment/[postId]/[postCommentId]'
import { useEffect, useState } from "react";
import { ScrollToTop } from "@/components/common";

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = (e: any) => {
      setScrolled(e.target.documentElement.scrollTop > 150);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
      <HeaderNotFixed />
      <Reply />
      { scrolled ? <ScrollToTop /> : <></> }
    </div>
  );
}
