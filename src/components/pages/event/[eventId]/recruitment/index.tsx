"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from 'next/navigation';
import Link from "next/link";
import { ThemeProvider, Divider, FormControl, FormControlLabel, Checkbox, Chip, Backdrop } from '@mui/material';
import { doneChipTheme, viewCheckTheme } from '@/components/common/Themes'
import { HashtagAccordion, MoreButton, ViewButton, ViewSelect } from '@/components/common';
import { call } from '@/service/ApiService';
import { FormatDate, RangeProps, getParams, useEffectFilter, useEffectFilterApplied, useEffectParam } from "@/service/Functions";
import { DayRange } from "@hassanmojab/react-modern-calendar-datepicker";

const index = () => {
  const prms = useParams()
  const [proceeding, setProceeding] = useState(false);
  const [sort, setSort] = useState('createdAt,desc');
  const [dayRange, setDayRange] = useState<DayRange>({ from: undefined, to: undefined });
  const [participants, setParticipants] = useState(0);

  interface RecruitProps {
    title: string; user_profile: string; username: string; state: string;
    startDate: any; tags?: string[]; id?: number;
  }
  const [params, setParams] = useState({ page: 0, sort: sort, startDate: '', endDate: '' });
  const [recruits, setRecruits] = useState<RecruitProps[]>([]);
  function setRecruitList(currentRecruits: []) {
    const newRecruits = recruits.concat(currentRecruits)
    const newRecruitsSet = new Set(newRecruits)
    const newRecruitsList = Array.from(newRecruitsSet);
    console.log(newRecruits, ' | ', newRecruitsSet)
    setRecruits(newRecruitsList);
  }

  const [page, setPage] = useState({ current: 0, total: 0, });
  function setPageInfo(currentPage: number) {
    setPage({ ...page, current: currentPage });
  }

  const initialSet = useRef(false);
  const mounted = useRef(false);

  // 적용된 필터들, 적용된 필터 개수, 현재 변경된 필터
  const [filters, setFilters] = useState(['sort'])
  const [filterCnt, setFilterCnt] = useState(0)
  const [changed, setChanged] = useState<{ key: string, value: string | number | RangeProps | undefined }>({ key: '', value: undefined })

  useEffectParam([sort, dayRange, participants], initialSet, setParams, params,
    undefined, [], sort, dayRange, participants, { from: undefined, to: undefined }, setRecruits)

  // 적용된 필터 확인
  useEffectFilter([sort, dayRange, participants], ['sort', 'dayRange', 'participants'], setChanged)
  useEffectFilterApplied([filters, sort], filters, setFilters, changed, sort, setFilterCnt)

  useEffect(() => {
    let apiURL = Object.keys(params).length !== 0 ? `/api/event/${prms.eventId}/recruitment?size=5&${getParams(params)}` : `/api/event/${prms.eventId}/recruitment?size=5`
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
          setRecruitList(response.data.content)
        }
      })
  }, [params])

  // 검색필터
  const [open, setOpen] = useState(false);
  const handleOpen = () => { setOpen(true) }
  const handleClose = () => { setOpen(false) }
  // 더보기 버튼
  const handleMore = () => { setPageInfo(page.current + 1) }

  return (
    <>
      <div className="relative z-20">
        <div className="fixed top-[44px] left-0 right-0 flex-row flex w-full h-[60px] justify-between px-[17px] place-items-center bg-[#FFFFFF]">
          <a href={'/'} className="me-[46px]"><img src='/arrow_prev.svg' /></a>
          <div className='text-[18px]'>모집글</div>
          <ViewButton handleOpen={handleOpen} cnt={filterCnt} fs={18} />
        </div>
      </div>
      <Backdrop open={open} className='z-paper'>
        <ViewSelect sort={sort} setSort={setSort} handleClose={handleClose} dayRange={dayRange} setDayRange={setDayRange}
          participants={participants} setParticipants={setParticipants} proceeding={proceeding} setProceeding={setProceeding} />
      </Backdrop>
      <div className='flex flex-col w-full pt-[104px] pb-[44px]'>
        {
          recruits.map((post, idx) => {
            if (proceeding) {
              return (
                post.state === "PROCEEDING"
                  ? <div key={`recruit-${idx}`}>
                    {idx === 0 ? <></> : <Divider />}
                    <RecruitBlock data={post} />
                  </div>
                  : <></>
              )
            } else {
              return (
                <div key={`recruit-${idx}`}>
                  {idx === 0 ? <></> : <Divider />}
                  <RecruitBlock data={post} />
                </div>
              )
            }
          }
          )
        }
        {
          page.total > 1 && page.current + 1 < page.total
            ? <MoreButton onClick={handleMore} />
            : <></>
        }
      </div>
    </>
  )

  // function ViewsCheck() {
  //   const handleView = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setView(e.target.checked);
  //   }
  //   return (
  //     <div className='sticky top-[104px] bg-[#FFF] relative z-10'>
  //       <div className='flex flex-row justify-end gap-[8px] px-[16px] pb-[10px]'>
  //         <ThemeProvider theme={viewCheckTheme}>
  //           <FormControl>
  //             <FormControlLabel control={<Checkbox checked={view} value='festival' onChange={handleView} />} label="모집 중만 보기" />
  //           </FormControl>
  //         </ThemeProvider>
  //       </div>
  //     </div>
  //   )
  // }

  function RecruitBlock(props: { data: RecruitProps }) {
    let urlLink = `/recruitment/${props.data.id}`
    return (
      <div className='flex flex-col py-[18px] px-[16px]'>
        <div className='flex flex-col gap-[4px]'>
          <Link href={urlLink}>
            <p className='truncate text-[16px]'>{props.data.title}</p>
            <p className='text-[14px] text-gray3'>{FormatDate(props.data.startDate, 0)}</p>
          </Link>
          <div className='flex flex-row items-center gap-[8px]'>
            <div className='flex flex-row items-center gap-[4px]'>
              <img className='w-[24px] h-[24px]' src="/main_profile.svg" />
              <p className="text-[14px] text-gray3">{props.data.username}</p>
            </div>
            {
              props.data.state === "PROCEEDING" ? <></> : <ThemeProvider theme={doneChipTheme}><Chip label="모집완료" /></ThemeProvider>
            }
          </div>
          {props.data.tags ? <HashtagAccordion tag={props.data.tags} /> : <></>}
        </div>
      </div>
    )
  }
};
export default index;