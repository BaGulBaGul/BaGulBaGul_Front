"use client";
import { useState } from 'react';
import { Collapse } from '@mui/material';
import { FormatDateRange } from "@/service/Functions"
import { ReportedPosts,ReportedComments } from './_TmpData';
import { TrashIcn } from "@/components/common/styles/Icon"
import { TypeChip, UserProfile } from '@/components/common/block';
import { ExpandButton } from '@/components/common';

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
  console.log('expanded', expanded)
  return (
    <div className="flex flex-col bg-p-white">
      <div className="flex flex-row justify-between p-[16px] pb-[10px]">
        <div className="flex flex-col gap-[4px]">
          <TypeChip type={props.data.type} />
          <p className="text-16 font-semibold">{props.data.title}</p>
          <div className="flex flex-row gap-[8px]">
            <UserProfile userId={props.data.userId} userName={props.data.username} userProfileImageUrl={props.data.userProfileImageUrl} />
            <p className="text-14 text-gray3">{FormatDateRange(props.data.startDate, props.data.endDate)}</p>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <button onClick={handleDelete}><TrashIcn btn={true} /></button>
          <ExpandButton handleExpandClick={handleExpandClick} expanded={expanded} />
        </div>
      </div>
      <ReportCard expanded={expanded} data={props.data} />
    </div>
  )
}

function ReportCard(props: { expanded: boolean; data: any }) {
  return (
    <Collapse in={props.expanded} timeout="auto">
        <div className='flex flex-col mx-[16px] my-[10px] bg-gray1 rounded-[8px] p-[8px] gap-[4px]'>
          <div className='flex flex-row gap-[8px] text-12'>
            <p className='font-medium text-gray3'>신고한 회원</p>
            <p className='text-black'>{props.data.reporter}</p>
          </div>
          <div className='flex flex-row gap-[8px] text-12'>
            <p className='font-medium text-gray3'>신고 일시</p>
            <p className='text-black'>{props.data.reportedAt}</p>
          </div>
          <div className='flex flex-row gap-[8px] text-12'>
            <p className='font-medium text-gray3'>신고 내용</p>
            <p className='text-black'>{props.data.reportedReason}</p>
          </div>
        </div>
      </Collapse>
  )
}