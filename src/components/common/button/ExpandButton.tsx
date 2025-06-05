"use client";
import { styled, IconButton, IconButtonProps } from '@mui/material';

export function ExpandButton(props: { handleExpandClick: any; expanded: boolean; }) {
	return (
		<ExpandMore expand={props.expanded} onClick={props.handleExpandClick} aria-expanded={props.expanded} >
			<HashtagArrowDown />
		</ExpandMore>
	)
}

interface ExpandMoreProps extends IconButtonProps { expand: boolean; }
const ExpandMore = styled((props: ExpandMoreProps) => {
	const { expand, ...other } = props;
	return (
		<div className='content-start'>
			<IconButton {...other} aria-expanded={false} disableRipple={true} disableTouchRipple={true} />
		</div>
	);
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto', padding: '0px',
	transition: theme.transitions.create('transform', { duration: theme.transitions.duration.shortest })
}));

const HashtagArrowDown = () => (
  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.73135 8.45726L12.5922 13.3181L17.4531 8.45726C17.9416 7.96867 18.7309 7.96867 19.2195 8.45726C19.7081 8.94585 19.7081 9.73512 19.2195 10.2237L13.4692 15.974C12.9806 16.4626 12.1913 16.4626 11.7027 15.974L5.95238 10.2237C5.46379 9.73512 5.46379 8.94585 5.95238 8.45726C6.44097 7.9812 7.24276 7.96867 7.73135 8.45726Z" fill="black" />
  </svg>
)