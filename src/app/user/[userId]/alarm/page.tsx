
import { SubTopHeader } from "@/components/layout/subHeader";
import { AlarmTab } from "@/components/pages/user";
import { redirect } from "next/navigation";

export default function Page({ params }: { params: { userId: string | number } }) {
  if (params.userId === 'mypage') {
    return (
      <>
        <SubTopHeader name={"알림"} />
        <AlarmTab />
      </>
    );
  } else { redirect(`/user/${params.userId}`) }
}