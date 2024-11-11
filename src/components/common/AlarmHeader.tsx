"use client";
import { useEffect, useState } from "react";
import { alarmSSE } from "../pages/user/AlarmSSE";
import { createTheme, Snackbar, ThemeProvider, Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import useLoginInfo from '@/hooks/useLoginInfo';
import dayjs from "dayjs";
import { AlarmIcn } from "../pages/user";

export interface SnackbarMessage { alarmId: number; type: string; title: string; message: string; subject: string; time: string; }
export default function AlarmHeader() {
  const data = useLoginInfo()
  if (!!data) { return (<AlarmSnack />) }
  else { return (<></>) }
}

function AlarmSnack() {
  const [snackPack, setSnackPack] = useState<readonly SnackbarMessage[]>([]);
  const [open, setOpen] = useState(false)
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(undefined);

  useEffect(() => { alarmSSE(setOpen, setSnackPack); }, [])
  useEffect(() => {
    if (snackPack.length && !messageInfo) { // add a new snack
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) { // close an active snack
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);
  const router = useRouter()
  const handleClose = () => { setOpen(false); };
  const handleExited = () => { setMessageInfo(undefined); };

  return (
    <ThemeProvider theme={alarmTheme}>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={3000}
        open={open} onClose={handleClose} TransitionProps={{ onExited: handleExited }}
        key={!!messageInfo ? messageInfo.alarmId : undefined} >
        {!messageInfo ? <div></div>
          : <Alert icon={<AlarmIcn type={messageInfo.type} val={false} />} severity="info" sx={{ width: '100%' }}
            onClick={() => { router.push('/user/mypage/alarm') }}>
            <div className="flex flex-col gap-[1.5px] text-12">
              <p className="text-black">{messageInfo.title}</p>
              <p className="text-gray3">{messageInfo.message ?? ''}</p>
              <div className="flex flex-row gap-[5px] text-gray3">
                <p>{dayjs(messageInfo.time).format('YY.MM.DD')}</p><p>{dayjs(messageInfo.time).format('HH:mm')}</p>
              </div>
            </div>
          </Alert>}
      </Snackbar>
    </ThemeProvider>
  )
}

const alarmTheme = createTheme({
  components: {
    MuiSnackbar: { styleOverrides: { root: { left: '12px', right: '12px', top: '12px' } } },
    MuiAlert: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(235, 239, 245, 0.8)', color: '#1E1E1E', padding: '16px',
          backdropFilter: 'blur(50px)', boxShadow: 'unset',
          borderRadius: '8px', fontSize: '12px', lineHeight: '140%', fontFamily: 'inherit'
        },
        icon: { padding: 'unset', marginRight: '18px' },
        message: {padding: 'unset'},
      }
    }
  },
});