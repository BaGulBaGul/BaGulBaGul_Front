import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { typeString } from '@/service/Functions';
import useLoginInfo from '@/hooks/useLoginInfo';
import { useDeletePost, useDetailInfo } from '@/hooks/useInDetail';
import { Divider, BottomDrawer, FooterButton, ImageSlide, SkeletonDetail } from '@/components/common';
import { HashtagList } from '@/components/common/block';
import { DetailInfoLine, DetailMap, DetailTitle, DetailTools, DetailWrapper } from '.';

export function DetailPageE({ postId }: { postId: any; }) {
  const userinfo = useLoginInfo().data
  const router = useRouter();

  const { data: data, isLoading: isLoadingD, isError: isErrorD } = useDetailInfo('event', postId)

  const mutateDelete = useDeletePost('event', postId)
  const handleDelete = () => { mutateDelete.mutate() }

  const [openD, setOpenD] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => { setOpenD(newOpen); };

  if (isLoadingD) { return (<SkeletonDetail map={true} />) }
  if (!data) { return (<></>) }
  else {
    const isParty = data.event.type === 'PARTY'
    return (
      <>
        <DetailWrapper title={typeString[data.event.type as string]} wrapStyle={!isParty ? 'pb-[77px]' : ''}>
          <ImageSlide images={data.post.imageUrls} />
          <DetailTitle title={data.post.title} toggleDrawer={toggleDrawer} startDate={data.event.startDate} endDate={data.event.endDate}
            views={data.post.views} writer={data.post.writer} categories={data.event.categories} />
          <Divider />
          <div className='flex flex-col pt-[30px] gap-[6px]' id='detail-info'>
            <DetailInfoLine title='시작일시' value={!!data.event.startDate ? dayjs(data.event.startDate).format('YY.MM.DD(dd)   HH:mm') : '-'} />
            <DetailInfoLine title='종료일시' value={!!data.event.endDate ? dayjs(data.event.endDate).format('YY.MM.DD(dd)   HH:mm') : '-'} />
            <DetailInfoLine title='참여인원' value={`${data.event.maxHeadCount ?? '-'}명`}>
              {isParty &&
                <span className='ms-[6px] px-[4px] py-[2px] rounded-[2px] bg-primary-blue text-12 text-white'>{`${data.event.currentHeadCount ?? 0}명 참여 중`}</span>}
            </DetailInfoLine>
          </div>
          <p className='px-[16px] py-[30px] text-[14px] leading-[140%]'>{data.post.content}</p>
          <div className='flex flex-col gap-[6px]'>
            <DetailMap lat={data.event.latitudeLocation} lng={data.event.longitudeLocation} />
            <DetailInfoLine title='위치' value={data.event.fullLocation} />
          </div>
          {!!data.post.tags && data.post.tags.length > 0 && <div className='px-[16px] py-[30px]'>
            <HashtagList tags={data.post.tags} />
          </div>}
          <DetailTools origin={'event'} postId={postId} userinfo={userinfo} commentCount={data.post.commentCount ?? 0} likeCount={data.post.likeCount ?? 0} />
        </DetailWrapper>
        {!isParty && <FooterButton text={"모집글 보러가기"} path={`/event/${data.event.eventId}/recruitment`} />}
        <BottomDrawer open={openD} toggleDrawer={toggleDrawer} type='event' target={data.event.eventId}
          me={isParty && !!userinfo && userinfo.id === data.post.writer.userId} handleDelete={handleDelete}
          handleEdit={!isParty ? undefined : () => router.push(`/write?w=p&edit=${data.event.eventId}`)} />
      </>
    );
  }
}