"use client";
import { useState } from 'react';
import { Tab, Tabs, Box, Button, ThemeProvider, Checkbox, Divider } from '@mui/material';
import TabPanel from '@/components/common/TabPanel';
import { CalendarBlock } from '@/components/common/FestivalBlock';
import { likeEvents, postData, partyData } from '@/components/common/Data';
import { likeButtonTheme1, likeButtonTheme2, tabTheme, deleteButtonTheme } from '@/components/common/Themes';
import { krLocale } from '@/components/common/CalendarLocale';

import "react-modern-calendar-datepicker/lib/DatePicker.css";
// import { Calendar } from "react-modern-calendar-datepicker";
import { Calendar } from 'react-modern-calendar-datepicker'

const index = () => {
  const [focusDay, setFocusDay] = useState('');

  const testdates = ['2023-11-08T13:18:08.827Z', '2023-11-13T13:18:08.827Z', '2023-11-23T13:18:08.827Z', '2023-11-28T13:18:08.827Z']

  return (
    <div className='flex flex-col w-full pb-[10px] mt-[60px]'>
      <MyCalendar focusDay={focusDay} setFocusDay={setFocusDay} eventDays={testdates} />
      <LikedTab />
    </div>
  )
}
export default index;


interface MyCalendarProps { focusDay: any; setFocusDay: any; eventDays?: any; }
export function MyCalendar(props: MyCalendarProps) {
  let eventDays: any = []
  props.eventDays.forEach((date: string) => {
    const dateD = new Date(date)
    eventDays.push({ year: dateD.getFullYear(), month: dateD.getMonth() + 1, day: dateD.getDate(), className: 'eventDay' })
  })

  return (
    <div>
      <Calendar value={props.focusDay} onChange={props.setFocusDay} locale={krLocale}
        calendarClassName="MyCalendar" customDaysClassName={eventDays} />
    </div>
  )
}

function LikedTab() {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => { setValue(newValue); };

  const [view, setView] = useState({ festival: true, accompany: true });
  const handleView = (e: React.ChangeEvent<HTMLInputElement>) => {
    if ((view.festival !== view.accompany) && !e.target.checked) {
      setView({ festival: true, accompany: true })
    } else {
      setView({ ...view, [e.target.value]: e.target.checked });
    }
  }

  return (
    <Box className='w-full px-0'>
      <Box className='sticky top-[60px] bg-[#FFF] relative z-10 px-[16px] pt-[20px] pb-[10px]'>
        <div className='flex justify-between items-center'>
          <ThemeProvider theme={tabTheme}>
            <Tabs value={value} onChange={handleChange} className='items-center min-h-0'>
              <Tab label="페스티벌" />
              <Tab label="지역행사" />
              <Tab label="파티" />
            </Tabs>
          </ThemeProvider>
          <ThemeProvider theme={deleteButtonTheme}><Button>전체삭제</Button></ThemeProvider>
        </div>
      </Box>
      <TabPanel value={value} index={0}>
        {postData.map((post, idx) => (
          idx === 0
            ? <CalendarBlock data={post} key={`rec-${idx}`} />
            : <>
              <Divider />
              <CalendarBlock data={post} key={`rec-${idx}`} />
            </>
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {postData.map((post, idx) => (
          idx === 0
            ? <CalendarBlock data={post} key={`rec-${idx}`} />
            : <>
              <Divider />
              <CalendarBlock data={post} key={`rec-${idx}`} />
            </>
        ))}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {partyData.map((post, idx) => (
          idx === 0
            ? <CalendarBlock data={post} key={`party-${idx}`} />
            : <>
              <Divider />
              <CalendarBlock data={post} key={`party-${idx}`} />
            </>
        ))}
      </TabPanel>
    </Box>
  )

  interface LikePostProps { title: string; date: string; type: string; eventId: number; }
  function LikePostBlock(props: LikePostProps) {
    const [checked, setChecked] = useState(true);
    const handleChange = (event: any) => { setChecked(!checked); };

    return (
      <div className='flex flex-col px-[16px] py-[10px] gap-[4px]'>
        <div className='flex flex-row gap-[6px]'>
          <ThemeProvider theme={likeButtonTheme1}>
            <Button disabled>{likeEvents[props.eventId]}</Button>
          </ThemeProvider>
          {
            props.type === 'ACCOMPANY'
              ? <ThemeProvider theme={likeButtonTheme2}><Button disabled>모집글</Button></ThemeProvider>
              : <></>
          }
        </div>
        <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-col'>
            <span className='text-[12px] text-[#757575]'>{props.date}</span>
            <span className='text-[14px]'>{props.title}</span>
          </div>
          <Checkbox icon={<img src="/detail_like.svg" width={24} height={24} />}
            checkedIcon={<img src="/detail_like_1.svg" width={24} height={24} />}
            checked={checked} onChange={handleChange} />
        </div>
      </div>
    )
  }
}