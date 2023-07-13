'use client';

import { useState, useLayoutEffect, createRef } from 'react';
import Image from 'next/image'
import { postData, categories } from '../components/common/Data'
import Slider from "react-slick";
import {
  styled, Tabs, Tab, Box, Typography, Button,
  ToggleButtonGroup, ToggleButton, Divider, IconButton, IconButtonProps
} from '@mui/material';

// - carousel
interface PostProps {
  posterSrc: string; name: string; date: string;
  content?: string; tags?: string[];
}
function RecPost(props: PostProps) {
  return (
    <div className="flex flex-col w-[188px] lg:w-[480px] px-[9px]">
      <div>
        <Image className='rounded-lg h-[210px] lg:w-[480px]' width={170} height={210}
          src={props.posterSrc} alt='rec poster' style={{ objectFit: "cover" }} />
      </div>
      <div className='flex flex-col pt-[12px] pb-[13px]'>
        <p className='truncate text-base text-center'>{props.name}</p>
        <p className='text-sm text-center'>{props.date}</p>
      </div>
    </div>
  )
}

interface ArrowProps {
  className?: any;
  style?: any;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
function ArrowPrev({ className, style, onClick }: ArrowProps) {
  return (<div className={className} onClick={onClick} />)
}
function ArrowNext({ className, style, onClick }: ArrowProps) {
  return (<div className={className} onClick={onClick} />)
}

function RecSlide() {
  const settings = {
    className: "center",
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    nextArrow: <ArrowNext />,
    prevArrow: <ArrowPrev />
  }
  return (
    <div className='pb-[50px] h-auto'>
      <Slider {...settings}>
        {postData.map((post, idx) => <RecPost posterSrc={post.posterSrc} name={post.name} date={post.date} key={`rec-${idx}`} />)}
      </Slider>
    </div>
  )
}

export function RecCarousel() {
  return (
    <div className='flex flex-col bg-secondary-yellow w-full lg:px-[360px] lg:bg-gradient-to-b lg:from-grad-yellow lg:to-grad-blue'>
      <div className='flex flex-col pt-[22px] pb-[20px] px-[24px]'>
        <p className='text-2xl font-semibold'>SUMMER</p>
        <p className='text-2xl'>페스티벌 추천</p>
      </div>
      <RecSlide />
    </div>
  )
}

// - tabs
const AntTabs = styled(Tabs)({
  "& .MuiTabs-indicator": { backgroundColor: "#1E1E1E" }
});

const AntTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(2),
  fontSize: "1.125rem", color: "1E1E1E",
  padding: 0, minWidth: "min-content",
  "&.Mui-selected": { color: "#1E1E1E", fontWeight: 600 }
}));

interface StyledTabProps { label: string; }
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`} {...other} >
      {value === index && (
        <Box>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export function PostTab() {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box className='w-full px-0 pt-[10px]'>
      <Box>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example" className='px-[16px]'>
          <AntTab label="페스티벌" />
          <AntTab label="지역행사" />
          <AntTab label="파티" />
        </AntTabs>
      </Box>
      <TabPanel value={value} index={0}>
        <CategoryButtons />
        {postData.map((post, idx) =>
          <PostBlock posterSrc={post.posterSrc} name={post.name} date={post.date} content={post.content} tags={post.tags} key={`rec-${idx}`} />
        )}

      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  )
}

// - tab item 1 : category buttons
function CategoryButtons() {
  const [selectedCate, setSelectedCate] = useState<string[]>([]);
  const handleCate = (event: React.MouseEvent<HTMLElement>, newCate: string[]) => {
    setSelectedCate(newCate);
  }

  const SToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': { border: '0px' },
    '& .MuiToggleButton-standard': {
      fontSize: '14px', color: '#1E1E1E',
      border: '0.5px solid #C1C1C1 !important',
      borderRadius: '20px !important',
      padding: '2px 8px',
      "&:hover, &:focus": {
        border: '0.5px solid #4A6AFE !important', backgroundColor: 'transparent'
      },
      "&.Mui-selected, &.Mui-selected:hover": {
        backgroundColor: '#4A6AFE', color: '#FCFCFC !important', fontWeight: '600',
        border: '0.5px solid #4A6AFE !important'

      },
      "&:not(:last-child)": { marginRight: '10px' }
    }
  }));

  return (
    <div className='overflow-hidden	h-[46px]'>
      <div className='h-[76px] py-[10px] px-[16px] overflow-x-scroll overflow-y-hide whitespace-nowrap cateBtns'>
        <SToggleButtonGroup value={selectedCate} onChange={handleCate}>
          {categories.map((cate, idx) =>
            <ToggleButton value={cate} className='cateInfo' key={`cate-${cate}`}>{cate}</ToggleButton>
          )}
        </SToggleButtonGroup>
      </div>
    </div>
  )
}

// - tab item 2 : PostList
function PostBlock(props: PostProps) {
  return (
    <div>
      <Divider />
      <div className='flex flex-col py-[18px] px-[16px]'>
        <div className='flex flex-row justify-between  h-[140px]'>
          <div className='flex flex-col justify-between w-[230px]'>
            <div className='flex flex-col'>
              <div className='flex flex-row pb-[10px]'>
                <Image className='me-[8px]' src="/main_profile.svg" alt="마이페이지 아이콘" width={24} height={24} />
                <Button disabled className='cateInfo'>공연전시/행사</Button>
              </div>
              <p className='text-sm text-gray3-text'>{props.date}</p>
              <p className='truncate text-base font-semibold'>{props.name}</p>
            </div>
            <p className='text-xs text-gray3-text max-h-8 block text-ellipsis break-words overflow-hidden'>{props.content}</p>
          </div>
          <Image className='rounded-lg' width={110} height={136}
            src={props.posterSrc} alt='rec poster' style={{ objectFit: "cover" }} />
        </div>
        {
          props.tags ? <HashtagAccordion tag={props.tags} /> : <></>
        }
      </div>
    </div>
  )
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
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  })
}));

interface HashtagAccordionProps { tag: string[]; }
function HashtagAccordion(props: HashtagAccordionProps) {
  const ref = createRef<HTMLDivElement>();
  const [expanded, setExpanded] = useState(false);
  const [showMore, setShowMore] = useState(false);
  useLayoutEffect(() => {
    if (ref.current && (ref.current.clientHeight > 25)) {
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
                {
                  (props.tag).map((tag, idx) => <HashtagButton tag={tag} key={`tag-${idx}`} />)
                }
              </div>
              <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more" >
                <img src='/arrow_down.svg' />
              </ExpandMore>
            </>
            : <div className='container'>
              {
                (props.tag).map((tag, idx) => <HashtagButton tag={tag} key={`tag-${idx}`} />)
              }
            </div>
        }
      </div>
    </div>
  )
}

interface HashtagButtonProps { tag: string; }
function HashtagButton(props: HashtagButtonProps) {
  return (
    <Button className='tagBtn'>
      <div className='flex flex-row'>
        <span className='pe-[2px]'>#</span>
        <span>{props.tag}</span>
      </div>
    </Button>
  )
}