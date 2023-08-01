import { Button } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

export const categoryButtonTheme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: { disableRipple: true, },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '14px !important', fontWeight: '400',
          lineHeight: '150%',
          color: '#1E1E1E!important',
          border: '0.5px solid #C1C1C1 !important',
          borderRadius: '20px!important',
          padding: '2px 8px',
          '&:hover, &:focus': {
            border: '0.5px solid #4A6AFE !important', backgroundColor: 'transparent'
          },
          '&:active': {
            backgroundColor: '#4A6AFE', color: '#FCFCFC !important', fontWeight: '600',
            border: '0.5px solid #4A6AFE !important'
          }
        }
      }
    }
  },
});

export const hashtagButtonTheme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: { disableRipple: true, },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '14px !important', fontWeight: '400',
          lineHeight: '150%',
          color: '#1E1E1E!important',
          border: '0.5px solid #ECECEC !important',
          borderRadius: '2px !important',
          backgroundColor: '#ECECEC !important',
          padding: '2px 4px',
          minWidth: 'unset',
          '&:hover, &:focus': {
            border: '0.5px solid #6C6C6C !important', backgroundColor: '#FCFCFC !important'
          },
          '&:active': {
            backgroundColor: '#6C6C6C !important', color: '#FCFCFC !important',
            border: '0.5px solid #6C6C6C !important',
          },
          '&:not(:last-child)': {
            marginRight: '10px'
          }
        }
      }
    }
  },
});
interface HashtagButtonProps { tag: string; }
export function HashtagButton(props: HashtagButtonProps) {
  return (
    <ThemeProvider theme={hashtagButtonTheme}>
      <Button>
        <div className='flex flex-row'>
          <span className='pe-[2px]'>#</span>
          <span>{props.tag}</span>
        </div>
      </Button>
    </ThemeProvider>

  )
}

export const commentButtonTheme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: { disableRipple: true, },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF !important',
          color: '#4A6AFE', fontSize: 14,
          borderRadius: 0,
          '&:hover': {
            backgroundColor: '#FFFFFF !important', color: '#1E1E1E'
          },
          '&:active': {
            backgroundColor: '#FFFFFF !important', color: '#6C6C6C', fontWeight: 600,
          }
        }
      }
    }
  },
});

export const replyButtonTheme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: { disableRipple: true, },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          border: '0.5px solid #C1C1C1',
          padding: '2px 4px',
          color: '#1E1E1E',
          minWidth: 'unset',
          fontWeight: 400,
          '&:hover': {
            border: '0.5px solid #4A6AFE',
            backgroundColor: 'transparent'
          },
          '&:active': {
            border: '0.5px solid #4A6AFE',
            backgroundColor: '#4A6AFE !important', color: '#FCFCFC'
          }
        }
      }
    }
  },
});