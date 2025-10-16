import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Picker from 'react-mobile-picker'
import { InputContainer, CollapseButton } from '@/components/common/input';
import { BottomDrawer } from '@/components/common';

export const InputDateSelect = (props: { title: string; date: dayjs.Dayjs | null; name: string }) => {
  const [dateValue, setDateValue] = useState(!!props.date ? { year: props.date.year(), month: props.date.month() + 1, day: props.date.date() } : undefined)
  const [timeValue, setTimeValue] = useState(!!props.date ? {
    ampm: props.date.hour() < 12 ? '오전' : '오후',
    hour: props.date.hour() > 12 ? props.date.hour() - 12 : props.date.hour(),
    minute: props.date.minute()
  } : undefined)
  let valueText = (!!dateValue && !!timeValue) ? `${dayjs(FormatDate(dateValue, timeValue)).format('YYYY년 M월 DD일 A HH:mm')}` : '날짜 선택하기-';

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!!open && !dateValue) {
      let today = dayjs()
      setDateValue({ year: today.year(), month: today.month() + 1, day: today.date() })
      setTimeValue({ ampm: '오전', hour: 1, minute: 0 })
    }
  }, [open])

  return (
    <InputContainer title={props.title} btn={<CollapseButton type='CAL' valueText={valueText} value={!!dateValue} handleClick={() => { if (!open) { setOpen(true) } }} />}>
      <input type='hidden' name={props.name} value={(!!dateValue && !!timeValue) ? dayjs(FormatDate(dateValue, timeValue)).format() : undefined} />
      <BottomDrawer open={open} toggleOpen={(open: boolean) => setOpen(open)}>
        <div className='flex flex-row px-[16px] pb-[30px]'>
          <div className='flex flex-col flex-1'>
            <span className='py-[20px] text-16'>날짜</span>
            <ScrollPicker options={getOptions('DATE')} data={dateValue} handleData={(value: any) => setDateValue(value)} />
          </div>
          <div className='flex flex-col flex-1'>
            <span className='py-[20px] text-16'>시간</span>
            <ScrollPicker options={getOptions('TIME')} data={timeValue} handleData={(value: any) => setTimeValue(value)} />
          </div>
        </div>
      </BottomDrawer>
    </InputContainer>
  )
}

const FormatDate = (dateValue: any, timeValue: any) => {
  let result = `${dateValue.year}-${dateValue.month}-${dateValue.day}`
  if (timeValue.hour !== 12) {
    return result + ` ${timeValue.ampm === '오후' ? timeValue.hour + 12 : timeValue.hour}:${timeValue.minute}`
  } else {
    return result + ` ${timeValue.ampm === '오후' ? timeValue.hour : timeValue.hour - 12}:${timeValue.minute}`
  }
}

const getOptions = (opt: 'DATE' | 'TIME') => {
  if (opt === 'DATE') {
    return {
      year: Array.from({ length: 2 }, (value, index) => index + dayjs().year()),
      month: Array.from({ length: 12 }, (value, index) => index + 1),
      day: Array.from({ length: dayjs(`${dayjs().year}-${dayjs().month}-1`).daysInMonth() }, (value, index) => index + 1),
    }
  } else {
    return {
      ampm: ['오전', '오후'],
      hour: Array.from({ length: 12 }, (value, index) => index + 1),
      minute: Array.from({ length: 60 }, (value, index) => index),
    }
  }
}

function ScrollPicker({ options, data, handleData }: { options: any; data: any; handleData: (value: any) => void }) {
  return (
    <Picker value={data} onChange={handleData} wheelMode="normal" height={150} itemHeight={26}>
      {Object.keys(options).map(name => (
        <Picker.Column key={name} name={name}>
          {options[name].map((option: string) => (
            <Picker.Item key={option} value={option}>
              {option}
            </Picker.Item>
          ))}
        </Picker.Column>
      ))}
    </Picker>
  )
}