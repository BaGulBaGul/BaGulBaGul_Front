import { ThemeProvider, IconButton, Chip } from "@mui/material";
import { doneChipTheme } from "./Themes";
import { FormatDateRange } from "@/service/Functions";
import HashtagAccordion from "./HashtagAccordion";
import { DividerDot } from "./Icon";
import { CalProps, ListProps, ParamProps, RListProps } from ".";
import dayjs from "dayjs";

export interface TabBlockProps {
  opt: number; events: never[]; page: { current: number; total: number; }; setPage: any; isLoading: boolean;
  params?: ParamProps, setParams?: any
}

export function EventBlock(props: { data: ListProps }) {
  let urlLink = `/event/${props.data.event.eventId}`
  return (
    <div className="flex flex-col py-[18px] px-[16px] justify-between">
      <a href={urlLink} className='flex flex-row items-center justify-between'>
        <div className='flex flex-col w-[230px] h-[116px] justify-between'>
          <div className='flex flex-col gap-[4px]'>
            <p className='truncate text-[16px] font-semibold leading-[140%]'>{props.data.post.title}</p>
            <div className="flex flex-col text-[14px] text-gray3 leading-[160%] gap-[4px]">
              <p>{props.data.event.abstractLocation}</p>
              <p>{FormatDateRange(props.data.event.startDate, props.data.event.endDate)}</p>
            </div>
          </div>
          <div className='flex flex-row items-center gap-[4px] text-[14px]'>
            <img className='rounded-full w-[24px] h-[24px]' src='/main_profile.svg' />
            {/* <img className='rounded-full w-[24px] h-[24px]' src={props.data.post.writer.userProfileImageUrl ?? '/main_profile.svg'} /> */}
            <p className='text-black'>{props.data.post.writer.userName}</p>
            {
              props.data.event.type === 'PARTY'
                ? <>
                  <DividerDot />
                  <p className='text-gray3'>{`${props.data.event.currentHeadCount}/${props.data.event.maxHeadCount}(명)`}</p>
                  {
                    props.data.event.currentHeadCount === props.data.event.maxHeadCount
                      ? <ThemeProvider theme={doneChipTheme}><Chip label="모집완료" /></ThemeProvider>
                      : <></>
                  }
                </>
                : <></>
            }
          </div>
        </div>
        <img className='rounded-[4px] w-[92px] h-[116px] object-cover' src={props.data.post.headImageUrl ?? '/default_list_thumb3x.png'} />
      </a>
      {props.data.post.tags.length > 0 ? <div className="pt-[10px]"><HashtagAccordion tag={props.data.post.tags} /></div> : <></>}
    </div>
  )
}

export function RecruitBlock(props: { data: RListProps }) {
  let urlLink = `/recruitment/${props.data.recruitment.recruitmentId}`
  return (
    <div className='flex flex-col py-[18px] px-[16px]'>
      <a className='flex flex-col gap-[4px]' href={urlLink}>
        <p className='truncate text-[16px]'>{props.data.post.title}</p>
        <p className='text-[14px] text-gray3'>{dayjs(props.data.recruitment.startDate).format('YY.MM.DD')}</p>
        <div className='flex flex-row items-center gap-[8px]'>
          <div className='flex flex-row items-center gap-[4px] text-[14px]'>
            <img className='w-[24px] h-[24px]' src="/main_profile.svg" />
            <p className="text-black">{props.data.post.writer.userName}</p>
            <DividerDot />
            <p className='text-gray3'>{`${props.data.recruitment.currentHeadCount}/${props.data.recruitment.maxHeadCount}(명)`}</p>
          </div>
          {
            props.data.recruitment.state === "PROCEEDING" ? <></> : <ThemeProvider theme={doneChipTheme}><Chip label="모집완료" /></ThemeProvider>
          }
        </div>
      </a>
      {props.data.post.tags ? <HashtagAccordion tag={props.data.post.tags} /> : <></>}
    </div>
  )
}

export function CalendarBlock(props: { data: CalProps }) {
  return (
    <div className='flex py-[18px] px-[16px] justify-between'>
      <div className='flex flex-row items-center pb-[10px] gap-[20px] w-full'>
        <img className='rounded-[4px] w-[84px] h-[104px] object-cover' src={props.data.headImageUrl ?? '/default_list_thumb3x.png'} />
        <div className='flex flex-col w-full h-[104px] gap-[20px] justify-between'>
          <div className='flex flex-col'>
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row text-[14px] text-gray3">
                <p>{FormatDateRange(props.data.startTime, props.data.endTime)}</p>
                <p>, {props.data.abstractLocation}</p>
              </div>
              <IconButton disableRipple className='p-0'><img src='/calendar_delete.svg' /></IconButton>
            </div>
            <p className='truncate text-[16px] font-semibold'>{props.data.title}</p>
          </div>
          <span className='text-[12px] text-gray3 description'>{props.data.content}</span>
        </div>
      </div>
    </div>
  )
}