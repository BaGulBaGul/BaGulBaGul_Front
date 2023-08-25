import Header from '@/components/layout/header'
import Main from '@/components/pages/main'

export default function Home() {
  return (
    <div>
      <div className='relative z-10'>
        <Header />  
      </div>
      <Main/>
    </div>
  )
}
