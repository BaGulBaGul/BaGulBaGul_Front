import { createTheme } from '@mui/material';
import { styled } from '@mui/system';

export const filterChipTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiChip: {
      styleOverrides: {
        root: {
          padding: '2px 8px !important', border: '0.5px solid #C1C1C1 !important', borderRadius: '20px !important',
          fontSize: '14px !important', fontWeight: '400', lineHeight: '160%', color: '#6C6C6C !important',
          height: '26px',
          '&:not(:last-child)': { marginRight: '4px' }
        },
        label: { padding: '0 !important' },
        deleteIcon: { margin: '0 !important', height: '22px' }
      }
    }
  }
});

export const suggestChipTheme = createTheme({
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          padding: '2px 8px !important', border: '1px solid #C1C1C1 !important', borderRadius: '14px !important',
          fontSize: '14px !important', fontWeight: '400', lineHeight: '160%', color: '#1E1E1E !important'
        },
        label: { padding: '0 !important' },
      }
    }
  }
});

export const categoryButtonTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiToggleButtonGroup: { styleOverrides: { root: { gap: '4px' } } },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          fontSize: '14px !important', fontWeight: '400', lineHeight: '160%',
          color: '#1E1E1E!important', padding: '2px 8px', minWidth: 'unset',
          border: '0.5px solid #ECECEC !important', borderRadius: '20px!important',
          backgroundColor: '#ECECEC !important',
          '&:hover, &:focus': {
            border: '0.5px solid #4A6AFE !important', backgroundColor: '#ECECEC'
          },
          "&:active": {
            border: '0.5px solid #4A6AFE !important', backgroundColor: '#4A6AFE',
            color: '#FCFCFC', fontWeight: '600',
          },
          '&.Mui-selected, &.Mui-selected:hover': {
            backgroundColor: '#4A6AFE !important', color: '#FCFCFC !important', fontWeight: '600',
            border: '0.5px solid #4A6AFE !important'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '14px !important', fontWeight: '400', lineHeight: '160%',
          color: '#1E1E1E!important', padding: '2px 8px', minWidth: 'unset',
          border: '0.5px solid #ECECEC !important', borderRadius: '20px!important',
          backgroundColor: '#ECECEC !important',
          '&:hover, &:focus': {
            border: '0.5px solid #4A6AFE !important', backgroundColor: '#ECECEC'
          },
          "&:active": {
            border: '0.5px solid #4A6AFE !important', backgroundColor: '#4A6AFE',
            color: '#FCFCFC', fontWeight: '600',
          },
          '&.Mui-selected, &.Mui-selected:hover': {
            backgroundColor: '#4A6AFE !important', color: '#FCFCFC !important', fontWeight: '600',
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
          lineHeight: '160%',
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
          '&:hover': { backgroundColor: '#FFFFFF !important', color: '#1E1E1E' },
          '&:active': { backgroundColor: '#FFFFFF !important', color: '#6C6C6C', fontWeight: 600, }
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
          '&:hover': { border: '0.5px solid #4A6AFE', backgroundColor: 'transparent' },
          '&:active': {
            border: '0.5px solid #4A6AFE', backgroundColor: '#4A6AFE !important', color: '#FCFCFC !important'
          }
        }
      }
    }
  },
});

export const mentionDialogTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiPaper: {
      styleOverrides: { root: { borderRadius: '8px', width: '250px', } }
    },
    MuiDialogContent: {
      styleOverrides: { root: { paddingTop: '20px', paddingBottom: '8px' } }
    },
    MuiDialogContentText: {
      styleOverrides: { root: { fontSize: '14px', lineHeight: '160%', textAlign: 'center', } }
    },
    MuiDialogActions: {
      styleOverrides: { root: { justifyContent: 'center', padding: '12px' } }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          width: '108px', fontSize: '14px', lineHeight: '160%', fontWeight: '400',
          borderRadius: '4px', padding: '4px',
          '&:hover, &:active': { backgroundColor: '#4A6AFE', color: '#FCFCFC' },
          '&.btn-mention-keep': { backgroundColor: '#ECECEC', color: '#1E1E1E' },
          '&.btn-mention-delete': { backgroundColor: '#4A6AFE', color: '#FCFCFC' },
        }
      }
    }
  }
})

export const commentMenuTheme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderTopLeftRadius: '8px !important', borderTopRightRadius: '8px !important',
          paddingBottom: '40px !important',
        },
      }
    },
    MuiList: { styleOverrides: { root: { padding: '0px' } } },
    MuiListItemButton: { styleOverrides: { root: { padding: '20px 16px' } } },
    MuiListItemText: {
      styleOverrides: {
        root: { margin: '0px' },
        primary: { fontSize: '14px', },
      }
    },
  },
});

