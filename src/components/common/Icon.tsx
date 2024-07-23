//공용으로 사용할 프로필 아이콘


export const FilterArrowMore = () => {
  return (
    <svg width="16" height="23" viewBox="0 0 16 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M3.07273 7.96362L2 9.03635L8 15.0364L14 9.03635L12.9273 7.96362L8 12.8909L3.07273 7.96362V7.96362Z" fill="currentColor" />
    </svg>
  )
}

export const ChevronIcn = (props: { direction: string }) => {
  if (props.direction === 'left') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18.5754L9 12.5754L15 6.57538" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  } else if (props.direction === 'right') {
    return (
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 18.5754L15 12.5754L9 6.57538" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
}

export const Category19 = () => {
  return (
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.48633 6.01562V14.5H5.41992V7.11719H5.37305L3.31055 8.48828V7.42188L5.41992 6.01562H6.48633ZM11.5723 5.89844C13.0371 5.91016 14.6543 6.78906 14.6543 9.91797C14.6543 12.9297 13.4238 14.6172 11.4316 14.6172C9.94336 14.6172 8.88867 13.7031 8.67773 12.3555H9.7207C9.9082 13.1172 10.4824 13.6797 11.4316 13.6797C12.8145 13.6797 13.6582 12.4844 13.6699 10.4219H13.5527C13.0605 11.125 12.2871 11.5469 11.3848 11.5469C9.86133 11.5469 8.60742 10.3867 8.60742 8.74609C8.60742 7.16406 9.76758 5.88672 11.5723 5.89844ZM11.5723 6.82422C10.459 6.82422 9.62695 7.69141 9.63867 8.73438C9.63867 9.78906 10.4238 10.6211 11.5371 10.6211C12.6387 10.6211 13.5059 9.70703 13.5059 8.71094C13.5059 7.73828 12.6973 6.82422 11.5723 6.82422Z" fill="currentColor" />
      <circle cx="9" cy="10" r="8.75" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  )
}

export const CalendarIcn = (props: { color?: string }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.58594 11.6084H9.58594V13.6084H7.58594V11.6084ZM21.5859 6.6084V20.6084C21.5859 21.7084 20.6859 22.6084 19.5859 22.6084H5.58594C4.47594 22.6084 3.58594 21.7084 3.58594 20.6084L3.59594 6.6084C3.59594 5.5084 4.47594 4.6084 5.58594 4.6084H6.58594V2.6084H8.58594V4.6084H16.5859V2.6084H18.5859V4.6084H19.5859C20.6859 4.6084 21.5859 5.5084 21.5859 6.6084ZM5.58594 8.6084H19.5859V6.6084H5.58594V8.6084ZM19.5859 20.6084V10.6084H5.58594V20.6084H19.5859ZM15.5859 13.6084H17.5859V11.6084H15.5859V13.6084ZM11.5859 13.6084H13.5859V11.6084H11.5859V13.6084Z" fill={props.color ?? "currentColor"} />
    </svg>
  )
}

export const AddIcn = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 13H13V18C13 18.55 12.55 19 12 19C11.45 19 11 18.55 11 18V13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H11V6C11 5.45 11.45 5 12 5C12.55 5 13 5.45 13 6V11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z" fill="black" />
    </svg>
  )
}
// filter
export const RemoveIcn = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z" fill="black" />
    </svg>
  )
}

export const PageTop = () => {
  return (
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.2725 0.413086H0.727528C0.601124 0.413086 0.5 0.51421 0.5 0.637805V2.3232C0.5 2.44679 0.601124 2.54792 0.727528 2.54792H20.2725C20.3989 2.54792 20.5 2.44679 20.5 2.3232V0.637805C20.5 0.51421 20.3989 0.413086 20.2725 0.413086ZM10.677 5.66589C10.6559 5.63904 10.6291 5.61731 10.5984 5.60238C10.5678 5.58744 10.5341 5.57967 10.5 5.57967C10.4659 5.57967 10.4322 5.58744 10.4016 5.60238C10.3709 5.61731 10.3441 5.63904 10.323 5.66589L7.17697 9.64623C7.15103 9.67935 7.13494 9.7191 7.13053 9.76094C7.12612 9.80277 7.13357 9.845 7.15203 9.8828C7.17049 9.9206 7.19921 9.95244 7.23492 9.97469C7.27062 9.99693 7.31187 10.0087 7.35393 10.0086H9.42978V19.5142C9.42978 19.6378 9.5309 19.7389 9.65449 19.7389H11.3399C11.4635 19.7389 11.5646 19.6378 11.5646 19.5142V10.0114H13.6461C13.8343 10.0114 13.9382 9.79511 13.823 9.64904L10.677 5.66589Z" fill="#1E1E1E" />
    </svg>
  )
}

