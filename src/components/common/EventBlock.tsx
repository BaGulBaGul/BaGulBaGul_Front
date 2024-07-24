import { FormatDateRange, typeString } from "@/service/Functions";
import { DividerDot } from "./Icon";
import { CalProps, ListProps, NoUser, ParamProps, RListProps, HashtagAccordion } from ".";
import dayjs from "dayjs";
import Link from "next/link";

export interface TabBlockProps {
  opt: number; events: never[]; page: { current: number; total: number; }; setPage: any; isLoading: boolean;
  params?: ParamProps, setParams?: any, router?: any;
}

export function EventBlock(props: { data: ListProps, router: any }) {
  let urlLink = `/event/${props.data.event.eventId}`
  return (
    <div className="flex flex-col py-[18px] px-[16px] justify-between">
      <div onClick={()=>{props.router.push(urlLink)}} className='flex flex-row items-center justify-between cursor-pointer'>
        <div className='flex flex-col w-[230px] h-[116px] justify-between'>
          <div className='flex flex-col gap-[4px]'>
            <p className='truncate text-[16px] font-semibold leading-[140%]'>{props.data.post.title}</p>
            <div className="flex flex-col text-[14px] text-gray3 leading-[160%] gap-[4px]">
              <p>{props.data.event.abstractLocation}</p>
              <p>{FormatDateRange(props.data.event.startDate, props.data.event.endDate)}</p>
            </div>
          </div>
          <div className='flex flex-row items-center gap-[4px] text-[14px]'>
            {props.data.post.writer.userId === null ? <NoUser />
              : <a href={`/user/${props.data.post.writer.userId}`} className='flex flex-row items-center gap-[4px]'>
                {/* <img className='rounded-full w-[24px] h-[24px]' src={props.data.post.writer.userProfileImageUrl ?? '/profile_main.svg'} /> */}
                <img className='rounded-full w-[24px] h-[24px]' src="/profile_main.svg" />
                <p className="text-black">{props.data.post.writer.userName}</p>
              </a>
            }
            {props.data.event.type !== 'PARTY' ? <></>
              : <>
                <DividerDot />
                <p className='text-gray3'>{`${props.data.event.currentHeadCount}/${props.data.event.maxHeadCount}(명)`}</p>
                {props.data.event.currentHeadCount !== props.data.event.maxHeadCount ? <></>
                  : <p className="done-chip">모집완료</p>
                }
              </>
            }
          </div>
        </div>
        <img className='rounded-[4px] w-[92px] h-[116px] object-cover' src={props.data.post.headImageUrl ?? '/default_list_thumb3x.png'} />
      </div>
      {props.data.post.tags.length > 0 ? <div className="pt-[10px]"><HashtagAccordion tag={props.data.post.tags} /></div> : <></>}
    </div>
  )
}

export function RecruitBlock(props: { data: RListProps, router: any }) {
  let urlLink = `/recruitment/${props.data.recruitment.recruitmentId}`
  return (
    <div className='flex flex-col py-[18px] px-[16px]'>
      <div className='flex flex-col gap-[4px] cursor-pointer' onClick={()=>{props.router.push(urlLink)}}>
        <p className='truncate text-[16px]'>{props.data.post.title}</p>
        <p className='text-[14px] text-gray3'>{dayjs(props.data.recruitment.startDate).format('YY.MM.DD')}</p>
        <div className='flex flex-row items-center gap-[8px]'>
          <div className='flex flex-row items-center gap-[4px] text-[14px]'>
            {props.data.post.writer.userId === null ? <NoUser />
              : <a href={`/user/${props.data.post.writer.userId}`} className='flex flex-row items-center gap-[4px]'>
                {/* <img className='rounded-full w-[24px] h-[24px]' src={props.data.post.writer.userProfileImageUrl ?? '/profile_main.svg'} /> */}
                <img className='rounded-full w-[24px] h-[24px]' src="/profile_main.svg" />
                <p className="text-black">{props.data.post.writer.userName}</p>
              </a>
            }
            <DividerDot />
            <p className='text-gray3'>{`${props.data.recruitment.currentHeadCount}/${props.data.recruitment.maxHeadCount}(명)`}</p>
          </div>
          { props.data.recruitment.state === "PROCEEDING" ? <></> : <p className="done-chip">모집완료</p> }
        </div>
      </div>
      {props.data.post.tags ? <HashtagAccordion tag={props.data.post.tags} /> : <></>}
    </div>
  )
}

export function CalendarBlock(props: { data: CalProps }) {
  let urlLink = `/event/${props.data.eventId}`
  return (
    <Link className='flex py-[18px] px-[16px] justify-between' href={urlLink}>
      <div className='flex flex-row justify-between items-center pb-[10px] w-full'>
        <div className='flex flex-col w-full h-[104px] justify-between'>
          <div className='flex flex-col gap-[4px]'>
            <div className="rounded-[2px] bg-gray1 px-[4px] py-[2px] text-[12px] leading-[160%] w-fit">{typeString[props.data.type as string]}</div>
            <div className="flex flex-row text-[14px] text-gray3">
              <p>{FormatDateRange(props.data.startTime, props.data.endTime)}</p>
              <p>, {props.data.abstractLocation}</p>
            </div>
            <p className='truncate text-[16px] font-semibold'>{props.data.title}</p>
          </div>
          <span className='text-[12px] text-gray3 description'>{props.data.content}</span>
        </div>
        <img className='rounded-[4px] w-[84px] h-[104px] object-cover' src={props.data.headImageUrl ?? '/default_list_thumb3x.png'} />
      </div>
    </Link>
  )
}