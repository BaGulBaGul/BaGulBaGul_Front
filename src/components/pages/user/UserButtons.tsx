"use client";
import { Dispatch, SetStateAction } from "react"
import { ToggleButtonGroup, ToggleButton, ThemeProvider, createTheme } from "@mui/material"

export function ViewToggle(props: { view: string; setView: Dispatch<SetStateAction<string>> }) {
  const handleView = (e: React.MouseEvent<HTMLElement>, newVal: string | null) => {
    if (newVal !== null) { props.setView(newVal); }
  }
  return (
    <div className='bg-p-white z-10'>
      <ThemeProvider theme={viewSwitchTheme}>
        <ToggleButtonGroup value={props.view} exclusive onChange={handleView} >
          <ToggleButton value="EVT">게시글</ToggleButton>
          <ToggleButton value="RCT">모집글</ToggleButton>
        </ToggleButtonGroup>
      </ThemeProvider>
    </div>
  )
}

const viewSwitchTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiToggleButtonGroup: { styleOverrides: { root: { backgroundColor: '#ECECEC', borderRadius: '20px', } } },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          fontSize: '14px !important', fontWeight: '400', lineHeight: '160%', color: '#6C6C6C!important',
          padding: '2px 8px', minWidth: 'unset', border: 'transparent !important', borderRadius: '20px!important',
          '&:hover, &:focus': { backgroundColor: 'transparent' },
          '&.Mui-selected, &.Mui-selected:hover': {
            backgroundColor: '#4A6AFE', color: '#FCFCFC !important', fontWeight: '600', boxShadow: '1px 0px 2px #00000033',
          }
        }
      }
    }
  },
});