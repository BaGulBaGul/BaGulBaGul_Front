'use client';
import { useEffect, useState } from 'react';
import { AlertDialog, CategoryButtons, Divider, ImageSlide, ImageUploader, CountSelect } from '@/components/common';
import { MagnifyingIcn } from '@/components/common/styles/Icon';
import { AddressDialog, autoResizeTextarea, DateSelect, WriteProps } from '.';
import { ThemeProvider } from '@emotion/react';
import { viewCheckTheme } from '@/components/common/filter/ViewFilterTheme';
import { Checkbox, FormControl, FormControlLabel } from '@mui/material';
import TagsInput from '@/components/common/input/TagInput';

export function Write(props: WriteProps) {
  let prevData = !!props.prev ? props.prev.data : undefined
  const [openAddr, setOpenAddr] = useState(false);
  const handleOpenAddr = () => { setOpenAddr(true) }

  const handleAdult = (e: React.ChangeEvent<HTMLInputElement>) => { if (!!props.setForAdult) { props.setForAdult(e.target.checked); } }

  const [openMax, setOpenMax] = useState(false);
  const handleOpenMax = () => { setOpenMax(!openMax) }
  const [openCurrent, setOpenCurrent] = useState(false);
  const handleOpenCurrent = () => { setOpenCurrent(!openCurrent) }

  useEffect(() => {
    if (!!prevData) {
      console.log(prevData)
      if (!!props.setSelectedCate) { props.setSelectedCate(prevData.event.categories) }
      if (!!props.setHeadMax) { props.setHeadMax((prevData.event ?? prevData.recruitment).maxHeadCount) }
      if (!!props.setHeadCurrent) { props.setHeadCurrent((prevData.event ?? prevData.recruitment).currentHeadCount) }
      props.setStartDate((prevData.event ?? prevData.recruitment).startDate)
      props.setEndDate((prevData.event ?? prevData.recruitment).endDate)
      if (!!props.setForAdult) { props.setForAdult(prevData.event.ageLimit) }
      if (!!props.setAddr) { props.setAddr({ full: prevData.event.fullLocation, abs: prevData.event.abstractLocation }) }
      props.setContent(prevData.post.content)
      props.setImages(prevData.post.imageUrls)
      props.setImageKey(prevData.post.imageIds)
      props.setTags(prevData.post.tags)
    }
  }, [])
  return (
    <>
      <div className='w-full mt-[104px] mb-[77px]'>
        <div className='relative h-[280px] bg-gray1'>
          {props.images.length > 0 ? <ImageSlide images={props.images} /> : <></>}
          <ImageUploader setImage={props.setImages} setImageKey={props.setImageKey} multiple={true} />
        </div>
        <input ref={props.titleRef} className='w-full focus:outline-none text-18 px-[16px] py-[10px]' type='text' placeholder='제목'
          defaultValue={!!prevData ? prevData.post.title : undefined} />
        <Divider color='gray2' />
        {/* 카테고리 */}
        {!!props.selectedCate && !!props.setSelectedCate
          ? <>
            <div className='pt-[10px] pb-[6px]'>
              <div className='flex-row flex items-center'>
                <span className='min-w-[32px] px-[16px] text-[14px] font-semibold'>파티</span>
                <span className='text-12 text-gray3'>카테고리는 최대 2개까지 선택가능합니다.</span>
              </div>
              <CategoryButtons selectedCate={props.selectedCate} setSelectedCate={props.setSelectedCate} max={2} setForAdult={props.setForAdult} />
            </div>
            <Divider color='gray2' />
          </> : <></>}
        {/* 날짜, 인원, 나이제한 */}
        <div className='flex flex-col gap-[8px] px-[16px] py-[10px]'>
          {!!props.setStartDate && !!props.setEndDate
            ? <><DateSelect title='시작일시' date={props.startDate!} setDate={props.setStartDate} />
              <DateSelect title='종료일시' date={props.endDate!} setDate={props.setEndDate} /></>
            : <></>}
          <CountSelect title='모집인원' subtext='원하는 인원 수를 정할 수 있어요.' open={openMax} handleOpen={handleOpenMax} headCount={props.headMax} setHeadCount={props.setHeadMax} />
          <CountSelect title='현재인원' subtext='이미 모인 인원이 있다면 입력해주세요.' open={openCurrent} handleOpen={handleOpenCurrent} headCount={props.headCurrent} setHeadCount={props.setHeadCurrent} />
          {props.forAdult !== undefined && !!props.setForAdult
            ? <div className="flex flex-row justify-between">
              <div className={`${props.forAdult ? 'text-primary-blue' : 'text-gray3'} text-14 font-semibold pb-[2px]`}>19세 미만 참여불가 파티</div>
              <ThemeProvider theme={viewCheckTheme}>
                <FormControl>
                  <FormControlLabel control={<Checkbox checked={props.forAdult} onChange={handleAdult} />} label="" />
                </FormControl>
              </ThemeProvider>
            </div>
            : <></>}
        </div>
        <Divider color='gray2' />
        {/* 주소 */}
        {!!props.setAddr
          ? <>
            <div className='flex flex-row justify-between gap-[16px] px-[16px] py-[10px]'>
              <span className='min-w-[49px] text-14 font-semibold'>위치</span>
              <div onClick={handleOpenAddr} className='flex flex-row items-center gap-[8px] cursor-pointer'>
                {props.addr && props.addr.full && props.addr.full.length > 0 ? <span className='text-14'>{props.addr.full}</span> : <span className='text-14 text-gray2'>위치 검색</span>}
                <MagnifyingIcn size={24} />
              </div>
            </div>
            <AddressDialog open={openAddr} onClose={setOpenAddr} addr={!!props.addr ? props.addr.full : ''} setAddr={props.setAddr} />
            <Divider color='gray2' />
          </> : <></>}
        {/* 본문 */}
        <div className='px-[16px] py-[20px]'>
          <textarea className="w-full min-h-[360px] focus:outline-none text-14"
            placeholder={`파티에 대해서 설명해주세요!`}
            value={props.content} onChange={(e) => autoResizeTextarea(e, props.setContent)} />
        </div>
        <TagsInput tags={props.tags} setTags={props.setTags} />
      </div>
      <button className="footer-btn" onClick={props.handleSubmit}>작성하기</button>
      {props.open !== undefined && !!props.setOpen && !!props.handleConfirm
        ? <AlertDialog open={props.open} setOpen={props.setOpen} headerText='연령 제한 파티' contextText={['이 파티는 연령 제한 파티로', '청소년 보호법에 따라 19세 미만의', '청소년이 참여할 수 없습니다.']}
          buttonText1='작성 취소하기' buttonText2='동의하기' buttonAction={props.handleConfirm} />
        : <></>}
    </>
  )
}