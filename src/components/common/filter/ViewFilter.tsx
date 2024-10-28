"use client";
import { ChangeEvent, useState } from "react";
import { ThemeProvider, FormControl, FormControlLabel, RadioGroup, Radio, Collapse, Checkbox } from "@mui/material";
import { CalIcn, ChevronIcn, DeleteIcn } from "../styles/Icon";
import DatePicker, { registerLocale } from "react-datepicker";
import { ko } from "date-fns/locale/ko";
import { getMonth, getYear } from "date-fns";
import dayjs from "dayjs";
import { HeadSelect, PartiSelect } from "../Select";
import { FilterProps } from "..";
import { viewTheme, viewRadioTheme, viewCheckTheme } from "./ViewFilterTheme";

interface ViewButtonProps { handleOpen: any; cnt: number; fs: 14 | 18; }
export function ViewButton(props: ViewButtonProps) {
  return (
    <button onClick={props.handleOpen} className={`view-btn ${props.fs === 14 ? 'text-14 min-w-[49px]' : 'text-18 pb-[3px] min-w-[55px]'}`} >
      <div>필터</div>
      {props.cnt > 0 ? <span>{props.cnt}</span> : <></>}
      <FilterIcn />
    </button>
  )
}

const FilterIcn = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 7.14307H6C5.45 7.14307 5 6.80557 5 6.39307C5 5.98057 5.45 5.64307 6 5.64307H18C18.55 5.64307 19 5.98057 19 6.39307C19 6.80557 18.55 7.14307 18 7.14307Z" fill="#6C6C6C" />
    <path d="M18 12.75H6C5.45 12.75 5 12.4125 5 12C5 11.5875 5.45 11.25 6 11.25H18C18.55 11.25 19 11.5875 19 12C19 12.4125 18.55 12.75 18 12.75Z" fill="#6C6C6C" />
    <path d="M18 18.3569H6C5.45 18.3569 5 18.0194 5 17.6069C5 17.1944 5.45 16.8569 6 16.8569H18C18.55 16.8569 19 17.1944 19 17.6069C19 18.0194 18.55 18.3569 18 18.3569Z" fill="#6C6C6C" />
    <circle cx="9.43555" cy="6.39307" r="1.5" fill="white" stroke="#6C6C6C" strokeWidth="1.5" />
    <circle cx="9.43555" cy="17.6069" r="1.5" fill="white" stroke="#6C6C6C" strokeWidth="1.5" />
    <circle cx="14.5645" cy="12" r="1.5" fill="white" stroke="#6C6C6C" strokeWidth="1.5" />
  </svg>
)

