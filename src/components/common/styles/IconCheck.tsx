// icon-check-selected, icon-check-
export const IconCheck = ({ checked }: { checked: boolean }) => (
  <>
    {!!checked
      ? <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="9" r="9" fill="#4A6AFE" />
        <path d="M5.00098 8.72414L8.03868 11.25L13.001 6.75" stroke="#FCFCFC" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      : <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="9" r="8.5" stroke="#C1C1C1" />
      </svg>
    }
  </>
)

// icon-check-selected, icon-check-
export const IconRadio = ({ checked }: { checked: boolean }) => (
  <>
    {!!checked
      ? <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="9" r="8.5" stroke="#C1C1C1" />
        <circle cx="9" cy="9" r="5" fill="#4A6AFE" />
      </svg>
      : <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="9" r="8.5" stroke="#C1C1C1" />
      </svg>
    }
  </>
)

// icon-check-box-default, icon-check-box-selected : used in report manage page 
export const IconCheckBox = ({ checked }: { checked: boolean }) => (
  <>
    {!!checked
      ? <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3.5" y="3.07617" width="18" height="18" rx="2" fill="#4A6AFE" />
        <path d="M8.5 11.8003L11.5377 14.3262L16.5 9.82617" stroke="#FCFCFC" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      : <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="3.57617" width="17" height="17" rx="1.5" stroke="#C1C1C1" />
      </svg>
    }
  </>
)

// used in filter dialog / writing page
export const IconCheckBoxS = ({ checked }: { checked: boolean }) => (
  <>
    {!!checked
      ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" stroke="#6C6C6C" />
        <path d="M3.5 7.18182L7 11L12.5 5" stroke="#4A6AFE" strokeWidth="1.5" />
      </svg>
      : <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" stroke="#6C6C6C" />
      </svg>
    }
  </>
)