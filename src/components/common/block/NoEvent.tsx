interface NoDataProps { text1: string; text2?: string; buttonText?: string; buttonLink?: string; }
export function NoData(props: NoDataProps) {
  return (
    <div className='flex flex-col justify-center items-center gap-[32px] mt-[50px] mb-[317px]'>
      <div className='flex flex-col justify-center items-center gap-[16px]'>
        <div className='flex flex-col justify-center items-center gap-[4px] text-16'>
          <span className='font-semibold text-gray3'>{props.text1}</span>
          {!!props.text2 && <span className='text-gray2'>{props.text2}</span>}
        </div>
        {!!props.buttonText && !!props.buttonLink
          && <a className='border border-primary-blue px-[8px] py-[4px] text-primary-blue text-14 rounded-[2px] active:bg-primary-blue active:text-white' href={props.buttonLink}>{props.buttonText}</a>}
      </div>
      <img className='w-[140px] h-[75px]' src='/no_event.svg' />
    </div>
  )
}