"use client";
import { useState } from 'react';
import { Tab, Tabs, Box, Button, ThemeProvider, Checkbox, FormControl, FormControlLabel, FormGroup, } from '@mui/material';
import TabPanel from '@/components/common/TabPanel';
import { likeEvents, likeData } from '@/components/common/Data';
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
            <Tab label="페스티벌" />
            <Tab label="지역행사" />
            <Tab label="파티" />
          </Tabs>
        </ThemeProvider>
      </Box>
      <TabPanel value={value} index={0} classn='mt-[60px]'>
        <ViewsCheck />
        {
          likeData.map((item, idx) => {
            if (view.festival && view.accompany) {
              return (
                <LikePostBlock title={item.title} date={item.date} type={item.type} eventId={item.eventId} key={`like-${idx}`} />
              )
            } else {
              let checkedView = view.festival === true ? 'FESTIVAL' : 'ACCOMPANY'
              return (
                <>{
                  checkedView === item.type
                    ? <LikePostBlock title={item.title} date={item.date} type={item.type} eventId={item.eventId} key={`like-${idx}`} />
                    : <></>
                }</>
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