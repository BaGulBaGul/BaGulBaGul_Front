import DatePicker, { registerLocale } from "react-datepicker";
import { ChevronIcn } from '@/components/common/styles/Icon';
import { ko } from "date-fns/locale/ko";

interface CalendarProps { focusDay: any; setFocusDay: any; displayM: { y: number, m: number }; setDisplayM: any; events: any; }
export function Calendar(props: CalendarProps) {
  registerLocale("ko", ko);
  return (
    <div className='w-[414px]'>
      <DatePicker selected={props.focusDay} onChange={(date) => props.setFocusDay(date)}
        highlightDates={props.events.data?.dates}
        locale={ko} disabledKeyboardNavigation inline
        renderCustomHeader={({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
          <CalendarHeader date={date} decreaseMonth={decreaseMonth} increaseMonth={increaseMonth}
            prevMonthButtonDisabled={prevMonthButtonDisabled} nextMonthButtonDisabled={nextMonthButtonDisabled}
            displayM={props.displayM} setDisplayM={props.setDisplayM} />)} />
    </div>
  )
}

interface CalendarHeaderProps {
  date: Date, decreaseMonth: VoidFunction, increaseMonth: VoidFunction, prevMonthButtonDisabled: boolean, nextMonthButtonDisabled: boolean,
  displayM: { y: number, m: number }, setDisplayM: any
}
function CalendarHeader(props: CalendarHeaderProps) {
  const handlePrev = () => {
    props.decreaseMonth();
    props.setDisplayM({ y: props.displayM.m > 1 ? props.date.getFullYear() : props.date.getFullYear() - 1, m: props.displayM.m > 1 ? props.displayM.m - 1 : 12 })
  }
  const handleNext = () => {
    props.increaseMonth();
    props.setDisplayM({ y: props.displayM.m < 12 ? props.date.getFullYear() : props.date.getFullYear() + 1, m: props.displayM.m < 12 ? props.displayM.m + 1 : 1 })
  }
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