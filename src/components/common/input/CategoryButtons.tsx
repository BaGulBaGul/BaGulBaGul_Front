'use client';
import { Dispatch, SetStateAction } from "react";
import { ToggleButton, ToggleButtonGroup, ThemeProvider, createTheme } from "@mui/material";

export const categories = [
  '문화/예술', '공연전시/행사', '식품/음료', '교육/체험', '스포츠/레저', '지역특색', '민속/전통', '주류', '종교', '인물/역사'
]

interface CategoryButtonProps {
  selectedCate: string[]; setSelectedCate: Dispatch<SetStateAction<string[]>>;
  max?: number; setForAdult?: Dispatch<boolean>;
}
export default function CategoryButtons(props: CategoryButtonProps) {
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
        <ThemeProvider theme={categoryButtonTheme}>
          <ToggleButtonGroup value={props.selectedCate}>
            {categories.map((cate, idx) =>
              cate === '주류'
                ? <ToggleButton value={cate} selected={props.selectedCate.some(x => x === cate)} onClick={(e) => handleCate(e, cate)} className='cateInfo gap-[2px]' key={`cate-${cate}`}><Category19 />{cate}</ToggleButton>
                : <ToggleButton value={cate} selected={props.selectedCate.some(x => x === cate)} onClick={(e) => handleCate(e, cate)} className='cateInfo' key={`cate-${cate}`}>{cate}</ToggleButton>
            )}
          </ToggleButtonGroup>
        </ThemeProvider>
      </div>
    </div>
  )
}

const Category19 = () => (
  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.48633 6.01562V14.5H5.41992V7.11719H5.37305L3.31055 8.48828V7.42188L5.41992 6.01562H6.48633ZM11.5723 5.89844C13.0371 5.91016 14.6543 6.78906 14.6543 9.91797C14.6543 12.9297 13.4238 14.6172 11.4316 14.6172C9.94336 14.6172 8.88867 13.7031 8.67773 12.3555H9.7207C9.9082 13.1172 10.4824 13.6797 11.4316 13.6797C12.8145 13.6797 13.6582 12.4844 13.6699 10.4219H13.5527C13.0605 11.125 12.2871 11.5469 11.3848 11.5469C9.86133 11.5469 8.60742 10.3867 8.60742 8.74609C8.60742 7.16406 9.76758 5.88672 11.5723 5.89844ZM11.5723 6.82422C10.459 6.82422 9.62695 7.69141 9.63867 8.73438C9.63867 9.78906 10.4238 10.6211 11.5371 10.6211C12.6387 10.6211 13.5059 9.70703 13.5059 8.71094C13.5059 7.73828 12.6973 6.82422 11.5723 6.82422Z" fill="currentColor" />
    <circle cx="9" cy="10" r="8.75" stroke="currentColor" strokeWidth="0.5" />
  </svg>
)

const categoryButtonTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiToggleButtonGroup: { styleOverrides: { root: { gap: '4px' } } },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          fontSize: '14px !important', fontWeight: '400', lineHeight: '160%', color: '#1E1E1E!important',
          padding: '2px 8px', minWidth: 'unset', border: '0.5px solid #ECECEC !important',
          borderRadius: '20px!important', backgroundColor: '#ECECEC !important',
          '&:hover, &:focus': { border: '0.5px solid #4A6AFE !important', backgroundColor: '#ECECEC' },
          "&:active": {
            border: '0.5px solid #4A6AFE !important', backgroundColor: '#4A6AFE', color: '#FCFCFC', fontWeight: '600',
          },
          '&.Mui-selected, &.Mui-selected:hover': {
            backgroundColor: '#4A6AFE !important', color: '#FCFCFC !important', fontWeight: '600', border: '0.5px solid #4A6AFE !important'
          }
        }
      }
    },
  },
});