import { Button, ThemeProvider, IconButton } from "@mui/material";
import { categoryButtonTheme } from "./Themes";
import { FormatDateRange } from "@/service/Functions";
import HashtagAccordion from "./HashtagAccordion";


// - tab item : 페스티벌
interface PostProps {
  img_url: string; title: string; user_profile: string; userName: string; address?: string;
  startDate: any; endDate: any; categories: string[]; content?: string; tags?: string[];
}

export function FestivalBlock(props: { data: PostProps }) {
  return (
    <div>
      <div className='flex flex-col py-[18px] px-[16px]'>
        <div className='flex flex-col justify-between'>
          <div className='flex flex-row items-center justify-between pb-[10px]'>
            <div className='flex flex-col w-[230px] gap-[20px]'>
              <div className='flex flex-row gap-[4px]'>
                <ThemeProvider theme={categoryButtonTheme}>
                  {
                    props.data.categories.map((cate, idx) => <Button disabled key={`cate-${idx}`}>{cate}</Button>)
                  }
                </ThemeProvider>
              </div>
              <div className='flex flex-col gap-[4px]'>
                <p className='truncate text-base font-semibold'>{props.data.title}</p>
                <p className='text-sm text-gray3-text'>{FormatDateRange(props.data.startDate, props.data.endDate)}</p>
                <div className='flex flex-row gap-[4px]'>
                  <img className='rounded-full w-[24px] h-[24px]' src={props.data.user_profile} />
                  <p className='text-sm text-gray3-text self-center'>{props.data.userName}</p>
                </div>
              </div>
            </div>
            <img className='rounded-lg w-[84px] h-[104px] object-cover' src={props.data.img_url} />
          </div>
          {props.data.tags ? <HashtagAccordion tag={props.data.tags} /> : <></>}
        </div>
      </div>
    </div>
  )
}

export function CalendarBlock(props: { data: PostProps }) {
  return (
    <div>
      <div className='flex flex-col py-[18px] px-[16px]'>
        <div className='flex flex-col justify-between'>
          <div className='flex flex-row items-center pb-[10px] gap-[20px]'>
            <img className='rounded-lg w-[84px] h-[104px] object-cover' src={props.data.img_url} />
            <div className='flex flex-col w-[278px] h-[104px] gap-[20px] justify-between'>
              <div className='flex flex-col'>
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row text-sm text-gray3-text">
                    <p>{FormatDateRange(props.data.startDate, props.data.endDate)}</p>
                    <p>, {props.data.address}</p>
                  </div>
                  <IconButton disableRipple className='p-0'><img src='/calendar_delete.svg' /></IconButton>
                </div>
                <p className='truncate text-base font-semibold'>{props.data.title}</p>
              </div>
              <span className='text-[12px] text-gray3-text block description max-w-[278px]'>{props.data.content}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}