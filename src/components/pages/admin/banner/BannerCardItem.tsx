'use client';
import { ReactNode } from 'react';
import { Dialog } from '@base-ui-components/react';
import { useSortable } from '@dnd-kit/sortable';
import { DndHandler, DndItem, BannerInfo } from '..';
import { DialogFull, DialogHeader } from '@/components/common';
import { IconArrowDown, IconTrash } from '@/components/common/styles/Icon';

export function BannerCardItem({ item, children, handleDelete }: { item: BannerInfo; children: ReactNode, handleDelete: (e: any, id: string) => void }) {
  const sortable = useSortable({ id: item.id });
  return (
    <DndItem sortable={sortable}>
      <div className="flex flex-row justify-between gap-[8px] w-screen text-14 p-[16px] bg-p-white">
        <DndHandler sortable={sortable} />
        <DialogFull trigger={<BannerCardTrigger item={item} handleDelete={handleDelete} />}>
          <DialogHeader headerText='카드 추가하기' />
          {children}
        </DialogFull>
      </div>
    </DndItem>
  );
};

function BannerCardTrigger({ item, handleDelete }: { item: BannerInfo; handleDelete: (e: any, id: string) => void }) {
  let data = item.data;
  return (
    <Dialog.Trigger className="flex flex-row justify-between w-full gap-[8px]">
      <p className={"w-full text-left " + (!!data ? "text-black" : "text-gray2")}>
        {data ? data.title : '카드 추가하기'}
      </p>
      <div className='flex flex-row gap-[4px]'>
        {!!data && <button onClick={(e) => handleDelete(e, item.id)}><IconTrash /></button>}
        <span className='-rotate-90'><IconArrowDown /></span>
      </div>
    </Dialog.Trigger>
  )
}