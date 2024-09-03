"use client";
import { DeleteIcn, HeaderBackIcn } from "@/components/common/styles/Icon";
import { Dialog } from "@mui/material";
import { RefObject, useRef } from "react";
import Script from 'next/script'

export function AddressDialog(props: { open: boolean; onClose: any; setAddr: any; }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleCloseAddr = () => {
    if (inputRef.current && inputRef.current.value.length > 0) {
      props.setAddr(inputRef.current.value)
    }
    props.onClose(false)
  }
  const handleClearAddr = () => {
    if (inputRef.current) { inputRef.current.value = '' }
  }

  return (
    <Dialog fullScreen open={props.open}>
      <Script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" async
        onReady={() => { execDaumPost(inputRef) }} />
      <div className='fixed w-full top-0 bg-p-white z-paper'>
        <div className='flex flex-row items-center ms-[16px] me-[28px] my-[18px] gap-[16px]'>
          <button onClick={handleCloseAddr}><HeaderBackIcn /></button>
          <div className='search-wrap w-full'>
            <input className='search-input' placeholder='징소, 주소 검색' ref={inputRef} />
            <button onClick={handleClearAddr}><DeleteIcn size='20' color='#1E1E1E' /></button>
          </div>
        </div>
      </div>
      <div id='addr-wrap' className="mt-[66px] w-full h-full"></div>
    </Dialog>
  )
}

const execDaumPost = (inputRef: RefObject<HTMLInputElement>) => {
  var wrap = document.getElementById('addr-wrap');
  const postcode = new window.daum.Postcode({
    oncomplete: function (data: any) {
      var addr = '';
      var extraAddr = '';
      // R: 도로명 주소 선택 / J: 지번 주소 선택
      if (data.userSelectedType === 'R') { addr = data.roadAddress; }
      else { addr = data.jibunAddress; }
      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === 'R') {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) { extraAddr += data.bname; }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddr !== '') { extraAddr = ' (' + extraAddr + ')'; }
      }
      inputRef.current!.value = addr + ' ' + extraAddr;
    },
    width: '100%', height: '100%'
  })
  postcode.embed(wrap, { autoClose: false });
}