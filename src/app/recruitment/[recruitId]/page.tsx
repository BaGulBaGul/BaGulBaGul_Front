
import { HeaderNonMain } from "@/components/layout/header";
import Recruitment from '@/components/pages/recruitment/[recruitId]';
import SubHeader from '@/components/layout/subHeader';

const accompanyData = {
  title: '피크페스티벌 2일차 동행구해요',
  type: 'ACCOMPANY',
  userName: 'Yumi',
  views: 2,
  categories: ['공연전시/행사', '문화/예술'],
  startDate: '2023-05-27T13:18:08.827Z',
  content: '저희는 2명이고, 평소 페스티벌 다니는 걸 좋아합니다.<br/<br/>편의상 불가피하게 여성분 동행만 구하고 있습니다.<br/>편하게 알려주세요!! 같이 다니고 같이 공연봐요 :)<br/><br/>@DDDDD_2 인스타 DM 주세요!',
  tags: ['피크페스티벌', '10cm', '넬', '볼빨간사춘기'],
  likeCount: 6, commentCount: 0, headCount: 2
}

export default function Page() {
  return (
    <div>
      <div className='relative z-30'>
        <HeaderNonMain />
        <SubHeader name='모집글' url={"/"} />
      </div>
      <Recruitment data={accompanyData} />
    </div>
  );
}