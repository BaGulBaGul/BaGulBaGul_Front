import { Skeleton } from "@mui/material"
import { VerticalMoreIcn } from "../styles/Icon";

export function SkeletonComments() {
  return (
    <div className="flex flex-col">
      {Array.from({ length: 3 }, (value, index) =>
        <SkeletonComment color={index % 2 == 0 ? 'bg-p-white' : 'bg-gray1'} key={`sk-cmt-${index}`} />)}
    </div>
  )
}
export function SkeletonReplies() {
  return (
    <div className="flex flex-col">
      {Array.from({ length: 4 }, (value, index) => <>
        <SkeletonReply color={index % 2 == 0 ? 'bg-p-white' : 'bg-gray1'} key={`sk-rpl-${index}`} /></>)}
    </div>
  )
}

export function SkeletonComment(props: { color: string; }) {
  return (
    <div className={`flex flex-row justify-between p-[16px] ${props.color}`}>
      <div className="flex flex-col gap-[8px]">
        <Skeleton variant="circular" width={24} height={24} />
        <Skeleton variant="rounded" height={16} width={191} />
        <Skeleton variant="rounded" height={14} width={191} />
        <Skeleton variant="rounded" height={14} width={40} />
      </div>
      <div className="flex flex-col justify-between items-end">
        <VerticalMoreIcn opt='DTL' color='#E4E6EB' />
        <Skeleton variant="circular" width={24} height={24} />
      </div>
    </div>
  )
}

function SkeletonReply(props: { color: string; }) {
  return (
    <div className={`flex flex-row justify-between p-[16px] ps-[50px] ${props.color}`}>
      <div className="flex flex-col gap-[8px]">
        <Skeleton variant="circular" width={24} height={24} />
        <Skeleton variant="rounded" height={16} width={191} />
        <Skeleton variant="rounded" height={14} width={191} />
      </div>
      <div className="flex flex-col justify-between items-end">
        <VerticalMoreIcn opt='DTL' color='#E4E6EB' />
        <Skeleton variant="circular" width={24} height={24} />
      </div>
    </div>
  )
}