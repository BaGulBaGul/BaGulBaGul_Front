import { Backdrop, CircularProgress, Divider, Skeleton } from "@mui/material"

export function LoadingSkeleton(props: { type?: string; }) {
  if (props.type === 'CMT') {
    return (
      <div className="flex flex-col px-[16px] py-[12px] gap-[10px]">
        <div className="flex flex-row gap-[8px]">
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="rectangular" width={'50%'} height={24} />
        </div>
        <Skeleton variant="rectangular" height={50} />
      </div>
    )
  } else if (props.type === 'RPL') {
    return (
      <div className="flex flex-col ps-[48px] pe-[16px] py-[12px] gap-[10px]">
        <div className="flex flex-row gap-[8px]">
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="rectangular" width={'50%'} height={24} />
        </div>
        <Skeleton variant="rectangular" height={50} />
      </div>
    )
  } else if (props.type === 'RCT') {
    return (
      <div className='flex flex-col py-[18px] px-[16px] gap-[10px]'>
        <div className='flex flex-col gap-[4px]'>
          <Skeleton variant="text" sx={{ fontSize: '16px' }} />
          <Skeleton variant="text" sx={{ fontSize: '14px' }} />
          <Skeleton variant="text" sx={{ fontSize: '14px' }} />
        </div>
        <Skeleton variant="rectangular" height={26} />
      </div>
    )
  } else if (props.type === 'DTLE' || props.type === 'DTLR') {
    return (
      <div className="flex flex-col w-full pt-[104px]">
        <Skeleton variant="rectangular" height={280} />
        <div className="flex flex-col px-[16px] pt-[30px] pb-[20px] gap-[4px]">
          <Skeleton variant="rectangular" height={25} width='60%' />
          <div className="flex flex-row justify-between">
            <Skeleton variant="rectangular" height={20} width={106} />
            <Skeleton variant="rectangular" height={20} width={60} />
          </div>
          <div className="flex flex-row gap-[4px] items-center">
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="rectangular" height={20} width='30%' />
          </div>

        </div>
        <Divider />
        <div className="flex flex-col px-[16px] py-[30px] gap-[6px]">
          <Skeleton variant="rectangular" height={20} width='50%' />
          {
            props.type === 'DTLR'
              ? <></>
              : <>
                <Skeleton variant="rectangular" height={20} width='50%' />
                <Skeleton variant="rectangular" height={20} width='50%' />
              </>
          }
        </div>
      </div>
    )
  }
  return (  // Event Block
    <div className="flex flex-col py-[18px] px-[16px] bg-[#FFF]">
      <div className='flex flex-row items-center justify-between pb-[10px]'>
        <div className='flex flex-col w-[230px] h-[116px] justify-between'>
          <div className='flex flex-col gap-[4px]'>
            <Skeleton variant="text" sx={{ fontSize: '16px' }} />
            <div className="flex flex-col gap-[4px]">
              <Skeleton variant="text" sx={{ fontSize: '14px' }} />
              <Skeleton variant="text" sx={{ fontSize: '14px' }} />
            </div>
          </div>
          <Skeleton variant="text" sx={{ fontSize: '14px' }} />
        </div>
        <Skeleton variant="rounded" width={92} height={116} />
      </div>
    </div>
  )
}

export function LoadingCircle() {
  return (
    <div>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true} >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}