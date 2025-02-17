'use client';
import { createTheme, Fab, ThemeProvider } from '@mui/material';

export default function ScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <ThemeProvider theme={scrollFabTheme}>
      <Fab variant="extended" size="small" color="primary" className='pointer-events-auto' onClick={scrollToTop}>
        <div className='flex flex-row items-center'>
          <PageTop />
        </div>
      </Fab>
    </ThemeProvider>
  );
}

const PageTop = () => (
  <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.2725 0.413086H0.727528C0.601124 0.413086 0.5 0.51421 0.5 0.637805V2.3232C0.5 2.44679 0.601124 2.54792 0.727528 2.54792H20.2725C20.3989 2.54792 20.5 2.44679 20.5 2.3232V0.637805C20.5 0.51421 20.3989 0.413086 20.2725 0.413086ZM10.677 5.66589C10.6559 5.63904 10.6291 5.61731 10.5984 5.60238C10.5678 5.58744 10.5341 5.57967 10.5 5.57967C10.4659 5.57967 10.4322 5.58744 10.4016 5.60238C10.3709 5.61731 10.3441 5.63904 10.323 5.66589L7.17697 9.64623C7.15103 9.67935 7.13494 9.7191 7.13053 9.76094C7.12612 9.80277 7.13357 9.845 7.15203 9.8828C7.17049 9.9206 7.19921 9.95244 7.23492 9.97469C7.27062 9.99693 7.31187 10.0087 7.35393 10.0086H9.42978V19.5142C9.42978 19.6378 9.5309 19.7389 9.65449 19.7389H11.3399C11.4635 19.7389 11.5646 19.6378 11.5646 19.5142V10.0114H13.6461C13.8343 10.0114 13.9382 9.79511 13.823 9.64904L10.677 5.66589Z" fill="#1E1E1E" />
  </svg>
)

const scrollFabTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiFab: {
      styleOverrides: {
        root: {
          width: '50px', height: '50px', padding: '15px !important',
          backgroundColor: '#FCFCFC !important', borderRadius: '100% !important', boxShadow: 'none',
          filter: 'drop-shadow(1px 1px 6px #00000040)',
        }
      }
    },
  },
});