import { createTheme, styled } from "@mui/material"

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

const RadioIcn = (props: { val: boolean }) => {
  if (!props.val) {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="9" r="8.75" stroke="#C1C1C1" strokeWidth="0.5" />
      </svg>
    )
  } else {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="9" r="8.75" stroke="#C1C1C1" strokeWidth="0.5" />
        <circle cx="9" cy="9" r="5" fill="#6C6C6C" />
      </svg>
    )
  }
}
export const filterCheckTheme = createTheme({
  components: {
    MuiFormControlLabel: {
      defaultProps: { labelPlacement: 'start', },
      styleOverrides: { root: { margin: 0, padding: '4px' }, label: { fontSize: '12px !important', color: '#6C6C6C' } }
    },
    MuiCheckbox: { defaultProps: { checkedIcon: <CheckboxIcn val={true} />, icon: <CheckboxIcn val={false} />, }, },
    MuiButtonBase: { styleOverrides: { root: { padding: '0 !important' } } }
  },
});

export const filterTheme = createTheme({
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '8px 8px 0 0', margin: '72px 0 0', position: 'absolute', bottom: '0',
          maxHeight: 'calc(100vh-72px)', maxWidth: 'unset', width: '100vw'
        }
      }
    },
    MuiDialogTitle: { styleOverrides: { root: { fontWeight: '600', fontSize: '16px', lineHeight: '140%', padding: '20px 16px', } } },
    MuiDialogContent: { styleOverrides: { root: { display: 'flex', flexDirection: 'column', padding: '16px 16px 40px', gap: '16px' } } },
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiFormControlLabel: {
      defaultProps: { labelPlacement: 'end', },
      styleOverrides: { root: { margin: 0, marginRight: '8px !important', }, label: { fontSize: '14px !important' } }
    },
    MuiRadio: {
      defaultProps: { checkedIcon: <RadioIcn val={true} />, icon: <RadioIcn val={false} />, },
      styleOverrides: { root: { padding: 0, paddingRight: '4px !important' }, }
    },
  }
})

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