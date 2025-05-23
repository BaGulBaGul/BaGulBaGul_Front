export function BlockInfo(props: { title: string; date: any; address?: string; direction?: 'row'; type?: string; }) {
  return (
    <div className='flex flex-col gap-[4px] max-w-[calc(100vw-32px)]'>
      {!!props.type ? <div className="type-chip">{props.type}</div> : <></>}
      <p className='text-16 font-semibold truncate'>{props.title}</p>
      <div className={`flex flex-${props.direction ?? 'col'} gap-[4px] text-14 text-gray3`}>
        {!!props.address ? <p>{props.address}</p> : <></>}
        <p>{props.date}</p>
      </div>
    </div>
  )
}

// date - title
export function BlockInfoDT(props: { title: string; date: any; }) {
  return (
    <div className='flex flex-col gap-[4px]'>
      <p className='text-14 text-gray3'>{props.date}</p>
      <p className='text-16 font-semibold truncate'>{props.title}</p>
    </div>
  )
}