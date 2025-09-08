// icon-arrow-back-default
export const IconArrowBack = ({ color = '#1E1E1E' }: { color?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.5 3L8.5 11.8983L16.5 21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// icon-arrow-down-default
export const IconArrowDown = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 8.5L12.4209 15.5L19.5 8.5" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconArrowCalendar = ({ direction }: { direction: 'left' | 'right' }) => (
  <>
    {direction === 'left'
      ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18.5754L9 12.5754L15 6.57538" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      : <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 18.5754L15 12.5754L9 6.57538" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    }
  </>
)