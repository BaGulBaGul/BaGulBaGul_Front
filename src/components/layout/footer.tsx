interface PostFooterProps {
  title: string, path: string,
}
export function PostFooter(props: PostFooterProps) {
  return (
    <a href={props.path} className="fixed bottom-0 left-0 right-0 flex-row flex w-full
      justify-center py-[12px] bg-primary-blue text-[14px] text-white leading-[160%] z-[400] ">
      {props.title}
    </a>
  )
}