'use client';
import { useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useWrite } from '@/hooks/useInWrite';
import { Write } from '.';
import { useDetailInfo } from '@/hooks/useInDetail';
import { SkeletonWrite } from '@/components/common';

export function WriteRPage(props: { eventId?: number; edit?: number; }) {
  const [headMax, setHeadMax] = useState<number>()
  const [headCurrent, setHeadCurrent] = useState<number>()
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null)
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null)
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([])
  const [imageKey, setImageKey] = useState<Number[]>([])
  const [tags, setTags] = useState<string[]>([])
  const titleRef = useRef<any>(null)
  const prev = !!props.edit ? useDetailInfo('event/recruitment', props.edit) : undefined

  // 게시물 등록
  const mutateWrite = !!props.edit ? useWrite('recruitment', props.edit) : useWrite('recruitment')
  const handleSubmit = () => {
    if (!titleRef.current || titleRef.current.value.length <= 0) {
      alert('제목을 꼭 입력해주세요.')
    } else {
      let body = {
        'content': content, 'currentHeadCount': headCurrent ?? null, 'endDate': !!endDate ? endDate.toISOString() : null, 'imageIds': imageKey,
        'maxHeadCount': headMax ?? null, 'startDate': !!startDate ? startDate.toISOString() : null, 'tags': tags, 'title': titleRef.current.value
      }
      let writeURL = !!props.eventId && !props.edit ? `/api/event/${props.eventId}/recruitment` : `/api/event/recruitment`
      mutateWrite.mutate({ apiURL: writeURL, body: body })
    }
  }

  if (!!props.edit && (!!prev && !prev.isSuccess)) { return (<SkeletonWrite opt='r' />) }
  return (
    <Write startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}
      headMax={headMax} setHeadMax={setHeadMax} headCurrent={headCurrent} setHeadCurrent={setHeadCurrent}
      content={content} setContent={setContent} images={images} setImages={setImages} imageKey={imageKey}
      setImageKey={setImageKey} titleRef={titleRef} tags={tags} setTags={setTags} handleSubmit={handleSubmit} 
      prev={!!props.edit ? prev : undefined} />
  )
}