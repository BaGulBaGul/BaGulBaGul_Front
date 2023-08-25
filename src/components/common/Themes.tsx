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
          // '&:not(:last-child)': {
          //   marginRight: '10px'
          // }
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

export const writeFabTheme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: { disableRipple: true, },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          padding: '12.5px 12px !important',
          backgroundColor: '#4A6AFE !important',
          fontWeight: 600,
          fontSize: '18px',
          lineHeight: '140%',
          color: '#FCFCFC',
          height: 'auto !important',
          borderRadius: '50px !important',
          boxShadow: 'none',
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

export const likeButtonTheme1 = createTheme({
  components: {
    // MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '12px !important', fontWeight: '400', lineHeight: '160%',
          color: '#000', backgroundColor: '#EAEAEA !important',
          borderRadius: '2px!important', padding: '2px 4px', minWidth: 'unset',
          "&.Mui-disabled": { color: '#000', },
        }
      }
    }
  },
});
export const likeButtonTheme2 = createTheme({
  components: {
    // MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '12px !important', fontWeight: '400', lineHeight: '160%',
          color: '#000', backgroundColor: '#C1C1C1 !important',
          borderRadius: '2px!important', padding: '2px 4px', minWidth: 'unset',
          "&.Mui-disabled": { color: '#000', },
        }
      }
    }
  },
});

export const viewRadioTheme = createTheme({
  components: {
    MuiFormControlLabel: {
      defaultProps: {  labelPlacement: 'start', },
      styleOverrides: {
        root: { margin: 0, marginRight: '8px !important', },
        label: { fontSize: '12px !important' }
      }
    },
    MuiRadio: {
      defaultProps: {
        checkedIcon: <img src="/checkbox_1.svg" width={16} height={16} />,
        icon: <img src="/checkbox.svg" width={16} height={16} />,
      }
    },
    MuiButtonBase: {
      styleOverrides: {
        root: { padding: '0 !important', paddingLeft: '4px !important' }
      }
    }
  },
});

export const viewCheckTheme = createTheme({
  components: {
    MuiFormControlLabel: {
      defaultProps: {  labelPlacement: 'start', },
      styleOverrides: {
        root: { margin: 0, marginRight: '8px !important', },
        label: { fontSize: '12px !important' }
      }
    },
    MuiCheckbox: {
      defaultProps: {
        checkedIcon: <img src="/checkbox_1.svg" width={16} height={16} />,
        icon: <img src="/checkbox.svg" width={16} height={16} />,
      }
    },
    MuiButtonBase: {
      styleOverrides: {
        root: { padding: '0 !important', paddingLeft: '4px !important' }
      }
    }
  },
});

export const shareDialogTheme = createTheme({
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          margin: 0, borderRadius: '8px',
          maxHeight: 'unset', maxWidth: 'unset', height: '180px', width: '250px'
        }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: '22px 18px 31.5px', 
          fontWeight: '600', fontSize: '18px', lineHeight: '140%',
        }
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          fontSize: '12px'
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: { padding: 0, }
      }
    }
  }
})

export const selectTheme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { 
          marginTop: '5px !important', 
          border: '0.5px solid #C1C1C1', borderRadius: '2px !important', 
        }
      }
    },
    MuiButtonBase: {
      defaultProps: { disableRipple: true, },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          width: '70px', padding: '3px 8px', cursor: 'pointer',
          fontSize: '14px !important', fontWeight: '400', lineHeight: '160%',
          color: '#6C6C6C!important', borderRadius: '2px!important',
          '&:before, &:after': { border: 'none !important' },
          '&:hover, &:focus, &:active': {
            backgroundColor: '#ECECEC', color: '#1E1E1E !important'
          },
        },
        input: {
          padding: '0 !important',
          '&:focus': { backgroundColor: 'transparent' }
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '14px !important', padding: '3px 8px', minHeight: 'unset',
          '&.Mui-selected, &.Mui-selected:hover': { backgroundColor: '#ECECEC' },
          '&+&': {borderTop: '0.5px solid #C1C1C1 !important'}
        }
      }
    },
    MuiList: {
      styleOverrides: {
        root: { padding: '0 !important', }
      }
    },
    MuiTabs: {
      styleOverrides: {
        root: { },
        flexContainer: { justifyContent: 'space-between !important' }
      }
    }
  },
});