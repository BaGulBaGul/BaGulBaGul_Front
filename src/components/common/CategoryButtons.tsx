'use client';

import { Dispatch, SetStateAction } from "react";
import { ToggleButton, ToggleButtonGroup, ThemeProvider } from "@mui/material";
import { categoryButtonTheme } from './Themes';
import { Category19 } from './Icon';

export const categories = [
  '문화/예술', '공연전시/행사', '식품/음료', '교육/체험', '스포츠/레저', '지역특색', '민속/전통', '주류', '종교', '인물/역사'
]

interface CategoryButtonProps {
  selectedCate: string[]; setSelectedCate: Dispatch<SetStateAction<string[]>>;
}
export default function CategoryButtons(props: CategoryButtonProps) {
  const handleCate = (e: React.MouseEvent<HTMLElement>, newCate: string[]) => {
    props.setSelectedCate(newCate);
  }

  return (
    <div className='h-[46px] overflow-hidden'>
      <div className='x-scroll-wrap h-[76px] py-[10px] px-[16px]'>
        <ThemeProvider theme={categoryButtonTheme}>
          <ToggleButtonGroup value={props.selectedCate} onChange={handleCate}>
            {categories.map((cate, idx) =>
              cate === '주류'
                ? <ToggleButton value={cate} className='cateInfo gap-[2px]' key={`cate-${cate}`}><Category19/>{cate}</ToggleButton>
                : <ToggleButton value={cate} className='cateInfo' key={`cate-${cate}`}>{cate}</ToggleButton>
            )}
          </ToggleButtonGroup>
        </ThemeProvider>
      </div>
    </div>
  )
}