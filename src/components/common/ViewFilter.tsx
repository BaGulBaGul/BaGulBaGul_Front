import { ChangeEvent, forwardRef, useState } from "react";
import { ThemeProvider, FormControl, FormControlLabel, RadioGroup, Radio, Collapse, Checkbox } from "@mui/material";
import { Unstable_NumberInput as NumberInput, NumberInputProps } from '@mui/base'
import {
  viewTheme, viewRadioTheme, viewCheckTheme, HeadInputRoot, HeadInputElement, HeadButton,
  PartiInputRoot, PartiInputElement, PartiButton
} from "./Themes";
import { CalendarIcn, AddIcn, RemoveIcn, CmtLikeIcn, ChevronIcn } from "./Icon";
import DatePicker, { registerLocale } from "react-datepicker";
import { ko } from "date-fns/locale/ko";
import { getMonth, getYear } from "date-fns";
import dayjs from "dayjs";


interface ViewButtonProps { handleOpen: any; cnt: number; fs: number; }
export function ViewButton(props: ViewButtonProps) {
  let buttonStyle = `view-btn ${props.fs === 14 ? 'text-[14px] leading-[160%] min-w-[49px]'
    : 'text-[18px] leading-[140%] pb-[3px] min-w-[55px]'}`
  return (
    <button onClick={props.handleOpen} className={buttonStyle} >
      <div>필터</div>
      {props.cnt > 0 ? <span>{props.cnt}</span> : <></>}
      <img src='/main_filter.svg' />
    </button>
  )
}