export const DividerDot = () => {
  return (
    <svg width="4" height="22" viewBox="0 0 4 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.00038 11.8818C1.84087 11.8818 1.69276 11.8408 1.55604 11.7588C1.42388 11.6768 1.31679 11.5697 1.23475 11.4375C1.15728 11.3008 1.12082 11.1527 1.12538 10.9932C1.12082 10.8382 1.15728 10.6947 1.23475 10.5625C1.31679 10.4258 1.42388 10.3187 1.55604 10.2412C1.69276 10.1592 1.84087 10.1182 2.00038 10.1182C2.15533 10.1182 2.29888 10.1569 2.43104 10.2344C2.56776 10.3118 2.67486 10.4167 2.75233 10.5488C2.83436 10.681 2.87538 10.8245 2.87538 10.9795C2.87538 11.2256 2.79107 11.4375 2.62245 11.6152C2.45383 11.7884 2.24647 11.8773 2.00038 11.8818Z" fill="#6C6C6C" />
    </svg>
  )
}

export const PostEditIcn = () => {
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.7225 9.57581L14.6424 10.4957L5.58366 19.5544H4.66378V18.6345L13.7225 9.57581ZM17.322 3.55664C17.0721 3.55664 16.8121 3.65663 16.6221 3.8466L14.7924 5.67635L18.5419 9.42583L20.3716 7.59608C20.7615 7.20613 20.7615 6.57622 20.3716 6.18628L18.0319 3.8466C17.832 3.64663 17.582 3.55664 17.322 3.55664ZM13.7225 6.7462L2.66406 17.8047V21.5541H6.41354L17.472 10.4957L13.7225 6.7462Z" fill="#6C6C6C" />
    </svg>
  )
}

export const DeleteIcn = () => {
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.1316 18.6383L11.5859 14.0926L7.04025 18.6383C6.54023 19.1383 5.722 19.1383 5.22198 18.6383C4.72195 18.1382 4.72195 17.32 5.22198 16.82L9.76766 12.2743L5.22198 7.72862C4.72195 7.2286 4.72195 6.41037 5.22198 5.91035C5.722 5.41032 6.54023 5.41032 7.04025 5.91035L11.5859 10.456L16.1316 5.91035C16.6316 5.41032 17.4499 5.41032 17.9499 5.91035C18.4499 6.41037 18.4499 7.2286 17.9499 7.72862L13.4042 12.2743L17.9499 16.82C18.4499 17.32 18.4499 18.1382 17.9499 18.6383C17.4499 19.1383 16.6316 19.1383 16.1316 18.6383Z" fill="#6C6C6C" />
    </svg>
  )
}

