"use client";
import { useState } from 'react';
import { FormatDateRange } from "@/service/Functions"
import { ReportedPosts, ReportedComments } from '../_TmpData';
import { TypeChip, UserProfile } from '@/components/common/block';
import { ExpandButton } from '@/components/common';
import { ReportCard } from './ReportCard';
import { ReportTool } from './ReportTool';
import { Collapse } from '@mui/material';

// * 다중 신고 시 UI 처리 추가 필요
export function ReportManagePage(props: { opt: 'POST' | 'CMT' }) {
  let reported = props.opt === 'POST' ? ReportedPosts : ReportedComments
  // if (isLoading) { return <SkeletonList thumb={false} tag={true} /> }
  // if (status === 'success') {
  return (
    <div className='flex flex-col w-full mt-[60px]'>
      {/* {!!recruits && !recruits.pages[0].empty
					? <> */}
      {/* {recruits.pages.map((recruit) => ( */}
      {
        // reported.map((r) => (
        reported.map((item: any, idx: any) => (
          <ReportedBlock data={item} key={`reported-${idx}`} />
        ))
        // ))
      }
      {/* {hasNextPage ? <MoreButton onClick={() => handleMore(hasNextPage, fetchNextPage)} /> : <></>}
						{isFetchingNextPage ? <LoadingCircle /> : <></>}
					</>
					: <NoData text1="찾는 행사가 없어요." text2="지금 인기 있는 페스티벌을 만나보세요." buttonText="페스티벌 인기순 보러가기" buttonLink="/?sort=likeCount%2Cdesc" />
				} */}
    </div>
  )
  // }
}

const handleDelete = () => {
  return alert('삭제되었습니다.')
}

export function ReportedBlock(props: { data: any }) {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => { setExpanded(!expanded); }
  return (
    <div className="flex flex-col bg-p-white">
      <div className="flex flex-row justify-between p-[16px] pb-[10px]">
        <div className="flex flex-col gap-[4px]">
          <TypeChip type={props.data.type} />
          <p className="text-16 font-semibold">{props.data.title}</p>
          <div className="flex flex-row gap-[8px]">
            <UserProfile userId={props.data.userId} userName={props.data.username} userProfileImageUrl={props.data.userProfileImageUrl} />
            {/* 신고일 */}
            <p className="text-14 text-gray3">{FormatDateRange(props.data.startDate, props.data.endDate)}</p>
          </div>
        </div>
        <ExpandButton handleExpandClick={handleExpandClick} expanded={expanded} />
      </div>
      <Collapse in={expanded} timeout="auto" className='px-[16px] py-[10px]'>
        <ReportCard data={props.data} />
        <ReportTool />
      </Collapse>
    </div>
  )
}