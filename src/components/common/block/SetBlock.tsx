import Link from "next/link";

export function SetBlock(props: { title: string; icon?: any; desc?: string; count?: number; url: string; }) {
  return (
    <Link href={props.url}
      className="flex flex-row justify-between p-[16px]">
      <div className={"flex" + (props.icon ? " flex-row items-center gap-[8px]" : " flex-col")}>
        {!!props.icon && <div className="w-[24px] h-[24px]">{props.icon}</div>}
        <span className="text-14 text-black">{props.title}</span>
        {!!props.desc && <span className="text-12 text-gray3">{props.desc}</span>}
      </div>
      <div className="flex flex-row items-center gap-[8px]">
        {props.count && <span className="text-14 text-black">{props.count >= 0 ? props.count : '-'}개</span>}
        <img src='/arrow_next.svg' className="p-[4px] w-[24px] h-[24px]" />
      </div>
    </Link>
  )
}