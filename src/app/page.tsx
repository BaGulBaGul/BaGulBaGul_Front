
import { RecCarousel, PostTab } from './cmpnts'
import Header from '@/components/layout/header'


export default function Home() {
  return (
    <div>
      <Header />
      <main className="flex min-h-screen flex-col items-center">
        <RecCarousel />
        <PostTab />
      </main>
    </div>
  )
}
