"use client";
import { Accordion } from '@base-ui-components/react';
import { ReportedPosts, ReportedComments } from '../_TmpData';
import { ReportTool } from './ReportTool';
import { ReportedBlock } from './ReportedBlock';

// * 다중 신고 시 UI 처리 추가 필요
export function ReportManagePage({ opt }: { opt: 'POST' | 'CMT' }) {
  let reported = opt === 'POST' ? ReportedPosts : ReportedComments
  // if (isLoading) { return <SkeletonList thumb={false} tag={true} /> }
  // if (status === 'success') {
  return (
    <div className='flex flex-col w-full mt-[60px]'>
      <Accordion.Root>
        {/* {!!recruits && !recruits.pages[0].empty
					? <> */}
        {/* {recruits.pages.map((recruit) => ( */}
        {
          // reported.map((r) => (
          reported.map((item: any, idx: any) => (
            <Accordion.Item>
              <ReportedBlock data={item} key={`reported-${idx}`} >
                <ReportTool opt={opt} />
              </ReportedBlock>
            </Accordion.Item>
          ))
          // ))
        }
        {/* {hasNextPage ? <MoreButton onClick={() => handleMore(hasNextPage, fetchNextPage)} /> : <></>}
						{isFetchingNextPage ? <LoadingCircle /> : <></>}
					</>
					: <NoData text1="찾는 행사가 없어요." text2="지금 인기 있는 페스티벌을 만나보세요." buttonText="페스티벌 인기순 보러가기" buttonLink="/?sort=likeCount%2Cdesc" />
				} */}
      </Accordion.Root>
    </div>
  )
  // }
}

const handleDelete = () => {
  return alert('삭제되었습니다.')
}