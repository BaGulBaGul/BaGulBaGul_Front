import React from "react";

const index = () => {
  const alarm = [
    {
      case: "comment",
      title: "PEAK FESTIVAL 2023",
      body: "피크 페스티벌 진짜 오래기다렸어요.",
      time: "23.05.10 10:50",
      read: false,
    },
    {
      case: "like",
      title: "PEAK FESTIVAL 2023",
      time: "23.05.10 10:50",
      read: true,
    },
    {
      case: "comment",
      title: "PEAK FESTIVAL 2023",
      body: "와.. 작년 피크페스티벌 다녀온게 엊그제 같은데 벌써 2년이 지났네요 대박",
      time: "23.05.10 10:50",
      read: true,
    },
  ];

  interface CommentProps {
    title: string;
    body: string | undefined;
    time: any;
    read: any;
  }

  interface LikeProps {
    title: string;
    time: any;
    read: any;
  }

  const Comment: React.FC<CommentProps> = ({title, body, time, read}) => {
    const titleStyle = read ? "text-sm text-[#C1C1C1]" : "text-sm";
    const bodyStyle = read ? "text-sm text-[#C1C1C1]" : "text-sm text-[#6C6C6C]";
    const timeStyle = read ? "text-[12px] text-[#C1C1C1]" : "text-[12px] text-[#6C6C6C]";

    return (
      <div className="flex w-full px-4 py-2.5 gap-[18px]">
        <img src="alarm_comment.svg" width={20} height={20} />
        <div className="flex flex-col gap-0.5 w-full">
          <text className={titleStyle}>{title} 글에 댓글이 달렸어요.</text>
          <text className={bodyStyle}>{body}</text>
          <text className={timeStyle}>{time}</text>
        </div>
        <img src="X.svg" width={24} height={24} />
      </div>
    );
  };

  const Like: React.FC<LikeProps> = ({title, time, read}) => {
    const titleStyle = read ? "text-sm text-[#C1C1C1]" : "text-sm";
    const timeStyle = read ? "text-[12px] text-[#C1C1C1]" : "text-[12px] text-[#6C6C6C]";

    return(
      <div className="flex w-full px-4 py-2.5 gap-[18px]">
        <img src="alarm_comment.svg" width={20} height={20} />
        <div className="flex flex-col gap-0.5 w-full">
          <text className={titleStyle}>{title} 글에 좋아요 10개가 달렸어요.</text>
          <text className={timeStyle}>{time}</text>
        </div>
        <img src="X.svg" width={24} height={24} />
      </div>
    )
  }

  return (
    <div className="mt-[60px]">
      <div className="w-full h-[39px] px-4 py-2.5 text-right text-[12px] text-[#6C6C6C]">
        <text>전체삭제</text>
      </div>

      <div>
        {alarm.map((item, index) => (
          <div key={index}>
            {item.case === "comment" && (
              <Comment title={item.title} body={item.body} time={item.time} read={item.read} />
            )}
            {item.case === "like" && (
              <Like title={item.title} time={item.time} read={item.read} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default index;
