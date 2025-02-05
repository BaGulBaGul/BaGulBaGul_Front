import { Skeleton } from "@mui/material"
import { Divider } from "..";

export function SkeletonWrite(props: { opt: 'p' | 'r' }) {
  return (
    <div className="flex flex-col w-full mt-[104px] mb-[250px] overflow-x-hidden">
      <Skeleton className="w-full" variant="rectangular" height={280} />
      <Skeleton className="m-[16px]" variant="rounded" height={24} width={props.opt === 'p' ? 60 : 120} />
      <Divider />
      {props.opt === 'p' ? <SkeletonTagSelect /> : <></>}
      <div className="flex flex-col p-[16px] gap-[8px]">
        <SkeletonRow width={200} />
        <SkeletonRow width={200} />
        <SkeletonRow width={60} />
        <SkeletonRow width={60} />
        {props.opt === 'p' ? <Skeleton variant="rounded" height={22} width={170} /> : <></>}
      </div>
      {props.opt === 'p' ? <SkeletonAgeCheck /> : <></>}
      <Divider />
      <div className="fixed bottom-0 w-full z-10 bg-p-white">
        <Skeleton variant="rectangular" height={81} />
      </div>
    </div>
  )
}

function SkeletonRow(props: { width: number }) {
  return (
    <div className="flex flex-row gap-[16px]">
      <Skeleton variant="rounded" height={22} width={60} />
      <Skeleton variant="rounded" height={22} width={props.width} />
    </div>
  )
}

function SkeletonTagSelect() {
  return (
    <>
      <div className="flex flex-col py-[16px] gap-[12px]">
        <div className="flex flex-row px-[16px] gap-[8px]">
          <Skeleton variant="rounded" height={20} width={20} />
          <Skeleton variant="rounded" height={20} width={191} />
        </div>
        <div className="flex flex-row ps-[16px] gap-[4px] w-[723px] overflow-x-hidden">
          <Skeleton variant="rounded" className="rounded-[20px]" height={26} width={70} />
          <Skeleton variant="rounded" className="rounded-[20px]" height={26} width={94} />
          <Skeleton variant="rounded" className="rounded-[20px]" height={26} width={70} />
          <Skeleton variant="rounded" className="rounded-[20px]" height={26} width={70} />
          <Skeleton variant="rounded" className="rounded-[20px]" height={26} width={82} />
        </div>
      </div>
      <Divider />
    </>
  )
}

function SkeletonAgeCheck() {
  return (
    <>
      <Divider />
      <Skeleton className="m-[16px]" variant="rounded" height={22} width={170} />
    </>
  )
}