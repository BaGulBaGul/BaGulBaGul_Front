import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useLoginInfo from '@/hooks/useLoginInfo';
import { useDeletePost, useDetailInfo } from '@/hooks/useInDetail';
import { Divider, BottomDrawer, ImageSlide, SkeletonDetail } from '@/components/common';
import { HashtagList } from '@/components/common/block';
import { DetailInfoLine, DetailTitle, DetailTools, DetailWrapper } from '.';

export function DetailPageR({ postId }: { postId: any; }) {
  const userinfo = useLoginInfo().data
  const router = useRouter();

  const { data: data, isLoading: isLoadingD, isError: isErrorD } = useDetailInfo('event/recruitment', postId)

  const mutateDelete = useDeletePost('event/recruitment', postId)
  const handleDelete = () => { mutateDelete.mutate() }

  const [openD, setOpenD] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => { setOpenD(newOpen); };

  if (isLoadingD) { return (<SkeletonDetail map={false} />) }
  if (!data) { return (<></>) }
  return (
    <>
      <DetailWrapper title='모집글'>
        <ImageSlide images={data.post.imageUrls} />
        <DetailTitle title={data.post.title} toggleDrawer={toggleDrawer} startDate={data.recruitment.startDate} endDate={data.recruitment.endDate}
          views={data.post.views} writer={data.post.writer} />
        <Divider />
        <div className='flex flex-col pt-[30px] gap-[6px]' id='detail-info'>
          <DetailInfoLine title='모집인원' value={`${data.recruitment.maxHeadCount ?? '-'}명`}>
            <span className='ms-[6px] px-[4px] py-[2px] rounded-[2px] bg-primary-blue text-12 text-white'>{`${data.recruitment.currentHeadCount ?? 0}명 참여 중`}</span>
          </DetailInfoLine>
        </div>
        <p className='px-[16px] py-[30px] text-[14px] leading-[140%]'>{data.post.content}</p>
        {!!data.post.tags && data.post.tags.length > 0 && <div className='px-[16px] py-[30px]'>
          <HashtagList tags={data.post.tags} />
        </div>}
      </DetailWrapper>
      <DetailTools origin={'event'} postId={postId} userinfo={userinfo} commentCount={data.post.commentCount ?? 0} likeCount={data.post.likeCount ?? 0} />
      <BottomDrawer open={openD} toggleDrawer={toggleDrawer} type='recruitment' target={data.recruitment.recruitmentId}
        me={!!userinfo && userinfo.id === data.post.writer.userId} handleDelete={handleDelete}
        handleEdit={() => router.push(`/write?w=p&edit=${data.recruitment.recruitmentId}`)} />
    </>
  );
}