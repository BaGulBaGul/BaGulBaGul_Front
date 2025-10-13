export function SkeletonCarousel() {
  return (
    <div className={'flex flex-col w-full h-[430px] bg-[#F2F3F5]'} >
      <div className='flex flex-col gap-[15px] pt-[22px] pb-[20px] px-[16px] h-[114px]'>
        <span className="skeleton sk-line w-[132px] h-[22px]" />
        <span className="skeleton sk-line w-[197px] h-[22px]" />
      </div>
      <SkeletonSlide />
      <div className='flex flex-row justify-center gap-[8px] pt-[31px] pb-[23px] h-[60px]'>
        {Array.from({ length: 5 }, (value, index) => <>{index === 1
          ? <span className="skeleton rounded-[10px] h-[6px] w-[16px]" />
          : <span className="skeleton rounded-[50%] h-[6px] w-[6px]" key={`dot-${index}`} />}</>)}
      </div>
    </div>
  )
}

function SkeletonSlide() {
  return (
    <div className="relative overflow-x-hidden w-screen h-[256px]">
      <div className="block absolute left-[70%] wk-translate50">
        <div className="flex flex-row">
          {Array.from({ length: 6 }, (value, index) =>
            <div className="flex flex-col w-[188px] lg:w-[480px] px-[9px]">
              <span className="skeleton rounded-[10px] w-[170px] h-[210px]" />
              <div className='flex flex-col items-center pt-[12px] gap-[8px]'>
                <span className="skeleton sk-line w-[150px] h-[14px]" />
                <span className="skeleton sk-line w-[100px] h-[12px]" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}