'use client';
import { PropsWithChildren } from 'react';
import { FooterButton } from '@/components/common/_FooterButton';
import { UseMutationResult } from '@tanstack/react-query';
import { getCoords } from '.';

// * ====== 250602 alert dialog 추가 적용 필요
interface Props extends PropsWithChildren { handleSubmit: () => void; }
export function Write({ handleSubmit, children }: Props) {
  return (
    <>
      <div className='w-full mt-[104px] mb-[77px]'>
        {children}
      </div>
      <FooterButton text="작성하기" handleClick={handleSubmit} />
      {/* {openDialog !== undefined && !!handleConfirm
        ? <AlertDialog open={props.open} setOpen={props.setOpen} headerText='연령 제한 파티' buttonText1='작성 취소하기' buttonText2='동의하기' buttonAction={props.handleConfirm}>
          <p>이 파티는 연령 제한 파티로</p>
          <p>청소년 보호법에 따라 19세 미만의</p>
          <p>청소년이 참여할 수 없습니다.</p>
        </AlertDialog>
        : <></>} */}
    </>
  )
}

export const handleWrite = (
  apiURL: string, mutateWrite: UseMutationResult<any, Error, { apiURL: string; body: Object; }, unknown>,
  body: any, addr?: { full: string, abs: string } | null, edit?: number, prev?: any
) => {
  if (!addr && (!!prev && !!prev.data && !!prev.data.event.fullLocation)) { // 공백으로 수정 시 주소 삭제
    body['abstractLocation'] = null
    body['fullLocation'] = null
    body['latitudeLocation'] = null
    body['longitudeLocation'] = null
  }
  if (!!addr && (!edit || (!!prev && !!prev.data && prev.data.event.fullLocation !== addr.full))) {  // 새로운 주소 입력 시 위경도 찾고 등록
    body['abstractLocation'] = addr.abs
    body['fullLocation'] = addr.full
    window.kakao.maps.load(async function () {
      var geocoder = new window.kakao.maps.services.Geocoder();
      const coords: any = !!addr ? await getCoords(addr.full, geocoder) : undefined
      if (!!coords) {
        body['latitudeLocation'] = coords.La
        body['longitudeLocation'] = coords.Ma
      }
      console.log(body)
      // mutateWrite.mutate({ apiURL: apiURL, body: body })
    })
  } else {
    console.log(body);
    // mutateWrite.mutate({ apiURL: apiURL, body: body })
  }
}