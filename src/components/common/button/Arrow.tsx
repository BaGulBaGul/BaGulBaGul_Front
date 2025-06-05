interface ArrowProps {
  className?: any; style?: any; onClick?: React.MouseEventHandler<HTMLDivElement>; cN?: string;
}

export function ArrowPrev({ onClick, cN }: ArrowProps) {
  return (<div className={'slick-arrow slick-prev '.concat(cN ?? '')} onClick={onClick} />)
}

export function ArrowNext({ onClick, cN }: ArrowProps) {
  return (<div className={'slick-arrow slick-next '.concat(cN ?? '')} onClick={onClick} />)
}