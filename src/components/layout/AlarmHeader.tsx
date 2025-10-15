"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { createTheme, Snackbar, ThemeProvider, Alert } from "@mui/material";
import useLoginInfo from '@/hooks/useLoginInfo';
import { AlarmIcn } from "../pages/user";
import { alarmSSE } from "../pages/user/mypage/AlarmSSE";
import { Toast } from '@base-ui-components/react/toast';

interface SnackbarMessage { alarmId: number; type: string; title: string; message: string; subject: string; time: string; }
export default function AlarmHeader() {
  // const toastManager = Toast.useToastManager();
  return (
    <>
      <Toast.Provider>
        {/* <button
          type="button"
          onClick={() => {
            toastManager.add({
              description: 'Hello, world!',
            });
          }}
        >
          Add toast
        </button> */}
        {/* <Toast.Portal>
          <Toast.Viewport className="fixed top-[16px] left-[16px] right-[16px] max-w-[300px] h-[250px] " > */}
        <AlarmSnack />
        {/* </Toast.Viewport>
        </Toast.Portal> */}
      </Toast.Provider>
    </>
  )
  // const data = useLoginInfo()
  // if (!!data.data) { return (<AlarmSnack />) }
  // else { return (<></>) }
}

function AlarmSnack() {
  const toastManager = Toast.useToastManager();
  const [snackPack, setSnackPack] = useState<readonly SnackbarMessage[]>([{
    alarmId: 1,
    type: "NEW_EVENT_COMMENT",
    title: "오냐냐냐냐",
    message: "눈냐ㅑ냐냐냐",
    subject: "ㅁㅈㅇ",
    time: "2025-10-15"
  }]);
  const [open, setOpen] = useState(false)
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(undefined);

  useEffect(() => { alarmSSE(setOpen, setSnackPack); }, [])
  useEffect(() => {
    if (snackPack.length) { // add a new snack
      // setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      // setOpen(true);
      console.log(snackPack)
      toastManager.add({ ...snackPack[0] })
    } else if (snackPack.length && messageInfo && open) { // close an active snack
      setOpen(false);
    }
  }, [snackPack]);
  const router = useRouter()
  const handleClose = () => { setOpen(false); };
  const handleExited = () => { setMessageInfo(undefined); };

  // return (
  //   <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={3000}
  //     open={open} onClose={handleClose} TransitionProps={{ onExited: handleExited }}
  //     key={!!messageInfo ? messageInfo.alarmId : undefined} >
  //     {!messageInfo ? <div></div>
  //       : <Alert icon={<AlarmIcn type={messageInfo.type} val={false} />} severity="info" sx={{ width: '100%' }}
  //         onClick={() => { router.push('/mypage/alarm') }}>
  //         <div className="flex flex-col gap-[1.5px] text-12">
  //           <p className="text-black">{messageInfo.title}</p>
  //           <p className="text-gray3">{messageInfo.message ?? ''}</p>
  //           <div className="flex flex-row gap-[5px] text-gray3">
  //             <p>{dayjs(messageInfo.time).format('YY.MM.DD')}</p><p>{dayjs(messageInfo.time).format('HH:mm')}</p>
  //           </div>
  //         </div>
  //       </Alert>}
  //   </Snackbar>
  // )
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          toastManager.add({
            description: 'Hello, world!',
          });
        }}
      >
        Add toast
      </button>
      <Toast.Portal>
        <Toast.Viewport className="fixed top-[16px] left-[16px] right-[16px] max-w-[300px] h-[250px] " >
          {toastManager.toasts.map((toast) => (
            <Toast.Root key={toast.id} toast={toast} swipeDirection={["up", 'right']} >
              <Toast.Content>
                <Toast.Title />
                <Toast.Description />
              </Toast.Content>
            </Toast.Root>
          ))}
        </Toast.Viewport>
      </Toast.Portal>
    </div>
  )
}