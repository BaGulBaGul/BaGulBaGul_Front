import { useSignout } from "@/hooks/useInUser";

export function LogoutButton() {
  const mutateSignout = useSignout();
  const handleSignout = () => { mutateSignout.mutate() }
  return (
    <div className="p-[24px]">
      <button className="w-full bg-p-white text-gray3 text-16 p-[16px]" onClick={handleSignout}>로그아웃</button>
    </div>
  )
}