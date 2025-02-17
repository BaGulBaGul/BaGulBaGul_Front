export function HeadCount(props: { currentHeadCount?: number; maxHeadCount?: number; state?: string; dot?: boolean }) {
  let done = (!!props.state && props.state !== "PROCEEDING") || (!!props.currentHeadCount && !!props.maxHeadCount && props.currentHeadCount === props.maxHeadCount)
  return (
    <div className='flex flex-row items-center gap-[4px]'>
      {props.dot === false ? <></> : <DividerDot />}
      <p className='text-14 text-gray3'>{`${props.currentHeadCount ?? '-'}/${props.maxHeadCount ?? '-'}(명)`}</p>
      {done ? <p className="done-chip">모집완료</p> : <></>}
    </div>
  )
}

const DividerDot = () => {
  return (
    <svg width="4" height="22" viewBox="0 0 4 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.00038 11.8818C1.84087 11.8818 1.69276 11.8408 1.55604 11.7588C1.42388 11.6768 1.31679 11.5697 1.23475 11.4375C1.15728 11.3008 1.12082 11.1527 1.12538 10.9932C1.12082 10.8382 1.15728 10.6947 1.23475 10.5625C1.31679 10.4258 1.42388 10.3187 1.55604 10.2412C1.69276 10.1592 1.84087 10.1182 2.00038 10.1182C2.15533 10.1182 2.29888 10.1569 2.43104 10.2344C2.56776 10.3118 2.67486 10.4167 2.75233 10.5488C2.83436 10.681 2.87538 10.8245 2.87538 10.9795C2.87538 11.2256 2.79107 11.4375 2.62245 11.6152C2.45383 11.7884 2.24647 11.8773 2.00038 11.8818Z" fill="#6C6C6C" />
    </svg>
  )
}