export const LikeIcn = (props: { val?: boolean; color?: string; }) => {
  if (props.val === true) {
    return (
      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.9356 21.5428C13.1756 22.2328 12.0056 22.2328 11.2456 21.5328L11.1356 21.4328C5.8856 16.6828 2.4556 13.5728 2.5856 9.69276C2.6456 7.99276 3.5156 6.36276 4.9256 5.40276C7.5656 3.60276 10.8256 4.44276 12.5856 6.50276C14.3456 4.44276 17.6056 3.59276 20.2456 5.40276C21.6556 6.36276 22.5256 7.99276 22.5856 9.69276C22.7256 13.5728 19.2856 16.6828 14.0356 21.4528L13.9356 21.5428Z" fill="#4A6AFE" />
      </svg>
    )
  } else if (props.val === false) {
    return (
      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.2462 5.59905C17.6062 3.79905 14.3462 4.63905 12.5862 6.69905C10.8262 4.63905 7.56615 3.78905 4.92615 5.59905C3.52615 6.55905 2.64615 8.17905 2.58615 9.88905C2.44615 13.7691 5.88615 16.8791 11.1362 21.6491L11.2362 21.7391C11.9962 22.4291 13.1662 22.4291 13.9262 21.7291L14.0362 21.6291C19.2862 16.8691 22.7162 13.7591 22.5862 9.87905C22.5262 8.17905 21.6462 6.55905 20.2462 5.59905ZM12.6862 20.1591L12.5862 20.2591L12.4862 20.1591C7.72615 15.8491 4.58615 12.9991 4.58615 10.1091C4.58615 8.10905 6.08615 6.60905 8.08615 6.60905C9.62615 6.60905 11.1262 7.59905 11.6562 8.96905H13.5262C14.0462 7.59905 15.5462 6.60905 17.0862 6.60905C19.0862 6.60905 20.5862 8.10905 20.5862 10.1091C20.5862 12.9991 17.4462 15.8491 12.6862 20.1591Z" fill="#1E1E1E" />
      </svg>
    )
  } else if (props.color !== undefined) {
    return (
      <svg width="24" height="24" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.2462 5.59905C17.6062 3.79905 14.3462 4.63905 12.5862 6.69905C10.8262 4.63905 7.56615 3.78905 4.92615 5.59905C3.52615 6.55905 2.64615 8.17905 2.58615 9.88905C2.44615 13.7691 5.88615 16.8791 11.1362 21.6491L11.2362 21.7391C11.9962 22.4291 13.1662 22.4291 13.9262 21.7291L14.0362 21.6291C19.2862 16.8691 22.7162 13.7591 22.5862 9.87905C22.5262 8.17905 21.6462 6.55905 20.2462 5.59905ZM12.6862 20.1591L12.5862 20.2591L12.4862 20.1591C7.72615 15.8491 4.58615 12.9991 4.58615 10.1091C4.58615 8.10905 6.08615 6.60905 8.08615 6.60905C9.62615 6.60905 11.1262 7.59905 11.6562 8.96905H13.5262C14.0462 7.59905 15.5462 6.60905 17.0862 6.60905C19.0862 6.60905 20.5862 8.10905 20.5862 10.1091C20.5862 12.9991 17.4462 15.8491 12.6862 20.1591Z" fill={props.color} />
      </svg>
    )
  }
}

export const CalIcn = (props: { val: boolean }) => {
  if (!props.val) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.58594 11.6084H9.58594V13.6084H7.58594V11.6084ZM21.5859 6.6084V20.6084C21.5859 21.7084 20.6859 22.6084 19.5859 22.6084H5.58594C4.47594 22.6084 3.58594 21.7084 3.58594 20.6084L3.59594 6.6084C3.59594 5.5084 4.47594 4.6084 5.58594 4.6084H6.58594V2.6084H8.58594V4.6084H16.5859V2.6084H18.5859V4.6084H19.5859C20.6859 4.6084 21.5859 5.5084 21.5859 6.6084ZM5.58594 8.6084H19.5859V6.6084H5.58594V8.6084ZM19.5859 20.6084V10.6084H5.58594V20.6084H19.5859ZM15.5859 13.6084H17.5859V11.6084H15.5859V13.6084ZM11.5859 13.6084H13.5859V11.6084H11.5859V13.6084Z" fill="#1E1E1E" />
      </svg>
    )
  } return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 10.53C15.71 10.24 15.23 10.24 14.94 10.53L10.59 14.88L9 13.29C8.71 13 8.23 13 7.94 13.29C7.65 13.58 7.65 14.06 7.94 14.35L9.88 16.29C10.27 16.68 10.9 16.68 11.29 16.29L15.99 11.59C16.29 11.3 16.29 10.82 16 10.53ZM19 3H18V2C18 1.45 17.55 1 17 1C16.45 1 16 1.45 16 2V3H8V2C8 1.45 7.55 1 7 1C6.45 1 6 1.45 6 2V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM18 19H6C5.45 19 5 18.55 5 18V8H19V18C19 18.55 18.55 19 18 19Z" fill="#4A6AFE" />
    </svg>
  )
}

