"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { LoadingCircle, LoadingSkeleton, MoreButton, ParamProps, RListProps, Divider } from '@/components/common';
import { call } from '@/service/ApiService';
import { getParams, setPageInfo, setUniqueList } from "@/service/Functions";
import { RecruitBlock } from "@/components/common/EventBlock";
import dayjs from "dayjs";

const index = () => {
  return (
    <RecruitTab />
  )
};
export default index;

function RecruitTab() {
  const prms = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isLoading, setLoading] = useState(true)
  const [recruits, setRecruits] = useState<RListProps[]>([]);

  const [params, setParams] = useState<ParamProps | undefined>();

  const [page, setPage] = useState({ current: 0, total: 0, });
  const initialSet = useRef(false);
  useEffect(() => {
    if (initialSet.current) { initialSet.current = false }
    setRecruits([])
    setLoading(true);
    setParams({
      page: 0, sort: searchParams.get('sort') ?? 'createdAt,desc',
      state: searchParams.get('state') && searchParams.get('state') === 'r' ? 'PROCEEDING' : '',
      startDate: searchParams.get('sD') ? `${dayjs(searchParams.get('sD')).format('YYYY-MM-DD')}T00:00:00` : '',
      endDate: searchParams.get('eD') ? `${dayjs(searchParams.get('eD')).format('YYYY-MM-DD')}T23:59:59` : '',
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
            setUniqueList('EVT', response.data.content, setRecruits, recruits)
          }
          setLoading(false)
        })
    }
  }, [params])

  const handleMore = () => { setPageInfo(page, setPage, page.current + 1, params, setParams) }
  if (isLoading && page.current === 0) { return <LoadingSkeleton type='RCT' /> }
  else if (isLoading && page.current > 0) { return <LoadingCircle /> }
  else {
    return (
      <>
        {recruits.map((post, idx) => (
          <div key={`recruit-${idx}`}>
            {idx === 0 ? <></> : <Divider />}
            <RecruitBlock data={post} router={router} />
          </div>
        ))}
        {page.total > 1 && page.current + 1 < page.total ? <MoreButton onClick={handleMore} /> : <></>}
      </>
    )
  }
}