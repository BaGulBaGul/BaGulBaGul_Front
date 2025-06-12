'use client';
import { useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useWrite } from '@/hooks/useInWrite';
import { useDetailInfo } from '@/hooks/useInDetail';
import { Divider, EventType, ImageSlide, SkeletonWrite } from '@/components/common';
import { ImageUploader, InputContainer, CategoryButtons, InputCollapse, InputNumber, InputCheck } from '@/components/common/input';
import { AddressDialog, BodyInput, handleWrite, InputDateSelect, SearchBox, TagsInput, TitleInput, TypeToggle, Write } from '.';

export function WriteAPage(props: { edit?: number; }) {
  const prev = !!props.edit ? useDetailInfo('event', props.edit) : undefined

  const [selectedCate, setSelectedCate] = useState<string[]>([]);
  const [type, setType] = useState<EventType | undefined>(undefined);
  const [headMax, setHeadMax] = useState<number | null>()
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null)
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null)
  const [forAdult, setForAdult] = useState(false);
  const [addr, setAddr] = useState<{ full: string, abs: string } | null>(null)
  const [images, setImages] = useState<string[]>([])
  const [imageKey, setImageKey] = useState<Number[]>([])
  const [tags, setTags] = useState<string[]>([])
  const titleRef = useRef<any>(null);
  const contentRef = useRef<any>(null);

  const handleAdult = (e: React.ChangeEvent<HTMLInputElement>) => { if (!!setForAdult) { setForAdult(e.target.checked); } }

  const [openAddr, setOpenAddr] = useState(false);
  const handleOpenAddr = () => { setOpenAddr(true) }

  // 게시물 등록
  const [open, setOpen] = useState(false);
  const handleSubmit = () => {
    if (!titleRef.current || titleRef.current.value.length <= 0) { alert('제목을 꼭 입력해주세요.') }
    else {
      if (!!forAdult) { setOpen(true) }
      else { handleConfirm() }
    }
  }
  // * 수정 필요
  const mutateWrite = !!props.edit ? useWrite('event', props.edit) : useWrite('event')
  const handleConfirm = () => {
    setOpen(false);
    let body: any = {
      'ageLimit': forAdult, 'categories': selectedCate, 'content': contentRef.current ? contentRef.current.value : null,
      'endDate': !!endDate ? endDate.toISOString() : null, 'imageIds': imageKey, 'maxHeadCount': headMax ?? null,
      'startDate': !!startDate ? startDate.toISOString() : null, 'tags': tags, 'title': titleRef.current.value, 'type': 'PARTY'
    }
    handleWrite('/api/event', mutateWrite, body, addr, props.edit, prev);
  }

  if (!!props.edit && (!!prev && !prev.isSuccess)) { return (<SkeletonWrite opt='p' />) }
  return (
    <Write handleSubmit={handleSubmit}>
      <div className='relative h-[280px] bg-gray1'>
        <ImageSlide images={images} setImages={setImages} default={<></>} />
        <ImageUploader setImage={setImages} setImageKey={setImageKey} multiple={true} />
      </div>
      <TitleInput titleRef={titleRef} prev={!!prev ? prev.data.post.title : undefined} />
      <Divider color='gray2' />
      <InputContainer title="게시글" desc="1개만 선택가능합니다." p={true}>
        <TypeToggle type={type} handleType={(e, newType) => setType(newType as EventType)} />
      </InputContainer>
      <Divider color='gray2' />
      <SearchBox title={'주최기관'} defaultText={'주최기관 검색'} value={undefined} handleClick={handleOpenAddr} />
      <Divider color='gray2' />
      <InputContainer title="카테고리" desc="카테고리는 최대 2개까지 선택가능합니다." p={true}>
        <CategoryButtons selectedCate={selectedCate} setSelectedCate={setSelectedCate} max={2} setForAdult={setForAdult} />
      </InputContainer>
      <Divider color='gray2' />
      <div className='flex flex-col px-[16px] py-[10px] gap-[8px]'>
        <InputDateSelect title={'시작일시'} date={startDate} setDate={setStartDate} />
        <InputDateSelect title={'종료일시'} date={endDate} setDate={setEndDate} />
        <InputCollapse title={'규모설정'} type="NUM" value={headMax ?? 0} >
          <InputNumber value={headMax ?? 0} onChange={(newValue) => setHeadMax(newValue)} />
        </InputCollapse>
        <InputCheck title='19세 미만 참여불가 파티' checked={forAdult} handleChange={handleAdult} />
      </div>
      <Divider color='gray2' />
      <SearchBox title={'위치'} defaultText={'위치 검색'} value={!!addr ? addr.full : undefined} handleClick={handleOpenAddr} />
      <Divider color='gray2' />
      <BodyInput bodyRef={contentRef} value={!!prev ? prev.data.post.content : undefined} />
      <AddressDialog open={openAddr} onClose={setOpenAddr} addr={!!addr ? addr.full : ''} setAddr={setAddr} />
      <TagsInput tags={tags} setTags={setTags} />
    </Write>
  )
}