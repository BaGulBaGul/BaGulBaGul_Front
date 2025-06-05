import { UseMutationResult } from "@tanstack/react-query";
import { AddressDialog } from "./AddressDialog";
import { BodyInput } from "./BodyInput";
import { TitleInput } from "./TitleInput";
import { TagsInput } from "./TagInput";
import { TypeToggle } from "./TypeToggle";
import { InputDateSelect } from "./InputDateSelect";
import { SearchBox } from "./SearchBox";
import { Write } from "./Write";

export {
  BodyInput, TitleInput, TagsInput, 
  TypeToggle, 
  InputDateSelect, 
  SearchBox, AddressDialog,
  Write,
}

// 위경도 반환 함수
export const getCoords = (address: string, geocoder: any) => {
  return new Promise((resolve, reject) => {
    geocoder.addressSearch(address, (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].x, result[0].y);
        resolve(coords);
      } else { reject(status) }
    })
  })
}

export const handleWrite = (
  apiURL: string, mutateWrite: UseMutationResult<any, Error, { apiURL: string; body: Object; }, unknown>,
  body: any, addr?: { full: string, abs: string } | null, edit?: number, prev?: any
) => {
  if (!addr && (!!prev && !!prev.data && !!prev.data.event.fullLocation)) { // 공백으로 수정 시 주소 삭제
    body['abstractLocation'] = null
    body['fullLocation'] = null
    body['latitudeLocation'] = null
    body['longitudeLocation'] = null
  }
  if (!!addr && (!edit || (!!prev && !!prev.data && prev.data.event.fullLocation !== addr.full))) {  // 새로운 주소 입력 시 위경도 찾고 등록
    body['abstractLocation'] = addr.abs
    body['fullLocation'] = addr.full
    window.kakao.maps.load(async function () {
      var geocoder = new window.kakao.maps.services.Geocoder();
      const coords: any = !!addr ? await getCoords(addr.full, geocoder) : undefined
      if (!!coords) {
        body['latitudeLocation'] = coords.La
        body['longitudeLocation'] = coords.Ma
      }
      console.log(body)
      // mutateWrite.mutate({ apiURL: apiURL, body: body })
    })
  } else {
    console.log(body);
    // mutateWrite.mutate({ apiURL: apiURL, body: body })
  }
}