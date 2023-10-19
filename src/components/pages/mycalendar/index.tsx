"use client";
import { useState } from 'react';
import { Tab, Tabs, Box, Button, ThemeProvider, Checkbox, FormControl, FormControlLabel, FormGroup, Divider, } from '@mui/material';
import TabPanel from '@/components/common/TabPanel';
import { FestivalBlock } from '@/components/common/FestivalBlock';
import { likeEvents, postData, partyData } from '@/components/common/Data';
import { likeButtonTheme1, likeButtonTheme2, tabTheme } from '@/components/common/Themes';
import { krLocale } from '@/components/common/CalendarLocale';

import "react-modern-calendar-datepicker/lib/DatePicker.css";
// import { Calendar } from "react-modern-calendar-datepicker";
import { Calendar } from 'react-modern-calendar-datepicker'

const index = () => {
  const [focusDay, setFocusDay] = useState('');

  return (
    <div className='flex flex-col w-full pb-[10px] mt-[60px]'>
      <SearchCalendar focusDay={focusDay} setFocusDay={setFocusDay} />
      <LikedTab />
    </div>
  )
}
export default index;


interface SearchCalendarProps { focusDay: any; setFocusDay: any; }
export function SearchCalendar(props: SearchCalendarProps) {
  return (
    <div>
      <Calendar value={props.focusDay} onChange={props.setFocusDay} locale={krLocale}
        calendarClassName="MyCalendar" />
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
      <Box className='sticky top-[60px] bg-[#FFF] relative z-10'>
        <ThemeProvider theme={tabTheme}>
          <Tabs value={value} onChange={handleChange} className='items-center min-h-0 px-[16px] py-[10px]'>
            <Tab label="페스티벌" />
            <Tab label="지역행사" />
            <Tab label="파티" />
          </Tabs>
        </ThemeProvider>
      </Box>
      <TabPanel value={value} index={0}>
      {postData.map((post, idx) => (
          idx === 0
            ? <FestivalBlock data={post} key={`rec-${idx}`} />
            : <>
              <Divider />
              <FestivalBlock data={post} key={`rec-${idx}`} />
            </>
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
      {postData.map((post, idx) => (
          idx === 0
            ? <FestivalBlock data={post} key={`rec-${idx}`} />
            : <>
              <Divider />
              <FestivalBlock data={post} key={`rec-${idx}`} />
            </>
        ))}
      </TabPanel>
      <TabPanel value={value} index={2}>
      {partyData.map((post, idx) => (
            idx === 0
              ? <FestivalBlock data={post} key={`party-${idx}`} />
              : <>
                <Divider />
                <FestivalBlock data={post} key={`party-${idx}`} />
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