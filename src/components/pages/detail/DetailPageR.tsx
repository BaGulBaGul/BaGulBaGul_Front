import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useLoginInfo from '@/hooks/useLoginInfo';
import { useDeletePost, useDetailInfo } from '@/hooks/useInDetail';
import { Divider, ImageSlide, ReportDialog, SkeletonDetail, BottomDrawer, BottomDrawerBody } from '@/components/common';
import { DateLine, HashtagList, UserProfile } from '@/components/common/block';
import { DetailInfoLine, DetailTools, DetailWrapper } from '.';
import { IconEye, IconMore } from '@/components/common/styles/Icon';

export function DetailPageR({ postId }: { postId: any; }) {
  const userinfo = useLoginInfo().data
  const router = useRouter();

  const { data, isLoading, isError, status } = useDetailInfo('event/recruitment', postId)

  const mutateDelete = useDeletePost('event/recruitment', postId)
  const handleDelete = () => { mutateDelete.mutate() }

  const [openD, setOpenD] = useState(false);
  const [openR, setOpenR] = useState(false);

  if (isLoading) { return (<SkeletonDetail map={false} />) }
  if (status !== 'success' || !data) { return (<></>) }
  return (
    <>
      <DetailWrapper title='모집글'>
        <ImageSlide images={data.post.imageUrls} />
        <div id="detail-title" className="flex flex-col gap-[4px] px-[16px] pt-[30px] pb-[20px]">
          <div className="flex flex-row justify-between items-center text-black">
            <span className="text-18">{data.post.title}</span>
            <button onClick={(e) => { setOpenD(true) }}><IconMore /></button>
          </div>
          <div className="flex flex-row gap-[8px] items-center">
            <DateLine startDate={data.recruitment.startDate} endDate={data.recruitment.endDate} />
            <div className='flex flex-row text-14 text-gray3 items-center'>
              <IconEye /><span className='ps-[4px]'>{data.post.views.toLocaleString("en-US")}</span>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <UserProfile userId={data.post.writer.userId} userName={data.post.writer.userName} userProfileImageUrl={data.post.writer.userProfileImageUrl} color='gray3' />
            {!!data.recruitment.categories &&
              <div className='flex flex-row gap-[8px]'>
                {data.recruitment.categories.map((cate: any, idx: number) => (
                  <span key={`cate-${idx}`} className='toggle-chip-btn pointer-events-none'>{cate}</span>
                ))}
              </div>}
          </div>
        </div>
        <Divider />
        <div id='detail-info' className='flex flex-col pt-[30px] gap-[6px]'>
          <DetailInfoLine title='모집인원' value={`${data.recruitment.maxHeadCount ?? '-'}명`}>
            <span className='ms-[6px] px-[4px] py-[2px] rounded-[2px] bg-primary-blue text-12 text-white'>{`${data.recruitment.currentHeadCount ?? 0}명 참여 중`}</span>
          </DetailInfoLine>
        </div>
        <p className='px-[16px] py-[30px] text-[14px] leading-[140%]'>{data.post.content}</p>
        {!!data.post.tags && data.post.tags.length > 0 && <div className='px-[16px] py-[30px]'>
          <HashtagList tags={data.post.tags} />
        </div>}
        <DetailTools origin={'event/recruitment'} postId={postId} userinfo={userinfo} commentCount={data.post.commentCount ?? 0} likeCount={data.post.likeCount ?? 0} />
      </DetailWrapper>
      <BottomDrawer open={openD} toggleOpen={(open) => { setOpenD(open) }}>
        {!!userinfo && userinfo.id === data.post.writer.userId
          ? <BottomDrawerBody me={true} handleDelete={handleDelete} handleEdit={() => router.push(`/write?w=r&edit=${data.recruitment.recruitmentId}`)} />
          : <BottomDrawerBody me={false} handleReport={() => { setOpenR(true); setOpenD(false); }} />
        }
      </BottomDrawer>
      <ReportDialog open={openR} toggleOpen={(open) => { setOpenR(open) }} type={'recruitment'} target={data.recruitment.recruitmentId} />
    </>
  );
}