'use client';
import { ToggleButton, ToggleButtonGroup, ThemeProvider } from "@mui/material";
import { inputToggleTheme } from "@/components/common/styles/Themes";
import { EventType } from "../../common";
import { tabList, typeString } from "@/service/Functions";

interface TypeToggleProps {
  type: EventType | undefined; handleType: (e: React.MouseEvent<HTMLElement>, newType: string) => void;
}
export function TypeToggle({ type, handleType }: TypeToggleProps) {
  return (
    <div className='pb-[10px] px-[16px]'>
      <ThemeProvider theme={inputToggleTheme}>
        <ToggleButtonGroup value={type} exclusive onChange={(e, newType: EventType) => handleType(e, newType)}>
          {tabList.map((t, idx) =>
            <ToggleButton value={t} key={`type-${idx}`}>{typeString[t]}</ToggleButton>
          )}
        </ToggleButtonGroup>
      </ThemeProvider>
    </div>
  )
}