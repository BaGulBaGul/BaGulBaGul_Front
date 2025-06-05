'use client';
import { useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useWrite } from '@/hooks/useInWrite';
import { useDetailInfo } from '@/hooks/useInDetail';
import { Divider, ImageSlide, SkeletonWrite } from '@/components/common';
import { ImageUploader, InputCollapse, InputNumber } from '@/components/common/input';
import { BodyInput, InputDateSelect, TagsInput, TitleInput, Write } from '.';

export function WriteRPage(props: { eventId?: number; edit?: number; }) {
  const prev = !!props.edit ? useDetailInfo('event/recruitment', props.edit) : undefined

  const [headMax, setHeadMax] = useState<number | null>()
  const [headCurrent, setHeadCurrent] = useState<number | null>()
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null)
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null)
  const [images, setImages] = useState<string[]>([])
  const [imageKey, setImageKey] = useState<Number[]>([])
  const [tags, setTags] = useState<string[]>([])
  const titleRef = useRef<any>(null)
  const contentRef = useRef<any>(null);

  // 게시물 등록
  const mutateWrite = !!props.edit ? useWrite('recruitment', props.edit) : useWrite('recruitment')
  const handleSubmit = () => {
    if (!titleRef.current || titleRef.current.value.length <= 0) {
      alert('제목을 꼭 입력해주세요.')
    } else {
      let body = {
        'content': contentRef.current ? contentRef.current.value : null, 'currentHeadCount': headCurrent ?? null, 'endDate': !!endDate ? endDate.toISOString() : null, 'imageIds': imageKey,
        'maxHeadCount': headMax ?? null, 'startDate': !!startDate ? startDate.toISOString() : null, 'tags': tags, 'title': titleRef.current.value
      }
      let writeURL = !!props.eventId && !props.edit ? `/api/event/${props.eventId}/recruitment` : `/api/event/recruitment`
      mutateWrite.mutate({ apiURL: writeURL, body: body })
    }
  }

  if (!!props.edit && (!!prev && !prev.isSuccess)) { return (<SkeletonWrite opt='r' />) }
  return (
    <Write handleSubmit={handleSubmit}>
      <div className='relative h-[280px] bg-gray1'>
        {images.length > 0 ? <ImageSlide images={images} setImages={setImages} /> : <></>}
        <ImageUploader setImage={setImages} setImageKey={setImageKey} multiple={true} />
      </div>
      <TitleInput titleRef={titleRef} prev={!!prev ? prev.data.post.title : undefined} />
      <Divider color='gray2' />
      <div className='flex flex-col px-[16px] py-[10px] gap-[16px]'>
        <InputDateSelect title={'시작일시'} date={startDate} setDate={setStartDate} />
        <InputDateSelect title={'종료일시'} date={endDate} setDate={setEndDate} />
        <InputCollapse title={'모집인원'} type="NUM" value={headMax ?? 0} >
          <InputNumber value={headMax ?? 0} onChange={(newValue) => setHeadMax(newValue)} />
        </InputCollapse>
        <InputCollapse title={'현재인원'} type="NUM" value={headCurrent ?? 0} >
          <InputNumber value={headCurrent ?? 0} onChange={(newValue) => setHeadCurrent(newValue)} />
        </InputCollapse>
      </div>
      <Divider color='gray2' />
      <BodyInput bodyRef={contentRef} value={!!prev ? prev.data.post.content : undefined} />
      <TagsInput tags={tags} setTags={setTags} />
    </Write>
  )
}