"use client";
import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import { createSearchParams } from 'react-router-dom'
import { postData } from '@/components/common/Data'
import Slider from "react-slick";
import { Tab, Tabs, Box, Divider, ThemeProvider, Fab, Backdrop, Button } from '@mui/material';
import { CategoryButtons } from '@/components/common/CategoryButton';
import { ViewButton, ViewSelect } from '@/components/common/ViewFilter';
import { writeFabTheme, tabTheme } from '@/components/common/Themes'
import TabPanel from '@/components/common/TabPanel';
import { call } from '@/service/ApiService';
import { FormatDateRange } from '@/service/Functions';
import MoreButton from '@/components/common/MoreButton';
import { FestivalBlock } from '@/components/common/FestivalBlock';
import NoEvent from '@/components/common/NoEvent';

const index = () => {
  //type
  const valueList = ['FESTIVAL', 'LOCAL_EVENT', 'PARTY']
  const [value, setValue] = useState(0);
  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [selectedCate, setSelectedCate] = useState<string[]>([]);
  // 정렬기준, default는 최신순
  const [sort, setSort] = useState('createdAt,desc');

  const [params, setParams] = useState({
    page: 0, type: valueList[value],
    categories: selectedCate, sort: sort,
  });

  const [events, setEvents] = useState([]);
  function setEventList(currentEvents: []) {
    // setEvents(prevState => [...prevState, ...currentEvents])
    const newEvents = events.concat(currentEvents)
    const newEventsSet = new Set(newEvents)
    const newEventsList = Array.from(newEventsSet);
    setEvents(newEventsList);
  }

  // const loading = useRef<boolean>(false);
  const [page, setPage] = useState({ current: 0, total: 0, });
  function setPageInfo(currentPage: number) {
    setPage({ ...page, current: currentPage });
    setParams({ ...params, page: currentPage })
  }

  // console.log(page, ' | ', events)
  const initialSet = useRef(false);
  const mounted = useRef(false);
  useEffect(() => {
    initialSet.current = false;
    setParams({
      ...params,
      page: 0, type: valueList[value],
      categories: selectedCate, sort: sort,
    })
    setEvents([]);
  }, [selectedCate, sort, value])

  function getParams(params: any) {
    let sparams = createSearchParams(params);
    let target: any[] = [];
    sparams.forEach((val, key) => {
      if (val === '') { target.push(key); }
    })
    target.forEach(key => { sparams.delete(key); })
    return sparams.toString();
  }

  useEffect(() => {
    let apiURL = Object.keys(params).length !== 0
      ? `/api/event?size=5&${getParams(params)}` : '/api/event?size=5'

    console.log('** ', apiURL)
    call(apiURL, "GET", null)
      .then((response) => {
        console.log(response.data);
        if (response.data.empty === false) {
          // 페이지값 초기설정
          if (!initialSet.current) {
            setPage({ current: 0, total: response.data.totalPages })
            initialSet.current = true;
          }
          setEventList(response.data.content)
        }
      })
  }, [params])

  return (
    <div className='flex flex-col w-full pt-[44px]'>
      <RecCarousel />
      <PostTab events={events} value={value} handleChange={handleChange} sort={sort} setSort={setSort}
        page={page} setPageInfo={setPageInfo} selectedCate={selectedCate} setSelectedCate={setSelectedCate} />
    </div>
  )
};
export default index;

