import { SubTopHeader } from '@/components/layout/subHeader';
import { UserPostTab } from '@/components/pages/user';

export default function Page({ params }: { params: { userId: string | number } }) {
  return (
    <>
      <SubTopHeader name='작성글' />
      <UserPostTab />
    </>
  );
}
