'use client';
import { useState, createRef } from 'react';
import {
  Box, Button, ThemeProvider, Checkbox, RadioGroup, Radio, useRadioGroup, FormControl, FormControlLabel
} from '@mui/material';
import { AntTabs, AntTab, TabPanel } from './cmpnts';
import { likeEvents, likeData } from '@/components/common/Data';
import { likeButtonTheme1, likeButtonTheme2, viewRadioTheme } from '@/components/common/Themes';

export function LikedDetail() {
  return (
    <div className='flex flex-col w-full pb-[10px]'>
      <LikedTab />
    </div>
  )
}

function LikedTab() {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => { setValue(newValue); };
  const [view, setView] = useState('ALL');
  const handleView = (event: any, value: any) => { setView(value); }

  function ViewsRadio() {
    return (
      <div className='sticky top-[108px] bg-[#FFF] relative z-10'>
        <div className='flex flex-row justify-end gap-[8px] px-[16px] pb-[10px]'>
          <ThemeProvider theme={viewRadioTheme}>
            <FormControl>
              <RadioGroup row value={view} onChange={handleView}>
                <FormControlLabel value="ALL" control={<Radio />} label="전체" />
                <FormControlLabel value="EVENT" control={<Radio />} label="게시글" />
                <FormControlLabel value="ACCOMPANY" control={<Radio />} label="모집글" />
              </RadioGroup>
            </FormControl>
          </ThemeProvider>
        </div>
      </div>
    )
  }

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
          <Checkbox icon={<img src="/post_like.svg" width={24} height={24} />}
            checkedIcon={<img src="/post_like_1.svg" width={24} height={24} />}
            checked={checked} onChange={handleChange} />
        </div>
      </div>
    )
  }

  return (
    <Box className='w-full px-0'>
      <Box className='sticky top-[60px] bg-[#FFF] relative z-10'>
        <AntTabs value={value} onChange={handleChange} className='px-[16px] py-[10px]'>
          <AntTab label="페스티벌" />
          <AntTab label="지역행사" />
          <AntTab label="파티" />
        </AntTabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ViewsRadio />
        {
          likeData.map((item, idx) => {
            if (view === 'ALL') {
              return (
                <LikePostBlock title={item.title} date={item.date} type={item.type} eventId={item.eventId} key={`like-${idx}`} />
              )
            } else {
              return (
                <>
                {
                  view === item.type
                  ? <LikePostBlock title={item.title} date={item.date} type={item.type} eventId={item.eventId} key={`like-${idx}`} />
                  : <></>
                }
                </>
              )
            }
          })
        }
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item 2<br />Item 2<br />Item 2<br />Item 2<br />Item 2<br />Item 2<br />Item 2<br />Item 2<br />Item 2<br />
        Item 2<br />Item 2<br />Item 2<br />Item 2<br />Item 2<br />Item 2<br />Item 2<br />Item 2<br />Item 2<br />
        Item 2<br />Item 2<br />Item 2<br />Item 2<br />Item 2<br />Item 2<br />Item 2<br />Item 2<br />Item 2<br />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item3<br />Item3<br />Item3<br />Item3<br />Item3<br />Item3<br />Item3<br />Item3<br />Item3<br />Item3<br />
        Item3<br />Item3<br />Item3<br />Item3<br />Item3<br />Item3<br />Item3<br />Item3<br />Item3<br />Item3<br />
        Item3<br />Item3<br />Item3<br />Item3<br />Item3<br />Item3<br />Item3<br />Item3<br />Item3<br />Item3<br />
      </TabPanel>
    </Box>
  )
}