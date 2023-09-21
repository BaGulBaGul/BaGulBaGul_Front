import { useState } from "react";
import { ThemeProvider, Button, Paper, MenuList, MenuItem, IconButton } from "@mui/material";
import { viewTheme } from "./Themes";


const viewVal = ['createdAt,desc', 'popular,asc', 'comment,desc']
const viewLabel = ['최신순', '인기순', '댓글순']
interface ViewButtonProps { sort: string; handleOpen: any; }
export function ViewButton(props: ViewButtonProps) {
  return (
    <ThemeProvider theme={viewTheme}>
      <Button onClick={props.handleOpen} className="justify-between">
        <span>{viewLabel[viewVal.indexOf(props.sort)]}</span>
        <img src='/arrow_select.svg' />
      </Button>
    </ThemeProvider>
  )
}

interface ViewSelectProps { sort: string; setSort: any; handleClose: any; }
export function ViewSelect(props: ViewSelectProps) {
  const handleView = (e: any) => {
    console.log(e.target.dataset.value)
    props.setSort(e.target.dataset.value)
  }
  return (
    <ThemeProvider theme={viewTheme}>
      <Paper className="w-screen absolute bottom-0 z-paper">
        <div className="flex px-[16px] py-[20px] w-full justify-between items-center border-b-[0.5px] border-gray2-text">
          <span className="text-[14px]">검색 필터</span>
          <IconButton disableRipple onClick={props.handleClose} className="p-0"><img src='/popup_close.svg' /></IconButton>
        </div>
        <MenuList>
          {
            viewLabel.map((item, idx) => (
              <MenuItem data-value={viewVal[idx]} key={`view-${idx}`} onClick={handleView}
                selected={viewVal.indexOf(props.sort) === idx}>{item}</MenuItem>
            ))
          }
      </MenuList>
    </Paper>
    </ThemeProvider >
  )
}