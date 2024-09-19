export const ChevronIcn = (props: { direction: 'left' | 'right' }) => {
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

export const DeleteIcn = (props: { size?: string, color?: string }) => {
  let icnSize = props.size ?? '24'
  let color = props.color ?? '#6C6C6C'
  return (
    <svg width={icnSize} height={icnSize} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.1316 18.6383L11.5859 14.0926L7.04025 18.6383C6.54023 19.1383 5.722 19.1383 5.22198 18.6383C4.72195 18.1382 4.72195 17.32 5.22198 16.82L9.76766 12.2743L5.22198 7.72862C4.72195 7.2286 4.72195 6.41037 5.22198 5.91035C5.722 5.41032 6.54023 5.41032 7.04025 5.91035L11.5859 10.456L16.1316 5.91035C16.6316 5.41032 17.4499 5.41032 17.9499 5.91035C18.4499 6.41037 18.4499 7.2286 17.9499 7.72862L13.4042 12.2743L17.9499 16.82C18.4499 17.32 18.4499 18.1382 17.9499 18.6383C17.4499 19.1383 16.6316 19.1383 16.1316 18.6383Z" fill={color} />
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

export const CalIcn = (props: { val: boolean; color?: string; }) => {
  if (!props.val) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 11H9V13H7V11ZM21 6V20C21 21.1 20.1 22 19 22H5C3.89 22 3 21.1 3 20L3.01 6C3.01 4.9 3.89 4 5 4H6V2H8V4H16V2H18V4H19C20.1 4 21 4.9 21 6ZM5 8H19V6H5V8ZM19 20V10H5V20H19ZM15 13H17V11H15V13ZM11 13H13V11H11V13Z" fill={props.color ?? "#1E1E1E"} />
      </svg>
    )
  } return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 11H9V13H7V11ZM21 6V20C21 21.1 20.1 22 19 22H5C3.89 22 3 21.1 3 20L3.01 6C3.01 4.9 3.89 4 5 4H6V2H8V4H16V2H18V4H19C20.1 4 21 4.9 21 6ZM5 8H19V6H5V8ZM19 20V10H5V20H19ZM15 13H17V11H15V13ZM11 13H13V11H11V13Z" fill="#4A6AFE" />
      <rect x="4" y="5.3916" width="16" height="3" fill="#4A6AFE" />
      <rect x="5" y="10" width="14" height="10" fill="white" />
      <path d="M8.5 15.2143L10.6532 17.5L15.5 12.5" stroke="#4A6AFE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const CmtLikeIcn = (props: { val: boolean }) => {
  if (props.val) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5735 3.6582C7.94155 3.6582 4.18555 7.4262 4.18555 12.0582C4.18555 16.6902 7.94155 20.4582 12.5735 20.4582C17.2175 20.4582 20.9855 16.6902 20.9855 12.0582C20.9855 7.4262 17.2175 3.6582 12.5735 3.6582ZM7.78555 9.6582C7.78555 8.9982 8.32555 8.4582 8.98555 8.4582C9.64555 8.4582 10.1855 8.9982 10.1855 9.6582C10.1855 10.3182 9.64555 10.8582 8.98555 10.8582C8.32555 10.8582 7.78555 10.3182 7.78555 9.6582ZM16.9055 14.1102C16.1495 15.7302 14.5055 16.8582 12.5855 16.8582C10.6655 16.8582 9.02155 15.7302 8.26555 14.1102C8.07355 13.7142 8.38555 13.2582 8.81755 13.2582H16.3535C16.7855 13.2582 17.0975 13.7142 16.9055 14.1102ZM16.1855 10.8582C15.5255 10.8582 14.9855 10.3182 14.9855 9.6582C14.9855 8.9982 15.5255 8.4582 16.1855 8.4582C16.8455 8.4582 17.3855 8.9982 17.3855 9.6582C17.3855 10.3182 16.8455 10.8582 16.1855 10.8582Z" fill="#4A6AFE" />
      </svg>
    )
  } return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5779 4.52832C8.16194 4.52832 4.58594 8.11232 4.58594 12.5283C4.58594 16.9443 8.16194 20.5283 12.5779 20.5283C17.0019 20.5283 20.5859 16.9443 20.5859 12.5283C20.5859 8.11232 17.0019 4.52832 12.5779 4.52832ZM12.5859 18.9283C9.04994 18.9283 6.18594 16.0643 6.18594 12.5283C6.18594 8.99232 9.04994 6.12832 12.5859 6.12832C16.1219 6.12832 18.9859 8.99232 18.9859 12.5283C18.9859 16.0643 16.1219 18.9283 12.5859 18.9283ZM15.3859 11.7283C16.0499 11.7283 16.5859 11.1923 16.5859 10.5283C16.5859 9.86432 16.0499 9.32832 15.3859 9.32832C14.7219 9.32832 14.1859 9.86432 14.1859 10.5283C14.1859 11.1923 14.7219 11.7283 15.3859 11.7283ZM9.78594 11.7283C10.4499 11.7283 10.9859 11.1923 10.9859 10.5283C10.9859 9.86432 10.4499 9.32832 9.78594 9.32832C9.12194 9.32832 8.58594 9.86432 8.58594 10.5283C8.58594 11.1923 9.12194 11.7283 9.78594 11.7283ZM12.5859 16.9283C14.2099 16.9283 15.6259 16.0403 16.3859 14.7283C16.5379 14.4643 16.3459 14.1283 16.0339 14.1283H9.13794C8.83394 14.1283 8.63394 14.4643 8.78594 14.7283C9.54594 16.0403 10.9619 16.9283 12.5859 16.9283Z" fill="#6C6C6C" />
    </svg>
  )
}

