"use client";
import { useEffect } from 'react';
import { call } from '@/service/ApiService';
import { getDaysArray } from '@/service/Functions';
import { ChevronIcn } from '@/components/styles/Icon';
import dayjs from 'dayjs';

import DatePicker, { registerLocale } from "react-datepicker";
import { ko } from "date-fns/locale/ko";
import { getMonth, getYear } from "date-fns";

export function Calendar(props: { focusDay: any; setFocusDay: any; eventDays?: any; displayM: number; setDisplayM: any; setEventDates: any; }) {
  registerLocale("ko", ko);
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