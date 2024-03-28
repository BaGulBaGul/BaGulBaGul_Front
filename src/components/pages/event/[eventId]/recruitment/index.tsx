"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from 'next/navigation';
import { Divider, Backdrop } from '@mui/material';
import { LoadingCircle, LoadingSkeleton, MoreButton, ViewButton, ViewSelect } from '@/components/common';
import { call } from '@/service/ApiService';
import { RangeProps, RecruitProps, getParams, setEventList, useEffectFilter, useEffectFilterApplied, useEffectParam } from "@/service/Functions";
import { DayRange } from "@hassanmojab/react-modern-calendar-datepicker";
import { RecruitBlock } from "@/components/common/EventBlock";

const index = () => {
  const [isLoading, setLoading] = useState(true)

  const prms = useParams()
  const [proceeding, setProceeding] = useState(false);
  const [sort, setSort] = useState('createdAt,desc');
  const [dayRange, setDayRange] = useState<DayRange>({ from: undefined, to: undefined });
  const [participants, setParticipants] = useState(0);

  const [params, setParams] = useState({ page: 0, sort: sort, startDate: '', endDate: '' });
  const [recruits, setRecruits] = useState<RecruitProps[]>([]);

  const [page, setPage] = useState({ current: 0, total: 0, });
  function setPageInfo(currentPage: number) {
    setPage({ ...page, current: currentPage });
    setParams({ ...params, page: currentPage });
  }

  const initialSet = useRef(false);
  // 적용된 필터들, 적용된 필터 개수, 현재 변경된 필터
  const [filters, setFilters] = useState(['sort'])
  const [filterCnt, setFilterCnt] = useState(0)
  const [changed, setChanged] = useState<{ key: string, value: string | number | RangeProps | undefined }>({ key: '', value: undefined })

  useEffectParam([sort, dayRange, participants], initialSet, setParams, params,
    undefined, [], sort, dayRange, participants, { from: undefined, to: undefined }, setRecruits, setLoading)

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
          setEventList(response.data.content, recruits, setRecruits)
        }
        setLoading(false)
      })
  }, [params])

  // 검색필터
  const [open, setOpen] = useState(false);
  const handleOpen = () => { setOpen(true) }
  const handleClose = () => { setOpen(false) }

  return (
    <>
      <div className="relative z-20">
        <div className="fixed top-[44px] left-0 right-0 flex-row flex w-full h-[60px] justify-between px-[17px] place-items-center bg-[#FFF]">
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
        <RecruitTabs recruits={recruits} isLoading={isLoading} page={page} setPageInfo={setPageInfo} proceeding={proceeding} />
      </div>
    </>
  )
};
export default index;

function RecruitTabs(props: {
  recruits: RecruitProps[]; isLoading: boolean; page: { current: number; total: number; };
  setPageInfo: any; proceeding: boolean;
}) {
  // 더보기 버튼
  const handleMore = () => { props.setPageInfo(props.page.current + 1) }
  if (props.isLoading && props.page.current === 0) { return <LoadingSkeleton type='RCT' /> }
  else if (props.isLoading && props.page.current > 0) { return <LoadingCircle /> }
  else {
    return (
      <>
        {
          props.recruits.map((post, idx) => {
            if (props.proceeding) {
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
          props.page.total > 1 && props.page.current + 1 < props.page.total
            ? <MoreButton onClick={handleMore} /> : <></>
        }
      </>
    )
  }
}