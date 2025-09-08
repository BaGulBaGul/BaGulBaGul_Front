import { call } from "@/service/ApiService";
import { ReactNode } from "react";
import { IconCameraUpload } from "../styles/Icon";

export function ImageUploader(props: { setImage: any; setImageKey: any; multiple: boolean; uploadBtn?: ReactNode }) {
  const handleImageUpload = async (e: any) => {
    if (e.target.files.length === 0) return false;
    else if (!props.multiple && e.target.files.length === 1) {
      let file = e.target.files[0]
      if (!/^image\//.test(file.type)) { alert('이미지 형식의 파일만 선택 가능합니다.'); return; }
      const formData = new FormData();
      formData.append('imageFile', file)
      call('/api/upload/image', 'POST', formData, 'file')
        .then((response) => {
          if (response.errorCode === 'C00000') {
            props.setImage(response.data.url)
            props.setImageKey(response.data.resourceId)
          } else { alert('이미지 업로드를 실패했습니다. 다시 시도해주세요.') }
        })
    } else {
      let tmpImages: string[] = [];
      let tmpKeys: number[] = [];
      try {
        let fileArr: File[] = Array.from(e.target.files)
        for await (let file of fileArr) {
          if (!/^image\//.test(file.type)) { alert('이미지 형식의 파일만 선택 가능합니다.'); return; }
          const formData = new FormData();
          formData.append('imageFile', file)
          await call('/api/upload/image', 'POST', formData, 'file')
            .then((response) => {
              if (response.errorCode === 'C00000') {
                tmpImages.push(response.data.url);
                tmpKeys.push(response.data.resourceId);
              } else { throw new Error(); }
            })
        }
        if (tmpImages.length > 0 && tmpImages.length === tmpKeys.length) {
          props.setImage((prev: any) => [...prev, ...tmpImages])
          props.setImageKey((prev: any) => [...prev, ...tmpKeys])
        }
      } catch (error) { alert('이미지 업로드를 실패했습니다. 다시 시도해주세요.') }
    }
  }
  return (
    <label className={`absolute z-10 ${!props.uploadBtn ? 'right-5 bottom-5 w-[40px] h-[40px]' : 'right-0 bottom-0 w-[24px] h-[24px]'}`}>
      {props.uploadBtn ?? <IconCameraUpload />}
      <input type='file' accept='image/*' onChange={(e) => handleImageUpload(e)} multiple={props.multiple} />
    </label>
  )
}