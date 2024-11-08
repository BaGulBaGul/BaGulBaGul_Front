interface NoEventProps { text1: string; text2: string; buttonText: string; }
export function NoEvent(props: NoEventProps) {
  return (
    <div className='flex flex-col justify-center items-center gap-[32px] mt-[50px] mb-[317px]'>
      <div className='flex flex-col justify-center items-center gap-[16px]'>
        <div className='flex flex-col justify-center items-center gap-[4px] text-16'>
          <span className='font-semibold text-gray3'>{props.text1}</span>
          <span className='text-gray2'>{props.text2}</span>
        </div>
        <a className='noevent-btn' href='/?sort=likeCount%2Cdesc'>{props.buttonText}</a>
      </div>
      <img className='w-[140px] h-[75px]' src='/no_event.svg' />
    </div>
  )
}