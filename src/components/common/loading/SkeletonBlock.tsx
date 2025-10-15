import { IconHeart } from "../styles/Icon";

export function SkeletonBlock(props: { thumb?: boolean; tag: boolean; }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between gap-[16px] m-[16px] mb-[10px]">
        <div className="flex flex-col w-full justify-between">
          <SkeletonTitleAddDate />
          <span className="skeleton sk-profile" />
        </div>
        {!!props.thumb ? <div className="w-[92px]">
          <span className="skeleton sk-thumb" />
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
            <span className='skeleton sk-line h-[20px] w-[60px]' />
            <span className='skeleton sk-line h-[24px]' />
            <span className='skeleton sk-line h-[14px]' />
          </div>
          <span className='skeleton sk-profile' />
        </div>
        <span className='skeleton sk-thumb' />
      </div>
    </div>
  )
}

export function SkeletonBlockLike() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between gap-[16px] m-[16px] mb-[10px]">
        <div className="flex flex-row gap-[8px] w-full">
          <div className="h-[24px] w-[24px]"><IconHeart checked fillColor='#E4E6EB' /></div>
          <div className="flex flex-col w-full justify-between">
            <SkeletonTitleAddDate />
            <span className='skeleton sk-profile' />
          </div>
        </div>
        <span className='skeleton sk-thumb' />
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
            <span className='skeleton sk-line h-[14px] w-[40px]' />
          </div>
          <span className='skeleton sk-thumb' />
        </div>
        : <div className="flex flex-col w-full max-w-[191px] gap-[4px] m-[16px] mb-[10px]">
          <span className='skeleton sk-line h-[20px] w-[60px]' />
          <span className='skeleton sk-line h-[24px]' />
          <span className='skeleton sk-line h-[14px]' />
        </div>
      }
    </div>
  )
}

export function SkeletonTags() {
  return (
    <div className="flex flex-row gap-[10px] m-[16px] mt-[10px]">
      <span className='skeleton sk-line w-[92px]' />
      <span className='skeleton sk-line w-[53px]' />
      <span className='skeleton sk-line w-[68px]' />
      <span className='skeleton sk-line w-[92px]' />
    </div>
  )
}

function SkeletonTitleAddDate() {
  return (
    <div className="flex flex-col gap-[8px] max-w-[191px] leading-1">
      <span className='skeleton sk-line h-[24px] w-[191px]' />
      <span className='skeleton sk-line h-[14px] w-[191px]' />
      <span className='skeleton sk-line h-[14px] w-[143px]' />
    </div>
  )
}

export function SkeletonSuggestImage() {
  return (
    <div className="flex flex-col gap-[12px] w-[120px]">
      <span className='skeleton sk-thumb h-[148px] w-[120px]' />
      <div className="flex flex-col gap-[8px] items-center">
        <span className='skeleton sk-line h-[14px]' />
        <span className='skeleton sk-line h-[12px] w-[100px]' />
      </div>
    </div>
  )
}