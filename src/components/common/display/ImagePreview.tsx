import { TrashIcn } from "../styles/Icon";

interface ImagePreviewProps { image?: string; deleteImage: () => void; deleteImageKey: () => void; defaultSrc?: string; height: number; }
export function ImagePreview({ image, deleteImage, deleteImageKey, defaultSrc, height }: ImagePreviewProps) {
  const handleDelete = () => {
    if (!!image) {
      deleteImage()
      deleteImageKey()
    }
  }
  if (!!image) {
    return (
      <div className='relative'>
        <div className="absolute top-[16px] left-[16px] right-[16px] z-10 flex flex-row justify-between">
          <button onClick={handleDelete}><TrashIcn btn={true} /></button>
        </div>
        <img key={`img-{idx}`} src={image} className={'w-full object-cover ' + 'h-[' + height + 'px]'} />
      </div>
    )
  }
  else if (!!defaultSrc) {
    return (<img key={`img-{idx}`} src={defaultSrc} className={'w-full object-cover ' + 'h-[' + height + 'px]'} />)
  }
  return (<></>)
}