export const modifyCommentTheme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFF', boxShadow: 'unset',
          color: '#1E1E1E', fontSize: '18px', lineHeight: '160%',
          position: 'relative', padding: '0px !important'
        }
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          display: 'flex', justifyContent: 'space-between', flexDirection: 'row', padding: '18px 24px'
        }
      }
    },
    MuiIconButton: { styleOverrides: { root: { padding: '0px' } } },
    MuiButton: {
      styleOverrides: {
        root: {
          position: 'fixed', bottom: '0px', left: '0px', right: '0px',
          display: 'flex', flexDirection: 'row', width: '100%', borderRadius: '0px',
          justifyContent: 'center', paddingTop: '20px', paddingBottom: '35px',
          backgroundColor: '#4A6AFE !important', color: '#FCFCFC',
          fontSize: '16px', lineHeight: '140%', zIndex: '400'
        }
      }
    },
    MuiTextField: { styleOverrides: { root: { height: '100%' } } },
    MuiInputBase: {
      styleOverrides: {
        root: { padding: '12px 16px !important', },
        input: {
          height: 'calc(100vh - 161px) !important', fontSize: '14px', lineHeight: '160%', color: '#6C6C6C',
        }
      }
    },
    MuiOutlinedInput: { styleOverrides: { root: { border: 'none', "& fieldset": { border: 'none' }, } } }
  }
})

export const noEventButtonTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiButton: {
      styleOverrides: {
        root: {
          border: '1px solid #4A6AFE', padding: '4px 8px', minWidth: 'unset',
          color: '#4A6AFE', fontSize: '14px', fontWeight: 400, lineHeight: '140%',
          '&:hover': { border: '1px solid #4A6AFE', backgroundColor: 'transparent' },
          '&:active': {
            border: '1px solid #4A6AFE', backgroundColor: '#4A6AFE !important', color: '#FCFCFC'
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
          '&:hover': { border: '0.5px solid #4A6AFE', backgroundColor: 'transparent' },
          '&:active': {
            border: '0.5px solid #4A6AFE', backgroundColor: '#4A6AFE !important', color: '#FCFCFC'
          }
        }
      }
    },
  },
});

export const scrollFabTheme = createTheme({
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

export const deleteButtonTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '12px !important', fontWeight: '400', lineHeight: '160%',
          color: '#6C6C6C', minWidth: 'unset', padding: 0,
        }
      }
    }
  }
})

export const viewCheckTheme = createTheme({
  components: {
    MuiFormControlLabel: {
      defaultProps: { labelPlacement: 'start', },
      styleOverrides: {
        root: { margin: 0, padding: '4px' },
        label: { fontSize: '12px !important', color: '#6C6C6C' }
      }
    },
    MuiCheckbox: {
      defaultProps: {
        checkedIcon: <img src="/checkbox_1.svg" width={16} height={16} />,
        icon: <img src="/checkbox.svg" width={16} height={16} />,
      },
    },
    MuiButtonBase: { styleOverrides: { root: { padding: '0 !important' } } }
  },
});

export const viewRadioTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiFormControlLabel: {
      defaultProps: { labelPlacement: 'end', },
      styleOverrides: {
        root: { margin: 0, marginRight: '8px !important', },
        label: { fontSize: '14px !important' }
      }
    },
    MuiRadio: {
      defaultProps: {
        checkedIcon: <img src="/radio_1.svg" width={18} height={18} />,
        icon: <img src="/radio_0.svg" width={18} height={18} />,
      },
      styleOverrides: { root: { padding: 0, paddingRight: '4px !important' }, }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // border: '1px solid #4A6AFE !important',
          border: '1px solid #C1C1C1 !important', borderRadius: '8px!important',
          padding: '4px 8px', color: 'unset !important', fontWeight: '400 !important'
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        input: {
          padding: '0 !important', width: 'unset !important',
          maxWidth: '84px !important', minWidth: '19px !important',
          fontSize: '14px !important', textAlign: 'right',
        },
        root: {
          '&:before, &:after': { border: 'none !important' },
        }
      }
    }
  }
})

export const viewSwitchTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiToggleButtonGroup: { styleOverrides: { root: { backgroundColor: '#ECECEC', borderRadius: '20px', } } },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          fontSize: '14px !important', fontWeight: '400', lineHeight: '160%',
          color: '#6C6C6C!important', padding: '2px 8px', minWidth: 'unset',
          border: 'transparent !important', borderRadius: '20px!important',
          '&:hover, &:focus': { backgroundColor: 'transparent' },
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
          padding: '22px 18px 31.5px', fontWeight: '600', fontSize: '18px', lineHeight: '140%',
        }
      }
    },
    MuiDialogContent: { styleOverrides: { root: { fontSize: '12px' } } },
    MuiIconButton: { styleOverrides: { root: { padding: 0, } } }
  }
})

