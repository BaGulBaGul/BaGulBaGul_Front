'use client';
import { createTheme, ThemeProvider, styled, Tab, Tabs, Box, Typography } from '@mui/material';

// ref. postHeader.tsx (needed non-fixed for now)
interface PostHeaderProps {
  title: string,
  count?: number,
}
export function PostHeader(props: PostHeaderProps) {
  return (
    <div className="flex-row flex w-full justify-between px-[24px] h-[60px] items-center bg-[#FFFFFF]">
      <a href="/"><img src='/arrow_prev.svg' /></a>
      <div className="flex flex-row text-lg">
        <div>{props.title}</div>
        {
          props.count 
          ? <div className="text-gray3-text ps-[8px]">{props.count}</div>
          :<></>
        }
      </div>
      <div className='w-[24px] h-[24px]'></div>
    </div>
  )
}


export const AntTabs = styled(Tabs)({
  "& .MuiTabs-indicator": { backgroundColor: "#1E1E1E" }
});

interface StyledTabProps { label: string; }
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const AntTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(2),
  fontSize: "18px", color: "#1E1E1E", lineHeight: '140%',
  padding: 0, minWidth: "min-content", minHeight: 'unset',
  paddingBottom: '3px',
  "&.Mui-selected": { color: "#1E1E1E", fontWeight: 600 }
}));

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} {...other} >
      {value === index && (
        <Box>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}