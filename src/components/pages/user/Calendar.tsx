"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DatePicker, { registerLocale } from "react-datepicker";
import { call } from '@/service/ApiService';
import { getEvents } from '@/service/Functions';
import { ChevronIcn } from '@/components/common/styles/Icon';
import { CalendarTab } from '.';
import { CalProps } from '@/components/common';

import dayjs from 'dayjs';
import { ko } from "date-fns/locale/ko";
import { getMonth, getYear } from "date-fns";

export function Calendar() {
  registerLocale("ko", ko);
  const [isLoading, setLoading] = useState(true)
  const [focusDay, setFocusDay] = useState<Date | null>(new Date());
  const [displayM, setDisplayM] = useState(dayjs().month() + 1)
  const [eventDates, setEventDates] = useState([]);
  const [events, setEvents] = useState<{ [key: string]: any[] }>();
  const router = useRouter();

  useEffect(() => {
    if (focusDay && focusDay.getMonth() + 1 !== displayM) { setDisplayM(focusDay.getMonth() + 1) }
  }, [focusDay])

  return (
    <div className='flex flex-col w-full pb-[10px] mt-[60px] gap-[8px]'>
      <div className='flex flex-col items-center w-full bg-p-white' id='calendar'>
        <div className='w-[414px]'>
          <DatePicker selected={focusDay} onChange={(date) => setFocusDay(date)} highlightDates={eventDates}
            locale={ko} disabledKeyboardNavigation inline
            renderCustomHeader={({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
              <CalendarHeader date={date} decreaseMonth={decreaseMonth} increaseMonth={increaseMonth} displayM={displayM} setDisplayM={setDisplayM}
                prevMonthButtonDisabled={prevMonthButtonDisabled} nextMonthButtonDisabled={nextMonthButtonDisabled} setEventDates={setEventDates}
                setEvents={setEvents} setLoading={setLoading} />
            )}
          />
        </div>
      </div>
      <CalendarTab focusDay={focusDay} events={events} isLoading={isLoading} router={router} />
    </div>
  )
}

interface CalendarHeaderProps {
  date: Date, decreaseMonth: VoidFunction, increaseMonth: VoidFunction, prevMonthButtonDisabled: boolean, nextMonthButtonDisabled: boolean,
  displayM: number, setDisplayM: any, setEventDates: any, setEvents: any, setLoading: any
}
function CalendarHeader(props: CalendarHeaderProps) {
  const handlePrev = () => { props.decreaseMonth(); props.setDisplayM(props.displayM - 1) }
  const handleNext = () => { props.increaseMonth(); props.setDisplayM(props.displayM + 1) }
  useEffect(() => {
    let sD = `${getYear(props.date)}-${String(getMonth(props.date) + 1).padStart(2, "0")}-01`
    let eD = `${getYear(props.date)}-${String(getMonth(props.date) + 1).padStart(2, "0")}-${dayjs(props.date).daysInMonth()}`
    let apiURL1 = `/api/user/calendar/event?searchStartTime=${sD}T00:00:00&searchEndTime=${eD}T23:59:59`
    let apiURL2 = `/api/user/calendar/recruitment?searchStartTime=${sD}T00:00:00&searchEndTime=${eD}T23:59:59`
    let calData: CalProps[] = [];
    async function getCalData() {
      try {
        const dataE = await call(apiURL1, "GET", null);
        const dataR = await call(apiURL2, "GET", null);
        calData = dataE.data.concat(dataR.data)
        if (calData.length > 0) {
          getEvents(calData, props.setEventDates, props.setEvents)
          props.setLoading(false)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getCalData()
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