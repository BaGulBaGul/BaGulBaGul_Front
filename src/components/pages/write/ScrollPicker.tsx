import { useState } from 'react';
import { Modal } from '@mui/material'
import dayjs from 'dayjs';
import Picker from 'react-mobile-picker'

// 초기값 처리 추가 필요
export function ScrollPicker(props: { open: boolean, data: dayjs.Dayjs | null, handleClose: any }) {
  const data = dayjs(props.data) ?? dayjs()
  const [dateValue, setDateValue] = useState({ year: data.year(), month: data.month() + 1, day: data.date() })
  const [timeValue, setTimeValue] = useState({
    ampm: data.hour() < 12 ? '오전' : '오후',
    hour: data.hour() > 12 ? data.hour() - 12 : data.hour(),
    minute: data.minute()
  })

  const handleClose = () => {
    let hourV = timeValue.ampm === '오후' ? timeValue.hour + 12 : timeValue.hour
    console.log(`${dateValue.year}-${dateValue.month}-${dateValue.day} ${hourV}:${timeValue.minute}`)
    props.handleClose(dayjs(`${dateValue.year}-${dateValue.month}-${dateValue.day} ${hourV}:${timeValue.minute}`), false)
  }

  const dateOptions: { [key: string]: any[] } = {
    year: Array.from({ length: 2 }, (value, index) => index + dayjs().year()),
    month: Array.from({ length: 12 }, (value, index) => index + 1),
    day: Array.from({ length: dayjs(`${dateValue.year}-${dateValue.month}-1`).daysInMonth() }, (value, index) => index + 1),
  }
  const timeOptions: { [key: string]: any[] } = {
    ampm: ['오전', '오후'],
    hour: Array.from({ length: 12 }, (value, index) => index + 1),
    minute: Array.from({ length: 60 }, (value, index) => index),
  }

  const pickerItem = (options: string[], labelText?: string) => {
    return options.map((option) => (
      <Picker.Item key={option} value={option}>
        {({ selected }) => (
          <div className={`picker-item ${selected ? 'picker-item-selected' : ''}`}>{option}{labelText ?? ''}</div>
        )}
      </Picker.Item>
    ))
  }
  return (
    <Modal open={props.open} onClose={handleClose} >
      <div className="flex flex-row w-screen px-[16px] pb-[30px] absolute bottom-0 rounded-t-[8px] bg-p-white">
        <div className='flex flex-col flex-1'>
          <span className='py-[20px] text-16'>날짜</span>
          <div className='py-[10px]'>
            <Picker value={dateValue} onChange={setDateValue} height={74} itemHeight={26}
              wheelMode="normal" className='picker-container'>
              <Picker.Column name="year">{pickerItem(dateOptions.year, '년')}</Picker.Column>
              <Picker.Column name="month">{pickerItem(dateOptions.month, '월')}</Picker.Column>
              <Picker.Column name="day">{pickerItem(dateOptions.day, '일')}</Picker.Column>
            </Picker>
          </div>
        </div>
        <div className='flex flex-col flex-1 ps-[40px]'>
          <span className='py-[20px] text-16'>시간</span>
          <Picker value={timeValue} onChange={setTimeValue} height={74} itemHeight={26}
            wheelMode="normal" className='picker-container'>
            {Object.keys(timeOptions).map(name => (
              <Picker.Column key={name} name={name}>
                {pickerItem(timeOptions[name])}
              </Picker.Column>
            ))}
          </Picker>
        </div>
      </div>
    </Modal>
  )
}