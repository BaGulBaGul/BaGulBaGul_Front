import { AlarmProps } from "@/components/common";
import { DeleteIcn } from "@/components/common/styles/Icon";
import { handleClickAlarm } from "@/service/Functions";
import dayjs from "dayjs";

export function AlarmBlock(props: { data: AlarmProps, handleDelete: any, router: any; }) {
  return (
    <div className="flex flex-row w-full px-[16px] py-[10px] gap-[20px]">
      <div className="w-[30px] h-[30px]">
        <AlarmIcn type={props.data.type} val={props.data.checked} />
      </div>
      <div className="flex flex-row items-start gap-[8px]">
        <div onClick={(e) => { handleClickAlarm(e, props.router, props.data.alarmId, props.data.checked, props.data.subject, props.data.type) }}
          className="flex flex-col gap-[2px] w-[calc(100vw-114px)] cursor-pointer">
          {props.data.checked
            ? <>
              <p className='text-14 text-ellipsis overflow-hidden break-all whitespace-nowrap text-gray2'>{props.data.title}</p>
              <p className='text-14 text-gray2'>{props.data.message}</p>
              <div className='flex flex-row gap-[6px] text-12 text-gray2'>
                <p>{dayjs(props.data.time).format('YY.MM.DD')}</p><p>{dayjs(props.data.time).format('HH:mm')}</p>
              </div>
            </>
            : <>
              <p className='text-14 text-ellipsis overflow-hidden break-all whitespace-nowrap text-black'>{props.data.title}</p>
              <p className='text-14 text-gray3'>{props.data.message}</p>
              <div className='flex flex-row gap-[6px] text-12 text-gray3'>
                <p>{dayjs(props.data.time).format('YY.MM.DD')}</p><p>{dayjs(props.data.time).format('HH:mm')}</p>
              </div>
            </>
          }
        </div>
        <button onClick={(e) => { props.handleDelete(e, props.data.alarmId) }}><DeleteIcn /></button>
      </div>
    </div >
  )
};

export function AlarmIcn(props: { type: string, val: boolean }) {
  switch (props.type) {
    case "NEW_EVENT_COMMENT":
    case "NEW_EVENT_COMMENT_CHILD":
    case "NEW_RECRUITMENT_COMMENT":
    case "NEW_RECRUITMENT_COMMENT_CHILD":
      return <AlarmCmtIcn val={props.val} />
    case "NEW_EVENT_COMMENT_LIKE":
    case "NEW_EVENT_COMMENT_CHILD_LIKE":
    case "NEW_RECRUITMENT_COMMENT_LIKE":
    case "NEW_RECRUITMENT_COMMENT_CHILD_LIKE":
    case "NEW_EVENT_LIKE":
    case "NEW_RECRUITMENT_LIKE":
      return <AlarmLikeIcn val={props.val} />
  }
}

const AlarmLikeIcn = (props: { val: boolean }) => {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="15" r="15" fill={props.val ? '#C1C1C1' : '#4A6AFE'} />
      <path d="M22.6602 8.56487C20.0202 6.76487 16.7602 7.60487 15.0002 9.66487C13.2402 7.60487 9.98021 6.75487 7.34021 8.56487C5.94021 9.52487 5.06021 11.1449 5.00021 12.8549C4.86021 16.7349 8.30021 19.8449 13.5502 24.6149L13.6502 24.7049C14.4102 25.3949 15.5802 25.3949 16.3402 24.6949L16.4502 24.5949C21.7002 19.8349 25.1302 16.7249 25.0002 12.8449C24.9402 11.1449 24.0602 9.52487 22.6602 8.56487ZM15.1002 23.1249L15.0002 23.2249L14.9002 23.1249C10.1402 18.8149 7.00021 15.9649 7.00021 13.0749C7.00021 11.0749 8.50021 9.57487 10.5002 9.57487C12.0402 9.57487 13.5402 10.5649 14.0702 11.9349H15.9402C16.4602 10.5649 17.9602 9.57487 19.5002 9.57487C21.5002 9.57487 23.0002 11.0749 23.0002 13.0749C23.0002 15.9649 19.8602 18.8149 15.1002 23.1249Z" fill="#FCFCFC" />
    </svg>
  )
}

const AlarmCmtIcn = (props: { val: boolean }) => {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="15" r="15" fill={props.val ? '#C1C1C1' : '#4A6AFE'} />
      <path d="M21.666 7.6665H8.33268C7.41602 7.6665 6.66602 8.4165 6.66602 9.33317V24.3332L9.99935 20.9998H21.666C22.5827 20.9998 23.3327 20.2498 23.3327 19.3332V9.33317C23.3327 8.4165 22.5827 7.6665 21.666 7.6665ZM21.666 19.3332H9.30768L8.33268 20.3082V9.33317H21.666V19.3332ZM10.8327 13.4998H12.4993V15.1665H10.8327V13.4998ZM17.4993 13.4998H19.166V15.1665H17.4993V13.4998ZM14.166 13.4998H15.8327V15.1665H14.166V13.4998Z" fill="#FCFCFC" />
    </svg>
  )
}