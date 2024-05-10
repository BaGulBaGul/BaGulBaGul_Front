import { ThemeProvider, IconButton, Chip } from "@mui/material";
import { doneChipTheme } from "./Themes";
import { FormatDate, FormatDateRange, ParamProps, RecruitProps } from "@/service/Functions";
import HashtagAccordion from "./HashtagAccordion";
import { DividerDot } from "./Icon";

export interface TabBlockProps {
  opt: number; events: never[]; page: { current: number; total: number; }; setPage: any; isLoading: boolean;
  params?: ParamProps, setParams?: any
}

// - tab item : 페스티벌
export interface PostProps {
  id?: number; headImageUrl: string; title: string; userImage: string; userName: string; abstractLocation?: string;
  startDate: any; endDate: any; categories: string[]; content?: string; tags?: string[]; type?: string;
  currentHeadCount?: number; totalHeadCount?: number;
}

export function EventBlock(props: { data: PostProps }) {
  let urlLink = `/event/${props.data.id}`
  return (
    <div className="flex flex-col py-[18px] px-[16px] justify-between">
      <a href={urlLink} className='flex flex-row items-center justify-between'>
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
        <img className='rounded-[4px] w-[92px] h-[116px] object-cover' src={props.data.headImageUrl ?? '/default_list_thumb3x.png'} />
      </a>
      {props.data.tags ? <div className="pt-[10px]"><HashtagAccordion tag={props.data.tags} /></div> : <></>}
    </div>
  )
}

export function RecruitBlock(props: { data: RecruitProps }) {
  let urlLink = `/recruitment/${props.data.id}`
  return (
    <div className='flex flex-col py-[18px] px-[16px]'>
      <a className='flex flex-col gap-[4px]' href={urlLink}>
        <p className='truncate text-[16px]'>{props.data.title}</p>
        <p className='text-[14px] text-gray3'>{FormatDate(props.data.startDate, 0)}</p>
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
      </a>
      {props.data.tags ? <HashtagAccordion tag={props.data.tags} /> : <></>}
    </div>
  )
}

export function CalendarBlock(props: { data: PostProps }) {
  return (
    <div>
      <div className='flex flex-col py-[18px] px-[16px]'>
        <div className='flex flex-col justify-between'>
          <div className='flex flex-row items-center pb-[10px] gap-[20px]'>
            <img className='rounded-[4px] w-[84px] h-[104px] object-cover' src={props.data.headImageUrl} />
            <div className='flex flex-col w-[278px] h-[104px] gap-[20px] justify-between'>
              <div className='flex flex-col'>
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row text-[14px] text-gray3">
                    <p>{FormatDateRange(props.data.startDate, props.data.endDate)}</p>
                    <p>, {props.data.abstractLocation}</p>
                  </div>
                  <IconButton disableRipple className='p-0'><img src='/calendar_delete.svg' /></IconButton>
                </div>
                <p className='truncate text-[16px] font-semibold'>{props.data.title}</p>
              </div>
              <span className='text-[12px] text-gray3 description max-w-[278px]'>{props.data.content}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}