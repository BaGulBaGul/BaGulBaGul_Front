"use client";
import { useEffect, useState } from 'react';
import { CalendarBlock } from '@/components/common/EventBlock';
import { CalProps, NoEvent, Divider } from '@/components/common';
import { call } from '@/service/ApiService';
import { getDaysArray, setUniqueList } from '@/service/Functions';
import { ChevronIcn } from '@/components/common/Icon';
import dayjs from 'dayjs';

import DatePicker, { registerLocale } from "react-datepicker";
import { ko } from "date-fns/locale/ko";
import { getMonth, getYear } from "date-fns";

const index = () => {
  registerLocale("ko", ko);
  const [focusDay, setFocusDay] = useState<Date | null>(new Date());
  const [displayM, setDisplayM] = useState(dayjs().month() + 1)
  const [eventDates, setEventDates] = useState([]);

  return (
    <div className='flex flex-col w-full h-full pb-[10px] mt-[60px] gap-[8px]'>
      <MyCalendar focusDay={focusDay} setFocusDay={setFocusDay} eventDays={eventDates} displayM={displayM} setDisplayM={setDisplayM} setEventDates={setEventDates} />
      <CalTab focusDay={focusDay} setEventDates={setEventDates} />
    </div>
  )
}
export default index;

export function MyCalendar(props: { focusDay: any; setFocusDay: any; eventDays?: any; displayM: number; setDisplayM: any; setEventDates: any; }) {
  return (
    <div className='flex flex-col items-center w-full bg-p-white'>
      <div className='w-[414px]'>
        <DatePicker selected={props.focusDay} onChange={(date) => props.setFocusDay(date)} highlightDates={props.eventDays}
          locale={ko} disabledKeyboardNavigation inline
          renderCustomHeader={({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
            <CalendarHeader date={date} decreaseMonth={decreaseMonth} increaseMonth={increaseMonth} displayM={props.displayM} setDisplayM={props.setDisplayM}
              prevMonthButtonDisabled={prevMonthButtonDisabled} nextMonthButtonDisabled={nextMonthButtonDisabled} setEventDates={props.setEventDates} />
          )}
        />
      </div>
    </div>
  )
}

interface CalendarHeaderProps {
  date: Date, decreaseMonth: VoidFunction, increaseMonth: VoidFunction, prevMonthButtonDisabled: boolean, nextMonthButtonDisabled: boolean,
  displayM: number, setDisplayM: any, setEventDates: any
}
const CalendarHeader = (props: CalendarHeaderProps) => {
  const handlePrev = () => { props.decreaseMonth(); props.setDisplayM(props.displayM - 1) }
  const handleNext = () => { props.increaseMonth(); props.setDisplayM(props.displayM + 1) }
  useEffect(() => {
    let sD = `${getYear(props.date)}-${String(getMonth(props.date) + 1).padStart(2, "0")}-01`
    let eD = `${getYear(props.date)}-${String(getMonth(props.date) + 1).padStart(2, "0")}-${dayjs(props.date).daysInMonth()}`
    let apiURL1 = `/api/user/calendar/event?searchStartTime=${sD}T00:00:00&searchEndTime=${eD}T23:59:59`
    console.log(apiURL1)
    call(apiURL1, "GET", null)
      .then((response) => {
        console.log(response);
        if (response.data.length > 0) {
          getDaysArray(response.data, props.setEventDates);
        }
      })
  }, [props.displayM])

  return (
    <div className='react-datepicker__current-month flex flex-row justify-between'>
      <h2>{getMonth(props.date) + 1}월, {getYear(props.date)}</h2>
      <div className='flex flex-row gap-[12px]'>
        <button onClick={handlePrev} disabled={props.prevMonthButtonDisabled}>
          <ChevronIcn direction='left' />
        </button>
        <button onClick={handleNext} disabled={props.nextMonthButtonDisabled}>
          <ChevronIcn direction='right' />
        </button>
      </div>
    </div>
  )
}

function CalTab(props: { focusDay: any; setEventDates: any; }) {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => { setValue(newValue); };

  const [events, setEvents] = useState<CalProps[]>([]);

  useEffect(() => {
    let dateS = dayjs(props.focusDay).format('YYYY-MM-DD')
    let apiURL = `/api/user/calendar/event?searchStartTime=${dateS}T00:00:00&searchEndTime=${dateS}T23:59:59`
    call(apiURL, "GET", null)
      .then((response) => {
        console.log(response);
        if (response.data.length > 0) { setUniqueList('CAL', response.data, setEvents, events) }
        else { setEvents([]) }
      })
  }, [props.focusDay])

  return ( <CalTabBlock events={events} /> )
}

const CalTabBlock = (props: { events?: CalProps[]; }) => {
  return (
    <div className='w-full' >
      {props.events && props.events.length > 0
        ? <>
          {props.events.map((post, idx) => (
            <div key={`event-${idx}`} className='bg-white'>
              {idx === 0 ? <></> : <Divider />}
              <CalendarBlock data={post} key={`cal-${idx}`} />
            </div>
          ))}
          {/* {props.page.total > 1 && props.page.current + 1 < props.page.total
              ? <MoreButton onClick={handleMore} /> : <></>
            } */}
        </>
        : <NoEvent text1="저장된 이벤트가 없어요." text2="지금 인기 있는 페스티벌을 저장해보세요!" buttonText={"페스티벌 인기순 보러가기"} />
      }
    </div>
  )
}