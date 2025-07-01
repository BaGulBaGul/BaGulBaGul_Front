"use client";
import React from "react";
import { useParams, useSearchParams } from 'next/navigation';
import dayjs from "dayjs";
import { getParams } from "@/service/Functions";
import { useListWithPageE } from "@/hooks/useInCommon";
import { RListProps, Divider, SkeletonList, ListWrapper } from '@/components/common';
import { BlockBodyD, BlockContainer, BlockWrapper, NoData } from "@/components/common/block";

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
  const recruits = useListWithPageE(apiURL, ['recruits', params], !!params)

  return (
    <ListWrapper res={recruits} skeleton={<SkeletonList thumb={false} tag={true} />}
      nodata={<NoData text1="찾는 행사가 없어요." text2="지금 인기 있는 페스티벌을 만나보세요." buttonText="페스티벌 인기순 보러가기" buttonLink="/?sort=likeCount%2Cdesc" />}>
      {recruits.data?.pages.map((recruit) => (
        recruit.content.map((item: RListProps, idx: any) => (
          <div key={`recruit-${idx}`}>
            {idx === 0 ? <></> : <Divider />}
            <BlockContainer tags={item.post.tags}>
              <BlockWrapper url={`/recruitment/${item.recruitment.recruitmentId}`} wrapStyle='p-[16px] pb-[10px]'>
                <BlockBodyD title={item.post.title} startDate={item.recruitment.startDate} endDate={item.recruitment.endDate}
                  writer={item.post.writer} head={{ current: item.recruitment.currentHeadCount, max: item.recruitment.maxHeadCount }} />
              </BlockWrapper>
            </BlockContainer>
          </div>
        ))
      ))}
    </ListWrapper>
  )
}