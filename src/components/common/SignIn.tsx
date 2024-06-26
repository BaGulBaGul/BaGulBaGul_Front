import { Fragment } from "react";
import { Dialog, AppBar, Button, IconButton, Toolbar, ThemeProvider } from '@mui/material';
import { signInTheme } from "./Themes";
import { API_BASE_URL } from "@/api-config";

export default function SignIn(props: { open: boolean; setOpen: any; }) {
  const handleClose = () => {
    props.setOpen(false);
  };
  return (
    <ThemeProvider theme={signInTheme}>
      <Fragment>
        <Dialog fullScreen open={props.open} onClose={handleClose} >
          <AppBar>
            <Toolbar>
              <IconButton disableRipple onClick={handleClose}><img className="w-[40px] h-[40px]" src='/popup_close.svg' /></IconButton>
            </Toolbar>
          </AppBar>
          <div className="flex flex-col justify-between h-full items-center px-[32px] pt-[151px] pb-[77px]">
            <div className="flex flex-col items-center gap-[20px] pointer-events-none">
              <img src="/logo_s.svg" width='135.07' />
              <div className="flex flex-col items-center gap-[2px]">
                <p className="text-[18px] font-semibold">내가 찾던 페스티벌</p>
                <p className="text-[14px]">간편하게 로그인하고 찾으러 떠나볼까요?</p>
              </div>
            </div>
            <Button className="flex flex-row justify-start px-[14px] w-full cursor-pointer"
              href={`${API_BASE_URL}/oauth2/authorization/kakao`}>
              <KakaoCI />
              <p className="flex w-full justify-center">카카오 로그인</p>
            </Button>
          </div>
        </Dialog>
      </Fragment>
    </ThemeProvider>
  );
}

const KakaoCI = () => {
  return (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_303_126)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.00002 1.09998C4.02917 1.09998 0 4.21293 0 8.05226C0 10.44 1.5584 12.5449 3.93152 13.7969L2.93303 17.4445C2.84481 17.7668 3.21341 18.0237 3.49646 17.8369L7.87334 14.9482C8.2427 14.9838 8.61808 15.0046 9.00002 15.0046C13.9705 15.0046 17.9999 11.8918 17.9999 8.05226C17.9999 4.21293 13.9705 1.09998 9.00002 1.09998Z" fill="black" />
      </g>
      <defs>
        <clipPath id="clip0_303_126">
          <rect width="17.9999" height="18" fill="white" transform="translate(0 0.5)" />
        </clipPath>
      </defs>
    </svg>

  )
}