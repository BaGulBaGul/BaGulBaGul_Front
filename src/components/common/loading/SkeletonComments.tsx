import { IconMore } from "../styles/Icon";

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
        <span className='skeleton sk-profile' />
        <span className='skeleton sk-line h-[16px] w-[191px]' />
        <span className='skeleton sk-line h-[14px] w-[191px]' />
        <span className='skeleton sk-line h-[14px] w-[40px]' />
      </div>
      <div className="flex flex-col justify-between items-end text-[#E4E6EB]">
        <IconMore />
        <span className='skeleton sk-profile' />
      </div>
    </div>
  )
}

function SkeletonReply(props: { color: string; }) {
  return (
    <div className={`flex flex-row justify-between p-[16px] ps-[50px] ${props.color}`}>
      <div className="flex flex-col gap-[8px]">
        <span className='skeleton sk-profile' />
        <span className='skeleton sk-line h-[16px] w-[191px]' />
        <span className='skeleton sk-line h-[14px] w-[191px]' />
      </div>
      <div className="flex flex-col justify-between items-end text-[#E4E6EB]">
        <IconMore />
        <span className='skeleton sk-profile' />
      </div>
    </div>
  )
}