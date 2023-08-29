"use client";
import { useState } from 'react';
import { Tab, Tabs, Box, Button, ThemeProvider, Checkbox, FormControl, FormControlLabel, FormGroup, } from '@mui/material';
import TabPanel from '@/components/common/TabPanel';
import { partyData } from '@/components/common/Data';
import { likeButtonTheme1, likeButtonTheme2, viewCheckTheme, tabTheme } from '@/components/common/Themes';

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
            <MyPostBlock title={item.name} date={item.date} content={item.content} posterSrc={item.posterSrc} key={`like-${idx}`} />
          ))
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

  function ViewsCheck() {
    return (
      <div className='sticky top-[108px] bg-[#FFF] relative z-10'>
        <div className='flex flex-row justify-end gap-[8px] px-[16px] pb-[10px]'>
          <ThemeProvider theme={viewCheckTheme}>
            <FormControl>
              <FormGroup row>
                <FormControlLabel control={<Checkbox checked={view.festival} value='festival' onChange={handleView} />} label="게시글" />
                <FormControlLabel control={<Checkbox checked={view.accompany} value='accompany' onChange={handleView} />} label="모집글" />
              </FormGroup>
            </FormControl>
          </ThemeProvider>
        </div>
      </div>
    )
  }

  interface MyPostProps { title: string; date: string; content: string; posterSrc: string; }
  function MyPostBlock(props: MyPostProps) {
    return (
      <div className='flex flex-row px-[16px] py-[18px] gap-[20px]'>
        <img className='rounded-[4px] h-[104px] w-[84px] object-cover' src={props.posterSrc} />
        <div className='flex flex-col justify-between w-full'>
          <div className='flex flex-col'>
            <div className='flex flex-row justify-between'>
              <span className='text-[14px] text-gray3-text'>{props.date}</span>
              <div className='flex flex-row gap-[6px]'>
                <ThemeProvider theme={likeButtonTheme1}><Button disableRipple>수정</Button></ThemeProvider>
                <ThemeProvider theme={likeButtonTheme2}><Button disableRipple>삭제</Button></ThemeProvider>
              </div>
            </div>
            <span className='text-[16px] font-semibold'>{props.title}</span>
          </div>
          <span className='text-[12px] text-gray3-text block description max-w-[278px]'>{props.content}</span>
        </div>
      </div>
    )
  }
}