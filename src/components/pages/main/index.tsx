"use client";
import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import { createSearchParams } from 'react-router-dom'
import { Tab, Tabs, Box, Divider, ThemeProvider, Fab, Backdrop, Chip } from '@mui/material';
import { CategoryButtons } from '@/components/common/CategoryButton';
import { ViewButton, ViewSelect } from '@/components/common/ViewFilter';
import { writeFabTheme, tabTheme, filterChipTheme } from '@/components/common/Themes'
import TabPanel from '@/components/common/TabPanel';
import { call } from '@/service/ApiService';
import { handleDayData, sortLabel, useEffectFilter } from '@/service/Functions';
import MoreButton from '@/components/common/MoreButton';
import { FestivalBlock } from '@/components/common/FestivalBlock';
import NoEvent from '@/components/common/NoEvent';
import { DayRange } from 'react-modern-calendar-datepicker'
import { RecCarousel } from '@/components/common/RecCarousel';
import { valueList } from '@/components/common/Data';

const index = () => {
  //type
  const [value, setValue] = useState(0);
  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [selectedCate, setSelectedCate] = useState<string[]>([]);
  // 정렬기준, default는 최신순
  const [sort, setSort] = useState('createdAt,desc');
  const [dayRange, setDayRange] = useState<DayRange>({ from: undefined, to: undefined });
  // * temporary name - 참여인원 / 규모
  const [participants, setParticipants] = useState(0);
  const [headCount, setHeadCount] = useState<{ from: undefined | number, to: undefined | number }>({ from: undefined, to: undefined });

  // api 호출용 파라미터
  const [params, setParams] = useState({
    page: 0, type: valueList[value],
    categories: selectedCate, sort: sort,
    startDate: '', endDate: ''
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

  const initialSet = useRef(false);
  const mounted = useRef(false);
  useEffect(() => {
    initialSet.current = false;
    setParams({
      ...params,
      page: 0, type: valueList[value],
      categories: selectedCate, sort: sort,
      startDate: dayRange.from === null || dayRange.from === undefined
        ? '' : `${dayRange.from.year}-${String(dayRange.from.month).padStart(2, "0")}-${String(dayRange.from.day).padStart(2, "0")}T00:00:00`,
      endDate: dayRange.to === null || dayRange.to === undefined
        ? '' : `${dayRange.to.year}-${String(dayRange.to.month).padStart(2, "0")}-${String(dayRange.to.day).padStart(2, "0")}T23:59:59`
    })
    setEvents([]);
  }, [selectedCate, sort, value, dayRange])

  // 적용된 필터 확인
  const [filters, setFilters] = useState(['sort'])
  const [filterCnt, setFilterCnt] = useState(0)
  const [changed, setChanged] = useState<{ key: string, value: string | number | { from: undefined | number, to: undefined | number } | undefined }>({ key: '', value: undefined })

  useEffectFilter([sort, dayRange, participants, headCount], ['sort', 'dayRange', 'participants', 'headCount'], setChanged)

  useEffect(() => {
    if (!filters.includes(changed.key)) { // filters에 key가 존재하지 않고 값이 유효 -> filters에 key 추가
      if ((changed.value !== undefined) && JSON.stringify(changed.value) !== JSON.stringify({ from: undefined, to: undefined })) {
        setFilters(filters.concat(changed.key))
      }
    } else { // filters에 key가 존재하고 값이 유효하지 X -> filters에서 key 제외
      if ((changed.value === undefined) || JSON.stringify(changed.value) === JSON.stringify({ from: undefined, to: undefined })) {
        setFilters(filters.filter((f) => f !== changed.key))
      }
    }
  }, [changed])
  // 필터 개수 판단
  useEffect(() => {
    if (filters.length === 1 && sort === 'createdAt,desc') {
      setFilterCnt(0)
    } else if (filters.length > 0) {
      setFilterCnt(filters.length)
    }
  }, [filters, sort])

  // 조건에 따라 리스트 호출
  function getParams(params: any) {
    let sparams = createSearchParams(params);
    let target: any[] = [];
    sparams.forEach((val, key) => { if (val === '') { target.push(key); } })
    target.forEach(key => { sparams.delete(key); })
    return sparams.toString();
  }

  useEffect(() => {
    let apiURL = Object.keys(params).length !== 0 ? `/api/event?size=5&${getParams(params)}` : '/api/event?size=5'
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
      <PostTab events={events} value={value} handleChange={handleChange} filterCnt={filterCnt} filters={filters}
        setFilters={setFilters} sort={sort} setSort={setSort} dayRange={dayRange} setDayRange={setDayRange}
        participants={participants} setParticipants={setParticipants} headCount={headCount} setHeadCount={setHeadCount}
        page={page} setPageInfo={setPageInfo} selectedCate={selectedCate} setSelectedCate={setSelectedCate} />
    </div>
  )
};
export default index;

interface TabProps {
  events: never[]; value: number; handleChange: any; filterCnt: number; filters: string[],
  setFilters: Dispatch<SetStateAction<string[]>>; sort: string; setSort: Dispatch<SetStateAction<string>>;
  dayRange: DayRange; setDayRange: any; participants: number; setParticipants: any;
  headCount: { from: undefined | number, to: undefined | number }; setHeadCount: any;
  page: { current: number; total: number; }; setPageInfo: any;
  selectedCate: string[]; setSelectedCate: Dispatch<SetStateAction<string[]>>;
}

 export function PostTab(props: TabProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => { setOpen(true) }
  const handleClose = () => { setOpen(false) }
  const handleDelete = (event: any) => {
    props.setFilters((props.filters).filter((f) => f !== event.target.parentNode.id))
    switch (event.target.parentNode.id) {
      case 'dayRange': 
        props.setDayRange({from: undefined, to: undefined})
        break;
      case 'participants':
        props.setParticipants(undefined)
        break;
      case 'headCount':
        props.setHeadCount({from: undefined, to: undefined})
        break;
    }
  };

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
          <ViewButton handleOpen={handleOpen} cnt={props.filterCnt} fs={18} />
        </div>
      </Box>
      <div className='sticky top-[102px] bg-[#FFF] relative z-10'>
        {
          props.filterCnt > 0
            ? <div className='flex flex-row px-[16px] gap-[4px]'>
              <ThemeProvider theme={filterChipTheme}>
                <Chip label={sortLabel(props.sort)} variant="outlined" />
                {
                  (props.filters).includes('dayRange')
                    ? <Chip id='dayRange' label={props.dayRange.to === undefined || props.dayRange.to === null
                      ? handleDayData(props.dayRange.from, 1) : `${handleDayData(props.dayRange.from, 1)} - ${handleDayData(props.dayRange.to, 1)}`}
                      onDelete={handleDelete} deleteIcon={<img src='/main_delete_filter.svg' />} variant="outlined" />
                    : <></>
                }
                {
                  (props.filters).includes('participants')
                    ? <Chip id='participants' label={`참여 ${props.participants}명`} onDelete={handleDelete}
                      deleteIcon={<img src='/main_delete_filter.svg' />} variant="outlined" />
                    : <></>
                }
                {
                  (props.filters).includes('headCount')
                    ? <Chip id='headCount' label={`규모 ${props.headCount.from ?? ''} - ${props.headCount.to ?? ''}명`}
                      onDelete={handleDelete} deleteIcon={<img src='/main_delete_filter.svg'/>} variant="outlined" />
                    : <></>
                }</ThemeProvider>
            </div>
            : <></>
        }
        <CategoryButtons selectedCate={props.selectedCate} setSelectedCate={props.setSelectedCate} />
      </div>
      <Backdrop open={open} className='z-paper'>
        <ViewSelect sort={props.sort} setSort={props.setSort} handleClose={handleClose} dayRange={props.dayRange} setDayRange={props.setDayRange}
          participants={props.participants} setParticipants={props.setParticipants} headCount={props.headCount} setHeadCount={props.setHeadCount} />
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
        <div className='contents'>
          <ThemeProvider theme={writeFabTheme}>
            <Fab variant="extended" size="small" color="primary" className='fixed bottom-[55px] right-[16px]'>
              <div className='flex flex-row items-center'>
                <img src='/main_add.svg' />
                <span className='ps-[4px]'>글작성</span>
              </div>
            </Fab>
          </ThemeProvider>
          {/* {props.events.map((post, idx) => (
            idx === 0
              ? <FestivalBlock data={post} key={`party-${idx}`} />
              : <div key={`party-${idx}`}>
                <Divider />
                <FestivalBlock data={post} />
              </div>
          ))} */}
          {
            props.events.length > 0
              ? <>
                {props.events.map((post, idx) => (
                  <div key={`party-${idx}`}>
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
        </div>
      </>
    )
  }
}