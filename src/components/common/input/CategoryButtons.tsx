'use client';
import { Icon19 } from "../styles/Icon";
import { Toggle, ToggleGroup } from "@base-ui-components/react";

export const categories = [
  '문화/예술', '공연전시/행사', '식품/음료', '교육/체험', '스포츠/레저', '지역특색', '민속/전통', '주류', '종교', '인물/역사'
]

interface CategoryButtonProps {
  selectedCate: string[]; updateSelectedCate: (cate: string[]) => void; max?: number;
}
export function CategoryButtons({ selectedCate, updateSelectedCate, max }: CategoryButtonProps) {
  const handleCate = (groupValue: string[]) => {
    if (!max || (!!max && groupValue.length <= max)) {
      updateSelectedCate(groupValue)
    }
  }

  return (
    <div className='h-[46px] overflow-hidden'>
      <div className='x-scroll-wrap h-[76px] py-[10px] px-[16px]'>
        <ToggleGroup value={selectedCate} onValueChange={handleCate} toggleMultiple className='flex gap-[4px]'>
          {categories.map((cate, idx) =>
            <Toggle value={cate} key={`cate-${cate}`} className='toggle-chip-btn'
              render={((props, state) => (
                <button type='button' {...props}>{
                  cate === '주류' ? <span className="flex gap-[2px] items-center"><Icon19 />{cate}</span>
                    : <p>{cate}</p>
                }</button>
              ))}
            />
          )}
        </ToggleGroup>
      </div>
    </div>
  )
}