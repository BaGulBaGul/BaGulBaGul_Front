export function BodyInput({ content, handleContent }: { content: string, handleContent: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }) {
  return (
    <div className='px-[16px] py-[20px]'>
      <textarea className="w-full min-h-[360px] focus:outline-none text-14"
        placeholder={`파티에 대해서 설명해주세요!`}
        value={content} onChange={handleContent} />
    </div>
  )
}