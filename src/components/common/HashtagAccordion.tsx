import { useState, useLayoutEffect, createRef } from 'react';
import { styled, IconButton, IconButtonProps } from '@mui/material';
import { HashtagButton } from '@/components/common/Themes'

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
export default function HashtagAccordion(props: HashtagAccordionProps) {
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