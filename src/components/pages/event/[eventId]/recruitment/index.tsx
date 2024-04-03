"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from 'next/navigation';
import { Divider } from '@mui/material';
import { LoadingCircle, LoadingSkeleton, MoreButton } from '@/components/common';
import { call } from '@/service/ApiService';
import { ParamProps, RecruitProps, String2ISO, getParams, setEventList } from "@/service/Functions";
import { RecruitBlock } from "@/components/common/EventBlock";

const index = () => {
  return (
    <div className='flex flex-col w-full pt-[104px] pb-[44px]'>
      <RecruitTab />
    </div>
  )
};
export default index;

function RecruitTab() {
  const prms = useParams()
  const searchParams = useSearchParams()
  const [isLoading, setLoading] = useState(true)
  const [recruits, setRecruits] = useState<RecruitProps[]>([]);

  const [params, setParams] = useState<ParamProps | undefined>();
  // **********************************
  const [proceeding, setProceeding] = useState(false);

  const [page, setPage] = useState({ current: 0, total: 0, });
  function setPageInfo(currentPage: number) {
    setPage({ ...page, current: currentPage });
    setParams({ ...params, page: currentPage });
  }

  const initialSet = useRef(false);
  useEffect(() => {
    if (initialSet.current) { initialSet.current = false }
    setRecruits([])
    setLoading(true);
    setParams({
      page: 0, sort: searchParams.get('sort') ?? 'createdAt,desc',
      startDate: searchParams.get('sD') ? String2ISO((searchParams.get('sD'))) : '',
      endDate: searchParams.get('eD') ? String2ISO((searchParams.get('eD'))) : '',
      leftHeadCount: searchParams.get('ptcp') ?? ''
    })
  }, [searchParams])

  // 조건에 따라 리스트 호출
  useEffect(() => {
    if (params) {
      let apiURL = Object.keys(params).length !== 0 ? `/api/event/${prms.eventId}/recruitment?size=10&${getParams(params)}` : `/api/event/${prms.eventId}/recruitment?size=10`
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
    }
  }, [params])

  const handleMore = () => { setPageInfo(page.current + 1) }
  if (isLoading && page.current === 0) { return <LoadingSkeleton type='RCT' /> }
  else if (isLoading && page.current > 0) { return <LoadingCircle /> }
  else {
    return (
      <>
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
            ? <MoreButton onClick={handleMore} /> : <></>
        }
      </>
    )
  }
}