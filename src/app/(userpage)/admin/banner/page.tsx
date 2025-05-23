import { SubTopHeader } from "@/components/layout/subHeader";
import { BannerPage } from "@/components/pages/admin";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '배너 설정 | 바글바글 관리',
  description: '모여봐요 바글바글',
}

export default function Page() {
  return (
    <>
      <SubTopHeader name={"배너 설정"} />
      <BannerPage />
    </>
  );
}