"use client";
import { Dispatch, SetStateAction } from "react"
import { viewSwitchTheme } from "@/components/styles/Themes"
import { ToggleButtonGroup, ToggleButton, ThemeProvider } from "@mui/material"

export const EditButton = () => {
  return (
    <button className='text-16 text-gray3'>편집</button>
  )
}

export const ViewToggle = (props: {view: string; setView: Dispatch<SetStateAction<string>>}) => {
  const handleView = (event: React.MouseEvent<HTMLElement>, newVal: string | null) => {
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