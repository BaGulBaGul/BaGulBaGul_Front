import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface TabPanelProps { children?: React.ReactNode; index: number; value: number; classn?: string }
export function TabPanel(props: TabPanelProps) {
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

export function TabPanels(props: { value: number; child1: ReactNode; child2: ReactNode; }) {
  return (
    <div className='mt-[94px]'>
      <TabPanel value={props.value} index={0}>{props.child1}</TabPanel>
      <TabPanel value={props.value} index={1}>{props.child1}</TabPanel>
      <TabPanel value={props.value} index={2}>{props.child2}</TabPanel>
    </div>
  )
}