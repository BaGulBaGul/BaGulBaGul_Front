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
}

export function HashtagButton(props: { tag: string; }) {
  return (
    <Link className='hashtag-btn' href={`/tag?tag=${props.tag}&tab_id=0`}>
      <div className='flex flex-row'>
        <span className='pe-[2px]'>#</span><span>{props.tag}</span>
      </div>
    </Link>
  )
}