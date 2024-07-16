
import { SubTopHeader } from "@/components/layout/subHeader";
import Alarm from '@/components/pages/user/[userId]/alarm'
import { redirect } from "next/navigation";

export default function Page({ params }: { params: { userId: string | number } }) {
  if (params.userId === 'mypage') {
    return (
      <div>
        <SubTopHeader name={"알림"} />
        <Alarm />
      </div>
    );
  } else { redirect(`/user/${params.userId}`) }
}