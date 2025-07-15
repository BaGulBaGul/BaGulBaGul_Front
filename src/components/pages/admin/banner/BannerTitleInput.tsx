import { TextareaAutosize } from '@mui/material';

export function BannerTitleInput({ handleChange, title }: { handleChange: (e: any) => void; title: string | undefined }) {
  const limitLines = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    let lines = ((title || '').match(/\n/g) || []).length + 1;
    if (e.key === "Enter" && lines === 2) { e.preventDefault(); }
  }
  return (
    <div className="px-[16px] py-[10px] bg-p-white">
      <TextareaAutosize onKeyDown={limitLines} placeholder="제목" defaultValue={title} onChange={handleChange}
        className='w-full focus:outline-none text-18 resize-none' />
    </div>
  )
}