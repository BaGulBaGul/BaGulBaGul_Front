"use client";

export function ExpandButton({handleExpandClick, expanded}: { handleExpandClick: any; expanded: boolean; }) {
	return (
		<div className='content-start'>
			<button onClick={handleExpandClick} className={`transition-transform ${expanded ? 'rotate-180' : ''}`}>
				<ArrowDownIcn />
			</button>
		</div>
	)
}

const ArrowDownIcn = () => (
	<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M5.5 8.57617L12.4209 15.5762L19.5 8.57617" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
)