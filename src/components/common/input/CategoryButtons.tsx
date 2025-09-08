'use client';
import { Dispatch, SetStateAction } from "react";
import { ToggleButton, ToggleButtonGroup, ThemeProvider } from "@mui/material";
import { inputToggleTheme } from "../styles/Themes";
import { Icon19 } from "../styles/Icon";

export const categories = [
  '문화/예술', '공연전시/행사', '식품/음료', '교육/체험', '스포츠/레저', '지역특색', '민속/전통', '주류', '종교', '인물/역사'
]

interface CategoryButtonProps {
  selectedCate: string[]; setSelectedCate: Dispatch<SetStateAction<string[]>>;
  max?: number; setForAdult?: Dispatch<boolean>;
}
export function CategoryButtons(props: CategoryButtonProps) {
  const handleCate = (e: React.MouseEvent<HTMLElement>, newCate: string) => {
    if (props.selectedCate.some(x => x === newCate)) { // 선택 해제
      props.setSelectedCate(props.selectedCate.filter(function (cate) { return cate !== newCate }))
    } else {  // 선택 - 갯수 초과 시 클릭 x
      if (!props.max || (!!props.max && props.selectedCate.length + 1 <= props.max)) {
        props.setSelectedCate(props.selectedCate.concat(newCate));
        if (!!props.setForAdult && newCate === '주류') { props.setForAdult(true) }
      }
    }
  }

  return (
    <div className='h-[46px] overflow-hidden'>
      <div className='x-scroll-wrap h-[76px] py-[10px] px-[16px]'>
        <ThemeProvider theme={inputToggleTheme}>
          <ToggleButtonGroup value={props.selectedCate}>
            {categories.map((cate, idx) =>
              cate === '주류'
                ? <ToggleButton value={cate} selected={props.selectedCate.some(x => x === cate)} onClick={(e) => handleCate(e, cate)} className='gap-[2px]' key={`cate-${cate}`}><Icon19 />{cate}</ToggleButton>
                : <ToggleButton value={cate} selected={props.selectedCate.some(x => x === cate)} onClick={(e) => handleCate(e, cate)} key={`cate-${cate}`}>{cate}</ToggleButton>
            )}
          </ToggleButtonGroup>
        </ThemeProvider>
      </div>
    </div>
  )
}