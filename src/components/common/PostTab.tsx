import { ThemeProvider, Tabs, Tab } from '@mui/material';
import { tabTheme } from './Themes';

export default function PostTab(props: { value: number; handleChange: any; }) {
  return (
    <ThemeProvider theme={tabTheme}>
      <Tabs value={props.value} onChange={props.handleChange} className='items-center min-h-0'>
        <Tab label="페스티벌" />
        <Tab label="지역행사" />
        <Tab label="파티" />
      </Tabs>
    </ThemeProvider>
  );
}