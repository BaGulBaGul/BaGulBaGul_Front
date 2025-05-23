import { AdminPage } from "@/components/pages/admin";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '관리자페이지 | 바글바글 관리',
  description: '모여봐요 바글바글',
}

export default function Page() {
  return (<AdminPage />);
}