import { EditProfilePage } from '@/components/pages/user';
import type { Metadata } from 'next'
import { SubTopHeader } from '@/components/layout/subHeader';

export const metadata: Metadata = {
  title: '프로필 수정 • 바글바글',
  description: '모여봐요 바글바글',
}

export default function Page() {
  return (<>
    <SubTopHeader name='프로필 수정' />
    <EditProfilePage />
  </>);
}