'use client';
import { useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useWrite } from '@/hooks/useInWrite';
import { getCoords, Write } from '.';
import { useDetailInfo } from '@/hooks/useInDetail';
import { SkeletonWrite } from '@/components/common';

export function WriteEPage(props: { edit?: number; }) {
  const [selectedCate, setSelectedCate] = useState<string[]>([]);
  const [headMax, setHeadMax] = useState<number>()
  const [headCurrent, setHeadCurrent] = useState<number>()
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null)
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null)
  const [forAdult, setForAdult] = useState(false);
  const [addr, setAddr] = useState<{ full: string, abs: string } | null>(null)
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([])
  const [imageKey, setImageKey] = useState<Number[]>([])
  const titleRef = useRef<any>(null);
  const prev = !!props.edit ? useDetailInfo('event', props.edit) : undefined

  // 게시물 등록
  const [open, setOpen] = useState(false);
  const handleSubmit = () => {
    if (!titleRef.current || titleRef.current.value.length <= 0) { alert('제목을 꼭 입력해주세요.') }
    else {
      if (!!forAdult) { setOpen(true) }
      else { handleConfirm() }
    }
  }
  const mutateWrite = !!props.edit ? useWrite('event', props.edit) : useWrite('event')
  const handleConfirm = () => {
    setOpen(false);
    let body: any = {
      'ageLimit': forAdult, 'categories': selectedCate, 'content': content, 'currentHeadCount': headCurrent,
      'endDate': endDate, 'imageIds': imageKey, 'maxHeadCount': headMax, 'startDate': startDate, 'tags': null,
      'title': titleRef.current.value, 'type': 'PARTY'
    }
    if (!addr && (!!prev && !!prev.data && !!prev.data.event.fullLocation)) { // 공백으로 수정 시 주소 삭제
      body['abstractLocation'] = null
      body['fullLocation'] = null
      body['latitudeLocation'] = null
      body['longitudeLocation'] = null
    }
    if (!!addr && (!props.edit || (!!prev && !!prev.data && prev.data.event.fullLocation !== addr.full))) {  // 새로운 주소 입력 시 위경도 찾고 등록
      body['abstractLocation'] = addr.abs
      body['fullLocation'] = addr.full
      window.kakao.maps.load(async function () {
        var geocoder = new window.kakao.maps.services.Geocoder();
        const coords: any = !!addr ? await getCoords(addr.full, geocoder) : undefined
        if (!!coords) {
          body['latitudeLocation'] = coords.La
          body['longitudeLocation'] = coords.Ma
        }
        mutateWrite.mutate({ apiURL: '/api/event', body: body })
      })
    } else { mutateWrite.mutate({ apiURL: '/api/event', body: body }) }
  }

  if (!!props.edit && (!!prev && !prev.isSuccess)) { return (<SkeletonWrite opt='p' />) }
  return (
    <Write selectedCate={selectedCate} setSelectedCate={setSelectedCate}
      startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}
      headMax={headMax} setHeadMax={setHeadMax} headCurrent={headCurrent} setHeadCurrent={setHeadCurrent}
      addr={addr} setAddr={setAddr} forAdult={forAdult} setForAdult={setForAdult} content={content} setContent={setContent}
      images={images} setImages={setImages} imageKey={imageKey} setImageKey={setImageKey} titleRef={titleRef}
      open={open} setOpen={setOpen} handleSubmit={handleSubmit} handleConfirm={handleConfirm}
      prev={!!props.edit ? prev : undefined} />
  )
}