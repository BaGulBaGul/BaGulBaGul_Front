export function FooterButton({ text, handleClick }: { text: string, handleClick: () => void }) {
  return (
    <button className="flex justify-center fixed bottom-0 left-0 right-0 w-full rounded-0 pt-[20px] pb-[35px] bg-primary-blue text-white text-16 z-400 disabled:bg-gray3" onClick={handleClick}>{text}</button>
  )
}