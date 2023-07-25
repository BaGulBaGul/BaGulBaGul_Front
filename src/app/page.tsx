
import { RecCarousel, PostTab } from './cmpnts-main'
import Header from '@/components/layout/header'

export default function Home() {
  return (
    <div>
      <div className='relative z-10'>
        <Header />  
      </div>
      <main className="relative z-0 flex min-h-screen flex-col items-center pt-[44px] ">
        {/* 메인화면 */}
        <RecCarousel />
        <PostTab />
      </main>
    </div>
  )
}
