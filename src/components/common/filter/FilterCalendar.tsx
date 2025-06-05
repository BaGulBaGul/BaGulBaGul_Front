"use client";
import DatePicker, { registerLocale } from "react-datepicker";
import { ko } from "date-fns/locale/ko";
import { getMonth, getYear } from "date-fns";
import { ChevronIcn } from "../styles/Icon";

interface FilterCalendarProps { startDate: Date | undefined; endDate: Date | undefined; onChange: any; range?: boolean }
export function FilterCalendar({ startDate, endDate, onChange, range = true }: FilterCalendarProps) {
  registerLocale("ko", ko);
  return (
    <DatePicker onChange={onChange} locale={ko} disabledKeyboardNavigation inline
      {...range ? { startDate: startDate, endDate: endDate, selectsRange: true } : { selected: startDate }}
      renderCustomHeader={({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
        <div className='react-datepicker__current-month flex flex-row justify-between'>
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            <ChevronIcn direction='left' />
          </button>
          <h2>{getMonth(date) + 1}월, {getYear(date)}</h2>
          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            <ChevronIcn direction='right' />
          </button>
        </div>)} />
  )
}