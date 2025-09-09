import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { typeString } from '@/service/Functions';
import useLoginInfo from '@/hooks/useLoginInfo';
import { useDeletePost, useDetailInfo } from '@/hooks/useInDetail';
import { Divider, FooterButton, ImageSlide, ReportDialog, SkeletonDetail, BottomDrawer, BottomDrawerBody } from '@/components/common';
import { DateLine, HashtagList, UserProfile } from '@/components/common/block';
import { DetailInfoLine, DetailMap, DetailTools, DetailWrapper } from '.';
import { IconEye, IconMore } from '@/components/common/styles/Icon';

export function DetailPageE({ postId }: { postId: any; }) {
  const userinfo = useLoginInfo().data
  const router = useRouter();

  const { data, isLoading, isError, status } = useDetailInfo('event', postId)

  const mutateDelete = useDeletePost('event', postId)
  const handleDelete = () => { mutateDelete.mutate() }

  // flag for bottom drawer, report dialog
  const [openD, setOpenD] = useState(false);
  const [openR, setOpenR] = useState(false);

  if (isLoading) { return (<SkeletonDetail map={true} />) }
  if (status !== 'success' || !data) { return (<></>) }
  else {
    const isParty = data.event.type === 'PARTY'
    return (
      <>
        <DetailWrapper title={typeString[data.event.type as string]} wrapStyle={!isParty ? 'pb-[77px]' : ''}>
          <ImageSlide images={data.post.imageUrls} />
          <div id="detail-title" className="flex flex-col gap-[4px] px-[16px] pt-[30px] pb-[20px]">
            <div className="flex flex-row justify-between items-center text-black">
              <span className="text-18">{data.post.title}</span>
              <button onClick={(e) => {setOpenD(true)}}><IconMore /></button>
            </div>
            <div className="flex flex-row justify-between items-center">
              <DateLine startDate={data.event.startDate} endDate={data.event.endDate} />
              <div className='flex flex-row text-14 text-gray3 items-center'>
                <IconEye /><span className='ps-[4px]'>{data.post.views.toLocaleString("en-US")}</span>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <UserProfile userId={data.post.writer.userId} userName={data.post.writer.userName} userProfileImageUrl={data.post.writer.userProfileImageUrl} color='gray3' />
              {!!data.event.categories &&
                <div className='flex flex-row gap-[8px]'>
                  {data.event.categories.map((cate: any, idx: number) => (
                    <span key={`cate-${idx}`} className='toggle-chip-btn pointer-events-none'>{cate}</span>
                  ))}
                </div>}
            </div>
          </div>
          <Divider />
          <div id='detail-info' className='flex flex-col pt-[30px] gap-[6px]'>
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
        <BottomDrawer open={openD} toggleOpen={(open) => { setOpenD(open) }}>
          {isParty && !!userinfo && userinfo.id === data.post.writer.userId
            ? <BottomDrawerBody me={true} handleDelete={handleDelete} handleEdit={!isParty ? undefined : () => router.push(`/write?w=p&edit=${data.event.eventId}`)} />
            : <BottomDrawerBody me={false} handleReport={() => { setOpenR(true); setOpenD(false); }} />
          }
        </BottomDrawer>
        <ReportDialog open={openR} toggleOpen={(open) => { setOpenR(open) }} type={'event'} target={data.event.eventId} />
        {!isParty && <FooterButton text={"모집글 보러가기"} path={`/event/${data.event.eventId}/recruitment`} />}
      </>
    );
  }
}