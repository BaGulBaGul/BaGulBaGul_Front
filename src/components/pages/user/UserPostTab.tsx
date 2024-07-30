"use client";
import { useState } from 'react';
import { Tab, Tabs, ThemeProvider } from '@mui/material';
import { TabPanel } from '@/components/common';
import { partyData } from '@/components/common/Data';
import { tabTheme } from '@/components/styles/Themes';
import { FormatDateRange } from '@/service/Functions';
import { PostEditIcn, DeleteIcn } from '@/components/styles/Icon';

export function UserPostTab() {
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
    <div className='flex flex-col w-full pb-[10px]'>
      <div className='fixed top-[60px] w-full bg-p-white z-10'>
        <ThemeProvider theme={tabTheme}>
          <Tabs value={value} onChange={handleChange} className='items-center min-h-0 px-[16px] py-[10px]'>
            <Tab label="파티" />
            <Tab label="모집글" />
          </Tabs>
        </ThemeProvider>
      </div>
      <TabPanel value={value} index={0} classn='mt-[108px]'>
        {
          partyData.map((item, idx) => (
            <MyPostBlock opt='EVT' data={item} key={`like-${idx}`} />
          ))
        }
      </TabPanel>
      <TabPanel value={value} index={1} classn='mt-[108px]'>
        {
          partyData.map((item, idx) => (
            <MyPostBlock opt='RCT' data={item} key={`like-${idx}`} />
          ))
        }
      </TabPanel>
    </div>
  )
}

interface MyPostProps { title: string; startDate: any; endDate: any; content: string; headImageUrl: string; }
  function MyPostBlock(props: { opt: string, data: MyPostProps }) {
    const BlockHead = () => {
      return (
        <div className='flex flex-col'>
          <div className='flex flex-row justify-between'>
            <span className='text-14 text-gray3'>{FormatDateRange(props.data.startDate, props.data.endDate)}</span>
            <div className='flex flex-row gap-[2px]'>
              <button><PostEditIcn /></button>
              <button><DeleteIcn /></button>
            </div>
          </div>
          <span className={`text-16 ${props.opt === 'EVT' ? 'font-semibold' : ''}`}>{props.data.title}</span>
        </div>
      )
    }

    if (props.opt === 'EVT') {
      return (
        <div className='flex flex-row px-[16px] py-[18px] gap-[20px] bg-p-white'>
          <img className='rounded-[4px] h-[104px] w-[84px] min-w-[84px] object-cover' src={props.data.headImageUrl} />
          <div className='flex flex-col justify-between w-full'>
            <BlockHead />
            <span className='text-12 text-gray3 description max-w-[278px]'>{props.data.content}</span>
          </div>
        </div>
      )
    } else {
      return (
        <div className='flex flex-col justify-between w-full px-[16px] py-[18px] gap-[4px] bg-p-white'>
          <BlockHead />
          <span className='text-14 text-gray3'>PEAK FESTIVAL 2023</span>
        </div>
      )
    }
  }