export const HeaderBackIcn = () => {
  return (
    <svg width="24" height="29" viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.6205 3.66341C16.1305 3.07541 15.3405 3.07541 14.8505 3.66341L6.54055 13.6354C6.15055 14.1034 6.15055 14.8594 6.54055 15.3274L14.8505 25.2994C15.3405 25.8874 16.1305 25.8874 16.6205 25.2994C17.1105 24.7114 17.1105 23.7634 16.6205 23.1754L9.38055 14.4754L16.6305 5.77541C17.1105 5.19941 17.1105 4.23941 16.6205 3.66341Z" fill="#1E1E1E" />
    </svg>
  )
}

export const VerticalMoreIcn = (props: { opt: 'CMT' | 'DTL' }) => {
  if (props.opt === 'CMT') {
    return (
      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12.5859" cy="5.71582" r="1.25" fill="#1E1E1E" />
        <circle cx="12.5859" cy="12.2158" r="1.25" fill="#1E1E1E" />
        <circle cx="12.5859" cy="18.7158" r="1.25" fill="#1E1E1E" />
      </svg>
    )
  } else if (props.opt === 'DTL') {
    return (
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="22.75" cy="6" r="1.25" fill="#1E1E1E" />
        <circle cx="22.75" cy="12.5" r="1.25" fill="#1E1E1E" />
        <circle cx="22.75" cy="19" r="1.25" fill="#1E1E1E" />
      </svg>
    )
  }
}

export const MagnifyingIcn = (props: { size: 20 | 24 }) => {
  if (props.size === 20) {
    return (
      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.1099 13.2924H13.3762L13.1161 13.0417C14.2306 11.7414 14.8064 9.96754 14.4907 8.08219C14.0541 5.50029 11.8995 3.43847 9.29898 3.1227C5.3704 2.63976 2.06407 5.94608 2.54702 9.87467C2.86279 12.4751 4.9246 14.6298 7.50651 15.0663C9.39186 15.3821 11.1658 14.8063 12.466 13.6918L12.7168 13.9518V14.6856L16.6639 18.6327C17.0447 19.0135 17.667 19.0135 18.0477 18.6327C18.4285 18.2519 18.4285 17.6297 18.0477 17.2489L14.1099 13.2924ZM8.53741 13.2924C6.22484 13.2924 4.35807 11.4257 4.35807 9.1131C4.35807 6.80053 6.22484 4.93375 8.53741 4.93375C10.85 4.93375 12.7168 6.80053 12.7168 9.1131C12.7168 11.4257 10.85 13.2924 8.53741 13.2924Z" fill="#1E1E1E" />
      </svg>
    )
  } else if (props.size === 24) {
    return (
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.9318 15.8353H16.0514L15.7393 15.5344C17.0767 13.9741 17.7677 11.8454 17.3888 9.583C16.865 6.48472 14.2794 4.01054 11.1588 3.63162C6.44448 3.05208 2.47689 7.01967 3.05642 11.734C3.43535 14.8546 5.90952 17.4402 9.00781 17.964C11.2702 18.3429 13.3989 17.6519 14.9592 16.3145L15.2601 16.6266V17.507L19.9967 22.2436C20.4536 22.7006 21.2003 22.7006 21.6573 22.2436C22.1142 21.7867 22.1142 21.04 21.6573 20.583L16.9318 15.8353ZM10.2449 15.8353C7.46981 15.8353 5.22968 13.5952 5.22968 10.8201C5.22968 8.04501 7.46981 5.80488 10.2449 5.80488C13.02 5.80488 15.2601 8.04501 15.2601 10.8201C15.2601 13.5952 13.02 15.8353 10.2449 15.8353Z" fill="black" />
      </svg>
    )
  }
}