// icon-calender-selected, icon-calender-default
export const IconCalendar = ({ checked }: { checked?: boolean }) => (
  <>
    {!!checked
      ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.5 9.14831H5.5V5.74805H19.5V9.14831Z" fill="#4A6AFE" />
        <rect x="5" y="5" width="15" height="16" rx="2" stroke="#4A6AFE" strokeWidth="1.5" />
        <path d="M8.5 3V5" stroke="#4A6AFE" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16.5 3V5" stroke="#4A6AFE" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9.5 13.9741L11.7783 16.5L15.5 12" stroke="#4A6AFE" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="15" height="16" rx="2" stroke="#1E1E1E" strokeWidth="1.5" />
        <path d="M5.5 9.02734H19.5" stroke="#1E1E1E" strokeWidth="1.5" />
        <rect x="7.75" y="11.0625" width="1.5" height="1.5" fill="#1E1E1E" />
        <rect x="11.75" y="11.0625" width="1.5" height="1.5" fill="#1E1E1E" />
        <rect x="15.75" y="11.0625" width="1.5" height="1.5" fill="#1E1E1E" />
        <path d="M8.5 3V5" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16.5 3V5" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    }
  </>
)

// icon-heart-selected, icon-heart-default
export const IconHeart = ({ checked, fillColor = "#4A6AFE" }: { checked?: boolean; fillColor?: string; }) => (
  <>
    {!!checked
      ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.7143 19.4742C13.0306 20.0949 11.978 20.0949 11.2942 19.4652L11.1953 19.3752C6.47207 15.1018 3.38626 12.3039 3.50321 8.81326C3.55719 7.28385 4.33989 5.81741 5.6084 4.95375C7.98349 3.33437 10.9164 4.09008 12.4998 5.94337C14.0831 4.09008 17.016 3.32537 19.3911 4.95375C20.6596 5.81741 21.4423 7.28385 21.4963 8.81326C21.6222 12.3039 18.5274 15.1018 13.8043 19.3932L13.7143 19.4742Z" fill={fillColor} />
      </svg>
      : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.0703 6.43066C14.4452 4.82157 16.9571 4.19451 18.9668 5.57227L18.9688 5.57324C19.9665 6.25258 20.6154 7.38733 20.7305 8.59668L20.7471 8.83984C20.8008 10.3301 20.1775 11.7287 18.8848 13.332C17.5812 14.9487 15.6777 16.6774 13.2998 18.8379L13.2129 18.917L13.21 18.9189C12.8127 19.2795 12.1998 19.2788 11.8027 18.9131L11.7988 18.9102L11.7002 18.8203L11.6982 18.8193L10.0068 17.2812C8.40819 15.8132 7.09475 14.5406 6.11816 13.3301C4.82725 11.7299 4.20341 10.3309 4.25293 8.83984C4.29878 7.54088 4.96589 6.29793 6.03027 5.57324H6.03125C8.04333 4.20162 10.5565 4.82335 11.9297 6.43066L12.5 7.09766L13.0703 6.43066Z" stroke="#1E1E1E" strokeWidth="1.5" />
      </svg>
    }
  </>
)

// icon-smile-selected, icon-smile-default
export const IconSmile = ({ checked }: { checked?: boolean }) => (
  <>
    {!!checked
      ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 3.46875C17.4706 3.46875 21.5 7.49819 21.5 12.4688C21.5 17.4393 17.4706 21.4688 12.5 21.4688C7.52944 21.4688 3.5 17.4393 3.5 12.4688C3.5 7.49819 7.52944 3.46875 12.5 3.46875ZM8.47168 14.5176C8.11679 14.5178 7.88316 14.9377 8.06055 15.2676C8.94821 16.9075 10.6023 18.0174 12.499 18.0176C14.3959 18.0176 16.0498 16.9075 16.9375 15.2676C17.115 14.9376 16.8908 14.5176 16.5264 14.5176H8.47168ZM9 9.02246C8.30964 9.02246 7.75 9.58211 7.75 10.2725C7.75 10.9628 8.30964 11.5225 9 11.5225C9.69036 11.5225 10.25 10.9628 10.25 10.2725C10.25 9.58211 9.69036 9.02246 9 9.02246ZM16 9.02246C15.3096 9.02246 14.75 9.58211 14.75 10.2725C14.75 10.9628 15.3096 11.5225 16 11.5225C16.6904 11.5225 17.25 10.9628 17.25 10.2725C17.25 9.58211 16.6904 9.02246 16 9.02246Z" fill="#4A6AFE" />
      </svg>
      : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.938 14.7988C16.0503 16.4388 14.3963 17.5488 12.4994 17.5488C10.6025 17.5488 8.94853 16.4388 8.06081 14.7988C7.88327 14.4688 8.11688 14.0488 8.47196 14.0488H16.5268C16.8913 14.0488 17.1155 14.4688 16.938 14.7988Z" fill="#6C6C6C" />
        <circle cx="12.5" cy="12" r="8.25" stroke="#6C6C6C" strokeWidth="1.5" />
        <circle cx="9" cy="9.80469" r="1.25" fill="#6C6C6C" />
        <circle cx="16" cy="9.80469" r="1.25" fill="#6C6C6C" />
      </svg>
    }
  </>
)