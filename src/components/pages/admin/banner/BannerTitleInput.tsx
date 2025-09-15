"use client";
import { useRef } from 'react';
import { handleResizeHeight } from '@/service/Functions';

export function BannerTitleInput({ updateTitle, title }: { updateTitle: (e: any) => void; title: string | undefined }) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const limitLines = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    let lines = ((title || '').match(/\n/g) || []).length + 1;
    if (e.key === "Enter" && lines === 2) { e.preventDefault(); }
  }
  return (
    <div className="px-[16px] py-[10px] bg-p-white">
      <textarea onKeyDown={limitLines} placeholder="제목" defaultValue={title}
        onChange={(e) => handleResizeHeight(inputRef, undefined, undefined, e, updateTitle)}
        ref={inputRef} rows={1} className='w-full focus:outline-none text-18 overflow-hidden' />
    </div>
  )
}