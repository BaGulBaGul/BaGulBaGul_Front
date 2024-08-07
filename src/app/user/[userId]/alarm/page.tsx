
import { SubTopHeader } from "@/components/layout/subHeader";
import { AlarmTab } from "@/components/pages/user";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '알림 • 바글바글',
  description: '모여봐요 바글바글',
}

export default function Page({ params }: { params: { userId: 'mypage' | number } }) {
  if (params.userId === 'mypage') {
    return (
      <>
        <SubTopHeader name={"알림"} />
        <AlarmTab />
      </>
    );
  } else { redirect(`/user/${params.userId}`) }
}