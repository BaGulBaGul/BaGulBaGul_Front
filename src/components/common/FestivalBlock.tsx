import { Button, ThemeProvider, IconButton } from "@mui/material";
import { categoryButtonTheme } from "./Themes";
import { FormatDateRange } from "@/service/Functions";
import HashtagAccordion from "./HashtagAccordion";
import Link from "next/link";


// - tab item : 페스티벌
interface PostProps {
  img_url: string; title: string; user_profile: string; userName: string; abstractLocation?: string;
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
                {/* <img className='rounded-full w-[24px] h-[24px]' src={props.data.user_profile} />
                  <p className='text-sm text-gray3-text self-center'>{props.data.userName}</p> */}
              </div>
            </div>
            <img className='rounded-lg w-[92px] h-[116px] object-cover' src={props.data.img_url} />
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
            <img className='rounded-lg w-[84px] h-[104px] object-cover' src={props.data.img_url} />
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