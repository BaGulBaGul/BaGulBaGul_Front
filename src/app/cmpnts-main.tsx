'use client';

import { useState } from 'react';
import { postData, partyData } from '../components/common/Data'
import Slider from "react-slick";
import { Box, Button, Divider, ThemeProvider, Fab, Select, SelectChangeEvent, MenuItem, FormControl, SvgIcon } from '@mui/material';
import { CategoryButtons } from '@/components/common/CategoryButton';
import { categoryButtonTheme, writeFabTheme, selectTheme } from '@/components/common/Themes'
import { AntTabs, AntTab, TabPanel, HashtagAccordion } from './cmpnts';

// - carousel
interface PostProps {
  posterSrc: string; name: string; date: string;
  content?: string; tags?: string[];
}
function RecPost(props: PostProps) {
  return (
    <div className="flex flex-col w-[188px] lg:w-[480px] px-[9px]">
      <div>
        <img className='rounded-lg h-[210px] w-[170px] lg:w-[480px] object-cover' src={props.posterSrc} />
      </div>
      <div className='flex flex-col pt-[12px]'>
        <p className='truncate text-base text-center'>{props.name}</p>
        <p className='text-sm text-center'>{props.date}</p>
      </div>
    </div>
  )
}

interface ArrowProps {
  className?: any; style?: any;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
function ArrowPrev({ onClick }: ArrowProps) {
  return (<div className='slick-arrow slick-prev slick-prev-main' onClick={onClick} />)
}
function ArrowNext({ onClick }: ArrowProps) {
  return (<div className='slick-arrow slick-next slick-next-main' onClick={onClick} />)
}

function RecSlide() {
  const settings = {
    className: "center", infinite: true,
    dots: true, dotsClass: 'slick-dots',
    slidesToShow: 1, slidesToScroll: 1,
    centerMode: true, variableWidth: true,
    nextArrow: <ArrowNext />, prevArrow: <ArrowPrev />,
  }
  return (
    <div className='pb-[50px] h-auto'>
      <Slider {...settings}>
        {postData.map((post, idx) => <RecPost posterSrc={post.posterSrc} name={post.name} date={post.date} key={`rec-${idx}`} />)}
      </Slider>
    </div>
  )
}

export function RecCarousel() {
  return (
    <div className='flex flex-col bg-secondary-yellow w-full lg:px-[360px] lg:bg-gradient-to-b lg:from-grad-yellow lg:to-grad-blue'>
      <div className='flex flex-col pt-[22px] pb-[20px] px-[24px]'>
        <p className='text-2xl font-semibold'>SUMMER</p>
        <p className='text-2xl'>페스티벌 추천</p>
      </div>
      <RecSlide />
    </div>
  )
}

export function PostTab() {
  const [value, setValue] = useState(0);
  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [sort, setSort] = useState('createdAt,desc');
  const handleSort = (e: SelectChangeEvent) => {
    setSort(e.target.value);
  }

  return (
    <Box className='w-full px-0'>
      <Box className='sticky top-[44px] bg-[#FFF] relative z-10 px-[16px] pt-[20px] pb-[10px]'>
        <div className='flex justify-between items-center'>
          <AntTabs value={value} onChange={handleChange} className='items-center min-h-0'>
            <AntTab label="페스티벌" />
            <AntTab label="지역행사" />
            <AntTab label="파티" />
          </AntTabs>
          <FormControl variant="standard">
            <ThemeProvider theme={selectTheme}>
              <Select labelId='sort-label' id='sort' value={sort} onChange={handleSort}
                IconComponent={() => { return (<img src='/arrow_select.svg' />) }}>
                <MenuItem value='createdAt,desc'><em>최신순</em></MenuItem>
                <MenuItem value='popular,asc'><em>인기순</em></MenuItem>
                <MenuItem value='comment,desc'><em>댓글순</em></MenuItem>
              </Select>
            </ThemeProvider>
          </FormControl>
        </div>
      </Box>
      <TabPanel value={value} index={0}>
        <div className='sticky top-[102px] bg-[#FFF] relative z-10'><CategoryButtons /></div>
        {postData.map((post, idx) => (
          idx === 0
            ? <PostBlock posterSrc={post.posterSrc} name={post.name} date={post.date} content={post.content} tags={post.tags} key={`rec-${idx}`} />
            : <>
              <Divider />
              <PostBlock posterSrc={post.posterSrc} name={post.name} date={post.date} content={post.content} tags={post.tags} key={`rec-${idx}`} />
            </>
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item 2
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className='sticky top-[102px] bg-[#FFF] relative z-10'><CategoryButtons /></div>
        <div className='contents'>
          <ThemeProvider theme={writeFabTheme}>
            <Fab variant="extended" size="small" color="primary" className='fixed bottom-[55px] right-[16px]'>
              <div className='flex flex-row items-center'>
                <img src='/main_add.svg' />
                <span className='ps-[4px]'>글작성</span>
              </div>
            </Fab>
          </ThemeProvider>
          {partyData.map((post, idx) => (
            idx === 0
              ? <PartyBlock posterSrc={post.posterSrc} name={post.name} date={post.date} content={post.content} tags={post.tags} key={`party-${idx}`} />
              : <>
                <Divider />
                <PartyBlock posterSrc={post.posterSrc} name={post.name} date={post.date} content={post.content} tags={post.tags} key={`party-${idx}`} />
              </>
          ))}
        </div>
      </TabPanel>
    </Box>
  )
}

// - tab item : PostList
function PostBlock(props: PostProps) {
  return (
    <div>
      <div className='flex flex-col py-[18px] px-[16px]'>
        <div className='flex flex-col justify-between'>
          <div className='flex flex-row items-center justify-between pb-[10px]'>
            <div className='flex flex-col w-[230px] gap-[20px]'>
              <div>
                <ThemeProvider theme={categoryButtonTheme}>
                  <Button disabled>공연전시/행사</Button>
                </ThemeProvider>
              </div>
              <div className='flex flex-col gap-[4px]'>
                <p className='truncate text-base font-semibold'>{props.name}</p>
                <p className='text-sm text-gray3-text'>{props.date}</p>
                <div className='flex flex-row gap-[4px]'>
                  <img className='w-[24px] h-[24px]' src="/main_profile.svg" />
                  <p className='text-sm text-gray3-text self-center'>(주)SACOM</p>
                </div>
              </div>
            </div>
            <img className='rounded-lg w-[84px] h-[104px] object-cover' src={props.posterSrc} />
          </div>
          {props.tags ? <HashtagAccordion tag={props.tags} /> : <></>}
        </div>
      </div>
    </div>
  )
}

// - tab item : PostList
function PartyBlock(props: PostProps) {
  return (
    <div>
      <div className='flex flex-col py-[18px] px-[16px]'>
        <div className='flex flex-col justify-between'>
          <div className='flex flex-row items-center justify-between pb-[10px]'>
            <div className='flex flex-col w-[230px] gap-[10px]'>
              <div className='flex flex-row gap-[8px]'>
                <img className='w-[24px] h-[24px]' src="/main_profile.svg" />
                <ThemeProvider theme={categoryButtonTheme}>
                  <Button disabled>공연전시/행사</Button>
                </ThemeProvider>
              </div>
              <div className='flex flex-col gap-[20px]'>
                <div className='flex flex-col gap-[2px]'>
                  <p className='text-[14px] text-gray3-text'>{props.date}</p>
                  <p className='truncate text-[16px] leading-[140%] font-semibold'>{props.name}</p>
                </div>
                <p className='text-[12px] leading-[160%] text-gray3-text block description'>{props.content}</p>
              </div>
            </div>
            <img className='rounded-lg w-[110px] h-[136px] object-cover' src={props.posterSrc} />
          </div>
          {props.tags ? <HashtagAccordion tag={props.tags} /> : <></>}
        </div>
      </div>
    </div>
  )
}