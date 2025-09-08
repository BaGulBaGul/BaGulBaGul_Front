import { IconVerified } from "../styles/IconSingleUse";

interface Props {
  profileImageUrl: string | undefined; username: string | undefined; email: string | undefined; message?: string; verified?: boolean;
}

export function UserProfileBlock({ profileImageUrl, username, email, message, verified }: Props) {
  return (
    <div className="flex flex-row px-[16px] py-[18px] gap-[16px] items-center bg-p-white" id='user-profile'>
      <div className="relative w-[77px] h-[70px] rounded-full">
        <img src={profileImageUrl ?? "/default_icon.svg"} className="w-[70px] h-[70px] rounded-full object-cover" />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row items-center">
          <span className="font-semibold text-18 text-black">{username ?? '-'}</span>
          {verified && <IconVerified />}
        </div>
        <span className="text-14 text-gray3">{email ?? '등록된 이메일이 없습니다.'}</span>
        {message && <span className="text-14 text-gray3">{message}</span>}
      </div>
    </div>
  )
}