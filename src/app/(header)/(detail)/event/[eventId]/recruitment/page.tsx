"use client";
import React from "react";
import { useParams, useSearchParams } from 'next/navigation';
import { fetchFromURLWithPage } from '@/service/ApiService';
import { getParams } from "@/service/Functions";
import { LoadingCircle, LoadingSkeleton, MoreButton, RListProps, Divider, NoEvent } from '@/components/common';
import { RecruitBlock } from "@/components/pages/detail";
import dayjs from "dayjs";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function Page() {
  const prms = useParams()
  const searchParams = useSearchParams()
  let params = {
    sort: searchParams.get('sort') ?? 'createdAt,desc',
    startDate: searchParams.get('sD') ? `${dayjs(searchParams.get('sD'), "YYYYMMDD").format('YYYY-MM-DD')}T00:00:00` : '',
    endDate: searchParams.get('eD') ? `${dayjs(searchParams.get('eD'), "YYYYMMDD").format('YYYY-MM-DD')}T23:59:59` : '',
    leftHeadCount: searchParams.get('ptcp') ?? '',
  }
  let apiURL = !!params && Object.keys(params).length !== 0 ? `/api/event/${prms.eventId}/recruitment?size=10&${getParams(params)}` : `/api/event/${prms.eventId}/recruitment?size=10`
  const { data: recruits, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ['recruits', params],
    queryFn: (pageParam) => fetchFromURLWithPage(apiURL, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPageParam >= lastPage.totalPages - 1) { return undefined }
      return lastPageParam + 1
    }, enabled: !!params,
  })
  const handleMore = () => { if (hasNextPage) { fetchNextPage() } }

  // if (isLoading && page.current === 0) { return <LoadingSkeleton type='RCT' /> }
  // else if (isLoading && page.current > 0) { return <LoadingCircle /> }
  if (status === 'success') {
    return (
      <>
        {!!recruits && !recruits.pages[0].empty
          ? <>
            {recruits.pages.map((recruit) => (
              recruit.content.map((item: RListProps, idx: any) => (
                <div key={`recruit-${idx}`}>
                  {idx === 0 ? <></> : <Divider />}
                  <RecruitBlock data={item} />
                </div>
              ))
            ))}
            {hasNextPage ? <MoreButton onClick={handleMore} /> : <></>}
          </>
          : <NoEvent text1="찾는 행사가 없어요." text2="지금 인기 있는 페스티벌을 만나보세요." buttonText={"페스티벌 인기순 보러가기"} />
        }
      </>
    )
  }
}
