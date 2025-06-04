'use client';
import { ToggleButton, ToggleButtonGroup, ThemeProvider } from "@mui/material";
import { categoryButtonTheme } from "./_InputTheme";
import { EventType } from "..";
import { tabList, typeString } from "@/service/Functions";

interface TypeToggleProps {
  type: EventType | undefined; handleType: (e: React.MouseEvent<HTMLElement>, newType: string) => void;
}
export default function TypeToggle({ type, handleType }: TypeToggleProps) {
  return (
    <div className='pb-[10px] px-[16px]'>
      <ThemeProvider theme={categoryButtonTheme}>
        <ToggleButtonGroup value={type} exclusive onChange={(e, newType: EventType) => handleType(e, newType)}>
          {tabList.map((t, idx) =>
            <ToggleButton value={t} key={`type-${idx}`}>{typeString[t]}</ToggleButton>
          )}
        </ToggleButtonGroup>
      </ThemeProvider>
    </div>
  )
}