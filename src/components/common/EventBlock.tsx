import { Button, ThemeProvider, IconButton, Chip } from "@mui/material";
import { categoryButtonTheme, suggestChipTheme } from "./Themes";
import { FormatDateRange } from "@/service/Functions";
import HashtagAccordion from "./HashtagAccordion";
import Link from "next/link";
import { postData } from "./Data";
import { useEffect, useState } from "react";
import { call } from "@/service/ApiService";


// - tab item : 페스티벌
export interface PostProps {
  headImageUrl: string; title: string; userImage: string; userName: string; abstractLocation?: string;
  startDate: any; endDate: any; categories: string[]; content?: string; tags?: string[]; id?: number;
}

export function FestivalBlock(props: { data: PostProps }) {
  let urlLink = `/event/${props.data.id}`
  return (
    <div>
      <div className='flex flex-col py-[18px] px-[16px]'>
        <div className='flex flex-col justify-between'>
          <div className='flex flex-row items-center justify-between pb-[10px]'>
            <div className='flex flex-col w-[230px]'>
              <div className='flex flex-row gap-[4px]'>
                <ThemeProvider theme={categoryButtonTheme}>
                  {
                    // 카테고리 제한 추가 시 상단 코드로 변경
                    // props.data.categories.map((cate, idx) => <Button disabled key={`cate-${idx}`}>{cate}</Button>)
                    props.data.categories.slice(0, 2).map((cate, idx) => <Button disabled key={`cate-${idx}`}>{cate}</Button>)
                  }
                </ThemeProvider>
              </div>
              <Link href={urlLink} className='flex flex-col gap-[4px] mt-[16px] mb-[4px]'>
                <p className='truncate text-[16px] font-semibold leading-[140%]'>{props.data.title}</p>
                <div className="flex flex-row text-[14px] text-gray3-text leading-[160%]">
                  <p>{FormatDateRange(props.data.startDate, props.data.endDate)}</p>
                  <p>, {props.data.abstractLocation}</p>
                </div>
              </Link>
              <div className='flex flex-row gap-[4px]'>
                <img className='rounded-full w-[24px] h-[24px]' src='/main_profile.svg' />
                <p className='text-sm text-gray3-text self-center'>user</p>
                {/* <img className='rounded-full w-[24px] h-[24px]' src={props.data.userImage} />
                  <p className='text-sm text-gray3-text self-center'>{props.data.userName}</p> */}
              </div>
            </div>
            <img className='rounded-lg w-[92px] h-[116px] object-cover' src={props.data.headImageUrl ?? '/default_list_thumb3x.png'} />
          </div>
          {props.data.tags ? <HashtagAccordion tag={props.data.tags} /> : <></>}
        </div>
      </div>
    </div>
  )
}

export function CalendarBlock(props: { data: PostProps }) {
  return (
    <div>
      <div className='flex flex-col py-[18px] px-[16px]'>
        <div className='flex flex-col justify-between'>
          <div className='flex flex-row items-center pb-[10px] gap-[20px]'>
            <img className='rounded-lg w-[84px] h-[104px] object-cover' src={props.data.headImageUrl} />
            <div className='flex flex-col w-[278px] h-[104px] gap-[20px] justify-between'>
              <div className='flex flex-col'>
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row text-sm text-gray3-text">
                    <p>{FormatDateRange(props.data.startDate, props.data.endDate)}</p>
                    <p>, {props.data.abstractLocation}</p>
                  </div>
                  <IconButton disableRipple className='p-0'><img src='/calendar_delete.svg' /></IconButton>
                </div>
                <p className='truncate text-base font-semibold'>{props.data.title}</p>
              </div>
              <span className='text-[12px] text-gray3-text block description max-w-[278px]'>{props.data.content}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface SuggestProps {
  headImageUrl: string; title: string; startDate: any; endDate: any; id?: number;
}

export function SuggestBlock(props: { type: number }) {
  const [suggestions, setSuggestions] = useState<any[]>([])
  useEffect(() => {
    let apiURL = `/api/event?size=10`
    console.log('** ', apiURL)
    call(apiURL, "GET", null)
      .then((response) => {
        console.log(response.data);
        if (response.data.empty === false) {
          setSuggestions(response.data.content)
        }
      })
  }, [])

  const SuggestText = () => {
    return (
      <div className="flex flex-col gap-[8px]">
        <span className="text-[14px] leading-[160%]">혹시 이건 어떠세요?</span>
        <div className="flex flex-row gap-[6px] flex-wrap w-[382px]">
          {
            suggestions.map((s, idx) =>
            <ThemeProvider theme={suggestChipTheme}>
              <a href={`/event/${s.id}`}><Chip label={s.title} variant="outlined" /></a>
            </ThemeProvider>
          )
          }
        </div>
      </div>
    )
  }
  const SuggestImage = () => {
    return (
      <div className="overflow-hidden	h-[204px]">
        <div className="flex flex-row gap-[16px] overflow-x-auto overflow-y-hide whitespace-nowrap">
          {suggestions.map((s, idx) =>
            <div className="flex flex-col w-[120px] gap-[12px]">
              <img className='h-[148px] rounded-[5.65px] object-cover' src={s.headImageUrl ?? '/default_list_thumb3x.png'} />
              <div className="flex flex-col text-[14px] leading-[160%]">
                <span className="font-semibold truncate">{s.title}</span>
                <span>{FormatDateRange(s.startDate, s.endDate)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col px-[16px] py-[20px] gap-[16px] bg-white-text">
      <SuggestText />
      {props.type > 0 ? <SuggestImage /> : <></>}
    </div>
  )
}