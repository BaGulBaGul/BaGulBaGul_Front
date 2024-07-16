import Liked from '@/components/pages/user/[userId]/liked'
import { SubTopHeader } from '@/components/layout/subHeader';

export default function Page({ params }: { params: { userId: string | number } }) {
  return (
    <div>
      <SubTopHeader name='좋아요' />
      <Liked />
    </div>
  );
}