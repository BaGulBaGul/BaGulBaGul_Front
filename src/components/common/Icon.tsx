//공용으로 사용할 프로필 아이콘


export const FilterArrowMore = () => {
  return (
    <svg width="16" height="23" viewBox="0 0 16 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.07273 7.96362L2 9.03635L8 15.0364L14 9.03635L12.9273 7.96362L8 12.8909L3.07273 7.96362V7.96362Z" fill="currentColor" />
    </svg>
  )
}

export const Category19 = () => {
  return (
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.48633 6.01562V14.5H5.41992V7.11719H5.37305L3.31055 8.48828V7.42188L5.41992 6.01562H6.48633ZM11.5723 5.89844C13.0371 5.91016 14.6543 6.78906 14.6543 9.91797C14.6543 12.9297 13.4238 14.6172 11.4316 14.6172C9.94336 14.6172 8.88867 13.7031 8.67773 12.3555H9.7207C9.9082 13.1172 10.4824 13.6797 11.4316 13.6797C12.8145 13.6797 13.6582 12.4844 13.6699 10.4219H13.5527C13.0605 11.125 12.2871 11.5469 11.3848 11.5469C9.86133 11.5469 8.60742 10.3867 8.60742 8.74609C8.60742 7.16406 9.76758 5.88672 11.5723 5.89844ZM11.5723 6.82422C10.459 6.82422 9.62695 7.69141 9.63867 8.73438C9.63867 9.78906 10.4238 10.6211 11.5371 10.6211C12.6387 10.6211 13.5059 9.70703 13.5059 8.71094C13.5059 7.73828 12.6973 6.82422 11.5723 6.82422Z" fill="currentColor" />
      <circle cx="9" cy="10" r="8.75" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  )
}

export const CalendarIcn = () => {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.58594 11.6084H9.58594V13.6084H7.58594V11.6084ZM21.5859 6.6084V20.6084C21.5859 21.7084 20.6859 22.6084 19.5859 22.6084H5.58594C4.47594 22.6084 3.58594 21.7084 3.58594 20.6084L3.59594 6.6084C3.59594 5.5084 4.47594 4.6084 5.58594 4.6084H6.58594V2.6084H8.58594V4.6084H16.5859V2.6084H18.5859V4.6084H19.5859C20.6859 4.6084 21.5859 5.5084 21.5859 6.6084ZM5.58594 8.6084H19.5859V6.6084H5.58594V8.6084ZM19.5859 20.6084V10.6084H5.58594V20.6084H19.5859ZM15.5859 13.6084H17.5859V11.6084H15.5859V13.6084ZM11.5859 13.6084H13.5859V11.6084H11.5859V13.6084Z" fill="currentColor" />
    </svg>
  )
}

export const SmileyFace = (props: { type: Number }) => {
  if (props.type == 0) { // 미선택
    return (
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.992 4.5C7.576 4.5 4 8.084 4 12.5C4 16.916 7.576 20.5 11.992 20.5C16.416 20.5 20 16.916 20 12.5C20 8.084 16.416 4.5 11.992 4.5ZM12 18.9C8.464 18.9 5.6 16.036 5.6 12.5C5.6 8.964 8.464 6.1 12 6.1C15.536 6.1 18.4 8.964 18.4 12.5C18.4 16.036 15.536 18.9 12 18.9ZM14.8 11.7C15.464 11.7 16 11.164 16 10.5C16 9.836 15.464 9.3 14.8 9.3C14.136 9.3 13.6 9.836 13.6 10.5C13.6 11.164 14.136 11.7 14.8 11.7ZM9.2 11.7C9.864 11.7 10.4 11.164 10.4 10.5C10.4 9.836 9.864 9.3 9.2 9.3C8.536 9.3 8 9.836 8 10.5C8 11.164 8.536 11.7 9.2 11.7ZM12 16.9C13.624 16.9 15.04 16.012 15.8 14.7C15.952 14.436 15.76 14.1 15.448 14.1H8.552C8.248 14.1 8.048 14.436 8.2 14.7C8.96 16.012 10.376 16.9 12 16.9Z" fill="#6C6C6C" />
      </svg>
    )
  } else if (props.type == 1) { // 선택
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.9876 3.6001C7.35561 3.6001 3.59961 7.3681 3.59961 12.0001C3.59961 16.6321 7.35561 20.4001 11.9876 20.4001C16.6316 20.4001 20.3996 16.6321 20.3996 12.0001C20.3996 7.3681 16.6316 3.6001 11.9876 3.6001ZM7.19961 9.6001C7.19961 8.9401 7.73961 8.4001 8.39961 8.4001C9.05961 8.4001 9.59961 8.9401 9.59961 9.6001C9.59961 10.2601 9.05961 10.8001 8.39961 10.8001C7.73961 10.8001 7.19961 10.2601 7.19961 9.6001ZM16.3196 14.0521C15.5636 15.6721 13.9196 16.8001 11.9996 16.8001C10.0796 16.8001 8.43561 15.6721 7.67961 14.0521C7.48761 13.6561 7.79961 13.2001 8.23161 13.2001H15.7676C16.1996 13.2001 16.5116 13.6561 16.3196 14.0521ZM15.5996 10.8001C14.9396 10.8001 14.3996 10.2601 14.3996 9.6001C14.3996 8.9401 14.9396 8.4001 15.5996 8.4001C16.2596 8.4001 16.7996 8.9401 16.7996 9.6001C16.7996 10.2601 16.2596 10.8001 15.5996 10.8001Z" fill="#4A6AFE" />
      </svg>
    )
  }

}

export const AddIcn = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 13H13V18C13 18.55 12.55 19 12 19C11.45 19 11 18.55 11 18V13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H11V6C11 5.45 11.45 5 12 5C12.55 5 13 5.45 13 6V11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z" fill="black" />
    </svg>
  )
}

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