export const tabTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiTabs: {
      styleOverrides: {
        root: { "& .MuiTabs-indicator": { height: '1px', backgroundColor: "#1E1E1E" } }
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
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: { padding: '10px 16px', gap: '16px', borderRadius: '0px !important' }
      }
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          border: 'none !important', fontSize: '18px', lineHeight: '140%',
          padding: '0px', paddingBottom: '3px', fontWeight: 400, color: '#1E1E1E',
          "&.Mui-selected": {
            fontWeight: 600, backgroundColor: 'transparent !important',
            borderBottom: '1px solid #1E1E1E !important', borderRadius: '0px !important',
            paddingBottom: '2px !important',
          },
          "&:hover": { backgroundColor: 'transparent !important' }
        }
      }
    }
  },
});

export const viewTheme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 0, borderTopLeftRadius: '8px', borderTopRightRadius: '8px', }
      }
    },
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiButton: {
      styleOverrides: {
        root: {
          cursor: 'pointer', padding: 0, minWidth: 'unset',
          /*fontSize: '18px !important',*/ fontWeight: '400', lineHeight: '140%',
          color: '#6C6C6C!important', borderRadius: '2px!important',
          '&:before, &:after': { border: 'none !important' },
          // '&:hover, &:focus, &:active': { backgroundColor: '#ECECEC', color: '#1E1E1E !important' },
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
    MuiList: { styleOverrides: { root: { padding: '0 !important', } } },
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
          color: '#1E1E1E!important', backgroundColor: '#FFF27E',
          borderRadius: '2px!important', padding: '2px 4px',
        },
        label: { padding: 0 }
      }
    }
  },
});

export const searchInputTheme = createTheme({
  components: {
    MuiTextField: { styleOverrides: { root: { width: '100%' } } },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { fontSize: '14px', lineHeight: '160%', height: '22px', },
        input: { padding: '0 !important', },
        notchedOutline: { border: 0, }
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

export const signInTheme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundColor: '#FFF', boxShadow: 'unset', }
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          display: 'flex', justifyContent: 'end', flexDirection: 'row', padding: '10px 16px'
        }
      }
    },
    MuiButton: {
      defaultProps: { disableRipple: true, },
      styleOverrides: {
        root: {
          fontSize: '15px', fontWeight: '500', color: '#000000', height: '45px',
          backgroundColor: '#FEE500 !important', borderRadius: '12px',
        }
      }
    },
  }
})

export const joinTheme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: '14px', color: '#6C6C6C',
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#C1C1C1 !important', },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: '1px solid #6C6C6C !important', },
        },
        input: { padding: '11px 14px', lineHeight: '160%', '&::placeholder': { color: '#C1C1C1', } },
      },
    },
  }
})

export const FooterBtnTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: { disableRipple: true, },
      styleOverrides: {
        root: {
          position: 'fixed', bottom: '0px', left: '0px', right: '0px',
          display: 'flex', flexDirection: 'row', width: '100%', borderRadius: '0px',
          justifyContent: 'center', paddingTop: '20px', paddingBottom: '35px',
          backgroundColor: '#4A6AFE !important', color: '#FCFCFC',
          fontSize: '16px', lineHeight: '140%', zIndex: '400', fontWeight: '400',
        }
      }
    },
  }
})


export const HeadInputRoot = styled('div')(
  ({ theme }) => `
  font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  font-weight: 400; color: #1E1E1E; display: grid; width: 84px;
  // firefox
  &:focus-visible { outline: 0; }
`,
);

export const HeadInputElement = styled('input')(
  ({ theme }) => `
  font-size: 14px; font-family: inherit; font-weight: 400;
  text-align: right; line-height: 160%; color: #1E1E1E;
  border: none; outline: 0; width: 84px;
`,
);

export const HeadButton = styled('button')(
  ({ theme }) => `
  display: 'hide'; -webkit-appearance: none; 
  margin: 0;  pointer-events: none;
`,
);

export const PartiInputRoot = styled('div')(
  ({ theme }) => `
  font-weight: 400; color: #1E1E1E;
  display: flex; flex-flow: row nowrap;
  justify-content: center; align-items: center; margin: 0px 10px;
`,
);

export const PartiInputElement = styled('input')(
  ({ theme }) => `
  font-size: 14px; font-weight: 400; line-height: 160%;
  color: #1E1E1E; outline: 0;
  min-width: 0; width: 4rem; text-align: center;

  &:focus-visible { outline: 0; }
`,
);

export const PartiButton = styled('button')(
  ({ theme }) => `
  width: 24px; height: 24px; display: flex;
  flex-flow: row nowrap; justify-content: center; align-items: center;

  &:hover { cursor: pointer; }
  &:focus-visible { outline: 0; }
  &.increment { order: 1; }
`,
);