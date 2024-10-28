import { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import { ChevronIcn } from '@/components/common/styles/Icon';

import dayjs from 'dayjs';
import { ko } from "date-fns/locale/ko";
import { useCalendarData } from '@/hooks/useInCalendar';

interface CalendarProps { focusDay: any; setFocusDay: any; }
export function Calendar(props: CalendarProps) {
  registerLocale("ko", ko);
  const [displayM, setDisplayM] = useState<{ y: number, m: number }>({ y: dayjs().year(), m: dayjs().month() + 1 })
  useEffect(() => {
    if (props.focusDay && props.focusDay.getMonth() + 1 !== displayM.m) {
      setDisplayM({ y: props.focusDay.getFullYear(), m: props.focusDay.getMonth() + 1 })
    }
  }, [props.focusDay])

  let events = useCalendarData(displayM)
  return (
    <div className='w-[414px]'>
      <DatePicker selected={props.focusDay} onChange={(date) => props.setFocusDay(date)}
        highlightDates={events.data?.dates}
        locale={ko} disabledKeyboardNavigation inline
        renderCustomHeader={({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
          <CalendarHeader date={date} decreaseMonth={decreaseMonth} increaseMonth={increaseMonth}
            prevMonthButtonDisabled={prevMonthButtonDisabled} nextMonthButtonDisabled={nextMonthButtonDisabled}
            displayM={displayM} setDisplayM={setDisplayM} />)}
      />
    </div>
  )
}

interface CalendarHeaderProps {
  date: Date, decreaseMonth: VoidFunction, increaseMonth: VoidFunction, prevMonthButtonDisabled: boolean, nextMonthButtonDisabled: boolean,
  displayM: { y: number, m: number }, setDisplayM: any
}
function CalendarHeader(props: CalendarHeaderProps) {
  const handlePrev = () => { props.decreaseMonth(); props.setDisplayM({ y: props.date.getFullYear(), m: props.displayM.m - 1 }) }
  const handleNext = () => { props.increaseMonth(); props.setDisplayM({ y: props.date.getFullYear(), m: props.displayM.m + 1 }) }
  return (
    <div className='react-datepicker__current-month flex flex-row justify-between'>
      <h2>{props.date.getMonth() + 1}월, {props.date.getFullYear()}</h2>
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