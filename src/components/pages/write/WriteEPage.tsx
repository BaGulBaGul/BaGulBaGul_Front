'use client';
import { useRef, useState } from 'react';
import { AlertDialog, CategoryButtons, Divider, ImageSlide, RangeProps } from '@/components/common';
import dayjs from 'dayjs';
import { PostInfoInput } from '@/components/pages/write/PostInfoInput';
import { MagnifyingIcn } from '@/components/common/styles/Icon';
import { AddressDialog } from '@/components/pages/write/AddressDialog';
import { useWrite } from '@/hooks/useInWrite';
import { autoResizeTextarea } from '.';
import { ImageUploader } from '@/components/common/input/ImageUploader';

export function WriteEPage(props: { text: string }) {
  const [selectedCate, setSelectedCate] = useState<string[]>([]);
  const [headCount, setHeadCount] = useState<RangeProps>({ from: undefined, to: undefined });
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null)
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null)
  const [forAdult, setForAdult] = useState(false);
  const [addr, setAddr] = useState<{ full: string, abs: string }>()
  const [content, setContent] = useState('');
  const [images, setImages] = useState([])
  const [imageKey, setImageKey] = useState<Number[]>([])
  const titleRef = useRef<any>(null)

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

  const mutateWrite = useWrite('event')
  const handleConfirm = () => {
    setOpen(false);
    let body: any = {
      'ageLimit': forAdult, 'categories': selectedCate, 'content': content, 'endDate': endDate,
      'imageIds': imageKey, 'latitudeLocation': 0, 'longitudeLocation': 0,
      'maxHeadCount': headCount.to, 'startDate': startDate, 'tags': [], 'title': titleRef.current.value, 'type': 'PARTY'
    }
    if (!!addr) {
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
  return (
    <>
      <div className='w-full mt-[104px] mb-[77px]'>
        <div className='relative h-[280px] bg-gray1'>
          {images.length > 0 ? <ImageSlide images={images} /> : <></>}
          <ImageUploader setImage={setImages} setImageKey={setImageKey} multiple={true} />
        </div>
        <input ref={titleRef} className='w-full focus:outline-none text-18 px-[16px] py-[10px]' type='text' placeholder='제목' />
        <Divider color='gray2' />
        <div className='pt-[10px] pb-[6px]'>
          <div className='flex-row flex items-center'>
            <span className='min-w-[32px] px-[16px] text-[14px] font-semibold'>파티</span>
            <span className='text-12 text-gray3'>카테고리는 최대 2개까지 선택가능합니다.</span>
          </div>
          <CategoryButtons selectedCate={selectedCate} setSelectedCate={setSelectedCate} max={2} />
        </div>
        <Divider color='gray2' />
        <PostInfoInput type='p' startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}
          headCount={headCount} setHeadCount={setHeadCount} forAdult={forAdult} setForAdult={setForAdult} />
        <Divider color='gray2' />
        <div className='flex flex-row justify-between gap-[16px] px-[16px] py-[10px]'>
          <span className='min-w-[49px] text-14 font-semibold'>위치</span>
          <div onClick={handleOpenAddr} className='flex flex-row items-center gap-[8px] cursor-pointer'>
            {addr && addr.full.length > 0 ? <span className='text-14'>{addr.full}</span> : <span className='text-14 text-gray2'>위치 검색</span>}
            <MagnifyingIcn size={24} />
          </div>
        </div>
        <Divider color='gray2' />
        <div className='px-[16px] py-[20px]'>
          <textarea className="w-full min-h-[250px] focus:outline-none text-14"
            placeholder={`파티에 대해서 설명해주세요!\n본문에 #을 이용해 파티 태그를 입력해보세요(최대 7개)`}
            value={content} onChange={(e) => autoResizeTextarea(e, setContent)} />
        </div>
        <AddressDialog open={openAddr} onClose={setOpenAddr} setAddr={setAddr} />
      </div>
      <button className="footer-btn" onClick={handleSubmit}>{props.text}</button>
      <AlertDialog open={open} setOpen={setOpen} headerText='연령 제한 파티' contextText={['이 파티는 연령 제한 파티로', '청소년 보호법에 따라 19세 미만의', '청소년이 참여할 수 없습니다.']} buttonText1='작성 취소하기'
        buttonText2='동의하기' buttonAction={handleConfirm} />
    </>
  )

}

const getCoords = (address: string, geocoder: any) => {
  return new Promise((resolve, reject) => {
    geocoder.addressSearch(address, (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].x, result[0].y);
        resolve(coords);
      } else { reject(status) }
    })
  })
}