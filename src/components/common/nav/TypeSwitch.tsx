import { Toggle, ToggleGroup } from '@base-ui-components/react';

export function TypeSwitch({ type, handleChange }: { type: 'EVT' | 'RCT'; handleChange: ((groupValue: any[], event: Event) => void) }) {
  let btnStyle = 'text-14 text-gray3 px-[8px] py-[2px] rounded-[20px] hover:bg-transparent focus:bg-transparent \
  data-[pressed]:bg-primary-blue data-[pressed]:text-white data-[pressed]:font-semibold data-[pressed]:shadow-[1px_0px_2px_#00000033]'
  return (
    <ToggleGroup value={[type]} onValueChange={handleChange} className='bg-gray1 rounded-[20px]' >
      <Toggle value="EVT" className={btnStyle}>게시글</Toggle>
      <Toggle value="RCT" className={btnStyle}>모집글</Toggle>
    </ToggleGroup>
  )
}