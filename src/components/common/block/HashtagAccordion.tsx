"use client";
import { useState, useLayoutEffect, createRef } from 'react';
import { styled, IconButton, IconButtonProps } from '@mui/material';
import Link from 'next/link';

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

export default function HashtagAccordion(props: { tag: string[]; }) {
  const ref = createRef<HTMLDivElement>();
  const [expanded, setExpanded] = useState(false);
  const [showMore, setShowMore] = useState(false);
  useLayoutEffect(() => {
    if (ref.current && (ref.current.clientHeight > 27)) {
      setShowMore(true);
    }
  }, [ref]);
  const handleExpandClick = () => { setExpanded(!expanded); }
  if (props.tag.length > 0 && props.tag[0].length > 0) {
    return (
      <div className='pt-[10px]'>
        <div ref={ref} className='flex flex-row justify-between'>
          {showMore
            ? <>
              <div className={expanded ? "container-expand" : "container-shrink"}>
                {(props.tag).map((tag, idx) => <HashtagButton tag={tag} key={`tag-${idx}`} />)}
              </div>
              <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} >
                <HashtagArrowDown />
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
}
const HashtagArrowDown = () => (
  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.73135 8.45726L12.5922 13.3181L17.4531 8.45726C17.9416 7.96867 18.7309 7.96867 19.2195 8.45726C19.7081 8.94585 19.7081 9.73512 19.2195 10.2237L13.4692 15.974C12.9806 16.4626 12.1913 16.4626 11.7027 15.974L5.95238 10.2237C5.46379 9.73512 5.46379 8.94585 5.95238 8.45726C6.44097 7.9812 7.24276 7.96867 7.73135 8.45726Z" fill="black" />
  </svg>
)

export function HashtagButton(props: { tag: string; }) {
  return (
    <Link className='hashtag-btn' href={`/tag?tag=${props.tag}&tab_id=0`}>
      <div className='flex flex-row'>
        <span className='pe-[2px]'>#</span><span>{props.tag}</span>
      </div>
    </Link>
  )
}