export const CmtLikeIcn = (props: { val: boolean }) => {
  if (props.val) {
    return (
      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5735 3.6582C7.94155 3.6582 4.18555 7.4262 4.18555 12.0582C4.18555 16.6902 7.94155 20.4582 12.5735 20.4582C17.2175 20.4582 20.9855 16.6902 20.9855 12.0582C20.9855 7.4262 17.2175 3.6582 12.5735 3.6582ZM7.78555 9.6582C7.78555 8.9982 8.32555 8.4582 8.98555 8.4582C9.64555 8.4582 10.1855 8.9982 10.1855 9.6582C10.1855 10.3182 9.64555 10.8582 8.98555 10.8582C8.32555 10.8582 7.78555 10.3182 7.78555 9.6582ZM16.9055 14.1102C16.1495 15.7302 14.5055 16.8582 12.5855 16.8582C10.6655 16.8582 9.02155 15.7302 8.26555 14.1102C8.07355 13.7142 8.38555 13.2582 8.81755 13.2582H16.3535C16.7855 13.2582 17.0975 13.7142 16.9055 14.1102ZM16.1855 10.8582C15.5255 10.8582 14.9855 10.3182 14.9855 9.6582C14.9855 8.9982 15.5255 8.4582 16.1855 8.4582C16.8455 8.4582 17.3855 8.9982 17.3855 9.6582C17.3855 10.3182 16.8455 10.8582 16.1855 10.8582Z" fill="#4A6AFE" />
      </svg>
    )
  } return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5779 4.52832C8.16194 4.52832 4.58594 8.11232 4.58594 12.5283C4.58594 16.9443 8.16194 20.5283 12.5779 20.5283C17.0019 20.5283 20.5859 16.9443 20.5859 12.5283C20.5859 8.11232 17.0019 4.52832 12.5779 4.52832ZM12.5859 18.9283C9.04994 18.9283 6.18594 16.0643 6.18594 12.5283C6.18594 8.99232 9.04994 6.12832 12.5859 6.12832C16.1219 6.12832 18.9859 8.99232 18.9859 12.5283C18.9859 16.0643 16.1219 18.9283 12.5859 18.9283ZM15.3859 11.7283C16.0499 11.7283 16.5859 11.1923 16.5859 10.5283C16.5859 9.86432 16.0499 9.32832 15.3859 9.32832C14.7219 9.32832 14.1859 9.86432 14.1859 10.5283C14.1859 11.1923 14.7219 11.7283 15.3859 11.7283ZM9.78594 11.7283C10.4499 11.7283 10.9859 11.1923 10.9859 10.5283C10.9859 9.86432 10.4499 9.32832 9.78594 9.32832C9.12194 9.32832 8.58594 9.86432 8.58594 10.5283C8.58594 11.1923 9.12194 11.7283 9.78594 11.7283ZM12.5859 16.9283C14.2099 16.9283 15.6259 16.0403 16.3859 14.7283C16.5379 14.4643 16.3459 14.1283 16.0339 14.1283H9.13794C8.83394 14.1283 8.63394 14.4643 8.78594 14.7283C9.54594 16.0403 10.9619 16.9283 12.5859 16.9283Z" fill="#6C6C6C" />
    </svg>
  )
}

export const TagIcn = () => {
  return (
    <svg width="18px" height="18px" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.94922 11.1641H7.46094L7.00977 13.8984H6.01172L6.46289 11.1641H5L5.16406 10.1797H6.62012L7.03027 7.71875H5.58789L5.73828 6.73438H7.1875L7.63867 4H8.63672L8.18555 6.73438H10.6738L11.125 4H12.123L11.6719 6.73438H13.1484L12.9844 7.71875H11.5146L11.1045 10.1797H12.5605L12.3965 11.1641H10.9473L10.4961 13.8984H9.49805L9.94922 11.1641ZM10.1064 10.1797L10.5166 7.71875H8.02832L7.61816 10.1797H10.1064Z" fill="#1E1E1E" />
      <circle cx="9" cy="9" r="8.75" stroke="#1E1E1E" strokeWidth="0.5" />
    </svg>
  )
}

