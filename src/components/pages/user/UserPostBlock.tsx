import Link from 'next/link';
import { ListProps, RListProps, BlockInfoDT } from '@/components/common';
import { FormatDateRange } from '@/service/Functions';
import { PostEditIcn, DeleteIcn } from '@/components/common/styles/Icon';
import { UseMutationResult } from '@tanstack/react-query';
import { useDelete } from '@/hooks/useInCommon';

export function MyPostBlock(props: { opt: 'EVT' | 'RCT', data: ListProps | RListProps }) {
  const handleDelete = (e: any, mutateDelete: UseMutationResult<any, Error, void, unknown>) => {
    e.preventDefault();
    let confirmDelete = confirm("작성글을 삭제하시겠습니까?");
    if (confirmDelete) { mutateDelete.mutate() }
  }
  function PostButton(props: { mutateDelete: UseMutationResult<any, Error, void, unknown> }) {
    return (
      <div className='flex flex-row gap-[2px]'>
        <Link href={'/'}><PostEditIcn /></Link>
        <button onClick={(e) => handleDelete(e, props.mutateDelete)}><DeleteIcn /></button>
      </div>
    )
  }

  if (props.opt === 'EVT') {
    let data = props.data as ListProps
    let content = '일반 티켓은 2023년 4월 18일(화) 오후 6시부터 예매 가능하며, 한정 수량 소진 시 예매가 조기종료될 수 있습니다. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    const mutateDelete = useDelete(`/api/event/${data.event.eventId}`, ['my-posts', 0], '작성글')
    return (
      <Link href={`/event/${data.event.eventId}`} className='flex flex-row px-[16px] py-[18px] gap-[20px] bg-p-white'>
        <img className='rounded-[4px] h-[104px] w-[84px] min-w-[84px] object-cover' src={data.post.headImageUrl} />
        <div className='flex flex-col justify-between w-full'>
          <BlockInfoDT title={props.data.post.title} date={FormatDateRange(data.event.startDate, data.event.endDate)}
            actions={<PostButton mutateDelete={mutateDelete} />} />
          <span className='text-12 text-gray3 description max-w-[278px]'>{content}</span>
        </div>
      </Link>
    )
  } else {
    let data = props.data as RListProps
    const mutateDelete = useDelete(`/api/event/recruitment/${data.recruitment.recruitmentId}`, ['my-posts', 1], '작성글')
    return (
      <Link href={`/recruitment/${data.recruitment.recruitmentId}`} className='flex flex-col justify-between w-full px-[16px] py-[18px] gap-[4px] bg-p-white'>
        <BlockInfoDT title={props.data.post.title} date={FormatDateRange(data.recruitment.startDate, data.recruitment.endDate)}
          actions={<PostButton mutateDelete={mutateDelete} />} />
        <span className='text-14 text-gray3'>PEAK FESTIVAL 2023</span>
      </Link>
    )
  }
}

export function UserPostBlock(props: { opt: string, data: ListProps | RListProps }) {
  if (props.opt === 'EVT') {
    let data = props.data as ListProps
    let content = '일반 티켓은 2023년 4월 18일(화) 오후 6시부터 예매 가능하며, 한정 수량 소진 시 예매가 조기종료될 수 있습니다. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    return (
      <Link href={`/event/${data.event.eventId}`} className='flex flex-row px-[16px] py-[18px] gap-[20px] bg-p-white'>
        <img className='rounded-[4px] h-[104px] w-[84px] min-w-[84px] object-cover' src={data.post.headImageUrl} />
        <div className='flex flex-col justify-between w-full'>
          <BlockInfoDT title={props.data.post.title} date={FormatDateRange(data.event.startDate, data.event.endDate)} />
          <span className='text-12 text-gray3 description max-w-[278px]'>{content}</span>
        </div>
      </Link>
    )
  } else {
    let data = props.data as RListProps
    return (
      <Link href={`/recruitment/${data.recruitment.recruitmentId}`} className='flex flex-col justify-between w-full px-[16px] py-[18px] gap-[4px] bg-p-white'>
        <BlockInfoDT title={props.data.post.title} date={FormatDateRange(data.recruitment.startDate, data.recruitment.endDate)} />
        <span className='text-14 text-gray3'>PEAK FESTIVAL 2023</span>
      </Link>
    )
  }
}