export function BodyInput({ value }: { value?: string }) {
  return (
    <div className="px-[16px] py-[20px]">
      <textarea name='content' placeholder="파티에 대해서 설명해주세요!" defaultValue={value} className="w-full min-h-[360px] focus:outline-none text-14" />
    </div>
  )
}