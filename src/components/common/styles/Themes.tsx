"use client";
import { createTheme } from '@mui/material';

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

const buttonStyle = {
  fontSize: '14px !important', fontWeight: '400', lineHeight: '160%', color: '#1E1E1E!important',
  padding: '2px 8px', minWidth: 'unset', border: '0.5px solid #ECECEC !important',
  borderRadius: '20px!important', backgroundColor: '#ECECEC !important',
  '&:hover, &:focus': { border: '0.5px solid #4A6AFE !important', backgroundColor: '#ECECEC' },
  "&:active": {
    border: '0.5px solid #4A6AFE !important', backgroundColor: '#4A6AFE', color: '#FCFCFC', fontWeight: '600',
  },
  '&.Mui-selected, &.Mui-selected:hover': {
    backgroundColor: '#4A6AFE !important', color: '#FCFCFC !important', fontWeight: '600', border: '0.5px solid #4A6AFE !important'
  }
}
export const inputToggleTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiToggleButtonGroup: { styleOverrides: { root: { gap: '4px' } } },
    MuiToggleButton: { styleOverrides: { root: buttonStyle } },
    MuiButton: { styleOverrides: { root: buttonStyle } },
  },
});