'use client';

// import styled from "@emotion/styled";
import { ThemeProvider, styled } from '@mui/material/styles';
import { Dispatch, SetStateAction } from "react";
import { categories } from "./Data";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { categoryButtonTheme } from './Themes';

interface CategoryButtonProps {
  selectedCate: string[]; setSelectedCate: Dispatch<SetStateAction<string[]>>;
  // params: any; setParams: any;
}
export function CategoryButtons(props: CategoryButtonProps) {
  const handleCate = (e: React.MouseEvent<HTMLElement>, newCate: string[]) => {
    props.setSelectedCate(newCate);
    // props.setParams({ ...props.params, categories: props.selectedCate });
  }

  // const SToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  //   '& .MuiToggleButtonGroup-grouped': { border: '0px' },
  //   '& .MuiToggleButton-standard, &.Mui-disabled': {
  //     fontSize: '14px !important', color: '#1E1E1E', fontWeight: '400',
  //     border: '0.5px solid #ECECEC !important', borderRadius: '20px !important',
  //     padding: '2px 8px', backgroundColor: '#ECECEC',
  //     "&:hover, &:focus": {
  //       border: '0.5px solid #4A6AFE !important', backgroundColor: '#ECECEC'
  //     },
  //     "&:active": {
  //       border: '0.5px solid #4A6AFE !important', backgroundColor: '#4A6AFE',
  //       color: '#FCFCFC', fontWeight: '600',
  //     },
  //     "&.Mui-selected, &.Mui-selected:hover": {
  //       backgroundColor: '#4A6AFE', color: '#FCFCFC !important', fontWeight: '600',
  //       border: '0.5px solid #4A6AFE !important'
  //     },
  //     "&:not(:last-child)": { marginRight: '10px' }
  //   }
  // }));

  return (
    <div className='overflow-hidden	h-[46px]'>
      {/* <div className='h-[76px] py-[10px] px-[16px] overflow-x-scroll overflow-y-hide whitespace-nowrap cateBtns'> */}
      <div className='h-[76px] py-[10px] px-[16px] overflow-x-auto overflow-y-hide whitespace-nowrap cateBtns'>
        <ThemeProvider theme={categoryButtonTheme}>
          <ToggleButtonGroup value={props.selectedCate} onChange={handleCate}>
            {categories.map((cate, idx) =>
              <ToggleButton value={cate} className='cateInfo' key={`cate-${cate}`}>{cate}</ToggleButton>
            )}
          </ToggleButtonGroup>
        </ThemeProvider>
      </div>
    </div>
  )
}