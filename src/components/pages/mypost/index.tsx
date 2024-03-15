"use client";
import { useState } from 'react';
import { Tab, Tabs, Box, Button, ThemeProvider, Checkbox, FormControl, FormControlLabel, FormGroup, } from '@mui/material';
import TabPanel from '@/components/common/TabPanel';
import { partyData } from '@/components/common/Data';
import { likeButtonTheme1, likeButtonTheme2, tabTheme } from '@/components/common/Themes';
import { FormatDateRange } from '@/service/Functions';

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
      <TabPanel value={value} index={1}>
        Item 2<br />Item 2<br />Item 2<br />Item 2<br />Item 2<br />Item 2<br />Item 2<br />Item 2<br />Item 2<br />
        Item 2<br />Item 2<br />Item 2<br />Item 2<br />Item 2<br />Item 2<br />Item 2<br />Item 2<br />Item 2<br />
        Item 2<br />Item 2<br />Item 2<br />Item 2<br />Item 2<br />Item 2<br />Item 2<br />Item 2<br />Item 2<br />
      </TabPanel>
    </Box>
  )

  interface MyPostProps { title: string; startDate: any; endDate: any; content: string; img_url: string; }
  function MyPostBlock(props: {data: MyPostProps}) {
    return (
      <div className='flex flex-row px-[16px] py-[18px] gap-[20px]'>
        <img className='rounded-[4px] h-[104px] w-[84px] min-w-[84px] object-cover' src={props.data.img_url} />
        <div className='flex flex-col justify-between w-full'>
          <div className='flex flex-col'>
            <div className='flex flex-row justify-between'>
              <span className='text-[14px] text-gray3'>{FormatDateRange(props.data.startDate, props.data.endDate)}</span>
              <div className='flex flex-row gap-[6px]'>
                <ThemeProvider theme={likeButtonTheme1}><Button disableRipple>수정</Button></ThemeProvider>
                <ThemeProvider theme={likeButtonTheme2}><Button disableRipple>삭제</Button></ThemeProvider>
              </div>
            </div>
            <span className='text-[16px] font-semibold'>{props.data.title}</span>
          </div>
          <span className='text-[12px] text-gray3 block description max-w-[278px]'>{props.data.content}</span>
        </div>
      </div>
    )
  }
}