interface ViewSelectProps { p: FilterProps; setP: any; setOpen: any; routeToFilter?: any; }
export function ViewSelect(props: ViewSelectProps) {
  registerLocale("ko", ko);
  const handleView = (e: ChangeEvent<HTMLInputElement>, newSort: string) => { props.setP((prev: any) => ({ ...prev, sort: newSort })) }
  const handleRecruiting = (e: React.ChangeEvent<HTMLInputElement>) => { props.setP((prev: any) => ({ ...prev, recruiting: e.target.checked })) }
  const handleProceeding = (e: React.ChangeEvent<HTMLInputElement>) => { props.setP((prev: any) => ({ ...prev, proceeding: e.target.checked })) }
  const setParticipants = (value: number) => { props.setP((prev: any) => ({ ...prev, participants: value })) }
  const setHeadCount = (value: any) => { props.setP((prev: any) => ({ ...prev, headCount: value })) }
  
  const [openCal, setOpenCal] = useState(false);
  const handleOpenCal = () => { setOpenCal(!openCal) }
  const [openParti, setOpenParti] = useState(false);
  const handleOpenParti = () => { setOpenParti(!openParti) }
  const [openHead, setOpenHead] = useState(false);
  const handleOpenHead = () => { setOpenHead(!openHead) }

  const handleClose = () => {
    props.setOpen(false)
    setOpenCal(false)
    setOpenParti(false)
    setOpenHead(false)
    if (props.routeToFilter !== undefined) { props.routeToFilter(); }
  }

  const onChange = (dates: [any, any]) => { props.setP((prev: any) => ({ ...prev, dateRange: dates })) };
  const [startDate, endDate] = props.p.dateRange ?? [undefined, undefined];

  return (
    <ThemeProvider theme={viewTheme}>
      <div className="w-screen absolute bottom-0 rounded-t-[8px] bg-p-white">
        <div className="flex justify-between items-center w-full px-[16px] py-[20px] border-b-[0.5px] border-gray2">
          <span className="text-16 font-semibold">바글바글 필터</span>
          <button onClick={handleClose}><DeleteIcn /></button>
        </div>
        <div className="flex flex-col px-[16px] pb-[20px] gap-[16px]">
          <ThemeProvider theme={viewRadioTheme}>
            {props.p.proceeding === undefined ? <></>
              : <div className="flex flex-row justify-between pt-[10px]" id="filter-proceeding">
                <div className="text-14 pb-[2px]">종료된 행사 제외하기</div>
                <ThemeProvider theme={viewCheckTheme}>
                  <FormControl>
                    <FormControlLabel control={<Checkbox checked={props.p.proceeding} onChange={handleProceeding} />} label="" />
                  </FormControl>
                </ThemeProvider>
              </div>
            }
            {props.p.recruiting === undefined ? <></>
              : <div className="flex flex-row justify-between pt-[10px]" id="filter-recruiting">
                <div className="text-14 pb-[2px]">모집 중만 보기</div>
                <ThemeProvider theme={viewCheckTheme}>
                  <FormControl>
                    <FormControlLabel control={<Checkbox checked={props.p.recruiting} onChange={handleRecruiting} />} label="" />
                  </FormControl>
                </ThemeProvider>
              </div>
            }
            <div className="flex flex-col" id="filter-sort">
              <div className={props.p.proceeding === undefined && props.p.recruiting === undefined ? "py-[10px] text-14 font-semibold" : "pb-[10px] text-14 font-semibold"}>정렬</div>
              <FormControl>
                <RadioGroup row value={props.p.sort} onChange={handleView}>
                  <FormControlLabel value="createdAt,desc" control={<Radio />} label="최신순" />
                  <FormControlLabel value="views,desc" control={<Radio />} label="조회수" />
                  <FormControlLabel value="likeCount,desc" control={<Radio />} label="좋아요수" />
                  <FormControlLabel value="commentCount,desc" control={<Radio />} label="댓글수" />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="flex flex-col" id="filter-date">
              <div className="flex flex-row gap-[16px]">
                <div className="text-14 font-semibold">날짜선택</div>
                <button onClick={handleOpenCal} className={`filter-btn px-[8px] gap-[8px] ${!!startDate ? 'border-primary-blue':''}`}>
                  <span className={!!startDate ? "text-primary-blue":''}>
                    <CalIcn val={false} color="currentColor" />
                  </span>
                  <span>
                    {!startDate ? <span>날짜를 선택하세요</span>
                      : !endDate ? <span>{dayjs(startDate).format('YYYY.MM.DD')} - </span>
                        : <span>{`${dayjs(startDate).format('YYYY.MM.DD')} - ${dayjs(endDate).format('YYYY.MM.DD')}`}</span>
                    }
                  </span>
                </button>
              </div>
              <Collapse in={openCal} timeout="auto" className="filter-collapse">
                <DatePicker startDate={startDate} endDate={endDate} onChange={onChange} locale={ko} disabledKeyboardNavigation selectsRange inline
                  renderCustomHeader={({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
                    <div className='react-datepicker__current-month flex flex-row justify-between'>
                      <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                        <ChevronIcn direction='left' />
                      </button>
                      <h2>{getMonth(date) + 1}월, {getYear(date)}</h2>
                      <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                        <ChevronIcn direction='right' />
                      </button>
                    </div>)}
                />
              </Collapse>
            </div>
            <PartiSelect openParti={openParti} handleOpenParti={handleOpenParti} participants={props.p.participants} setParticipants={setParticipants} />
            {props.p.headCount === undefined ? <></>
              : <HeadSelect openHead={openHead} handleOpenHead={handleOpenHead} headCount={props.p.headCount} setHeadCount={setHeadCount} />
            }
          </ThemeProvider>
        </div >
      </div >
    </ThemeProvider >
  )
}