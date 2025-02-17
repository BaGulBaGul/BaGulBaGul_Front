import { SkeletonBlockCal, SkeletonBlockLike, SkeletonBlockPost, SkeletonBlock } from "./SkeletonBlock";

interface SkeletonListProps {
  num?: number; type?: 'CAL' | 'LIKE' | 'POST' | 'CMT'; thumb?: boolean; tag?: boolean;
  opt?: 'EVT' | 'RCT';
}
export function SkeletonList(props: SkeletonListProps) {
  function ListBlock() {
    if (props.type === 'CAL') return <SkeletonBlockCal />
    else if (props.type === 'LIKE') return <SkeletonBlockLike />
    else if (props.type === 'POST') return <SkeletonBlockPost opt={props.opt} />
    else if (props.type === 'CMT') return <SkeletonBlockCal />
    else { return <SkeletonBlock thumb={!!props.thumb} tag={!!props.tag} /> }
  }
  return (
    <div className="flex flex-col bg-p-white">
      {Array.from({ length: props.num ?? 5 }, (value, index) => <>{<ListBlock key={`sk-list-${index}`} />}</>)}
    </div>
  )
}