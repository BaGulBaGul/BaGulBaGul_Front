"use client";
import { useEffect, useState } from 'react';
import { Tab, Tabs, Box, Button, ThemeProvider, Checkbox, Divider } from '@mui/material';
import TabPanel from '@/components/common/TabPanel';
import { CalendarBlock } from '@/components/common/EventBlock';
import { postData, partyData } from '@/components/common/Data';
import { tabTheme, deleteButtonTheme } from '@/components/common/Themes';
import { krLocale } from '@/components/common/CalendarLocale';

import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from '@hassanmojab/react-modern-calendar-datepicker'
import { CalProps, NoEvent } from '@/components/common';
import { call } from '@/service/ApiService';
import { setUniqueList } from '@/service/Functions';

const index = () => {
  let now = new Date();
  const [focusDay, setFocusDay] = useState({ day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear() });

  const testdates = ['2024-06-08T13:18:08.827Z', '2024-06-13T13:18:08.827Z', '2024-06-23T13:18:08.827Z', '2024-06-28T13:18:08.827Z']

  return (
    <div className='flex flex-col w-full pb-[10px] mt-[60px]'>
      <MyCalendar focusDay={focusDay} setFocusDay={setFocusDay} eventDays={testdates} />
      <CalTab focusDay={focusDay} />
    </div>
  )
}
export default index;

export function MyCalendar(props: { focusDay: any; setFocusDay: any; eventDays?: any; }) {
  let eventDays: any = []
  props.eventDays.forEach((date: string) => {
    const dateD = new Date(date)
    eventDays.push({ year: dateD.getFullYear(), month: dateD.getMonth() + 1, day: dateD.getDate(), className: 'eventDay' })
  })

  return (
    <div className='flex flex-col w-full items-center'>
      <div className='w-[414px]'>
        <Calendar value={props.focusDay} onChange={props.setFocusDay} locale={krLocale}
          calendarClassName="MyCalendar" customDaysClassName={eventDays} />
      </div>
    </div>
  )
}

function CalTab(props: { focusDay: any; }) {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => { setValue(newValue); };

  const [events, setEvents] = useState<CalProps[]>([]);

  useEffect(() => {
    let dateS = `${props.focusDay.year}-${String(props.focusDay.month).padStart(2, "0")}-${String(props.focusDay.day).padStart(2, "0")}`
    let apiURL = `/api/user/calendar/event?searchStartTime=${dateS}T00:00:00&searchEndTime=${dateS}T23:59:59`
    call(apiURL, "GET", null)
      .then((response) => {
        console.log(response);
        if (response.data.length > 0) {
          setUniqueList('CAL', response.data, setEvents, undefined, undefined, events)
        } else {
          setEvents([])
        }
      })
  }, [props.focusDay])

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
      {/* // * CalendarBlock 수정 필요 */}
      <TabPanel value={value} index={0}>
        <CalTabBlock events={events} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CalTabBlock events={events} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CalTabBlock events={events} />
      </TabPanel>
    </Box>
  )
}

const CalTabBlock = (props: { events?: CalProps[]; }) => {
  return (
    <div>
      {props.events && props.events.length > 0
        ? <>
          {props.events.map((post, idx) => (
            <div key={`event-${idx}`}>
              {idx === 0 ? <></> : <Divider />}
              <CalendarBlock data={post} key={`cal-${idx}`} />
            </div>
          ))}
          {/* {props.page.total > 1 && props.page.current + 1 < props.page.total
              ? <MoreButton onClick={handleMore} /> : <></>
            } */}
        </>
        : <NoEvent text1="찾는 행사가 없어요." text2="지금 인기 있는 페스티벌을 만나보세요." buttonText={"페스티벌 인기순 보러가기"} />
      }
    </div>
  )
}