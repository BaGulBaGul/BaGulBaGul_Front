'use client';
import { useSortable } from '@dnd-kit/sortable';
import { BannerData } from './BannerPage';
import { BannerCardPage, DndHandler, DndItem } from '..';
import { DialogFull } from '@/components/common';

export function BannerCardItem({ item }: { item: BannerData }) {
  const sortable = useSortable({ id: item.id });
  return (
    <DndItem sortable={sortable}>
      <div className="flex flex-row justify-between gap-[8px] w-screen text-14 p-[16px] bg-p-white">
        <DndHandler sortable={sortable} />
        <DialogFull headerText='카드 추가하기' footerText='저장하기' triggerStyle='flex flex-row justify-between w-full gap-[8px]'
          dialogBody={<BannerCardPage handleBanner={() => { console.log() }} />}>
          <>
            <p className={"w-full text-left " + (!!item.data ? "text-black" : "text-gray2")}>
              {item.data ? item.data.title : '카드 추가하기'}
            </p>
            <img src='/arrow_next.svg' className="p-[4px] w-[24px] h-[24px]" />
          </>
        </DialogFull>
      </div>
    </DndItem>
  );
};