export const AlarmIcn = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.7295 21C13.5537 21.3031 13.3014 21.5547 12.9978 21.7295C12.6941 21.9044 12.3499 21.9965 11.9995 21.9965C11.6492 21.9965 11.3049 21.9044 11.0013 21.7295C10.6977 21.5547 10.4453 21.3031 10.2695 21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const SmileIcn = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.4041 2.47168C6.88406 2.47168 2.41406 6.95168 2.41406 12.4717C2.41406 17.9917 6.88406 22.4717 12.4041 22.4717C17.9341 22.4717 22.4141 17.9917 22.4141 12.4717C22.4141 6.95168 17.9341 2.47168 12.4041 2.47168ZM12.4141 20.4717C7.99406 20.4717 4.41406 16.8917 4.41406 12.4717C4.41406 8.05168 7.99406 4.47168 12.4141 4.47168C16.8341 4.47168 20.4141 8.05168 20.4141 12.4717C20.4141 16.8917 16.8341 20.4717 12.4141 20.4717ZM15.9141 11.4717C16.7441 11.4717 17.4141 10.8017 17.4141 9.97168C17.4141 9.14168 16.7441 8.47168 15.9141 8.47168C15.0841 8.47168 14.4141 9.14168 14.4141 9.97168C14.4141 10.8017 15.0841 11.4717 15.9141 11.4717ZM8.91406 11.4717C9.74406 11.4717 10.4141 10.8017 10.4141 9.97168C10.4141 9.14168 9.74406 8.47168 8.91406 8.47168C8.08406 8.47168 7.41406 9.14168 7.41406 9.97168C7.41406 10.8017 8.08406 11.4717 8.91406 11.4717ZM12.4141 17.9717C14.4441 17.9717 16.2141 16.8617 17.1641 15.2217C17.3541 14.8917 17.1141 14.4717 16.7241 14.4717H8.10406C7.72406 14.4717 7.47406 14.8917 7.66406 15.2217C8.61406 16.8617 10.3841 17.9717 12.4141 17.9717Z" fill="#6C6C6C" />
    </svg>
  )
}

export const MailIcn = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.6 6H18.4C19.28 6 20 6.72 20 7.6V17.2C20 18.08 19.28 18.8 18.4 18.8H5.6C4.72 18.8 4 18.08 4 17.2V7.6C4 6.72 4.72 6 5.6 6Z" stroke="#6C6C6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 7.59961L12 13.1996L4 7.59961" stroke="#6C6C6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const AlarmLikeIcn = (props: { val: boolean }) => {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="15" r="15" fill={props.val ? '#C1C1C1' : '#4A6AFE'} />
      <path d="M22.6602 8.56487C20.0202 6.76487 16.7602 7.60487 15.0002 9.66487C13.2402 7.60487 9.98021 6.75487 7.34021 8.56487C5.94021 9.52487 5.06021 11.1449 5.00021 12.8549C4.86021 16.7349 8.30021 19.8449 13.5502 24.6149L13.6502 24.7049C14.4102 25.3949 15.5802 25.3949 16.3402 24.6949L16.4502 24.5949C21.7002 19.8349 25.1302 16.7249 25.0002 12.8449C24.9402 11.1449 24.0602 9.52487 22.6602 8.56487ZM15.1002 23.1249L15.0002 23.2249L14.9002 23.1249C10.1402 18.8149 7.00021 15.9649 7.00021 13.0749C7.00021 11.0749 8.50021 9.57487 10.5002 9.57487C12.0402 9.57487 13.5402 10.5649 14.0702 11.9349H15.9402C16.4602 10.5649 17.9602 9.57487 19.5002 9.57487C21.5002 9.57487 23.0002 11.0749 23.0002 13.0749C23.0002 15.9649 19.8602 18.8149 15.1002 23.1249Z" fill="#FCFCFC" />
    </svg>
  )
}

export const AlarmCmtIcn = (props: { val: boolean }) => {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="15" r="15" fill={props.val ? '#C1C1C1' : '#4A6AFE'} />
      <path d="M21.666 7.6665H8.33268C7.41602 7.6665 6.66602 8.4165 6.66602 9.33317V24.3332L9.99935 20.9998H21.666C22.5827 20.9998 23.3327 20.2498 23.3327 19.3332V9.33317C23.3327 8.4165 22.5827 7.6665 21.666 7.6665ZM21.666 19.3332H9.30768L8.33268 20.3082V9.33317H21.666V19.3332ZM10.8327 13.4998H12.4993V15.1665H10.8327V13.4998ZM17.4993 13.4998H19.166V15.1665H17.4993V13.4998ZM14.166 13.4998H15.8327V15.1665H14.166V13.4998Z" fill="#FCFCFC" />
    </svg>
  )
}