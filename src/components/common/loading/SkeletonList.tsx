import { Skeleton } from "@mui/material"

export function SkeletonList(props: { num?: number; thumb?: boolean; tag?: boolean; calendar?: boolean }) {
  return (
    <div className="flex flex-col bg-p-white">
      {Array.from({ length: props.num ?? 5 }, (value, index) => <>{
        !!props.calendar ? <SkeletonBlockCal />
          : !!props.thumb
            ? <SkeletonBlockWithThumb tag={!!props.tag} key={`sk-list-${index}`} />
            : <SkeletonBlock tag={!!props.tag} key={`sk-list-${index}`} />}</>)}
    </div>
  )
}

function SkeletonBlockWithThumb(props: { tag: boolean }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between gap-[16px] m-[16px] mb-[10px]">
        <div className="flex flex-col w-full justify-between">
          <div className="flex flex-col gap-[8px] max-w-[191px]">
            <Skeleton variant="rounded" height={24} />
            <Skeleton variant="rounded" height={14} />
            <Skeleton variant="rounded" height={14} className="me-[48px]" />
          </div>
          <Skeleton variant="circular" width={24} height={24} />
        </div>
        <div className="w-[92px]">
          <Skeleton variant="rounded" width={92} height={116} />
        </div>
      </div>
      {!props.tag ? <></> : <SkeletonTags />}
    </div>
  )
}

function SkeletonBlock(props: { tag: boolean }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-[8px] w-full max-w-[191px] m-[16px] mb-[10px]">
        <Skeleton variant="rounded" height={24} />
        <Skeleton variant="rounded" height={14} />
        <Skeleton variant="circular" width={24} height={24} />
      </div>
      {!props.tag ? <></> : <SkeletonTags />}
    </div>
  )
}

function SkeletonBlockCal() {
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