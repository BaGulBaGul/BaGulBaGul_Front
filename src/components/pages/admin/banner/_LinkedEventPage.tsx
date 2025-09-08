'use client';
import { useRef, useState } from "react";
import { Dialog } from "@base-ui-components/react";
import { useListWithPageE } from "@/hooks/useInCommon";
import { SearchInput } from "@/components/common/input";
import { BannerData } from "..";
import { BannerEventList } from "./BannerEventList";
import { IconArrowBack, IconSearch } from "@/components/common/styles/Icon";

export function LinkedEventPage({ updateEvent }: { updateEvent: (arg: any) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('')
  const handleSearch = (event: any) => {
    if ((event.type === 'keydown' && event.key === 'Enter') || event.type === 'click') {
      if (inputRef.current && inputRef.current.value !== '') {
        event.preventDefault();
        setTitle(encodeURIComponent(encodeURIComponent(inputRef.current.value)))
      }
    }
  }

  const [selected, setSelected] = useState<BannerData | undefined>(undefined)
  let apiURL = `/api/event?size=10${title.length === 0 ? '' : '&title=' + title}`
  const events = useListWithPageE(apiURL, ['events', { 'title': title }], true)
  return (
    <>
      <div className="header-nav fixed">
        <Dialog.Close><IconArrowBack /></Dialog.Close>
        <Dialog.Title className='text-18'>이벤트 검색</Dialog.Title>
        <button onClick={() => updateEvent(selected)} className='text-16 text-gray3'>완료</button>
      </div>
      <div className='fixed w-full top-[60px] bg-p-white z-paper'>
        <div className='flex flex-row items-center mx-[16px] my-[18px] gap-[16px]'>
          <SearchInput placeholder='연결할 이벤트 게시글 검색' inputRef={inputRef}>
            <button onClick={handleSearch}><IconSearch /></button>
          </SearchInput>
        </div>
      </div>
      <div className="mt-[126px]">
        <BannerEventList events={events} editing={true} selectedId={selected?.linkedEvent.eventId} handleSelected={(newEvent) => setSelected(newEvent)} />
      </div>
    </>
  )
}