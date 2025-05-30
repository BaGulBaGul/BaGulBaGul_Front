"use client";
import { ChevronIcn } from "../styles/Icon";
import DatePicker, { registerLocale } from "react-datepicker";
import { ko } from "date-fns/locale/ko";
import { getMonth, getYear } from "date-fns";
import { NumberField } from '@base-ui-components/react/number-field';

// 헤더 분리 작업중
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

interface FilterNumberProps { value: number; onChange: (value: number | null, event: Event | undefined) => void }
export function FilterNumber({ value, onChange }: FilterNumberProps) {
  return (
    <div className="flex flex-row justify-between">
      <span className="text-14">인원 수</span>
      <NumberField.Root defaultValue={100} value={value} onValueChange={onChange} min={0}>
        <NumberField.Group className='flex'>
          <NumberField.Decrement>
            <MinusIcn />
          </NumberField.Decrement>
          <NumberField.Input placeholder="1" className="w-[35px] text-center text-14" />
          <NumberField.Increment>
            <PlusIcn />
          </NumberField.Increment>
        </NumberField.Group>
      </NumberField.Root>
    </div>
  )
}

const MinusIcn = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z" fill="black" />
  </svg>
)
const PlusIcn = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 13H13V18C13 18.55 12.55 19 12 19C11.45 19 11 18.55 11 18V13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H11V6C11 5.45 11.45 5 12 5C12.55 5 13 5.45 13 6V11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z" fill="black" />
  </svg>
)

interface NumberInputProps { value?: number; onChange: any; min?: number; }
interface FilterNumberRange { minNumber: NumberInputProps; maxNumber: NumberInputProps; }
export function FilterNumberRange({ minNumber, maxNumber }: FilterNumberRange) {
  return (
    <div className="flex flex-col gap-[8px]">
      <span className="text-14">최소/최대 설정하기</span>
      <div className="flex flex-row justify-between gap-[22px]">
        <NumberInput title="최소인원" {...minNumber} />
        <NumberInput title="최대인원" {...maxNumber} />
      </div>
    </div>
  )
}

function NumberInput({ title, value, onChange, min }: { title: string } & NumberInputProps) {
  return (
    <div className="flex flex-row justify-between border border-gray2 rounded-[8px] w-full px-[16px] py-[5px] gap-[8px]">
      <span className="text-14 w-[49px] text-wrap">{title}</span>
      <NumberField.Root value={value} onValueChange={onChange} min={min}>
        <NumberField.Input placeholder="1명" className="w-full max-w-[85px] text-right text-14" />
      </NumberField.Root>
    </div>
  )
}