"use client";
import React from "react";
import { useParams, useSearchParams } from 'next/navigation';
import dayjs from "dayjs";
import { getParams } from "@/service/Functions";
import { handleMore, useListWithPageE } from "@/hooks/useInCommon";
import { LoadingCircle, MoreButton, RListProps, Divider, SkeletonList } from '@/components/common';
import { NoData } from "@/components/common/block";
import { RecruitBlock } from "@/components/pages/detail";

export default function Page() {
  const prms = useParams()
  const searchParams = useSearchParams()
  let params = {
    sort: searchParams.get('sort') ?? 'createdAt,desc',
    startDate: searchParams.get('sD') ? `${dayjs(searchParams.get('sD'), "YYYYMMDD").format('YYYY-MM-DD')}T00:00:00` : '',
    endDate: searchParams.get('eD') ? `${dayjs(searchParams.get('eD'), "YYYYMMDD").format('YYYY-MM-DD')}T23:59:59` : '',
    leftHeadCount: searchParams.get('ptcp') ?? '',
  }
  let apiURL = !!params && Object.keys(params).length !== 0 ? `/api/event/recruitment?size=10&eventId=${prms.eventId}&${getParams(params)}` : `/api/event/recruitment?size=10&eventId=${prms.eventId}`
  const { data: recruits, fetchNextPage, hasNextPage, status, isLoading, isFetchingNextPage } = useListWithPageE(apiURL, ['recruits', params], !!params)

  if (isLoading) { return <SkeletonList thumb={false} tag={true} /> }
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
            {hasNextPage ? <MoreButton onClick={() => handleMore(hasNextPage, fetchNextPage)} /> : <></>}
            {isFetchingNextPage ? <LoadingCircle /> : <></>}
          </>
          : <NoData text1="찾는 행사가 없어요." text2="지금 인기 있는 페스티벌을 만나보세요." buttonText="페스티벌 인기순 보러가기" buttonLink="/?sort=likeCount%2Cdesc" />
        }
      </>
    )
  }
}
