import { createTheme, ThemeProvider } from '@mui/material/styles';

// ref. postHeader.tsx (needed non-fixed for now)
interface PostHeaderProps {
  title: string,
  count?: number,
}
export function PostHeader(props: PostHeaderProps) {
  return (
    <div className="flex-row flex w-full justify-between px-[24px] py-[10px] bg-[#FFFFFF]">
      <a href="/"><img src='/arrow_prev.svg' /></a>
      <div className="flex flex-row items-center text-lg">
        <div>{props.title}</div>
        {
          props.count 
          ? <div className="text-gray3-text ps-[8px]">{props.count}</div>
          :<></>
        }
      </div>
      <div className='w-[24px]'></div>
    </div>
  )
}

// const hashTagTheme = createTheme({
//   components: {
//     // Name of the component
//     MuiButtonBase: {
//       defaultProps: {
//         // The props to change the default for.
//         disableRipple: true, // No more ripple, on the whole application 💣!
//       },
//     },
//   },
// });

