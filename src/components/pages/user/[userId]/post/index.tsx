"use client";
import { useState } from 'react';
import { Tab, Tabs, Box, ThemeProvider, IconButton, } from '@mui/material';
import { TabPanel } from '@/components/common';
import { partyData } from '@/components/common/Data';
import { tabTheme } from '@/components/common/Themes';
import { FormatDateRange } from '@/service/Functions';
import { PostEditIcn, PostDeleteIcn } from '@/components/common/Icon';

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
    <Box className='w-full px-0'>
      <Box className='sticky top-[60px] bg-[#FFF] relative z-10'>
        <ThemeProvider theme={tabTheme}>
          <Tabs value={value} onChange={handleChange} className='items-center min-h-0 px-[16px] py-[10px]'>
            <Tab label="파티" />
            <Tab label="모집글" />
          </Tabs>
        </ThemeProvider>
      </Box>
      <TabPanel value={value} index={0} classn='mt-[60px]'>
        {
          partyData.map((item, idx) => (
            <MyPostBlock data={item} key={`like-${idx}`} />
          ))
        }
      </TabPanel>
      <TabPanel value={value} index={1}  classn='mt-[60px]'>
      {
          partyData.map((item, idx) => (
            <MyPostBlock data={item} key={`like-${idx}`} />
          ))
        }
      </TabPanel>
    </Box>
  )

  interface MyPostProps { title: string; startDate: any; endDate: any; content: string; headImageUrl: string; }
  function MyPostBlock(props: {data: MyPostProps}) {
    return (
      <div className='flex flex-row px-[16px] py-[18px] gap-[20px]'>
        <img className='rounded-[4px] h-[104px] w-[84px] min-w-[84px] object-cover' src={props.data.headImageUrl} />
        <div className='flex flex-col justify-between w-full'>
          <div className='flex flex-col'>
            <div className='flex flex-row justify-between'>
              <span className='text-[14px] text-gray3'>{FormatDateRange(props.data.startDate, props.data.endDate)}</span>
              <div className='flex flex-row gap-[2px]'>
                <IconButton disableRipple className='p-0'><PostEditIcn /></IconButton>
                <IconButton disableRipple className='p-0'><PostDeleteIcn /></IconButton>
              </div>
            </div>
            <span className='text-[16px] font-semibold'>{props.data.title}</span>
          </div>
          <span className='text-[12px] text-gray3 description max-w-[278px]'>{props.data.content}</span>
        </div>
      </div>
    )
  }
}