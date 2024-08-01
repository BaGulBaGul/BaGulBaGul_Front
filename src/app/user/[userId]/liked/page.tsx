import { SubTopHeader } from '@/components/layout/subHeader';
import { EditButton, LikedTab } from '@/components/pages/user';

export default function Page({ params }: { params: { userId: string | number } }) {
  return (
    <>
      <SubTopHeader name='좋아요' child={<EditButton/>} />
      <LikedTab />
    </>
  );
}