export function TitleInput({ prev }: { prev: string | undefined }) {
  return (
    <input name="title" type='text' placeholder='제목' defaultValue={prev} className='w-full focus:outline-none text-18 px-[16px] py-[10px]' />
  )
}