// - carousel
interface PostProps {
  img_url: string; title: string; user_profile: string; userName: string;
  startDate: any; endDate: any; categories: string[]; content?: string; tags?: string[];
}
function RecPost(props: { data: PostProps }) {
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

interface TabProps {
  events: never[]; value: number; handleChange: any; sort: string; setSort: Dispatch<SetStateAction<string>>;
  page: { current: number; total: number; }; setPageInfo: any;
  selectedCate: string[]; setSelectedCate: Dispatch<SetStateAction<string[]>>;
}
function PostTab(props: TabProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => { setOpen(true) }
  const handleClose = () => { setOpen(false) }

  return (
    <Box className='w-full px-0'>
      <Box className='sticky top-[44px] bg-[#FFF] relative z-10 px-[16px] pt-[20px] pb-[10px]'>
        <div className='flex justify-between items-center'>
          <ThemeProvider theme={tabTheme}>
            <Tabs value={props.value} onChange={props.handleChange} className='items-center min-h-0'>
              <Tab label="페스티벌" />
              <Tab label="지역행사" />
              <Tab label="파티" />
            </Tabs>
          </ThemeProvider>
          <ViewButton sort={props.sort} handleOpen={handleOpen} />
        </div>
      </Box>
      <Backdrop open={open} onClick={handleClose} className='z-paper'>
        <ViewSelect sort={props.sort} setSort={props.setSort} handleClose={handleClose} />
      </Backdrop>
      <TabPanel value={props.value} index={0}>
        <TabBlock opt={0} selectedCate={props.selectedCate} setSelectedCate={props.setSelectedCate} events={props.events} page={props.page} setPageInfo={props.setPageInfo} />
      </TabPanel>
      <TabPanel value={props.value} index={1}>
        <TabBlock opt={0} selectedCate={props.selectedCate} setSelectedCate={props.setSelectedCate} events={props.events} page={props.page} setPageInfo={props.setPageInfo} />
      </TabPanel>
      <TabPanel value={props.value} index={2}>
        <TabBlock opt={1} selectedCate={props.selectedCate} setSelectedCate={props.setSelectedCate} events={props.events} page={props.page} setPageInfo={props.setPageInfo} />
      </TabPanel>
    </Box>
  )
}

interface TabBlockProps {
  opt: number; selectedCate: string[]; setSelectedCate: Dispatch<SetStateAction<string[]>>;
  events: never[]; page: { current: number; total: number; }; setPageInfo: any;
}
const TabBlock = (props: TabBlockProps) => {
  const handleMore = () => { props.setPageInfo(props.page.current + 1) }
  if (props.opt === 0) {
    return (
      <>
        <div className='sticky top-[102px] bg-[#FFF] relative z-10'>
          <CategoryButtons selectedCate={props.selectedCate} setSelectedCate={props.setSelectedCate} />
        </div>
        {
          props.events.length > 0
            ? <>
              {props.events.map((post, idx) => (
                <div key={`event-${idx}`}>
                  {idx === 0 ? <></> : <Divider />}
                  <FestivalBlock data={post} />
                </div>
              ))}
              {
                props.page.total > 1 && props.page.current + 1 < props.page.total
                  ? <MoreButton onClick={handleMore} />
                  : <></>
              }
            </>
            : <NoEvent text1="찾는 행사가 없어요." text2="지금 인기 있는 페스티벌을 만나보세요." buttonText={"페스티벌 인기순 보러가기"} />
        }
      </>
    )
  } else if (props.opt === 1) {
    return (
      <>
        <div className='sticky top-[102px] bg-[#FFF] relative z-10'>
          <CategoryButtons selectedCate={props.selectedCate} setSelectedCate={props.setSelectedCate} />
        </div>
        <div className='contents'>
          <ThemeProvider theme={writeFabTheme}>
            <Fab variant="extended" size="small" color="primary" className='fixed bottom-[55px] right-[16px]'>
              <div className='flex flex-row items-center'>
                <img src='/main_add.svg' />
                <span className='ps-[4px]'>글작성</span>
              </div>
            </Fab>
          </ThemeProvider>
          {props.events.map((post, idx) => (
            idx === 0
              ? <FestivalBlock data={post} key={`party-${idx}`} />
              : <div key={`party-${idx}`}>
                <Divider />
                <FestivalBlock data={post} />
              </div>
          ))}
        </div>
      </>
    )
  }
}