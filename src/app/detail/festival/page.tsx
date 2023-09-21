
import { HeaderNonMain } from "@/components/layout/header";
import { DetailFestival } from '@/components/pages/detail';
import SubHeader from '@/components/layout/subHeader';
import { PostFooter } from '@/components/layout/footer';

const festivalData = {
  title: 'PEAK FESTIVAL 2023',
  type: 'FESTIVAL',
  userName: '(주)SACOM',
  views: 2398,
  categories: ['공연전시/행사', '문화/예술'],
  address: '서울 마포구 한강난지로 162 한강공원 난지안내센터',
  startDate: '2023-05-27T13:18:08.827Z',
  endDate: '2023-05-28T13:18:08.827Z',
  content: '※ 일반 티켓은 2023년 4월 18일(화) 오후 6시부터 예매 가능하며, 한정 수량 소진 시 예매가 조기 마감될 수 있습니다.\n※ 본 공연은 일일권과 양일권 모두 구매 가능합니다.\n※ 양일권은 5월 27일, 28일 이틀간 자유롭게 모든 공연을 관람할 수 있는 티켓을 의미합니다.\n※ 양일권 구매자분들은 27일(토)에 손목밴드를 교환하시면 28일(일) 공연 입장 시 바로 입장이 가능합니다.\n\n할인정보\n- 장애인 (1~3급) 30% 할인 (동반1인), 장애인 (4~6급) 30% 할인 (본인만)- 국가유공자 30% 할인 (본인만)- 국민기초생활수급자 30% 할인(본인만)*증빙 미 지참 시 차액 지불',
  tags: ['피크페스티벌', '10cm', '넬', '볼빨간사춘기', '볼사', '핔페', 'PEAK FESTIVAL'],
  likeCount: 86, commentCount: 89, headCount: 88
}

export default function Page() {
  return (
    <div>
      <div className='relative z-30'>
        <HeaderNonMain />
        <SubHeader name='페스티벌' url={"/"} />
      </div>
      <DetailFestival data={festivalData} />
      <PostFooter title='모집글 보러가기' path='/accompany' />
    </div>
  );
}