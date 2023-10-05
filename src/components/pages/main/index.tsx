"use client";
import { useState, useEffect } from 'react';
import { postData, partyData } from '@/components/common/Data'
import Slider from "react-slick";
import { Tab, Tabs, Box, Button, Divider, ThemeProvider, Fab, Backdrop } from '@mui/material';
import { CategoryButtons } from '@/components/common/CategoryButton';
import { ViewButton, ViewSelect } from '@/components/common/ViewFilter'; 
import { categoryButtonTheme, writeFabTheme, tabTheme } from '@/components/common/Themes'
import TabPanel from '@/components/common/TabPanel';
import HashtagAccordion from '@/components/common/HashtagAccordion';
import { call } from '@/service/ApiService';
import { FormatDateRange } from '@/service/Functions';

const index = () => {
  const [posts, setPosts] = useState([])
  // useEffect(() => {
  //   call("/api/post?type=FESTIVAL", "GET", null)
  //     .then((response) => {
  //       console.log(response);
  //     })
  // }, [])

  return (
    <div className='flex flex-col w-full pt-[44px]'>
      <RecCarousel />
      <PostTab />
    </div>
  )
};
export default index;

// - carousel
interface PostProps {
  img_url: string; title: string; user_profile: string; userName: string;
  startDate: any; endDate: any; categories: string[]; content?: string; tags?: string[];
}
function RecPost(props: {data: PostProps}) {
  return (
    <div className="flex flex-col w-[188px] lg:w-[480px] px-[9px]">
      <img className='rounded-lg h-[210px] w-[170px] lg:w-[480px] object-cover' src={props.data.img_url} />
      <div className='flex flex-col pt-[12px]'>
        <p className='truncate text-base text-center'>{props.data.title}</p>
        <p className='text-sm text-center'>{FormatDateRange(props.data.startDate, props.data.endDate)}</p>
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
    className: "center", infinite: true, dots: true, dotsClass: 'slick-dots',
    slidesToShow: 1, slidesToScroll: 1, centerMode: true, variableWidth: true,
    nextArrow: <ArrowNext />, prevArrow: <ArrowPrev />,
  }
  return (
    <div className='pb-[50px] h-auto'>
      <Slider {...settings}>
        {postData.map((post, idx) => <RecPost data={post} key={`rec-${idx}`} />)}
      </Slider>
    </div>
  )
}

function RecCarousel() {
  return (
    <div className='flex flex-col bg-secondary-yellow w-full h-[430px] lg:px-[360px] lg:bg-gradient-to-b lg:from-grad-yellow lg:to-grad-blue'>
      <div className='flex flex-col pt-[22px] pb-[20px] px-[24px]'>
        <p className='text-2xl font-semibold'>SUMMER</p>
        <p className='text-2xl'>페스티벌 추천</p>
      </div>
      <RecSlide />
    </div>
  )
}

function PostTab() {
  const [value, setValue] = useState(0);
  const handleChange = (e: React.SyntheticEvent, newValue: number) => { setValue(newValue); };

  const [sort, setSort] = useState('createdAt,desc');

  const [open, setOpen] = useState(false);
  const handleOpen = () => { setOpen(true) }
  const handleClose = () => { setOpen(false) }

  return (
    <Box className='w-full px-0'>
      <Box className='sticky top-[44px] bg-[#FFF] relative z-10 px-[16px] pt-[20px] pb-[10px]'>
        <div className='flex justify-between items-center'>
          <ThemeProvider theme={tabTheme}>
            <Tabs value={value} onChange={handleChange} className='items-center min-h-0'>
              <Tab label="페스티벌" />
              <Tab label="지역행사" />
              <Tab label="파티" />
            </Tabs>
          </ThemeProvider>
          <ViewButton sort={sort} handleOpen={handleOpen} />
        </div>
      </Box>
      <Backdrop open={open} onClick={handleClose} className='z-paper'>
          <ViewSelect sort={sort} setSort={setSort} handleClose={handleClose} />
      </Backdrop>
      <TabPanel value={value} index={0}>
        <div className='sticky top-[102px] bg-[#FFF] relative z-10'><CategoryButtons /></div>
        {postData.map((post, idx) => (
          idx === 0
            ? <FestivalBlock data={post} key={`rec-${idx}`} />
            : <>
              <Divider />
              <FestivalBlock data={post} key={`rec-${idx}`} />
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
              ? <FestivalBlock data={post} key={`party-${idx}`} />
              : <>
                <Divider />
                <FestivalBlock data={post} key={`party-${idx}`} />
              </>
          ))}
        </div>
      </TabPanel>
    </Box>
  )
}

// - tab item : 페스티벌
function FestivalBlock(props: {data: PostProps}) {
  return (
    <div>
      <div className='flex flex-col py-[18px] px-[16px]'>
        <div className='flex flex-col justify-between'>
          <div className='flex flex-row items-center justify-between pb-[10px]'>
            <div className='flex flex-col w-[230px] gap-[20px]'>
              <div className='flex flex-row gap-[4px]'>
                <ThemeProvider theme={categoryButtonTheme}>
                  {
                    props.data.categories.map((cate, idx) => <Button disabled key={`cate-${idx}`}>{cate}</Button>)
                  }
                </ThemeProvider>
              </div>
              <div className='flex flex-col gap-[4px]'>
                <p className='truncate text-base font-semibold'>{props.data.title}</p>
                <p className='text-sm text-gray3-text'>{FormatDateRange(props.data.startDate, props.data.endDate)}</p>
                <div className='flex flex-row gap-[4px]'>
                  <img className='rounded-full w-[24px] h-[24px]' src={props.data.user_profile} />
                  <p className='text-sm text-gray3-text self-center'>{props.data.userName}</p>
                </div>
              </div>
            </div>
            <img className='rounded-lg w-[84px] h-[104px] object-cover' src={props.data.img_url} />
          </div>
          {props.data.tags ? <HashtagAccordion tag={props.data.tags} /> : <></>}
        </div>
      </div>
    </div>
  )
}

// - tab item : 파티
// function PartyBlock(props: {data: PostProps}) {
//   return (
//     <div>
//       <div className='flex flex-col py-[18px] px-[16px]'>
//         <div className='flex flex-col justify-between'>
//           <div className='flex flex-row items-center justify-between pb-[10px]'>
//             <div className='flex flex-col w-[230px] gap-[10px]'>
//               <div className='flex flex-row gap-[8px]'>
//                 <img className='w-[24px] h-[24px]' src="/main_profile.svg" />
//                 <ThemeProvider theme={categoryButtonTheme}>
//                   <Button disabled>공연전시/행사</Button>
//                 </ThemeProvider>
//               </div>
//               <div className='flex flex-col gap-[20px]'>
//                 <div className='flex flex-col gap-[2px]'>
//                   <p className='text-[14px] text-gray3-text'>{props.date}</p>
//                   <p className='truncate text-[16px] leading-[140%] font-semibold'>{props.name}</p>
//                 </div>
//                 <p className='text-[12px] leading-[160%] text-gray3-text block description max-w-[230px]'>{props.content}</p>
//               </div>
//             </div>
//             <img className='rounded-lg w-[110px] h-[136px] object-cover' src={props.posterSrc} />
//           </div>
//           {props.tags ? <HashtagAccordion tag={props.tags} /> : <></>}
//         </div>
//       </div>
//     </div>
//   )
// }