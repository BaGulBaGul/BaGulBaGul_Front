import { PropsWithChildren, ReactNode } from "react";
import Link from 'next/link';
import { HashtagAccordion } from ".";

interface Props extends PropsWithChildren {
  url: string; blockAction?: ReactNode; wrapStyle?: string; blockThumb?: ReactNode;
}

export function BlockWrapper({ url, blockAction, wrapStyle, blockThumb, children }: Props) {
  return (
    <div className={"flex flex-row w-full " + wrapStyle}>
      {blockAction}
      <Link href={url} passHref legacyBehavior>
        <div className="flex flex-row w-full justify-between cursor-pointer">
          {children}
          {blockThumb}
        </div>
      </Link>
    </div>
  )
}

export function BlockContainer({ tags, children }: { tags: string[]; children: ReactNode; }) {
  return (
    <div className={"flex flex-col"}>
      {children}
      <HashtagAccordion tags={tags} />
    </div>
  )
}