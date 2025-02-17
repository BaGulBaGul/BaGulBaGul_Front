"use client";
import { createTheme } from '@mui/material';

export const commentTheme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0, position: 'relative', padding: '13px 24px', fontSize: 14, lineHeight: '160%',
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
          fontSize: '14px', borderRadius: 0, fontWeight: 400, width: '70px', height: '48px',
          '&:hover': { backgroundColor: '#FFFFFF !important', color: '#1E1E1E' },
          '&:active': { backgroundColor: '#FFFFFF !important', color: '#6C6C6C', fontWeight: 600, }
        }
      }
    }
  },
});

export const menuTheme = createTheme({
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

export const dialogTheme = createTheme({
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: { margin: 0, borderRadius: '8px', maxHeight: 'unset', maxWidth: 'unset', width: '250px' }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: '20px 18px 12px', fontWeight: '600', fontSize: '18px', lineHeight: '140%',
          display: 'flex', flexDirection: 'row', justifyContent: 'center'
        }
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          fontSize: '12px', paddingTop: '4px !important', paddingBottom: '8px', textAlign: 'center',
          display: 'flex', flexDirection: 'row', justifyContent: 'center',
        }
      }
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '12px 15px',
          'button, a': {
            width: '100%', fontSize: '14px', fontWeight: '400', lineHeight: '160%', textAlign: 'center',
            padding: '4px 0px', backgroundColor: '#4A6AFE', color: '#ECECEC', borderRadius: '4px'
          },
          'button.secondary': {
            backgroundColor: '#ECECEC !important', color: '#1E1E1E !important'
          }
        }
      }
    },
  }
})