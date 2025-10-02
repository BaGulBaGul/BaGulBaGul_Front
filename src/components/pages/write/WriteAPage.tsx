'use client';
import { useState } from 'react';
import { Dialog } from '@base-ui-components/react';
import { useWrite } from '@/hooks/useInWrite';
import { useDetailInfo } from '@/hooks/useInDetail';
import { Divider, ImageSlide, SkeletonWrite } from '@/components/common';
import { ImageUploader, InputContainer, CategoryButtons, InputCheck } from '@/components/common/input';
import { AddressDialog, BodyInput, handleWrite, InputDateSelect, SearchBox, SearchBoxTrigger, TagsInput, TitleInput, TypeToggle, Write } from '.';
import { FilterNumber } from '@/components/common/filter';

export function WriteAPage(props: { edit?: number; }) {
  const prev = !!props.edit ? useDetailInfo('event', props.edit) : undefined

  const [selectedCate, setSelectedCate] = useState<string[]>([]);
  const [addr, setAddr] = useState<{ full: string, abs: string } | null>(null)
  const [images, setImages] = useState<string[]>([])
  const [imageKey, setImageKey] = useState<Number[]>([])
  const [tags, setTags] = useState<string[]>([])
  
  // 게시물 등록
  // * 연령제한 안내 팝업 추가 필요
  const [open, setOpen] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    if (!formData.get('title')) { alert('제목을 꼭 입력해주세요.') }
    else {
      // if (formData.get('ageLimit') !== 'off') { setOpen(true) }
      // else { handleConfirm(formData) }
      handleConfirm(formData)
    }
  }
  
  const mutateWrite = !!props.edit ? useWrite('event', props.edit) : useWrite('event')
  const handleConfirm = (formData: FormData) => {
    setOpen(false);
    if (formData.get('ageLimit') === 'off') { formData.delete('ageLimit') }
    let fd = Object.fromEntries(formData.entries())
    let params = {
      ...fd,
      'categories': selectedCate, 'imageIds': imageKey, 'tags': tags
    }
    handleWrite('/api/event', mutateWrite, params, addr, props.edit, prev);
  }

  if (!!props.edit && (!!prev && !prev.isSuccess)) { return (<SkeletonWrite opt='p' />) }
  return (
    <Write handleSubmit={handleSubmit}>
      <div className='relative h-[280px] bg-gray1'>
        <ImageSlide editable={true} images={images} updateImages={(imgs) => { setImages(imgs) }}
          imageKey={imageKey} updateImageKey={(keys) => { setImageKey(keys) }} default={<></>} />
        <ImageUploader setImage={setImages} setImageKey={setImageKey} multiple={true} />
      </div>
      <TitleInput prev={!!prev ? prev.data.post.title : undefined} />
      <Divider color='gray2' />
      <InputContainer title="게시글" desc="1개만 선택가능합니다." p={true}>
        <TypeToggle type={!!prev ? prev.data.post.type : undefined} />
      </InputContainer>
      <Divider color='gray2' />
      <SearchBox title={'주최기관'} >
        <Dialog.Root>
          <SearchBoxTrigger defaultText={'주최기관 검색'} value={undefined} />
        </Dialog.Root>
      </SearchBox>
      <Divider color='gray2' />
      <InputContainer title="카테고리" desc="카테고리는 최대 2개까지 선택가능합니다." p={true}>
        <CategoryButtons selectedCate={selectedCate} updateSelectedCate={(groupValue: string[]) => { setSelectedCate(groupValue) }} max={2} />
      </InputContainer>
      <Divider color='gray2' />
      <div className='flex flex-col px-[16px] py-[10px] gap-[8px]'>
        <InputDateSelect title={'시작일시'} date={!!prev ? prev.data.event.startDate : undefined} name='sD' />
        <InputDateSelect title={'종료일시'} date={!!prev ? prev.data.event.endDate : undefined} name='eD' />
        <FilterNumber prevVal={!!prev ? prev.data.post.maxHeadCount : undefined} title="규모설정" />
        <InputCheck title='19세 미만 참여불가 파티' name="ageLimit" value="true" defaultChecked={!!prev ? prev.data.event.ageLimit : false} />
      </div>
      <Divider color='gray2' />
      <SearchBox title={'위치'}>
        <AddressDialog addr={addr} updateAddr={(addr) => setAddr(addr)} />
      </SearchBox>
      <Divider color='gray2' />
      <BodyInput value={!!prev ? prev.data.post.content : undefined} />
      <TagsInput tags={tags} setTags={setTags} />
    </Write>
  )
}