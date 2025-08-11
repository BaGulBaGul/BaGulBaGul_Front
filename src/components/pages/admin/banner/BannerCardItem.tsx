'use client';
import { ReactNode } from 'react';
import { Dialog } from '@base-ui-components/react';
import { useSortable } from '@dnd-kit/sortable';
import { DndHandler, DndItem,BannerInfo, BannerData  } from '..';
import { DialogFull } from '@/components/common';
import { DialogHeader } from '@/components/common/display/_DialogFull';

export function BannerCardItem({ item, children }: {item: BannerInfo; children: ReactNode}) {
  const sortable = useSortable({ id: item.id });
  return (
    <DndItem sortable={sortable}>
      <div className="flex flex-row justify-between gap-[8px] w-screen text-14 p-[16px] bg-p-white">
        <DndHandler sortable={sortable} />
        <DialogFull footerText='저장하기' trigger={<BannerCardTrigger data={item.data} />}>
          <DialogHeader headerText='카드 추가하기' />
          {children}
        </DialogFull>
      </div>
    </DndItem>
  );
};

function BannerCardTrigger({ data }: { data?: BannerData }) {
  return (
    <Dialog.Trigger className="flex flex-row justify-between w-full gap-[8px]">
      <p className={"w-full text-left " + (!!data ? "text-black" : "text-gray2")}>
        {data ? data.title : '카드 추가하기'}
      </p>
      <img src='/arrow_next.svg' className="p-[4px] w-[24px] h-[24px]" />
    </Dialog.Trigger>
  )
}