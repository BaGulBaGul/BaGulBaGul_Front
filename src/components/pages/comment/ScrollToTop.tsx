'use client';
import { IconPageUp } from '@/components/common/styles/Icon';

export default function ScrollToTop() {
  const scrollToTop = (e: React.MouseEvent) => {
     e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button onClick={scrollToTop} className='fab bg-white hover:outline-white'>
      <IconPageUp />
    </button>
  );
}