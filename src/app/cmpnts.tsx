'use client';
import { useState, useLayoutEffect, createRef } from 'react';
import {
  styled, Box, Button, Divider, Tab, Tabs, Typography,
  IconButton, IconButtonProps, ThemeProvider, Fab,
} from '@mui/material';
import { CategoryButtons } from '@/components/common/CategoryButton';
import { categoryButtonTheme, HashtagButton, writeFabTheme } from '@/components/common/Themes'

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

interface PostFooterProps {
  title: string,
  path: string,
}
export function PostFooter(props: PostFooterProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex-row flex w-full justify-center py-[12px] bg-primary-blue">
      <a href={props.path} className='text-sm text-white-text'>{props.title}</a>
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

// -- hashtags
interface ExpandMoreProps extends IconButtonProps { expand: boolean; }
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return (
    <div className='content-start'>
      <IconButton {...other} aria-expanded={false} />
    </div>
  );
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto', padding: '0px',
  transition: theme.transitions.create('transform', { duration: theme.transitions.duration.shortest })
}));

interface HashtagAccordionProps { tag: string[]; }
export function HashtagAccordion(props: HashtagAccordionProps) {
  const ref = createRef<HTMLDivElement>();
  const [expanded, setExpanded] = useState(false);
  const [showMore, setShowMore] = useState(false);
  useLayoutEffect(() => {
    if (ref.current && (ref.current.clientHeight > 27)) {
      setShowMore(true);
    }
  }, [ref]);
  const handleExpandClick = () => { setExpanded(!expanded); }

  return (
    <div className='pt-[10px]'>
      <div ref={ref} className='flex flex-row justify-between'>
        {
          showMore
            ? <>
              <div className={expanded ? "container-expand" : "container-shrink"}>
                {(props.tag).map((tag, idx) => <HashtagButton tag={tag} key={`tag-${idx}`} />)}
              </div>
              <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} >
                <img src='/arrow_down.svg' />
              </ExpandMore>
            </>
            : <div className='container'>
              {(props.tag).map((tag, idx) => <HashtagButton tag={tag} key={`tag-${idx}`} />)}
            </div>
        }
      </div>
    </div>
  )
}