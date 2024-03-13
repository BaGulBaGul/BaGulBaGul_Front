"use client";
import { useState, useRef, Dispatch, SetStateAction } from 'react';
import { Box, Divider, ThemeProvider, Fab, Backdrop, } from '@mui/material';
import {
  CategoryButtons, ViewButton, ViewSelect, TabPanel, MoreButton, FestivalBlock, NoEvent, RecCarousel, PostTab, ViewFilterApplied
} from '@/components/common';
import { writeFabTheme } from '@/components/common/Themes'
import { valueList } from '@/components/common/Data';
import { useEffectFilter, useEffectFilterApplied, useEffectParam, useEffectCallAPI, RangeProps, PostTabsProps } from '@/service/Functions';
import { DayRange } from '@hassanmojab/react-modern-calendar-datepicker'

const index = () => {
  //type
  const [value, setValue] = useState(0);
  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // 선택된 카테고리, 정렬기준(default 최신순), 날짜, 참여인원, 규모
  const [selectedCate, setSelectedCate] = useState<string[]>([]);
  const [sort, setSort] = useState('createdAt,desc');
  const [dayRange, setDayRange] = useState<DayRange>({ from: undefined, to: undefined });
  // * temporary name
  const [participants, setParticipants] = useState(0);
  const [headCount, setHeadCount] = useState<RangeProps>({ from: undefined, to: undefined });

  // api 호출용 파라미터, 호출 결과
  const [params, setParams] = useState({ page: 0, type: valueList[value], categories: selectedCate, sort: sort, startDate: '', endDate: '' });
  const [events, setEvents] = useState([]);

  // const loading = useRef<boolean>(false);
  const [page, setPage] = useState({ current: 0, total: 0, });
  function setPageInfo(currentPage: number) {
    setPage({ ...page, current: currentPage });
    setParams({ ...params, page: currentPage })
  }

  const initialSet = useRef(false);
  // 적용된 필터들, 적용된 필터 개수, 현재 변경된 필터
  const [filters, setFilters] = useState(['sort'])
  const [filterCnt, setFilterCnt] = useState(0)
  const [changed, setChanged] = useState<{ key: string, value: string | number | RangeProps | undefined }>({ key: '', value: undefined })

  // const mounted = useRef(false);
  useEffectParam([selectedCate, sort, value, dayRange, participants, headCount], initialSet, setParams, params,
    value, selectedCate, sort, dayRange, participants, headCount, setEvents)

  // 적용된 필터 확인
  useEffectFilter([sort, dayRange, participants, headCount], ['sort', 'dayRange', 'participants', 'headCount'], setChanged)
  useEffectFilterApplied([filters, sort], filters, setFilters, changed, sort, setFilterCnt)

  // 조건에 따라 리스트 호출
  useEffectCallAPI(params, initialSet, setPage, events, setEvents)

  return (
    <div className='flex flex-col w-full pt-[44px]'>
      <RecCarousel />
      <PostTabs events={events} value={value} handleChange={handleChange} filterCnt={filterCnt} filters={filters}
        setFilters={setFilters} sort={sort} setSort={setSort} dayRange={dayRange} setDayRange={setDayRange}
        participants={participants} setParticipants={setParticipants} headCount={headCount} setHeadCount={setHeadCount}
        page={page} setPageInfo={setPageInfo} selectedCate={selectedCate} setSelectedCate={setSelectedCate} />
    </div>
  )
};
export default index;

export function PostTabs(props: PostTabsProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => { setOpen(true) }
  const handleClose = () => { setOpen(false) }

  return (
    <Box className='w-full px-0'>
      <Box className='sticky top-[44px] bg-[#FFF] relative z-10 px-[16px] pt-[20px] pb-[10px]'>
        <div className='flex justify-between items-center'>
          <PostTab value={props.value} handleChange={props.handleChange} />
          <ViewButton handleOpen={handleOpen} cnt={props.filterCnt} fs={18} />
        </div>
      </Box>
      <div className='sticky top-[102px] bg-[#FFF] relative z-10'>
        <ViewFilterApplied filterCnt={props.filterCnt} filters={props.filters} setFilters={props.setFilters}
          sort={props.sort} dayRange={props.dayRange} setDayRange={props.setDayRange} participants={props.participants}
          setParticipants={props.setParticipants} headCount={props.headCount} setHeadCount={props.setHeadCount} />
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
  if (props.opt === 0) {  // 페스티벌, 지역행사
    return (
      <div className='bg-white-text'>
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
      </div>
    )
  } else if (props.opt === 1) { // 파티
    return (
      <div className='bg-white-text'>
        <ThemeProvider theme={writeFabTheme}>
          <Fab variant="extended" size="small" color="primary" className='fixed bottom-[55px] right-[16px]'>
            <div className='flex flex-row items-center'>
              <img src='/main_add.svg' />
              <span className='ps-[4px]'>글작성</span>
            </div>
          </Fab>
        </ThemeProvider>
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
    )
  }
}