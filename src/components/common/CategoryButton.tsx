'use client';

import styled from "@emotion/styled";
import { useState } from "react";
import { categories } from "./Data";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export function CategoryButtons() {
    const [selectedCate, setSelectedCate] = useState<string[]>([]);
    const handleCate = (event: React.MouseEvent<HTMLElement>, newCate: string[]) => {
      setSelectedCate(newCate);
    }
  
    const SToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
      '& .MuiToggleButtonGroup-grouped': { border: '0px' },
      '& .MuiToggleButton-standard': {
        fontSize: '14px', color: '#1E1E1E',
        border: '0.5px solid #C1C1C1 !important',
        borderRadius: '20px !important',
        padding: '2px 8px',
        "&:hover, &:focus": {
          border: '0.5px solid #4A6AFE !important', backgroundColor: 'transparent'
        },
        "&.Mui-selected, &.Mui-selected:hover": {
          backgroundColor: '#4A6AFE', color: '#FCFCFC !important', fontWeight: '600',
          border: '0.5px solid #4A6AFE !important'
  
        },
        "&:not(:last-child)": { marginRight: '10px' }
      }
    }));
  
    return (
      <div className='overflow-hidden	h-[46px]'>
        <div className='h-[76px] py-[5px] px-[16px] overflow-x-scroll overflow-y-hide whitespace-nowrap cateBtns'>
          <SToggleButtonGroup value={selectedCate} onChange={handleCate}>
            {categories.map((cate, idx) =>
              <ToggleButton value={cate} className='cateInfo' key={`cate-${cate}`}>{cate}</ToggleButton>
            )}
          </SToggleButtonGroup>
        </div>
      </div>
    )
  }