interface PostFooterProps {
  title: string, path: string,
}
export function PostFooter(props: PostFooterProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex-row flex w-full justify-center py-[12px] bg-primary-blue z-[400]">
      <a href={props.path} className='text-[14px] text-white-text leading-[160%]'>{props.title}</a>
    </div>
  )
}