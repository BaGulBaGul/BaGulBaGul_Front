'use client';
import { useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useWrite } from '@/hooks/useInWrite';
import { Write } from '.';
import { useDetailInfo } from '@/hooks/useInDetail';

export function WriteRPage(props: { eventId?: number; edit?: number; }) {
  const [headCount, setHeadCount] = useState<number>()
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null)
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null)
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([])
  const [imageKey, setImageKey] = useState<Number[]>([])
  const titleRef = useRef<any>(null)
  const prev = !!props.edit ? useDetailInfo('event/recruitment', props.edit) : undefined

  // 게시물 등록
  const mutateWrite = !!props.edit ? useWrite('recruitment', props.edit) : useWrite('recruitment')
  const handleSubmit = () => {
    if (!titleRef.current || titleRef.current.value.length <= 0) {
      alert('제목을 꼭 입력해주세요.')
    } else {
      let body = {
        'content': content, 'endDate': endDate, 'imageIds': imageKey, 'maxHeadCount': headCount,
        'startDate': startDate, 'tags': [], 'title': titleRef.current.value
      }
      let writeURL = !!props.eventId && !props.edit ? `/api/event/${props.eventId}/recruitment` : `/api/event/recruitment`
      mutateWrite.mutate({ apiURL: writeURL, body: body })
    }
  }

  return (
    <Write startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}
      headCount={headCount} setHeadCount={setHeadCount} content={content} setContent={setContent}
      images={images} setImages={setImages} imageKey={imageKey} setImageKey={setImageKey} titleRef={titleRef}
      handleSubmit={handleSubmit} prev={!!props.edit ? prev : undefined} />
  )
}