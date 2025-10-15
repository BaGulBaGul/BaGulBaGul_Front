import { SkeletonTags } from "./SkeletonBlock";
import { IconMore } from "../styles/Icon";

export function SkeletonDetail(props: { map: boolean }) {
  return (
    <div className={`flex flex-col w-full min-h-screen pt-[104px]`}>
      <span className='skeleton h-[280px]' />
      <div className="flex flex-row justify-between gap-[16px] mt-[30px] mb-[20px] mx-[16px]" id='skeleton-detail-title'>
        <div className="flex flex-col gap-[8px] max-w-[191px] w-full">
          <span className='skeleton sk-line h-[24px]' />
          <span className='skeleton sk-line h-[14px]' />
          <span className='skeleton sk-profile' />
        </div>
        <div className="flex flex-col gap-[8px] w-full items-end text-[#E4E6EB]">
          <IconMore />
          <span className='skeleton sk-line h-[14px] w-[40px]' />
          <span className='skeleton sk-line h-[24px] w-[60px] rounded-[99px]' />
        </div>
      </div>
      <div className="flex flex-col gap-[30px] my-[30px] mx-[16px]" id='skeleton-detail-info'>
        <div className="flex flex-col gap-[8px] max-w-[191px] w-full">
          <span className='skeleton sk-line h-[22px]' />
          <span className='skeleton sk-line h-[22px]' />
          <span className='skeleton sk-line h-[22px] w-[143px]' />
        </div>
        <div className="flex flex-col gap-[8px]">
          <span className='skeleton sk-line h-[14px] w-[180px]' />
          <span className='skeleton sk-line h-[14px] w-[240px]' />
          <span className='skeleton sk-line h-[14px] w-[220px]' />
        </div>
      </div>
      {props.map && <span className='skeleton h-[260px] mb-[30px]' />}
      <SkeletonTags />
      <div className="flex flex-row justify-between gap-[16px] my-[30px] mx-[16px]" id='skeleton-detail-tools'>
        <div className="flex flex-row gap-[8px]">
          <span className='skeleton sk-line h-[26px] w-[50px] rounded-[99px]' />
          <span className='skeleton sk-line h-[26px] w-[50px] rounded-[99px]' />
        </div>
        <div className="flex flex-row gap-[8px]">
          <span className='skeleton sk-profile w-[26px] h-[26px]' />
          <span className='skeleton sk-profile w-[26px] h-[26px]' />
        </div>
      </div>
    </div>
  )
}