import UserPost from '@/components/pages/user/[userId]/post'
import { SubTopHeader } from '@/components/layout/subHeader';

export default function Page({ params }: { params: { userId: string | number } }) {
  return (
    <div>
      <SubTopHeader name='작성글' />
      <UserPost />
    </div>
  );
}
