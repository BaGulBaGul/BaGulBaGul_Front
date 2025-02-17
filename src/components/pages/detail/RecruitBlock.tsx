import { RListProps, HashtagAccordion, UserProfile, HeadCount, BlockInfo } from "@/components/common";
import { FormatDateRange } from "@/service/Functions";
import Link from "next/link";

export function RecruitBlock(props: { data: RListProps }) {
  return (
    <div className='flex flex-col py-[18px] px-[16px]'>
      <Link href={`/recruitment/${props.data.recruitment.recruitmentId}`} passHref legacyBehavior>
        <div className='flex flex-col gap-[4px]'>
          <BlockInfo title={props.data.post.title} date={FormatDateRange(props.data.recruitment.startDate, props.data.recruitment.endDate)} />
          <div className='flex flex-row items-center gap-[4px]'>
            <UserProfile userId={props.data.post.writer.userId} userName={props.data.post.writer.userName}
              userProfileImageUrl={props.data.post.writer.userProfileImageUrl} color='gray3' />
            <HeadCount currentHeadCount={props.data.recruitment.currentHeadCount} maxHeadCount={props.data.recruitment.maxHeadCount} state={props.data.recruitment.state} />
          </div>
        </div>
      </Link>
      {props.data.post.tags ? <HashtagAccordion tag={props.data.post.tags} /> : <></>}
    </div>
  )
}