"use client";
import { useState, useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { ExpandButton } from '..';

// * 리스트 내 블록들에서도 적용 잘되는지 확인
export function HashtagAccordion({ tags }: { tags: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  const [showMore, setShowMore] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Use a hidden flex-nowrap div to measure overflow
  const checkOverflow = () => {
    if (containerRef.current && measureRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const tagListWidth = measureRef.current.clientWidth;
      setShowMore(tagListWidth > containerWidth);
    }
  };
  useLayoutEffect(() => {
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [tags]);

  const handleExpandClick = () => setExpanded((prev) => !prev);

  if (!tags.length) return null;

  return (
    <div className="pt-[10px]">
      {/* Hidden measuring div */}
      <div ref={measureRef} className="flex flex-nowrap gap-[10px] absolute opacity-0 h-0 p-0 m-0 pointer-events-none"
        style={{ visibility: 'hidden' }} aria-hidden >
        {tags.map((tag, idx) => (<HashtagButton tag={tag} key={`measure-tag-${idx}`} />))}
      </div>
      {/* Visible tag list */}
      <div ref={containerRef} className="flex flex-row justify-between w-full">
        <div className={`flex gap-[10px] transition-all duration-200 ` +
          (showMore && !expanded ? 'overflow-hidden flex-wrap h-[27px] max-w-[calc(100%-35px)]' : 'flex-wrap max-w-full')} >
          {tags.map((tag, idx) => (<HashtagButton tag={tag} key={`tag-${idx}`} />))}
        </div>
        {showMore && (<ExpandButton handleExpandClick={handleExpandClick} expanded={expanded} />)}
      </div>
    </div>
  );
}

export function HashtagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-row gap-[10px] flex-wrap">
      {tags.map((tag, idx) => {
        if (tag.length > 0) { return (<HashtagButton tag={tag} key={`tag-${idx}`} />) }
      })}
    </div>
  )
}

export function HashtagButton({ tag }: { tag: string }) {
  return (
    <Link href={`/tag?tag=${tag}&tab_id=0`}>
      <div className="whitespace-nowrap px-[4px] py-[2px] text-14 text-black bg-gray1 ring-[0.5px] ring-gray1 rounded-[2px]
      hover:ring-gray3 hover:bg-white focus:ring-gray3 focus:bg-white active:ring-gray3 active:bg-gray3 active:text-white">
        <span>{`# ${tag}`}</span>
      </div>
    </Link>
  );
}