'use client';
import { useState } from 'react';
import { useWrite } from '@/hooks/useInWrite';
import { useDetailInfo } from '@/hooks/useInDetail';
import { Divider, ImageSlide, SkeletonWrite } from '@/components/common';
import { ImageUploader } from '@/components/common/input';
import { BodyInput, InputDateSelect, TagsInput, TitleInput, Write } from '.';
import { FilterNumber } from '@/components/common/filter';

export function WriteRPage(props: { eventId?: number; edit?: number; }) {
  const prev = !!props.edit ? useDetailInfo('event/recruitment', props.edit) : undefined

  const [images, setImages] = useState<string[]>([])
  const [imageKey, setImageKey] = useState<Number[]>([])
  const [tags, setTags] = useState<string[]>([])

  // 게시물 등록
  const mutateWrite = !!props.edit ? useWrite('recruitment', props.edit) : useWrite('recruitment')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    if (!formData.get('title')) { alert('제목을 꼭 입력해주세요.') }
    else {
      if (formData.get('ageLimit') === 'off') { formData.delete('ageLimit') }
      let fd = Object.fromEntries(formData.entries())
      let params = {
        ...fd,
        'imageIds': imageKey, 'tags': tags
      }
      let writeURL = !!props.eventId && !props.edit ? `/api/event/${props.eventId}/recruitment` : `/api/event/recruitment`
      mutateWrite.mutate({ apiURL: writeURL, body: params })
    }
  }

  if (!!props.edit && (!!prev && !prev.isSuccess)) { return (<SkeletonWrite opt='r' />) }
  return (
    <Write handleSubmit={handleSubmit}>
      <div className='relative h-[280px] bg-gray1'>
        <ImageSlide editable={true} images={images} updateImages={(imgs) => { setImages(imgs) }}
          imageKey={imageKey} updateImageKey={(keys) => { setImageKey(keys) }} default={<></>} />
        <ImageUploader setImage={setImages} setImageKey={setImageKey} multiple={true} />
      </div>
      <TitleInput prev={!!prev ? prev.data.post.title : undefined} />
      <Divider color='gray2' />
      <div className='flex flex-col px-[16px] py-[10px] gap-[16px]'>
        <InputDateSelect title={'시작일시'} date={!!prev ? prev.data.event.startDate : undefined} name='sD' />
        <InputDateSelect title={'종료일시'} date={!!prev ? prev.data.event.endDate : undefined} name='eD' />
        <FilterNumber prevVal={!!prev ? prev.data.post.maxHeadCount : undefined} title="모집인원" name='maxHeadCount' />
        <FilterNumber prevVal={!!prev ? prev.data.post.currentHeadCount : undefined} title="현재인원" name='currentHeadCount' />
      </div>
      <Divider color='gray2' />
      <BodyInput value={!!prev ? prev.data.post.content : undefined} />
      <TagsInput tags={tags} setTags={setTags} />
    </Write>
  )
}