"use client";
import { IconArrowDown } from "../styles/Icon";

export function ExpandButton({handleExpandClick, expanded}: { handleExpandClick: any; expanded: boolean; }) {
	return (
			<button onClick={handleExpandClick} className={`h-[24px] w-[24px] transition-transform align-middle ${expanded ? 'rotate-180' : ''}`}>
				<IconArrowDown />
			</button>
	)
}