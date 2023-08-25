interface PostFooterProps {
  title: string, path: string,
}
export function PostFooter(props: PostFooterProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex-row flex w-full justify-center py-[12px] bg-primary-blue">
      <a href={props.path} className='text-sm text-white-text'>{props.title}</a>
    </div>
  )
}