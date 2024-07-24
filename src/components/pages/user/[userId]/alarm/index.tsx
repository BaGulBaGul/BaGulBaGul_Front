import { AlarmCmtIcn, AlarmLikeIcn, DeleteIcn } from "@/components/common/Icon";
import dayjs from "dayjs";
import React from "react";

const index = () => {
  const alarm = [
    {
      case: "comment",
      title: "피크페스티벌 2일차 동행 구해요.",
      body: "오픈채팅으로 연락주세요 :)",
      time: "2024-06-17T02:30:10",
      read: false,
    },
    {
      case: "like",
      title: "PEAK FESTIVAL 2023",
      body: "피크 페스티벌 진짜 오래기다렸어요.",
      time: "2024-06-17T02:30:10",
      read: true,
    },
    {
      case: "comment",
      title: "피크페스티벌 2일차 동행 구해요.",
      body: "2명 같이 가도 괜찮나요?",
      time: "2024-06-17T02:30:10",
      read: true,
    },
  ];

  interface AlarmProps { opt: string; title: string; body: string | undefined; time: string; read: boolean; }
  const AlarmBlock: React.FC<AlarmProps> = ({ opt, title, body, time, read }) => {
    const titleStyle = `text-[14px] text-ellipsis overflow-hidden break-all whitespace-nowrap ${read ? "text-gray1" : "text-black"}`
    const bodyStyle = read ? "text-[14px] text-gray1" : "text-[14px] text-gray3";
    const timeStyle = `flex flex-row gap-[6px] text-[12px] ${read ? "text-gray1" : "text-gray3"}`
    let alarmText = opt === 'CMT' ? '글에 댓글이 달렸어요.' : '댓글에 좋아요 10개가 놀렸어요.'
    return (
      <div className="flex flex-row w-full px-[16px] py-[10px] gap-[20px]">
        <div className="w-[30px] h-[30px]">
          {opt === 'CMT' ? <AlarmCmtIcn val={read} /> : <AlarmLikeIcn val={read} />}
        </div>
        <div className="flex flex-row gap-[8px] items-start">
          <div className="flex flex-col gap-[2px] w-[calc(100vw-114px)]">
            {/* <div className="flex flex-col gap-[2px] w-[calc(100%)]"> */}
            <p className={titleStyle}>"{title}" {alarmText}</p>
            <p className={bodyStyle}>{body}</p>
            <div className={timeStyle}>
              <p>{dayjs(time).format('YY.MM.DD')}</p><p>{dayjs(time).format('HH:mm')}</p>
              </div>
          </div>
          <button><DeleteIcn /></button>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-[60px]">
      <div className="fixed w-full h-[48px] flex px-[16px] justify-end items-center bg-[#FFF]">
        <button className="text-[12px] text-gray3">전체삭제</button>
      </div>
      <div className="pt-[48px] bg-[#FFF]">
        {alarm.map((item, index) => (
          <div key={index}>
            {item.case === "comment" && (<AlarmBlock opt='CMT' title={item.title} body={item.body} time={item.time} read={item.read} />)}
            {item.case === "like" && (<AlarmBlock opt="LK" title={item.title} body={item.body} time={item.time} read={item.read} />)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default index;
