import { AlarmProps } from "@/components/common";
import { AlarmCmtIcn, AlarmLikeIcn, DeleteIcn } from "@/components/styles/Icon";
import dayjs from "dayjs";

export const AlarmBlock = (props: { data: AlarmProps, handleClick: any, handleDelete: any }) => {
  return (
    <div className="flex flex-row w-full px-[16px] py-[10px] gap-[20px]">
      <div className="w-[30px] h-[30px]">
        {props.data.type === 'NEW_COMMENT' || props.data.type === 'NEW_COMMENT_CHILD'
          ? <AlarmCmtIcn val={props.data.checked} /> : <AlarmLikeIcn val={props.data.checked} />}
      </div>
      <div className="flex flex-row items-start gap-[8px]">
        <div onClick={(e) => { props.handleClick(e, props.data.alarmId, props.data.checked, props.data.subject, props.data.type) }}
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