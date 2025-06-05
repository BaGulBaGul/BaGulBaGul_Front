"use client";
import { PropsWithChildren } from "react";
import { ThemeProvider, FormControl, FormControlLabel, Checkbox, createTheme } from "@mui/material";

export function InputCheck(props: { title: string; checked: boolean; handleChange: any; }) {
  return (
    <div className="flex flex-row justify-between">
      <div className="text-14">{props.title}</div>
      <ThemeProvider theme={inputCheckTheme}>
        <FormControl>
          <FormControlLabel control={<Checkbox checked={props.checked} onChange={props.handleChange} />} label="" />
        </FormControl>
      </ThemeProvider>
    </div>
  )
}

interface InputContainerProps extends PropsWithChildren { title: string; desc?: string; btn?: React.ReactNode; p?: boolean; }
export function InputContainer({ title, desc, btn, p, children }: InputContainerProps) {
  return (
    <div className="flex flex-col">
      <div className={"flex flex-row" + (!!btn ? ' gap-[16px]' : ' gap-[8px] items-center' + (!!p ? ' px-[16px] py-[10px]' : ' pb-[10px]'))}>
        <span className="text-14 font-semibold">{title}</span>
        {!!btn ?
          <div className="flex flex-row items-center gap-[8px]">
            {btn}
            {!!desc && <span className="text-12 text-gray3">{desc}</span>}
          </div>
          : <>{!!desc && <span className="text-12 text-gray3">{desc}</span>}</>
        }
      </div>
      {children}
    </div>
  )
}

const CheckboxIcn = (props: { val: boolean }) => {
  if (!props.val) {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.575928" width="15" height="15" rx="3.5" stroke="#6C6C6C" />
      </svg>
    )
  } else {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.5 7.18182L7 11L12.5 5" stroke="#4A6AFE" />
        <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" stroke="#6C6C6C" />
      </svg>
    )
  }
}

export const inputCheckTheme = createTheme({
  components: {
    MuiFormControlLabel: {
      defaultProps: { labelPlacement: 'start', },
      styleOverrides: { root: { margin: 0, padding: '4px' }, label: { fontSize: '12px !important', color: '#6C6C6C' } }
    },
    MuiCheckbox: { defaultProps: { checkedIcon: <CheckboxIcn val={true} />, icon: <CheckboxIcn val={false} />, }, },
    MuiButtonBase: { styleOverrides: { root: { padding: '0 !important' } } }
  },
});