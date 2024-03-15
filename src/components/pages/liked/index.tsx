"use client";
import { useState } from 'react';
import { Tab, Tabs, Box, ThemeProvider, Checkbox, ToggleButton, ToggleButtonGroup } from '@mui/material';
import TabPanel from '@/components/common/TabPanel';
import { likeData, partyData } from '@/components/common/Data';
import { viewSwitchTheme, tabTheme } from '@/components/common/Themes';
import { FormatDateRange, FormatDate } from '@/service/Functions';

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
  const [view, setView] = useState<string | null>('FESTIVAL');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setView('FESTIVAL');
  };

  const handleView = (event: React.MouseEvent<HTMLElement>, newVal: string | null) => {
    if (newVal !== null) {
      setView(newVal);
    }
  }

  return (
    <Box className='w-full px-0'>
      <Box className='sticky flex flex-row justify-between items-center top-[60px] px-[16px] bg-[#FFF] relative z-10'>
        <ThemeProvider theme={tabTheme}>
          <Tabs value={value} onChange={handleChange} className='items-center min-h-0 py-[10px]'>
            <Tab label="페스티벌" />
            <Tab label="지역행사" />
            <Tab label="파티" />
          </Tabs>
        </ThemeProvider>
        {
          value === 2
            ? <></>
            : <ViewsCheck />
        }
      </Box>
      <TabPanel value={value} index={0} classn='mt-[60px]'>
        {
          likeData.map((item, idx) => {
            if (item !== undefined && view === item.type) {
              return (
                <>{
                  item.type === 'ACCOMPANY'
                    ? <LikedAccompanyBlock data={item} key={`like-${idx}`} />
                    : <LikedPostBlock data={item} key={`like-${idx}`} />
                }</>
              )
            }
          })
        }
      </TabPanel>
      <TabPanel value={value} index={1} classn='mt-[60px]'>
        {
          likeData.map((item, idx) => {
            if (item !== undefined && view === item.type) {
              return (
                <>{
                  item.type === 'ACCOMPANY'
                    ? <LikedAccompanyBlock data={item} key={`like-${idx}`} />
                    : <LikedPostBlock data={item} key={`like-${idx}`} />
                }</>
              )
            }
          })
        }
      </TabPanel>
      <TabPanel value={value} index={2} classn='mt-[60px]'>
        {
          partyData.map((item, idx) => (
            <LikedPostBlock data={item} key={`like-${idx}`} />
          ))
        }
      </TabPanel>
    </Box>
  )

  function ViewsCheck() {
    return (
      <div className='bg-[#FFF] z-10'>
        <ThemeProvider theme={viewSwitchTheme}>
          <ToggleButtonGroup value={view} exclusive onChange={handleView} >
            <ToggleButton value="FESTIVAL">게시글</ToggleButton>
            <ToggleButton value="ACCOMPANY">모집글</ToggleButton>
          </ToggleButtonGroup>
        </ThemeProvider>
      </div>
    )
  }

  interface LikePostProps {
    title: string; startDate: any; endDate?: any; type?: string;
    content?: string; img_url?: string; event_title?: string; address?: string;
  }
  function LikedPostBlock(props: { data: LikePostProps }) {
    const [checked, setChecked] = useState(true);
    const handleChange = (event: any) => { setChecked(!checked); };
    return (
      <div className='flex flex-row px-[16px] py-[18px] gap-[20px]'>
        <img className='rounded-[4px] h-[104px] w-[84px] min-w-[84px] object-cover' src={props.data.img_url} />
        <div className='flex flex-col justify-between w-full'>
          <div className='flex flex-col justify-between w-full'>
            <div className='flex flex-row justify-between w-full'>
              <span className='text-[14px] text-[#6C6C6C]'>{FormatDateRange(props.data.startDate, props.data.endDate)}, {props.data.address}</span>
              <Checkbox icon={<img src="/detail_like.svg" width={20} height={20} />}
                checkedIcon={<img src="/detail_like_1.svg" width={20} height={20} />}
                checked={checked} onChange={handleChange} style={{ padding: 0 }} />
            </div>
            <span className='text-[16px] text-[#333333] font-semibold'>{props.data.title}</span>
          </div>
          <span className='text-[12px] text-gray3 block description max-w-[278px]'>{props.data.content}</span>
        </div>
      </div>
    )
  }

  function LikedAccompanyBlock(props: { data: LikePostProps }) {
    const [checked, setChecked] = useState(true);
    const handleChange = (event: any) => { setChecked(!checked); };
    return (
      <div className='flex flex-col px-[16px] py-[18px] gap-[4px]'>
        <div className='flex flex-row justify-between items-start'>
          <div className='flex flex-col gap-[4px]'>
            <span className='text-[14px] text-gray3'>{FormatDate(props.data.startDate, 0)}</span>
            <span className='text-[16px]'>{props.data.title}</span>
            <span className='text-[14px] text-gray3'>{props.data.event_title}</span>
          </div>
          <Checkbox icon={<img src="/detail_like.svg" width={20} height={20} />}
            checkedIcon={<img src="/detail_like_1.svg" width={20} height={20} />}
            checked={checked} onChange={handleChange} style={{ padding: 0 }} />
        </div>
      </div>
    )
  }
}

