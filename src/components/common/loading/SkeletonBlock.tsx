import { Skeleton } from "@mui/material"
import { LikeIcn } from "../styles/Icon";

export function SkeletonBlock(props: { thumb?: boolean; tag: boolean; }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between gap-[16px] m-[16px] mb-[10px]">
        <div className="flex flex-col w-full justify-between">
          <SkeletonTitleAddDate />
          <Skeleton variant="circular" width={24} height={24} />
        </div>
        {!!props.thumb ? <div className="w-[92px]">
          <Skeleton variant="rounded" width={92} height={116} />
        </div> : <></>}
      </div>
      {!props.tag ? <></> : <SkeletonTags />}
    </div>
  )
}

export function SkeletonBlockCal() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between gap-[16px] m-[16px] mb-[10px]">
        <div className="flex flex-col w-full justify-between">
          <div className="flex flex-col gap-[8px] max-w-[191px]">
            <Skeleton variant="rounded" height={20} width={60} />
            <Skeleton variant="rounded" height={24} />
            <Skeleton variant="rounded" height={14} />
          </div>
          <Skeleton variant="circular" width={24} height={24} />
        </div>
        <div className="w-[92px]">
          <Skeleton variant="rounded" width={92} height={116} />
        </div>
      </div>
    </div>
  )
}

export function SkeletonBlockLike() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between gap-[16px] m-[16px] mb-[10px]">
        <div className="flex flex-row gap-[8px] w-full">
          <div className="h-[24px] w-[24px]"><LikeIcn color='#E4E6EB' fill={true} /></div>
          <div className="flex flex-col w-full justify-between">
            <SkeletonTitleAddDate />
            <Skeleton variant="circular" width={24} height={24} />
          </div>
        </div>
        <div className="w-[92px]">
          <Skeleton variant="rounded" width={92} height={116} />
        </div>
      </div>
    </div>
  )
}

export function SkeletonBlockPost(props: { opt?: 'EVT' | 'RCT'; }) {
  return (
    <div className="flex flex-col">
      {props.opt === 'EVT'
        ? <div className="flex flex-row justify-between gap-[16px] m-[16px] mb-[10px]">
          <div className="flex flex-col w-full justify-between">
            <SkeletonTitleAddDate />
            <Skeleton variant="rounded" height={14} width={40} />
          </div>
          <div className="w-[92px]">
            <Skeleton variant="rounded" width={92} height={116} />
          </div>
        </div>
        : <div className="flex flex-col w-full max-w-[191px] gap-[4px] m-[16px] mb-[10px]">
          <Skeleton variant="rounded" height={14} />
          <Skeleton variant="rounded" height={24} />
          <Skeleton variant="rounded" height={14} />
        </div>
      }
    </div>
  )
}

export function SkeletonTags() {
  return (
    <div className="flex flex-row gap-[10px] m-[16px] mt-[10px]">
      <Skeleton variant="rounded" height={26} width={92} />
      <Skeleton variant="rounded" height={26} width={53} />
      <Skeleton variant="rounded" height={26} width={68} />
      <Skeleton variant="rounded" height={26} width={92} />
    </div>
  )
}

function SkeletonTitleAddDate() {
  return (
    <div className="flex flex-col gap-[8px] max-w-[191px]">
      <Skeleton variant="rounded" height={24} />
      <Skeleton variant="rounded" height={14} />
      <Skeleton variant="rounded" height={14} className="me-[48px]" />
    </div>
  )
}