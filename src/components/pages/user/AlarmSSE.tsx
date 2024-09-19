export const alarmSSE = async (setOpen: any, setSnackPack: any) => {
  let eventSource: EventSource;
  try {
    eventSource = new EventSource(`${process.env.NEXT_PUBLIC_ALARM_BASE_URL}/alarm/subscribe`, { withCredentials: true });
    console.info("Listenting on SEE", eventSource);

    eventSource.onmessage = async (e: MessageEvent) => {
      const res = await e.data;
      console.log(res)
      if (res !== 'HB') {
        setOpen(true)
        setSnackPack((prev: any) => [...prev, { message: e.data, key: new Date().getTime() }]);
      }
    }
  } catch (error) { }

  return {
    close: () => {
      console.info("Closing SSE");
      eventSource.close();
    }
  }
}