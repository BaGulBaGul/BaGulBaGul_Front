import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const categoryButtonTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '14px !important', fontWeight: '400', lineHeight: '150%',
          color: '#1E1E1E!important', padding: '2px 8px', minWidth: 'unset',
          border: '0.5px solid #C1C1C1 !important', borderRadius: '20px!important',
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
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '14px !important', fontWeight: '400', lineHeight: '150%',
          color: '#1E1E1E!important', backgroundColor: '#ECECEC !important',
          border: '0.5px solid #ECECEC !important', borderRadius: '2px !important',
          padding: '2px 4px', minWidth: 'unset',
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
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF !important', color: '#4A6AFE',
          fontSize: '14px', borderRadius: 0,
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

export const commentTheme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0, position: 'relative', padding: '13px 24px', fontSize: 14,
          '&::placeholder': { color: '#C1C1C1' }
        },
        notchedOutline: { border: '0' }
      }
    },
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF !important', color: '#4A6AFE',
          fontSize: '14px', borderRadius: 0, fontWeight: 400,
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
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiButton: {
      styleOverrides: {
        root: {
          border: '0.5px solid #C1C1C1', padding: '2px 4px',
          color: '#1E1E1E', minWidth: 'unset', fontWeight: 400,
          '&:hover': {
            border: '0.5px solid #4A6AFE', backgroundColor: 'transparent'
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
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiFab: {
      styleOverrides: {
        root: {
          padding: '12.5px 12px !important', height: 'auto !important',
          backgroundColor: '#4A6AFE !important', color: '#FCFCFC',
          fontWeight: 600, fontSize: '18px', lineHeight: '140%',
          borderRadius: '50px !important', boxShadow: 'none',
          '&:hover': {
            border: '0.5px solid #4A6AFE', backgroundColor: 'transparent'
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

// export const viewCheckTheme = createTheme({
//   components: {
//     MuiFormControlLabel: {
//       defaultProps: { labelPlacement: 'start', },
//       styleOverrides: {
//         root: { margin: 0, marginRight: '8px !important', },
//         label: { fontSize: '12px !important', color: '#6C6C6C' }
//       }
//     },
//     MuiCheckbox: {
//       defaultProps: {
//         checkedIcon: <img src="/checkbox_1.svg" width={16} height={16} />,
//         icon: <img src="/checkbox.svg" width={16} height={16} />,
//       }
//     },
//     MuiButtonBase: {
//       styleOverrides: {
//         root: { padding: '0 !important', paddingLeft: '4px !important' }
//       }
//     }
//   },
// });

export const viewToggleTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: { gap: '4px' }
      }
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          fontSize: '14px !important', fontWeight: '400', lineHeight: '150%',
          color: '#1E1E1E!important', padding: '2px 8px', minWidth: 'unset',
          border: '0.5px solid #C1C1C1 !important', borderRadius: '20px!important',
          '&:hover, &:focus': {
            border: '0.5px solid #4A6AFE !important', backgroundColor: 'transparent'
          },
          '&.Mui-selected': {
            backgroundColor: '#4A6AFE', color: '#FCFCFC !important', fontWeight: '600',
            border: '0.5px solid #4A6AFE !important'
          }
        }
      }
    }
  },
});

export const viewSwitchTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: { backgroundColor: '#ECECEC', borderRadius: '20px', }
      }
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          fontSize: '14px !important', fontWeight: '400', lineHeight: '160%',
          color: '#6C6C6C!important', padding: '2px 8px', minWidth: 'unset',
          border: 'transparent !important', borderRadius: '20px!important',
          '&:hover, &:focus': {
            backgroundColor: 'transparent'
          },
          '&.Mui-selected, &.Mui-selected:hover': {
            backgroundColor: '#4A6AFE', color: '#FCFCFC !important', fontWeight: '600',
            boxShadow: '1px 0px 2px #00000033',
          }
        }
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
        root: { fontSize: '12px' }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: { padding: 0, }
      }
    }
  }
})

export const tabTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiTabs: {
      styleOverrides: {
        root: { "& .MuiTabs-indicator": { backgroundColor: "#1E1E1E" } }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 400, fontSize: "18px",
          color: "#1E1E1E", lineHeight: '140%',
          padding: 0, paddingBottom: '3px', marginRight: '16px',
          minWidth: "min-content", minHeight: 'unset',
          "&.Mui-selected": { color: "#1E1E1E", fontWeight: 600 }
        }
      }
    },
  },
});

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
          '&+&': { borderTop: '0.5px solid #C1C1C1 !important' }
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
        root: {},
        flexContainer: { justifyContent: 'space-between !important' }
      }
    }
  },
});

export const viewTheme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0, borderTopLeftRadius: '8px', borderTopRightRadius: '8px',
        }
      }
    },
    MuiButtonBase: {
      defaultProps: { disableRipple: true, },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          width: '70px', padding: '3px 8px', cursor: 'pointer',
          fontSize: '14px !important', fontWeight: '400', lineHeight: '160%',
          color: '#6C6C6C!important', borderRadius: '2px!important',
          '&:before, &:after': { border: 'none !important' },
          '&:hover, &:focus, &:active': { backgroundColor: '#ECECEC', color: '#1E1E1E !important' },
        },
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '14px !important', padding: '10px 16px', minHeight: 'unset',
          '&.Mui-selected:hover': { backgroundColor: '#ECECEC' },
          '&.Mui-selected': { backgroundColor: '#FFF27E' }
        }
      }
    },
    MuiList: {
      styleOverrides: {
        root: { padding: '0 !important', }
      }
    },
  },
});

export const accompanyChipTheme = createTheme({
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: '12px !important', height: 'unset', lineHeight: '160%',
          color: '#FCFCFC!important', backgroundColor: '#4A6AFE',
          borderRadius: '2px!important', padding: '2px 4px',
        },
        label: { padding: 0 }
      }
    }
  },
});

export const slideChipTheme = createTheme({
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          position: 'absolute', top: '18px', right: '16px', zIndex: 10,
          fontSize: '14px !important', height: 'unset', lineHeight: '160%',
          color: '#1E1E1E!important', backgroundColor: '#ecececcc',
          borderRadius: '20px!important', padding: '2px 8px',
        },
        label: { padding: 0 }
      }
    }
  },
});

export const doneChipTheme = createTheme({
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: '12px !important', height: 'unset', lineHeight: '160%',
          color: '#6C6C6C!important',
          backgroundColor: '#FFF27E',
          borderRadius: '2px!important', padding: '2px 4px',
        },
        label: { padding: 0 }
      }
    }
  },
});

export const searchInputTheme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: '14px', lineHeight: '160%', height: '22px',
        },
        input: {
          padding: '0 !important', width: '286px',
        },
        notchedOutline: {
          border: 0,
        }
      }
    }
  }
})

export const searchFreqTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '12px !important', color: '#1E1E1E', fontWeight: '400', lineHeight: '150%',
          border: '1px solid #C1C1C1 !important', borderRadius: '14px !important',
          padding: '1px 7px', minWidth: 'unset', height: '22px',
          "&:hover, &:focus": {
            border: '1px solid #4A6AFE !important', backgroundColor: 'transparent'
          },
          "&.Mui-selected, &.Mui-selected:hover": {
            backgroundColor: '#4A6AFE', color: '#FCFCFC !important', fontWeight: '600',
            border: '1px solid #4A6AFE !important'
          },
          "&:not(:last-child)": { marginRight: '6px' }
        }
      }
    }
  }
})