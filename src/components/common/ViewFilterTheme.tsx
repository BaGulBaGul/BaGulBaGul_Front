import { createTheme, styled } from "@mui/material"

export const filterChipTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiChip: {
      styleOverrides: {
        root: {
          padding: '1.5px 7.5px !important', border: '0.5px solid #C1C1C1 !important', borderRadius: '20px !important',
          fontSize: '14px !important', fontWeight: '400', lineHeight: '160%', color: '#6C6C6C !important',
          height: '25px',
          '&:not(:last-child)': { marginRight: '4px' }
        },
        label: { padding: '0 !important', height: '22px' },
        deleteIcon: { margin: '0 !important', height: '22px' }
      }
    }
  }
});

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
        checkedIcon: <CheckboxIcn val={true} />,
        icon: <CheckboxIcn val={false} />,
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
        checkedIcon: <RadioIcn val={true} />,
        icon: <RadioIcn val={false} />,
      },
      styleOverrides: { root: { padding: 0, paddingRight: '4px !important' }, }
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

export const viewTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
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