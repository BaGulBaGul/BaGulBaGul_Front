"use client";
import { FormControl, FormControlLabel, RadioGroup, Radio } from "@mui/material";
import { InputContainer } from "../input/InputWrapper";

export function FilterSortRadio(props: { value: string; handleChange: any; order?: [] }) {
  const defaultOrder = [{ 'value': 'createdAt,desc', 'label': '최신순' }, { 'value': 'views,desc', 'label': '조회수' }, { 'value': 'likeCount,desc', 'label': '좋아요수' }, { 'value': 'commentCount,desc', 'label': '댓글수' }]
  return (
    <InputContainer title="정렬">
      <FormControl>
        <RadioGroup row value={props.value} onChange={props.handleChange}>
          {!!props.order ? props.order.map((item: any) => (
            <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label} />
          )) : defaultOrder.map((item: any) => (
            <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label} />
          ))}
        </RadioGroup>
      </FormControl>
    </InputContainer>
  )
}