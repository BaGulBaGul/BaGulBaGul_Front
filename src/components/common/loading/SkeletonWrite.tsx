import { Divider } from "..";

export function SkeletonWrite(props: { opt: 'p' | 'r' }) {
  return (
    <div className="flex flex-col justify-between w-full h-[calc(100vh-60px)] mt-[60px] bg-p-white overflow-hidden">
      <div>
        <span className='skeleton h-[280px]' />
        <span className='skeleton sk-line h-[24px] w-[120px] m-[16px]' />
        <Divider />
        {props.opt === 'p' ? <SkeletonTagSelect /> : <></>}
        <div className="flex flex-col p-[16px] gap-[8px]">
          <SkeletonRow width={200} />
          <SkeletonRow width={200} />
          <SkeletonRow width={60} />
          <SkeletonRow width={60} />
          {props.opt === 'p' && <span className='skeleton sk-line h-[22px] w-[170px]' />}
        </div>
        {props.opt === 'p' ? <SkeletonAgeCheck /> : <></>}
        <Divider />
      </div>
      <span className='skeleton h-[81px] w-full' />
    </div>
  )
}

function SkeletonRow(props: { width: number }) {
  let rowStyle = `skeleton sk-line h-[22px] w-[${props.width}px]`
  return (
    <div className="flex flex-row gap-[16px]">
      <span className='skeleton sk-line h-[22px] w-[60px]' />
      <span className={rowStyle} />
    </div>
  )
}

function SkeletonTagSelect() {
  return (
    <>
      <div className="flex flex-col py-[16px] gap-[12px]">
        <div className="flex flex-row px-[16px] gap-[8px]">
          <span className='skeleton sk-line h-[20px] w-[20px]' />
          <span className='skeleton sk-line h-[20px] w-[191px]' />
        </div>
        <div className="flex flex-row ps-[16px] gap-[4px] w-[723px] overflow-x-hidden">
          <span className='skeleton sk-line w-[70px]' />
          <span className='skeleton sk-line w-[94px]' />
          <span className='skeleton sk-line w-[70px]' />
          <span className='skeleton sk-line w-[70px]' />
          <span className='skeleton sk-line w-[82px]' />
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
      <span className='skeleton sk-line h-[22px] w-[170px] m-[16px]' />
    </>
  )
}