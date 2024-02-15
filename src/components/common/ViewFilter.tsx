import { useState } from "react";
import { ThemeProvider, Button, Paper, MenuList, MenuItem, IconButton, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { viewTheme, viewSwitchTheme } from "./Themes";
import { FilterArrowMore } from "./Icon";

import { krLocale } from '@/components/common/CalendarLocale';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { DayRange, Calendar, Day } from 'react-modern-calendar-datepicker'


interface ViewButtonProps { sort: string; handleOpen: any; }
export function ViewButton(props: ViewButtonProps) {
  return (
    <ThemeProvider theme={viewTheme}>
      <Button onClick={props.handleOpen} className="justify-between">
        <span>필터</span>
        {/* <span>{viewLabel[viewVal.indexOf(props.sort)]}</span> */}
        <img src='/main_filter.svg' />
      </Button>
    </ThemeProvider>
  )
}

interface ViewSelectProps { sort: string; setSort: any; handleClose: any; }
export function ViewSelect(props: ViewSelectProps) {
  const handleView = (e: React.MouseEvent<HTMLElement>, newSort: string) => {
    console.log('4444')
    console.log(newSort)
    props.setSort(newSort)
  }

  return (
    <ThemeProvider theme={viewTheme}>
      <Paper className="w-screen absolute bottom-0">
        <div className="flex px-[16px] py-[20px] w-full justify-between items-center border-b-[0.5px] border-gray2-text">
          <span className="text-[14px] font-semibold">바글바글 필터</span>
          <IconButton disableRipple onClick={props.handleClose} className="p-0"><img src='/popup_close.svg' /></IconButton>
        </div>
        {/* <MenuList>
          {
            viewLabel.map((item, idx) => (
              <MenuItem data-value={viewVal[idx]} key={`view-${idx}`} onClick={handleView}
                selected={viewVal.indexOf(props.sort) === idx}>{item}</MenuItem>
            ))
          }
        </MenuList> */}
        <div className="flex flex-col px-[16px] pb-[10px] gap-[10px]">
          <ThemeProvider theme={viewSwitchTheme}>
            <div className="flex flex-col">
              <div className="py-[10px] text-[16px] font-semibold leading-[160%]">정렬</div>
              <ToggleButtonGroup value={props.sort} exclusive onChange={handleView} >
                <ToggleButton value="createdAt,desc">최신순</ToggleButton>
                <ToggleButton value="views,desc">조회수</ToggleButton>
                <ToggleButton value="likeCount,desc">좋아요수</ToggleButton>
                <ToggleButton value="commentCount,desc">댓글수</ToggleButton>
              </ToggleButtonGroup>
            </div>
            <div className="flex flex-col">
              <div className="py-[10px] text-[16px] font-semibold leading-[160%]">날짜</div>
              <div className="flex flex-row gap-[4px]">
                <Button className="gap-[2px]">시작일<FilterArrowMore /></Button>
                <Button className="gap-[2px]">종료일<FilterArrowMore /></Button>
              </div>
            </div>
          </ThemeProvider>
          <div className="flex flex-row justify-between py-[10px]">
            <span className="text-[16px] font-semibold leading-[160%]">인원</span>
          </div>
        </div>
      </Paper>
    </ThemeProvider >
  )
}