import { DateLine, HeadCount, TypeChip, UserProfile } from ".";
import { WriterProps } from "..";

interface Props {
  title: string; startDate: any; endDate: any;
  writer?: WriterProps; head?: { current: number; max: number };
}

export function BlockBodyAD({ title, startDate, endDate, writer, head, address }: Props & { address: string; }) {
  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col gap-[4px] max-w-[calc(100vw-32px)]">
        <p className='text-16 font-semibold truncate'>{title}</p>
        <p className="text-14 text-gray3">{address}</p>
        <DateLine startDate={startDate} endDate={endDate} />
      </div>
      <div className='flex flex-row items-center gap-[4px]'>
        {!!writer && <UserProfile userId={writer.userId} userName={writer.userName} userProfileImageUrl={writer.userProfileImageUrl} />}
        {!!head && <HeadCount currentHeadCount={head.current} maxHeadCount={head.max} />}
      </div>
    </div>
  )
}

export function BlockBodyD({ title, startDate, endDate, writer, head, type }: Props & { type?: string; }) {
  return (
    <div className="flex flex-col gap-[4px]">
      {!!type && <TypeChip type={type} />}
      <p className='text-16 font-semibold truncate'>{title}</p>
      <DateLine startDate={startDate} endDate={endDate} />
      <div className='flex flex-row items-center gap-[4px]'>
        {writer && <UserProfile userId={writer.userId} userName={writer.userName} userProfileImageUrl={writer.userProfileImageUrl} color="gray3" />}
        {head && <HeadCount currentHeadCount={head.current} maxHeadCount={head.max} />}
      </div>
    </div>
  )
}

export function BlockBodyN({ title, startDate, endDate, name }: Props & { name: string; }) {
  return (
    <div className="flex flex-col gap-[4px]">
      <DateLine startDate={startDate} endDate={endDate} />
      <p className='text-16 font-semibold truncate'>{title}</p>
      <p className="text-14 text-gray3">{name}</p>
    </div>
  )
}