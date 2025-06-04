import { MutableRefObject } from "react";

export function BodyInput({ bodyRef, value }: { bodyRef: MutableRefObject<any>; value?: string }) {
  return (
    <div className="px-[16px] py-[20px]">
      <textarea placeholder="파티에 대해서 설명해주세요!" defaultValue={value} ref={bodyRef} className="w-full min-h-[360px] focus:outline-none text-14" />
    </div>
  )
}