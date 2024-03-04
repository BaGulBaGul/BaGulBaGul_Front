import { ChangeEvent, forwardRef, useState } from "react";
import { ThemeProvider, Button, Paper, IconButton, FormControl, FormControlLabel, RadioGroup, Radio, Collapse, TextField } from "@mui/material";
import { Unstable_NumberInput as NumberInput, NumberInputProps, numberInputClasses, } from '@mui/base'
import { viewTheme, viewRadioTheme, 
  HeadInputRoot, HeadInputElement, HeadButton, PartiInputRoot, PartiInputElement, PartiButton } from "./Themes";
import { SmileyFace, CalendarIcn, AddIcn, RemoveIcn } from "./Icon";

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

interface ViewSelectProps {
  sort: string; setSort: any; handleClose: any; dayRange: DayRange; setDayRange: any;
  participants: number; setParticipants: any;
  headCount: { from: undefined | number, to: undefined | number }; setHeadCount: any;
}
export function ViewSelect(props: ViewSelectProps) {
  // 정렬
  const handleView = (e: ChangeEvent<HTMLInputElement>, newSort: string) => {
    console.log('4444')
    console.log(newSort)
    props.setSort(newSort)
  }
  // 날짜 캘린더
  const [openCal, setOpenCal] = useState(false);
  const handleOpenCal = () => { setOpenCal(!openCal) }
  const handleDayData = (date: Day) => {
    if (date !== null && date !== undefined) {
      return `${date.year}.${String(date.month).padStart(2, "0")}.${String(date.day).padStart(2, "0")}`
    }
  }
  const [openParti, setOpenParti] = useState(false);
  const handleOpenParti = () => { setOpenParti(!openParti) }
  const [openHead, setOpenHead] = useState(false);
  const handleOpenHead = () => { setOpenHead(!openHead) }

  const headCountString = (from: number | undefined | null, to: number | undefined | null) => {
    if ((from !== undefined && from !== null && from > 0) || (to !== undefined && to !== null && to > 0)) {
      if (from === undefined) { return ` - ${to}` }
      else if (to === undefined) { return `${from} - ` }
      return `${from} - ${to}`
    } else { return '0' }
  }

  return (
    <ThemeProvider theme={viewTheme}>
      <Paper className="w-screen absolute bottom-0">
        <div className="flex px-[16px] py-[20px] w-full justify-between items-center border-b-[0.5px] border-gray2-text">
          <span className="text-[14px] font-semibold">바글바글 필터</span>
          <IconButton disableRipple onClick={props.handleClose} className="p-0"><img src='/popup_close.svg' /></IconButton>
        </div>
        <div className="flex flex-col px-[16px] pb-[10px] gap-[10px]">
          <ThemeProvider theme={viewRadioTheme}>
            <div className="flex flex-col mb-[6px]">
              <div className="py-[10px] text-[14px] font-semibold leading-[160%]">정렬</div>
              <FormControl>
                <RadioGroup row value={props.sort} onChange={handleView}>
                  <FormControlLabel value="createdAt,desc" control={<Radio />} label="최신순" />
                  <FormControlLabel value="views,desc" control={<Radio />} label="조회수" />
                  <FormControlLabel value="likeCount,desc" control={<Radio />} label="좋아요수" />
                  <FormControlLabel value="commentCount,desc" control={<Radio />} label="댓글수" />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="flex flex-col" id="filter-date">
              <div className="flex flex-row gap-[16px]">
                <div className="text-[14px] font-semibold leading-[160%]">날짜선택</div>
                <Button disableRipple onClick={handleOpenCal}
                  className={props.dayRange.from === undefined || props.dayRange.from === null ? '' : 'border-primary-blue text-primary-blue'}>
                  <div className="flex flex-row gap-[16px]">
                    <CalendarIcn />
                    <span className="text-[14px] text-black-text self-start">
                      {
                        props.dayRange.from === undefined || props.dayRange.from === null
                          ? <span>날짜를 선택하세요</span>
                          : props.dayRange.to === undefined || props.dayRange.to === null
                            ? <span>{handleDayData(props.dayRange.from)}</span>
                            : <span>{`${handleDayData(props.dayRange.from)} - ${handleDayData(props.dayRange.to)}`}</span>
                      }
                    </span>
                  </div>
                </Button>
              </div>
              <Collapse in={openCal} timeout="auto" className="filter-collapse">
                <Calendar value={props.dayRange} onChange={props.setDayRange} locale={krLocale}
                  calendarClassName="FilterCalendar" />
              </Collapse>
            </div>
            <div className="flex flex-col" id="filter-participant">
              <div className="flex flex-row gap-[16px]">
                <span className="text-[14px] font-semibold leading-[160%]">참여인원</span>
                <Button disableRipple onClick={handleOpenParti}
                  className={props.participants > 0 ? 'border-primary-blue text-primary-blue' : ''}>
                  <div className="flex flex-row gap-[4px]">
                    <SmileyFace />
                    <span className="text-[14px] text-black-text self-start">
                      { props.participants >= 0 ? props.participants : 0 }명
                    </span>
                  </div>
                </Button>
              </div>
              <Collapse in={openParti} timeout="auto" className="filter-collapse">
                <div className="flex flex-row justify-between mt-[8px]">
                  <span className="text-[14px] leading-[160%]">인원 수</span>
                  <PartiNumberInput min={1} 
                  onInputChange={(event) => props.setParticipants(Number(event.target.value))}
                  onChange={(event, newValue) => props.setParticipants(Number(newValue))} />
                </div>
              </Collapse>
            </div>
            <div className="flex flex-col" id="filter-head">
              <div className="flex flex-row gap-[16px]">
                <span className="text-[14px] font-semibold leading-[160%]">규모설정</span>
                <Button disableRipple onClick={handleOpenHead}
                  className={(props.headCount.from !== undefined && props.headCount.from > 0)
                    || (props.headCount.to !== undefined && props.headCount.to > 0)
                    ? 'border-primary-blue text-primary-blue' : ''}>
                  <div className="flex flex-row gap-[4px]">
                    <SmileyFace />
                    <div className="flex flex-row text-[14px] text-black-text self-start">
                      {headCountString(props.headCount.from, props.headCount.to)}명
                    </div>
                  </div>
                </Button>
              </div>
              <Collapse in={openHead} timeout="auto" className="filter-collapse">
                <div className="flex flex-col mt-[8px] gap-[8px]">
                  <span className="text-[14px] leading-[160%]">최소/최대 설정하기</span>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-row justify-between border border-gray2-text rounded-[8px] w-[180px] px-[16px] py-[5px]">
                      <span className="text-[14px] leading-[160%] w-[49px]">최소인원</span>
                      <HeadNumberInput placeholder="1명"
                        onInputChange={(event) => props.setHeadCount({ from: event.target.value, to: props.headCount.to })} />
                    </div>
                    <div className="flex flex-row justify-between border border-gray2-text rounded-[8px] w-[180px] px-[16px] py-[5px]">
                      <span className="text-[14px] leading-[160%]">최대인원</span>
                      <HeadNumberInput placeholder="10명"
                        onInputChange={(event) => props.setHeadCount({ from: props.headCount.from, to: event.target.value })} />
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>
          </ThemeProvider>
        </div >
      </Paper >
    </ThemeProvider >
  )
}

const PartiNumberInput = forwardRef(
  function CustomNumberInput(props: NumberInputProps, ref: React.ForwardedRef<HTMLDivElement>,) {
    return (
      <NumberInput
        slots={{ root: PartiInputRoot, input: PartiInputElement, incrementButton: PartiButton, decrementButton: PartiButton, }}
        slotProps={{
          incrementButton: { children: <AddIcn />, className: 'increment', },
          decrementButton: { children: <RemoveIcn />, },
        }}
        {...props} ref={ref}
      />
    );
  });

const HeadNumberInput = forwardRef(
  function CustomNumberInput(props: NumberInputProps, ref: React.ForwardedRef<HTMLDivElement>) {
    return (
      <NumberInput slots={{ root: HeadInputRoot, input: HeadInputElement, incrementButton: HeadButton, decrementButton: HeadButton, }}
      {...props} ref={ref} />
    );
  });
