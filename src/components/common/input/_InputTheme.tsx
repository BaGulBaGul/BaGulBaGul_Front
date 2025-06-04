'use client';
import { createTheme } from "@mui/material";

export const categoryButtonTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiToggleButtonGroup: { styleOverrides: { root: { gap: '4px' } } },
    MuiToggleButton: {
      styleOverrides: {
        root: {
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
      }
    },
  },
});