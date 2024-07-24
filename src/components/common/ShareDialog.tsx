'use client';
import { ThemeProvider, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { shareDialogTheme } from '@/components/common/Themes'

interface ShareDialogProps { handleClose: any, popopen: boolean, sharingURL: string; }
export default function ShareDialog(props: ShareDialogProps) {
  // useEffect(() => {
  //   if (window.Kakao !== undefined) {
  //     window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO);
  //     console.log(window.Kakao.isInitialized());
  //   }
  // }, [])
  const handleURL = async () => {
    // // - using navigator canShare api : 크롬 작동 X, 사파리 작동 O
    // console.log('- handleURL' + navigator.canShare)
    // const sharingData = {
    //   text: '바글바글',
    //   url: 'http://localhost:3000/',
    // }

    // try {
    //   if (navigator.canShare && navigator.canShare(sharingData)) {
    //     navigator.share(sharingData)
    //     .then(() => {
    //       alert('URL이 복사되었습니다.\n공유할 곳에 붙여넣기 해주세요.')
    //     }).catch(() => {
    //       console.log('취소')
    //     })
    //   }
    // } catch (e) {
    //   alert('URL 복사를 실패했습니다.')
    // }

    // - using navigator clipboard api
    try {
      await navigator.clipboard.writeText(process.env.NEXT_PUBLIC_FRONT_BASE_URL + props.sharingURL);
      alert('클립보드에 URL이 복사되었습니다.\n공유할 곳에 붙여넣기 해주세요.')
    } catch (err) {
      // alert('링크 복사를 실패했습니다.')
      console.log('링크 복사 실패' + err);
    }
  }

  const handleKakao = () => {
    alert('카카오 공유')
    // // 배포 후 테스트 가능
    // window.Kakao.Share.sendDefault({
    //   objectType: 'feed',
    //   content: {
    //     title: 'PEAK FESTIVAL 2023',
    //     description: '23.05.27 - 05.28\n #10cm #실리카겔 #난지한강공원',
    //     imageUrl:
    //       'https://pbs.twimg.com/media/Ft6VCQ6aMAI2cIC.jpg',
    //     link: {
    //       // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
    //       mobileWebUrl: 'https://developers.kakao.com',
    //       webUrl: 'https://developers.kakao.com',
    //     },
    //   },
    //   buttons: [
    //     {
    //       title: '바글바글에서 확인하기',
    //       link: {
    //         mobileWebUrl: 'https://developers.kakao.com',
    //         webUrl: 'https://developers.kakao.com',
    //       },
    //     },
    //   ],
    // });
  }

  return (
    <ThemeProvider theme={shareDialogTheme}>
      <Dialog onClose={props.handleClose} open={props.popopen} >
        <DialogTitle className='flex flex-row justify-between'>
          <div className='w-[24px] h-[24px]' />
          <span>공유하기</span>
          <button onClick={props.handleClose}><img src='/popup_close.svg' /></button>
        </DialogTitle>
        <DialogContent className='flex flex-row gap-[48px] justify-center'>
          <div className='flex flex-col items-center cursor-pointer' onClick={handleKakao}>
            <img className='w-[50px] h-[50.74px]' src='/kakaotalk_sharing_btn.png' />
            <span className='select-none px-[4px] pt-[4px]'>카카오톡</span>
          </div>
          <div className='flex flex-col items-center cursor-pointer' onClick={handleURL}>
            <img className='w-[50px] h-[50.74px]' src='/url_sharing_btn.png' />
            <span className='select-none px-[4px] pt-[4px]'>URL 복사</span>
          </div>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  )
} 