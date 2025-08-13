"use client";
import { RefObject, useRef, useState } from "react";
import Script from 'next/script'
import { Dialog } from "@base-ui-components/react";
import { DeleteIcn, HeaderBackIcn } from "@/components/common/styles/Icon";
import { SearchInput } from "@/components/common/input";
import { DialogFull } from "@/components/common";
import { SearchBoxTrigger } from ".";

export function AddressDialog({ addr, updateAddr }: {addr: { full: string, abs: string } | null; updateAddr: (addr:any)=>void}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [abs, setAbs] = useState('')
  const handleCloseAddr = (open: boolean) => {
    if (!open && inputRef.current) {
      if (inputRef.current.value.length > 0 || (inputRef.current.value.length === 0 && !!addr)) {
        updateAddr({ full: inputRef.current.value, abs: abs })
      }
    }
  }
  const handleClearAddr = () => {
    if (inputRef.current) { inputRef.current.value = ''; setAbs(''); }
  }

  return (
    <DialogFull trigger={<SearchBoxTrigger defaultText='위치 검색' value={!!addr ? addr.full : undefined} />}
      handleDialogChange={handleCloseAddr}>
      <Script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" async
        onReady={() => { execDaumPost(inputRef, setAbs) }} />
      <div className='fixed w-full top-0 bg-p-white z-paper flex flex-row items-center ps-[16px] pe-[28px] py-[18px] gap-[16px]'>
        <Dialog.Close><HeaderBackIcn /></Dialog.Close>
        <SearchInput placeholder='징소, 주소 검색' inputRef={inputRef} defaultValue={addr?.full} readOnly={true}>
          <button onClick={handleClearAddr}><DeleteIcn size='20' color='#1E1E1E' /></button>
        </SearchInput>
      </div>
      <div id='addr-wrap' className="pt-[66px] w-full h-full"></div>
    </DialogFull>
  )
}

const execDaumPost = (inputRef: RefObject<HTMLInputElement>, setAbs: any) => {
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
      setAbs(data.sido + ' ' + data.sigungu);
    },
    width: '100%', height: '100%'
  })
  postcode.embed(wrap, { autoClose: false });
}