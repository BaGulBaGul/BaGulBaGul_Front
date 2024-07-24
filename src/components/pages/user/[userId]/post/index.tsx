"use client";
import { useState } from 'react';
import { Tab, Tabs, ThemeProvider } from '@mui/material';
import { TabPanel } from '@/components/common';
import { partyData } from '@/components/common/Data';
import { tabTheme } from '@/components/common/Themes';
import { FormatDateRange } from '@/service/Functions';
import { PostEditIcn, DeleteIcn } from '@/components/common/Icon';

const index = () => {
  return (
    <div className='flex flex-col w-full pb-[10px]'>
      <LikedTab />
    </div>
  )
}
export default index;

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
    <div className='w-full px-0'>
      <div className='fixed top-[60px] bg-[#FFF] w-full z-10'>
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

  interface MyPostProps { title: string; startDate: any; endDate: any; content: string; headImageUrl: string; }
  function MyPostBlock(props: { opt: string, data: MyPostProps }) {
    const BlockHead = () => {
      return (
        <div className='flex flex-col'>
          <div className='flex flex-row justify-between'>
            <span className='text-[14px] text-gray3'>{FormatDateRange(props.data.startDate, props.data.endDate)}</span>
            <div className='flex flex-row gap-[2px]'>
              <button><PostEditIcn /></button>
              <button><DeleteIcn /></button>
            </div>
          </div>
          <span className={props.opt === 'EVT' ? 'text-[16px] font-semibold' : 'text-[16px]'}>{props.data.title}</span>
        </div>
      )
    }

    if (props.opt === 'EVT') {
      return (
        <div className='flex flex-row px-[16px] py-[18px] gap-[20px] bg-[#FFF]'>
          <img className='rounded-[4px] h-[104px] w-[84px] min-w-[84px] object-cover' src={props.data.headImageUrl} />
          <div className='flex flex-col justify-between w-full'>
            <BlockHead />
            <span className='text-[12px] text-gray3 description max-w-[278px]'>{props.data.content}</span>
          </div>
        </div>
      )
    } else {
      return (
        <div className='flex flex-col px-[16px] py-[18px] justify-between w-full bg-[#FFF] gap-[4px]'>
          <BlockHead />
          <span className='text-[14px] text-gray3'>PEAK FESTIVAL 2023</span>
        </div>
      )
    }
  }
}