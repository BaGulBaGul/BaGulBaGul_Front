import { SkeletonBlockCal, SkeletonBlockLike, SkeletonBlockPost, SkeletonBlock, SkeletonSuggestImage } from "./SkeletonBlock";

interface SkeletonListProps {
  num?: number; type?: 'CAL' | 'LIKE' | 'POST' | 'CMT' | 'SGST'; thumb?: boolean; tag?: boolean;
  opt?: 'EVT' | 'RCT'; rowcol?: 'row'
}
export function SkeletonList(props: SkeletonListProps) {
  function ListBlock() {
    if (props.type === 'CAL') return <SkeletonBlockCal />
    else if (props.type === 'LIKE') return <SkeletonBlockLike />
    else if (props.type === 'POST') return <SkeletonBlockPost opt={props.opt} />
    else if (props.type === 'CMT') return <SkeletonBlockCal />
    else if (props.type === 'SGST') return <SkeletonSuggestImage />
    else { return <SkeletonBlock thumb={!!props.thumb} tag={!!props.tag} /> }
  }
  return (
    <div className={`flex bg-p-white ${!!props.rowcol ? 'flex-row gap-[8px]' : 'flex-col'}`}>
      {Array.from({ length: props.num ?? 5 }, (value, index) => <>{<ListBlock key={`sk-list-${index}`} />}</>)}
    </div>
  )
}