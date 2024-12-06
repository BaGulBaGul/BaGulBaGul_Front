'use client';
import { useRef, useState } from 'react';
import { Divider } from '@/components/common';
import dayjs from 'dayjs';
import { PostInfoInput } from '@/components/pages/write/PostInfoInput';
import { useWrite } from '@/hooks/useInWrite';
import { autoResizeTextarea } from '.';

// 파티글
export function WriteRPage(props: { text: string; eventId: number; }) {
  const [participants, setParticipants] = useState(0);
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null)
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null)
  const [content, setContent] = useState('');

  const titleRef = useRef<any>(null)

  const mutateWrite = useWrite('recruitment')
  const handleConfirm = () => {
    if (!titleRef.current || titleRef.current.value.length <= 0) {
      alert('제목을 꼭 입력해주세요.')
    } else {
      let body = {
        'content': content, 'endDate': endDate, 'imageIds': [], 'maxHeadCount': participants,
        'startDate': startDate, 'tags': [], 'title': titleRef.current.value
      }
      mutateWrite.mutate({ apiURL: `/api/event/${props.eventId}/recruitment`, body: body })
    }
  }

  return (
    <>
      <div className='w-full mt-[104px] mb-[77px]'>
        <div className='relative h-[280px] bg-gray1'>
          {/* 이미지 들어갈 곳 */}
        </div>
        <input ref={titleRef} className='w-full focus:outline-none text-18 px-[16px] py-[10px]' type='text' placeholder='제목' />
        <Divider color='gray2' />
        <PostInfoInput type='r' participants={participants} setParticipants={setParticipants} />
        <Divider color='gray2' />
        <div className='px-[16px] py-[20px]'>
          <textarea className="w-full min-h-[250px] focus:outline-none text-14"
            placeholder={`파티에 대해서 설명해주세요!\n본문에 #을 이용해 파티 태그를 입력해보세요(최대 7개)`}
            value={content} onChange={(e) => autoResizeTextarea(e, setContent)} />
        </div>
      </div>
      <button className="footer-btn" onClick={handleConfirm}>{props.text}</button>
    </>
  )

}