
import Header from '@/components/layout/header'
import Recruitment from '@/components/pages/recruitment/[recruitId]';
import SubHeader from '@/components/layout/subHeader';

export default function Page() {
  return (
    <div>
      <div className='relative z-30'>
        <Header />
        <SubHeader name='모집글' />
      </div>
      <Recruitment />
    </div>
  );
}