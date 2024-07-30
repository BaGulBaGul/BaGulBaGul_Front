import { DividerDot } from "@/components/styles/Icon";
import { NoUser, RListProps, HashtagAccordion } from "@/components/common";
import dayjs from "dayjs";

export function RecruitBlock(props: { data: RListProps, router: any }) {
  let urlLink = `/recruitment/${props.data.recruitment.recruitmentId}`
  return (
    <div className='flex flex-col py-[18px] px-[16px]'>
      <div className='flex flex-col gap-[4px] cursor-pointer' onClick={() => { props.router.push(urlLink) }}>
        <p className='truncate text-16'>{props.data.post.title}</p>
        <p className='text-14 text-gray3'>{dayjs(props.data.recruitment.startDate).format('YY.MM.DD')}</p>
        <div className='flex flex-row items-center gap-[8px]'>
          <div className='flex flex-row items-center gap-[4px] text-14'>
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
          {props.data.recruitment.state === "PROCEEDING" ? <></> : <p className="done-chip">모집완료</p>}
        </div>
      </div>
      {props.data.post.tags ? <HashtagAccordion tag={props.data.post.tags} /> : <></>}
    </div>
  )
}