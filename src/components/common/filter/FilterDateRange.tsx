"use client";
import { FormatDateRange } from "@/service/Functions";
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import dayjs from "dayjs";
import { ko } from "date-fns/locale/ko";
import { getMonth, getYear } from "date-fns";
import { IconArrowBack } from "../styles/Icon";
import { InputCollapse } from "../input";


export function FilterDateRange({ prevMin, prevMax, title }: { prevMin: any; prevMax: any; title?: string }) {
  const sD = !!prevMin ? dayjs(prevMin, 'YYYYMMDD').toDate() : undefined
  const eD = !!prevMax ? dayjs(prevMax, 'YYYYMMDD').toDate() : undefined
  const [dateRange, setDateRange] = useState<(Date | undefined)[]>([sD, eD])
  return (
    <>
      {/* form에서 값 추출용 미노출 input 추가 */}
      <input type='hidden' name='sD' value={!!dateRange[0] ? dayjs(dateRange[0]).format('YYYYMMDD') : undefined} />
      <input type='hidden' name='eD' value={!!dateRange[1] ? dayjs(dateRange[1]).format('YYYYMMDD') : undefined} />
      <InputCollapse title={title ?? '날짜선택'} type='CAL' value={(!dateRange[0] || !dateRange[1]) ? '' : FormatDateRange(dateRange[0], dateRange[1])}>
        <Calendar startDate={dateRange[0]} endDate={dateRange[1]} onChange={(dates: [any, any]) => { setDateRange(dates) }} />
      </InputCollapse>
    </>
  )
}

interface Props { startDate: Date | undefined; endDate: Date | undefined; onChange: any; }
function Calendar({ startDate, endDate, onChange }: Props) {
  registerLocale("ko", ko);
  return (
    <DatePicker name={'dateRange'} onChange={onChange} locale={ko} disabledKeyboardNavigation
      swapRange inline
      shouldCloseOnSelect={false} open={true}
      showPopperArrow={false} popperPlacement="bottom" popperClassName="w-full h-[400px]"
      wrapperClassName="w-full h-full"
      {...{ startDate: startDate, endDate: endDate, selectsRange: true }}
      renderCustomHeader={({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
        <div className='react-datepicker__current-month flex flex-row justify-between'>
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            <IconArrowBack />
          </button>
          <h2>{getMonth(date) + 1}월, {getYear(date)}</h2>
          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} className="rotate-180">
            <IconArrowBack />
          </button>
        </div>)} />
  )
}