import Link from "next/link"

export function FooterButton({ text, disabled, handleClick, path }: { text: string, disabled?: boolean, handleClick?: () => void, path?: string }) {
  const footerStyle = "flex justify-center fixed bottom-0 left-0 right-0 w-full rounded-0 pt-[20px] pb-[35px] bg-primary-blue text-white text-16 z-400 disabled:bg-gray3"
  return (
    <>{!!handleClick
      ? <button disabled={!!disabled} className={footerStyle} style={{ zIndex: 100 }} onClick={handleClick}>{text}</button>
      : <Link className={footerStyle} href={path ?? ''}>{text}</Link>
    }</>

  )
}