import { ThemeProvider, IconButton, Chip, Checkbox } from "@mui/material";
import { doneChipTheme, suggestChipTheme } from "./Themes";
import { FormatDate, FormatDateRange } from "@/service/Functions";
import HashtagAccordion from "./HashtagAccordion";
import { useEffect, useState } from "react";
import { call } from "@/service/ApiService";
import { DividerDot } from "./Icon";


// - tab item : 페스티벌
export interface PostProps {
  id?: number; headImageUrl: string; title: string; userImage: string; userName: string; abstractLocation?: string;
  startDate: any; endDate: any; categories: string[]; content?: string; tags?: string[]; type?: string;
  currentHeadCount?: number; totalHeadCount?: number;
}

export function FestivalBlock(props: { data: PostProps }) {
  let urlLink = `/event/${props.data.id}`
  return (
    <a href={urlLink} className="flex flex-col py-[18px] px-[16px] justify-between">
      <div className='flex flex-row items-center justify-between pb-[10px]'>
        <div className='flex flex-col w-[230px] h-[116px] justify-between'>
          <div className='flex flex-col gap-[4px]'>
            <p className='truncate text-[16px] font-semibold leading-[140%]'>{props.data.title}</p>
            <div className="flex flex-col text-[14px] text-gray3 leading-[160%] gap-[4px]">
              <p>{props.data.abstractLocation}</p>
              <p>{FormatDateRange(props.data.startDate, props.data.endDate)}</p>
            </div>
          </div>
          <div className='flex flex-row items-center gap-[4px] text-[14px]'>
            <img className='rounded-full w-[24px] h-[24px]' src='/main_profile.svg' />
            {/* <img className='rounded-full w-[24px] h-[24px]' src={props.data.userImage ?? '/main_profile.svg'} /> */}
            <p className='text-black'>{props.data.userName}</p>
            {
              props.data.type === 'PARTY'
                ? <>
                  <DividerDot />
                  <p className='text-gray3'>{`${props.data.currentHeadCount}/${props.data.totalHeadCount}(명)`}</p>
                  {
                    props.data.currentHeadCount === props.data.totalHeadCount
                      ? <ThemeProvider theme={doneChipTheme}><Chip label="모집완료" /></ThemeProvider>
                      : <></>
                  }
                </>
                : <></>
            }
          </div>
        </div>
        <img className='rounded-lg w-[92px] h-[116px] object-cover' src={props.data.headImageUrl ?? '/default_list_thumb3x.png'} />
      </div>
      {props.data.tags ? <HashtagAccordion tag={props.data.tags} /> : <></>}
    </a>
  )
}

export interface RecruitProps {
  title: string; user_profile: string; username: string; state: string;
  startDate: any; tags?: string[]; id?: number; headCount?: number; headCountMax?: number;
}

export function RecruitBlock(props: { data: RecruitProps }) {
  let urlLink = `/recruitment/${props.data.id}`
  return (
    <div className='flex flex-col py-[18px] px-[16px]'>
      <div className='flex flex-col gap-[4px]'>
        <a href={urlLink} className="flex flex-col gap-[4px]">
          <p className='truncate text-[16px]'>{props.data.title}</p>
          <p className='text-[14px] text-gray3'>{FormatDate(props.data.startDate, 0)}</p>
        </a>
        <div className='flex flex-row items-center gap-[8px]'>
          <div className='flex flex-row items-center gap-[4px] text-[14px]'>
            <img className='w-[24px] h-[24px]' src="/main_profile.svg" />
            <p className="text-black">{props.data.username}</p>
            <DividerDot />
            <p className='text-gray3'>{`${props.data.headCount}/${props.data.headCountMax}(명)`}</p>
          </div>
          {
            props.data.state === "PROCEEDING" ? <></> : <ThemeProvider theme={doneChipTheme}><Chip label="모집완료" /></ThemeProvider>
          }
        </div>
        {props.data.tags ? <HashtagAccordion tag={props.data.tags} /> : <></>}
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

// searched
export function ResultBlock(props: { data: PostProps }) {
  const [checked, setChecked] = useState(true);
  const handleChange = (event: any) => { setChecked(!checked); };
  let urlLink = `/event/${props.data.id}`

  return (
    <a href={urlLink} className='flex flex-col py-[18px] px-[16px] justify-between'>
      <div className='flex flex-row items-center pb-[10px] gap-[20px]'>
        <img className='rounded-lg w-[84px] h-[104px] object-cover' src={props.data.headImageUrl ?? '/default_list_thumb3x.png'} />
        <div className='flex flex-col w-[278px] h-[104px] gap-[20px] justify-between'>
          <div className='flex flex-col'>
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row text-[14px] text-gray3">
                <p>{FormatDateRange(props.data.startDate, props.data.endDate)}</p>
                <p>, {props.data.abstractLocation}</p>
              </div>
              <Checkbox icon={<img src="/detail_like.svg" width={20} height={20} />}
                checkedIcon={<img src="/detail_like_1.svg" width={20} height={20} />}
                checked={checked} onChange={handleChange} style={{ padding: 0 }} />
            </div>
            <p className='truncate text-base font-semibold'>{props.data.title}</p>
          </div>
          <span className='text-[12px] text-gray3 block description max-w-[278px]'>{props.data.content}</span>
        </div>
      </div>
    </a>
  )
}

export function SuggestBlock(props: { type: number }) {
  const [suggestions, setSuggestions] = useState<any[]>([])
  useEffect(() => {
    if (props.type > 0) {
      let apiURL = `/api/event?size=5&sort=likeCount,desc`
      console.log('** ', apiURL)
      call(apiURL, "GET", null)
        .then((response) => {
          console.log(response.data);
          if (response.data.empty === false) {
            setSuggestions(response.data.content)
          }
        })
    }
  }, [])

  const SuggestText = () => {
    return (
      <div className="flex flex-col gap-[8px]">
        <span className="text-[14px] leading-[160%]">혹시 이건 어떠세요?</span>
        <div className="flex flex-row gap-[6px] flex-wrap w-[382px]">
          { // 자주 찾는 검색어, 1~2줄
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