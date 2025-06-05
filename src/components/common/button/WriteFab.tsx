import { ThemeProvider, Fab, createTheme } from "@mui/material"

export const WriteFab = (props: {opt: 'p' | 'r'; eventId?: number}) => {
  const writeURL = props.opt === 'r' && !!props.eventId ? `/write?w=r&id=${props.eventId}` : `/write?w=${props.opt}`
  return (
    <ThemeProvider theme={writeFabTheme}>
      <Fab variant="extended" size="small" color="primary" className='fixed bottom-[19px] right-[16px]' href={writeURL}>
        <div className='flex flex-row items-center'>
          <MainAddIcn />
          <span className='ps-[4px]'>글작성</span>
        </div>
      </Fab>
    </ThemeProvider>
  )
}

const MainAddIcn = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M10.1743 1.22898L8.63519 1.23176L8.6482 9.81202L17.2328 9.8207L17.2312 8.28588L10.1815 8.27875L10.1743 1.22898Z" fill="#FCFCFC" />
    <path fillRule="evenodd" clipRule="evenodd" d="M8.74558 16.771L10.2847 16.7682L10.2717 8.18798L1.68713 8.1793L1.68868 9.71412L8.73845 9.72125L8.74558 16.771Z" fill="#FCFCFC" />
  </svg>
)

const writeFabTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiFab: {
      styleOverrides: {
        root: {
          padding: '12.5px 12px !important', height: 'auto !important',
          backgroundColor: '#4A6AFE !important', color: '#FCFCFC',
          fontWeight: 600, fontSize: '18px', lineHeight: '140%',
          borderRadius: '50px !important', boxShadow: 'none',
          '&:hover': { border: '0.5px solid #4A6AFE', backgroundColor: 'transparent' },
          '&:active': {
            border: '0.5px solid #4A6AFE', backgroundColor: '#4A6AFE !important', color: '#FCFCFC'
          }
        }
      }
    },
  },
});