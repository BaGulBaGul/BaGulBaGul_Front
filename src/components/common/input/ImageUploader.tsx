import { call } from "@/service/ApiService";

export function ImageUploader(props: { setImage: any; setImageKey: any; multiple: boolean }) {
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
    <label className={`absolute z-10 ${props.multiple ? 'right-5 bottom-5 w-[40px] h-[40px]' : 'right-0 bottom-0 w-[30px] h-[30px]'}`}>
      <UploadIcn multiple={props.multiple} />
      <input type='file' accept='image/*' onChange={(e) => handleImageUpload(e)} multiple={props.multiple} />
    </label>
  )
}

function UploadIcn(props: { multiple: boolean }) {
  if (!!props.multiple) {
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.8">
          <rect width="40" height="40" rx="20" fill="#6C6C6C" />
          <path d="M27.8574 14.1113H24.8217L24.0985 12.0845C24.0485 11.9459 23.957 11.826 23.8363 11.7413C23.7157 11.6566 23.5718 11.6112 23.4244 11.6113H16.5762C16.2748 11.6113 16.0047 11.8011 15.9043 12.0845L15.1789 14.1113H12.1431C11.1565 14.1113 10.3574 14.9104 10.3574 15.897V26.0756C10.3574 27.0622 11.1565 27.8613 12.1431 27.8613H27.8574C28.844 27.8613 29.6431 27.0622 29.6431 26.0756V15.897C29.6431 14.9104 28.844 14.1113 27.8574 14.1113ZM28.036 26.0756C28.036 26.1738 27.9556 26.2542 27.8574 26.2542H12.1431C12.0449 26.2542 11.9646 26.1738 11.9646 26.0756V15.897C11.9646 15.7988 12.0449 15.7185 12.1431 15.7185H16.3105L16.6922 14.6515L17.2034 13.2185H22.7949L23.3061 14.6515L23.6878 15.7185H27.8574C27.9556 15.7185 28.036 15.7988 28.036 15.897V26.0756ZM20.0003 17.147C18.0271 17.147 16.4289 18.7453 16.4289 20.7185C16.4289 22.6917 18.0271 24.2899 20.0003 24.2899C21.9735 24.2899 23.5717 22.6917 23.5717 20.7185C23.5717 18.7453 21.9735 17.147 20.0003 17.147ZM20.0003 22.8613C18.8172 22.8613 17.8574 21.9015 17.8574 20.7185C17.8574 19.5354 18.8172 18.5756 20.0003 18.5756C21.1833 18.5756 22.1431 19.5354 22.1431 20.7185C22.1431 21.9015 21.1833 22.8613 20.0003 22.8613Z" fill="#FCFCFC" />
        </g>
      </svg>
    )
  } return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="15" r="15" fill="#FCFCFC" />
      <path d="M23 19.6364C23 20.0221 22.8468 20.3921 22.574 20.6649C22.3012 20.9377 21.9312 21.0909 21.5455 21.0909H8.45455C8.06878 21.0909 7.69881 20.9377 7.42603 20.6649C7.15325 20.3921 7 20.0221 7 19.6364V11.6364C7 11.2506 7.15325 10.8806 7.42603 10.6078C7.69881 10.3351 8.06878 10.1818 8.45455 10.1818H11.3636L12.8182 8H17.1818L18.6364 10.1818H21.5455C21.9312 10.1818 22.3012 10.3351 22.574 10.6078C22.8468 10.8806 23 11.2506 23 11.6364V19.6364Z" fill="#6C6C6C" />
      <path d="M14.9989 18.1815C16.6056 18.1815 17.908 16.879 17.908 15.2724C17.908 13.6657 16.6056 12.3633 14.9989 12.3633C13.3923 12.3633 12.0898 13.6657 12.0898 15.2724C12.0898 16.879 13.3923 18.1815 14.9989 18.1815Z" stroke="#FCFCFC" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}