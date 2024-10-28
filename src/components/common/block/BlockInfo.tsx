export function BlockInfo(props: { title: string; date: any; address?: string; direction?: 'row'; type?: string; }) {
  return (
    <div className='flex flex-col gap-[4px] max-w-[calc(100vw-32px)]'>
      {!!props.type ? <div className="rounded-[2px] bg-gray1 px-[4px] py-[2px] text-12 w-fit">{props.type}</div> : <></>}
      <p className='text-16 font-semibold truncate'>{props.title}</p>
      <div className={`flex flex-${props.direction ?? 'col'} gap-[4px] text-14 text-gray3`}>
        {!!props.address ? <p>{props.address}</p> : <></>}
        <p>{props.date}</p>
      </div>
    </div>
  )
}

// date - title
export function BlockInfoDT(props: { title: string; date: any; actions?: React.JSX.Element; }) {
  function Info() {
    return (
      <div className='flex flex-col gap-[4px]'>
        <p className='text-14 text-gray3'>{props.date}</p>
        <p className='text-16 font-semibold truncate'>{props.title}</p>
      </div>
    )
  }
  return (
    <>{!props.actions ? <Info />
      : <div className='flex flex-row justify-between items-start'>
        <Info />{props.actions}
      </div>
    }</>

  )
}