import { Skeleton } from "@mui/material"

export function SkeletonCarousel() {
  return (
    <div className='flex flex-col bg-secondary-yellow w-full h-[430px] lg:px-[360px] lg:bg-gradient-to-b lg:from-grad-yellow lg:to-grad-blue'>
      <div className='flex flex-col gap-[15px] mt-[27px] mb-[28px] mx-[16px]'>
        <Skeleton variant="rounded" height={22} width={132} />
        <Skeleton variant="rounded" height={22} width={197} />
      </div>
      <SkeletonSlide />
      <div className="flex flex-row justify-center gap-[8px] mt-[31px] mb-[23px]">
        {Array.from({ length: 5 }, (value, index) => <>{index === 1
          ? <Skeleton variant="rounded" height={6} width={16} className="rounded-[10px]" />
          : <Skeleton variant="circular" width={6} height={6} key={`dot-${index}`} />}</>)}
      </div>
    </div>
  )
}

function SkeletonSlide() {
  return (
    <div className="relative overflow-hidden w-screen h-[256px]">
      <div className="block absolute left-[70%] wk-translate50">
        <div className="flex flex-row">
          {Array.from({ length: 6 }, (value, index) =>
            <div className="flex flex-col w-[188px] lg:w-[480px] px-[9px]">
              <Skeleton variant="rounded" height={210} width={170} />
              <div className='flex flex-col items-center pt-[12px] gap-[8px]'>
                <Skeleton variant="rounded" height={14} width={150} />
                <Skeleton variant="rounded" height={12} width={100} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}