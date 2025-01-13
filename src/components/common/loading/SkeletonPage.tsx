import { Skeleton } from "@mui/material"
import { VerticalMoreIcn } from "../styles/Icon";
import { SkeletonTags } from "./SkeletonList";

export function SkeletonDetail(props: { map: boolean }) {
  return (
    <div className={`flex flex-col w-full min-h-screen pt-[104px]`}>
      <Skeleton variant="rectangular" height={280} />
      <div className="flex flex-row justify-between gap-[16px] mt-[30px] mb-[20px] mx-[16px]" id='skeleton-detail-title'>
        <div className="flex flex-col gap-[8px] max-w-[191px] w-full">
          <Skeleton variant="rounded" height={24} />
          <Skeleton variant="rounded" height={14} />
          <Skeleton variant="circular" width={24} height={24} />
        </div>
        <div className="flex flex-col gap-[8px] w-full items-end">
          <VerticalMoreIcn opt='DTL' color='#E4E6EB' />
          <Skeleton variant="rounded" height={14} width={40} />
          <Skeleton variant="rounded" height={24} width={60} className="rounded-[99px]" />
        </div>
      </div>
      <div className="flex flex-col gap-[30px] my-[30px] mx-[16px]" id='skeleton-detail-info'>
        <div className="flex flex-col gap-[8px] max-w-[191px] w-full">
          <Skeleton variant="rounded" height={22} />
          <Skeleton variant="rounded" height={22} />
          <Skeleton variant="rounded" height={22} className="me-[48px]" />
        </div>
        <div className="flex flex-col gap-[8px] max-w-[240px] w-full">
          <Skeleton variant="rounded" height={14} className="me-[60px]" />
          <Skeleton variant="rounded" height={14} />
          <Skeleton variant="rounded" height={14} className="me-[20px]" />
        </div>
      </div>
      {props.map ? <Skeleton variant="rectangular" height={260} className="mb-[30px]" /> : <></>}
      <SkeletonTags />
      <div className="flex flex-row justify-between gap-[16px] my-[30px] mx-[16px]" id='skeleton-detail-tools'>
        <div className="flex flex-row gap-[8px]">
          <Skeleton variant="rounded" height={26} width={50} className="rounded-[99px]" />
          <Skeleton variant="rounded" height={26} width={50} className="rounded-[99px]" />
        </div>
        <div className="flex flex-row gap-[8px]">
          <Skeleton variant="circular" width={26} height={26} />
          <Skeleton variant="circular" width={26} height={26} />
        </div>
      </div>
    </div>
  )
}