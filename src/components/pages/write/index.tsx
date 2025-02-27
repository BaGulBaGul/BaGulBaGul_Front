import { UseQueryResult } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Dispatch, SetStateAction, MutableRefObject } from "react";
import { AddressDialog } from "./AddressDialog";
import { DateSelect } from "./DateSelect";
import { Write } from "./Write";
import { WriteEPage } from "./WriteEPage";
import { WriteRPage } from "./WriteRPage";

export {
  AddressDialog, DateSelect,
  Write,
  WriteEPage, WriteRPage,
}

export interface WriteProps {
  selectedCate?: string[]; setSelectedCate?: Dispatch<SetStateAction<string[]>>;
  startDate: dayjs.Dayjs | null; setStartDate: Dispatch<SetStateAction<dayjs.Dayjs | null>>;
  endDate: dayjs.Dayjs | null; setEndDate: Dispatch<SetStateAction<dayjs.Dayjs | null>>;
  headMax?: number; setHeadMax?: Dispatch<SetStateAction<number | undefined>>;
  headCurrent?: number; setHeadCurrent?: Dispatch<SetStateAction<number | undefined>>;
  addr?: any; setAddr?: Dispatch<SetStateAction<any>>; forAdult?: boolean; setForAdult?: Dispatch<boolean>;
  content: string; setContent: Dispatch<SetStateAction<string>>;
  images: string[]; setImages: Dispatch<SetStateAction<string[]>>; imageKey: Number[]; setImageKey: Dispatch<SetStateAction<Number[]>>;
  tags: string[]; setTags: Dispatch<SetStateAction<string[]>>;
  titleRef: MutableRefObject<any>; open?: boolean; setOpen?: Dispatch<SetStateAction<boolean>>;
  handleSubmit: () => void; handleConfirm?: () => void; prev?: UseQueryResult<any, Error>;
}

// textarea 높이 자동 조정 함수
export const autoResizeTextarea = (e: any, setContent: any) => {
  const textarea = e.target;
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight + 10}px`;
  setContent(textarea.value);
};

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