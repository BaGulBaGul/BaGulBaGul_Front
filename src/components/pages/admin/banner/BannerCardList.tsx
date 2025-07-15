import { useSortable } from '@dnd-kit/sortable';
import { BannerData } from './BannerPage';
import { DndHandler, DndItem } from '..';

export function BannerCardList({ items }: { items: BannerData[] }) {
  return (
    <div>
      {items.map(item => (
        <Item key={`banner-${item.id}`} itemId={item.id} title={!!item.data ? item.data.title : undefined}  />
      ))}
    </div>
  )
}

function Item({ itemId, title }: { itemId: string; title?: string}) {
  const sortable = useSortable({ id: itemId });
  return (
    <DndItem sortable={sortable}>
      <div className="flex flex-row justify-between gap-[8px] w-screen text-14 p-[16px] bg-p-white">
        <DndHandler sortable={sortable} />
        <button className='flex flex-row justify-between w-full gap-[8px]'>
          <p className={"w-full text-left " + (!!title ? "text-black" : "text-gray2")}>
            {title ?? '카드 추가하기'}
          </p>
          <img src='/arrow_next.svg' className="p-[4px] w-[24px] h-[24px]" />
        </button>
      </div>
    </DndItem>
  );
};