interface ViewSelectProps {
  sort: string; setSort: any; setOpen: any; routeToFilter?: any; dateRange: [any, any]; setDateRange: any;
  participants: number; setParticipants: any; headCount?: { from?: number, to?: number }; setHeadCount?: any;
  recruiting?: boolean; setRecruiting?: any; proceeding?: boolean; setProceeding?: any;
}
export function ViewSelect(props: ViewSelectProps) {
  registerLocale("ko", ko);
  // 정렬
  const handleView = (e: ChangeEvent<HTMLInputElement>, newSort: string) => {
    props.setSort(newSort)
  }
  // 모집중
  const handleRecruiting = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setRecruiting(e.target.checked);
  }
  // 종료된 행사 제외
  const handleProceeding = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setProceeding(e.target.checked);
  }
  // 날짜 캘린더
  const [openCal, setOpenCal] = useState(false);
  const handleOpenCal = () => { setOpenCal(!openCal) }
  const [openParti, setOpenParti] = useState(false);
  const handleOpenParti = () => { setOpenParti(!openParti) }
  const [openHead, setOpenHead] = useState(false);
  const handleOpenHead = () => { setOpenHead(!openHead) }

  const headCountString = (from?: number | null, to?: number | null) => {
    if ((from !== undefined && from !== null && from > 0) || (to !== undefined && to !== null && to > 0)) {
      if (from === undefined) { return ` - ${to}` }
      else if (to === undefined) { return `${from} - ` }
      return `${from} - ${to}`
    } else { return '0' }
  }

  const handleClose = () => {
    props.setOpen(false)
    setOpenCal(false)
    setOpenParti(false)
    setOpenHead(false)
    if (props.routeToFilter !== undefined) { props.routeToFilter(); }
  }

  const onChange = (dates: [any, any]) => { props.setDateRange(dates) };
  const [startDate, endDate] = props.dateRange ?? [null, null];

  return (
    <ThemeProvider theme={viewTheme}>
      <div className="w-screen absolute bottom-0 rounded-t-[8px] bg-[#FFF]">
        <div className="flex px-[16px] py-[20px] w-full justify-between items-center border-b-[0.5px] border-gray2">
          <span className="text-[14px] font-semibold">바글바글 필터</span>
          <button onClick={handleClose}><img src='/popup_close.svg' /></button>
        </div>
        <div className="flex flex-col px-[16px] pb-[20px] gap-[16px]">
          <ThemeProvider theme={viewRadioTheme}>
            {props.proceeding === undefined ? <></>
              : <div className="flex flex-row pt-[10px] justify-between" id="filter-proceeding">
                <div className="text-[14px] leading-[160%] pb-[2px]">종료된 행사 제외하기</div>
                <ThemeProvider theme={viewCheckTheme}>
                  <FormControl>
                    <FormControlLabel control={<Checkbox checked={props.proceeding} onChange={handleProceeding} />} label="" />
                  </FormControl>
                </ThemeProvider>
              </div>
            }
            {props.recruiting === undefined ? <></>
              : <div className="flex flex-row pt-[10px] justify-between" id="filter-recruiting">
                <div className="text-[14px] leading-[160%] pb-[2px]">모집 중만 보기</div>
                <ThemeProvider theme={viewCheckTheme}>
                  <FormControl>
                    <FormControlLabel control={<Checkbox checked={props.recruiting} onChange={handleRecruiting} />} label="" />
                  </FormControl>
                </ThemeProvider>
              </div>
            }
            <div className="flex flex-col" id="filter-sort">
              <div className={props.proceeding === undefined && props.recruiting === undefined ? "py-[10px] text-[14px] font-semibold leading-[160%]" : "pb-[10px] text-[14px] font-semibold leading-[160%]"}>정렬</div>
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
                <button onClick={handleOpenCal} className={startDate === null ? 'filter-btn px-[8px] gap-[8px]' : 'filter-btn px-[8px] gap-[8px] border-primary-blue'}>
                  <span className={startDate === null ? '' : "text-primary-blue"}>
                    <CalendarIcn />
                  </span>
                  <span>
                    {startDate === null ? <span>날짜를 선택하세요</span>
                      : endDate === null ? <span>{dayjs(startDate).format('YYYY.MM.DD')} - </span>
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
            <div className="flex flex-col" id="filter-participant">
              <div className="flex flex-row gap-[16px]">
                <span className="text-[14px] font-semibold leading-[160%]">참여인원</span>
                <button onClick={handleOpenParti} className={props.participants > 0 ? 'filter-btn border-primary-blue' : 'filter-btn'}>
                  <CmtLikeIcn val={props.participants > 0} />
                  <span>{props.participants >= 0 ? props.participants : 0}명</span>
                </button>
              </div>
              <Collapse in={openParti} timeout="auto" className="filter-collapse">
                <div className="flex flex-row justify-between mt-[8px]">
                  <span className="text-[14px] leading-[160%]">인원 수</span>
                  <PartiNumberInput value={props.participants ?? 0} min={0}
                    onInputChange={(event) => {
                      props.setParticipants(Number.isNaN(Number(event.target.value)) ? undefined : Number(event.target.value))
                    }}
                    onChange={(event, newValue) => props.setParticipants(Number.isNaN(Number(newValue)) ? undefined : Number(newValue))} />
                </div>
              </Collapse>
            </div>
            {props.headCount === undefined ? <></>
              : <div className="flex flex-col" id="filter-head">
                <div className="flex flex-row gap-[16px]">
                  <span className="text-[14px] font-semibold leading-[160%]">규모설정</span>
                  <button onClick={handleOpenHead}
                    className={(props.headCount.from !== undefined && props.headCount.from > 0)
                      || (props.headCount.to !== undefined && props.headCount.to > 0) ? 'filter-btn border-primary-blue' : 'filter-btn'}>
                    <CmtLikeIcn val={(props.headCount.from !== undefined && props.headCount.from > 0) || (props.headCount.to !== undefined && props.headCount.to > 0)} />
                    <span>{headCountString(props.headCount.from, props.headCount.to)}명</span>
                  </button>
                </div>
                <Collapse in={openHead} timeout="auto" className="filter-collapse">
                  <div className="flex flex-col mt-[8px] gap-[8px]">
                    <span className="text-[14px] leading-[160%]">최소/최대 설정하기</span>
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row justify-between border border-gray2 rounded-[8px] w-[180px] px-[16px] py-[5px]">
                        <span className="text-[14px] leading-[160%] w-[49px]">최소인원</span>
                        <HeadNumberInput placeholder="1명" value={props.headCount.from ?? 0} min={0}
                          onInputChange={(event) => {
                            props.setHeadCount({ from: Number.isNaN(Number(event.target.value)) ? undefined : Number(event.target.value), to: props.headCount!.to })
                          }}
                          onChange={(event, newValue) => props.setHeadCount({ from: Number.isNaN(Number(newValue)) ? undefined : Number(newValue), to: props.headCount!.to })} />
                      </div>
                      <div className="flex flex-row justify-between border border-gray2 rounded-[8px] w-[180px] px-[16px] py-[5px]">
                        <span className="text-[14px] leading-[160%]">최대인원</span>
                        <HeadNumberInput placeholder="10명" value={props.headCount.to ?? 0} min={props.headCount.from}
                          onInputChange={(event) => {
                            props.setHeadCount({ from: props.headCount!.from, to: Number.isNaN(Number(event.target.value)) ? undefined : Number(event.target.value) })
                          }}
                          onChange={(event, newValue) => props.setHeadCount({ from: props.headCount!.from, to: Number.isNaN(Number(newValue)) ? undefined : Number(newValue) })}
                        />
                      </div>
                    </div>
                  </div>
                </Collapse>
              </div>
            }
          </ThemeProvider>
        </div >
      </div >
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
