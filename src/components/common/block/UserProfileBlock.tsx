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
          {verified && <VerifiedIcn />}
        </div>
        <span className="text-14 text-gray3">{email ?? '등록된 이메일이 없습니다.'}</span>
        {message && <span className="text-14 text-gray3">{message}</span>}
      </div>
    </div>
  )
}

const VerifiedIcn = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.88444 4L8.49286 6.04293H6.11638L5.9716 8.58803L4 9.89475L5.10189 12.0145L4 14.1633L5.9716 15.441L6.11638 17.8221L8.49286 18.0544L9.88444 20L12.0003 18.9837L14.2031 20L15.4494 18.0544L17.7972 17.8221L17.9711 15.441L20 14.1633L18.8696 12.0145L20 9.89475L17.9711 8.58803L17.7972 6.20691L15.4494 6.04293L14.2031 4L12.0003 5.1325L9.88444 4Z" fill="#4A6AFE" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.88962 11.0191L8 11.9087L11.0242 14.9328L16 9.957L15.1104 9.06738L11.0242 13.1536L8.88962 11.0191Z" fill="#FFF27E" />
  </svg>
)