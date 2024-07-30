import { HashtagAccordion, ListProps, NoUser } from "@/components/common"
import { DividerDot } from "@/components/styles/Icon"
import { FormatDateRange } from "@/service/Functions"

export function EventBlock(props: { data: ListProps, router: any }) {
  let urlLink = `/event/${props.data.event.eventId}`
  return (
    <div className="flex flex-col justify-between py-[18px] px-[16px]">
      <div onClick={() => { props.router.push(urlLink) }} className='flex flex-row justify-between items-center cursor-pointer'>
        <div className='flex flex-col justify-between w-[230px] h-[116px]'>
          <div className='flex flex-col gap-[4px]'>
            <p className='truncate text-16 font-semibold'>{props.data.post.title}</p>
            <div className="flex flex-col gap-[4px] text-14 text-gray3">
              <p>{props.data.event.abstractLocation}</p>
              <p>{FormatDateRange(props.data.event.startDate, props.data.event.endDate)}</p>
            </div>
          </div>
          <div className='flex flex-row items-center gap-[4px] text-14'>
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