'use client';
import { useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useWrite } from '@/hooks/useInWrite';
import { AddressDialog } from '.';
import { useDetailInfo } from '@/hooks/useInDetail';
import { CategoryButtons, Divider, EventType, ImageSlide, ImageUploader, SkeletonWrite } from '@/components/common';
import { handleWrite, Write } from './_Write';
import { TitleInput } from '@/components/common/input/_TitleInput';
import { FilterCheck, FilterContainer, FilterSearchBox } from '@/components/common/filter/FilterWrapper';
import { FilterNumber } from '@/components/common/filter/FilterContent';
import { BodyInput } from '@/components/common/input/_BodyInput';
import TagsInput from '@/components/common/input/TagInput';
import { FilterCollapse, FilterDateSelect } from '@/components/common/filter/_FilterCollapse';
import TypeToggle from '@/components/common/input/_TypeToggle';

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
        {images.length > 0 ? <ImageSlide images={images} setImages={setImages} /> : <></>}
        <ImageUploader setImage={setImages} setImageKey={setImageKey} multiple={true} />
      </div>
      <TitleInput titleRef={titleRef} prev={!!prev ? prev.data.post.title : undefined} />
      <Divider color='gray2' />
      <FilterContainer title="게시글" desc="1개만 선택가능합니다.">
        <TypeToggle type={type} handleType={(e, newType) => setType(newType as EventType)} />
      </FilterContainer>
      <Divider color='gray2' />
      <FilterSearchBox title={'주최기관'} defaultText={'주최기관 검색'} value={undefined} handleClick={handleOpenAddr} />
      <Divider color='gray2' />
      <FilterContainer title="카테고리" desc="카테고리는 최대 2개까지 선택가능합니다.">
        <CategoryButtons selectedCate={selectedCate} setSelectedCate={setSelectedCate} max={2} setForAdult={setForAdult} />
      </FilterContainer>
      <Divider color='gray2' />
      <div className='flex flex-col px-[16px] py-[10px] gap-[8px]'>
        <FilterDateSelect title={'시작일시'} date={startDate} setDate={setStartDate} />
        <FilterDateSelect title={'종료일시'} date={endDate} setDate={setEndDate} />
        <FilterCollapse title={'규모설정'} type="NUM" value={headMax ?? 0} >
          <FilterNumber value={headMax ?? 0} onChange={(newValue) => setHeadMax(newValue)} />
        </FilterCollapse>
        <FilterCheck title='19세 미만 참여불가 파티' checked={forAdult} handleChange={handleAdult} />
      </div>
      <Divider color='gray2' />
      <FilterSearchBox title={'위치'} defaultText={'위치 검색'} value={!!addr ? addr.full : undefined} handleClick={handleOpenAddr} />
      <Divider color='gray2' />
      <BodyInput bodyRef={contentRef} value={!!prev ? prev.data.post.content : undefined} />
      <AddressDialog open={openAddr} onClose={setOpenAddr} addr={!!addr ? addr.full : ''} setAddr={setAddr} />
      <TagsInput tags={tags} setTags={setTags} />
    </Write>
  )
}