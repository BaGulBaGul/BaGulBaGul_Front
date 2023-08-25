'use client';
import { Box, Typography } from '@mui/material';

interface TabPanelProps { children?: React.ReactNode; index: number; value: number; classn?: string }
export default function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} className={props.classn} {...other} >
      {value === index && (
        <Box>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}