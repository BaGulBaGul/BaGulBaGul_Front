import { Button, ThemeProvider } from "@mui/material";
import { inputToggleTheme } from "@/components/common/styles/Themes";
import { VerticalMoreIcn } from "@/components/common/styles/Icon";
import { DateLine, UserProfile } from "@/components/common/block";
import { WriterProps } from "@/components/common";

interface Props {
  title: string; toggleDrawer: any; startDate: any; endDate: any; views: number;
  writer: WriterProps; categories?: string[];
}
export function DetailTitle({ title, toggleDrawer, startDate, endDate, views, writer, categories }: Props) {
  return (
    <div className="flex flex-col gap-[4px] px-[16px] pt-[30px] pb-[20px]">
      <div className="flex flex-row justify-between items-center">
        <span className="text-18">{title}</span>
        <button onClick={toggleDrawer(true)}><VerticalMoreIcn opt='DTL' /></button>
      </div>
      <div className="flex flex-row justify-between items-center">
        <DateLine startDate={startDate} endDate={endDate} />
        <div className='flex flex-row text-14 text-gray3 items-center'>
          <ViewIcn /><span className='ps-[4px]'>{views.toLocaleString("en-US")}</span>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <UserProfile userId={writer.userId} userName={writer.userName} userProfileImageUrl={writer.userProfileImageUrl} color='gray3' />
        {categories && categories.length > 0 &&
          <div className='flex flex-row gap-[8px]'>
            {categories.map((cate, idx) => (
              <ThemeProvider theme={inputToggleTheme}>
                <Button key={`cate-${idx}`}>{cate}</Button>
              </ThemeProvider>
            ))}
          </div>}
      </div>
    </div>
  )
}

const ViewIcn = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.643 8.48295C15.7386 4.47112 12.8598 2.45215 9.0006 2.45215C5.13944 2.45215 2.26266 4.47112 0.358194 8.48496C0.281805 8.64671 0.242188 8.82338 0.242188 9.00226C0.242188 9.18114 0.281805 9.35781 0.358194 9.51956C2.26266 13.5314 5.14145 15.5504 9.0006 15.5504C12.8618 15.5504 15.7386 13.5314 17.643 9.51755C17.7977 9.1921 17.7977 8.81443 17.643 8.48295ZM9.0006 14.1039C5.7602 14.1039 3.38766 12.4606 1.71422 9.00126C3.38766 5.54188 5.7602 3.89858 9.0006 3.89858C12.241 3.89858 14.6136 5.54188 16.287 9.00126C14.6156 12.4606 12.243 14.1039 9.0006 14.1039ZM8.92025 5.46554C6.96757 5.46554 5.38453 7.04858 5.38453 9.00126C5.38453 10.9539 6.96757 12.537 8.92025 12.537C10.8729 12.537 12.456 10.9539 12.456 9.00126C12.456 7.04858 10.8729 5.46554 8.92025 5.46554ZM8.92025 11.2513C7.67672 11.2513 6.67025 10.2448 6.67025 9.00126C6.67025 7.75773 7.67672 6.75126 8.92025 6.75126C10.1638 6.75126 11.1702 7.75773 11.1702 9.00126C11.1702 10.2448 10.1638 11.2513 8.92025 11.2513Z" fill="#6C6C6C" />
  </svg>
)