import { createTheme, FormControl, FormControlLabel, FormControlLabelProps, Radio, RadioGroup, styled, TextField, ThemeProvider, useRadioGroup } from "@mui/material";
import { RefObject, useState } from "react";
import { Divider } from "..";

export function ReportRadios(props: { value?: string; setValue: any; etcRef: RefObject<HTMLInputElement> }) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => { props.setValue((event.target as HTMLInputElement).value); };
  // 입력창 선택 시 '기타' 로 자동 설정
  const handleTextFocus = () => { if (props.value !== 'etc') { props.setValue('etc') } }
  const handleTextChange = () => { setCnt(props.etcRef.current?.value.length ?? 0) }

  let [cnt, setCnt] = useState(0)
  return (
    <ThemeProvider theme={reportRadioTheme}>
      <FormControl>
        <RadioGroup value={props.value} onChange={handleChange} >
          <FormControlLabelColored value="offtopic" control={<Radio />} label="바글바글과 관련 없는 홍보 내용" />
          <Divider />
          <FormControlLabelColored value="gross" control={<Radio />} label="욕설 및 음란성, 사행성 내용 등 불쾌감을 주는 후기" />
          <Divider />
          <FormControlLabelColored value="insult" control={<Radio />} label="비방, 비하, 차별성 발언, 모욕 등 명예훼손성 후기" />
          <Divider />
          <div className="flex flex-col p-[16px] gap-[8px]">
            <FormControlLabelColored value="etc" control={<Radio />} label="기타" className="p-0" />
            <TextField placeholder='상세한 설명이 추가로 필요한 경우에만 작성해주세요.' fullWidth multiline inputRef={props.etcRef} maxRows={6} minRows={6}
              inputProps={{ maxLength: 20 }} onFocus={handleTextFocus} onChange={handleTextChange} />
            <div className="flex flex-row justify-end text-14">
              <p className={cnt >= 20 ? 'text-danger-red' : 'text-gray3'}>{cnt}</p>
              <p className="text-gray2">/20자</p>
            </div>
          </div>
        </RadioGroup>
      </FormControl>
    </ThemeProvider>
  )
}

// 선택된 label 색상 변경
const StyledFormControlLabel = styled((props: FormControlLabelProps) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  ".MuiFormControlLabel-label": checked && { color: "#4A6AFE", fontWeight: 600 }
}));
function FormControlLabelColored(props: FormControlLabelProps) {
  const radioGroup = useRadioGroup();
  let checked = false;
  if (radioGroup) { checked = radioGroup.value === props.value; }
  return <StyledFormControlLabel checked={checked} {...props} />;
}

const reportRadioTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiFormControl: { styleOverrides: { root: { backgroundColor: '#FFF !important' } } },
    MuiFormControlLabel: {
      styleOverrides: {
        root: { margin: '0px !important', padding: '16px' },
        label: { fontSize: '14px !important' }
      }
    },
    MuiRadio: { styleOverrides: { root: { display: 'none !important' }, } },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '14px !important', lineHeight: '160% !important', padding: '8px 16px !important',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused, &.Mui-focused:hover": { "& .MuiOutlinedInput-notchedOutline": { border: '1px solid #4A6AFE' } },
          "&:hover": { "& .MuiOutlinedInput-notchedOutline": { borderColor: '#C1C1C1' }, }
        },
        notchedOutline: { borderRadius: '8px', }
      }
    }
  }
})