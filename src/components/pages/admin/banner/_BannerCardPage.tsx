'use client';
import { useRef, useState } from "react";
import dayjs from "dayjs";
import { InputDateSelect, SearchBox, TitleInput, Write } from "../../write";
import { Divider, ImageSlide } from "@/components/common";
import { ImageUploader } from "@/components/common/input";
import { RecPost } from "../../main/RecCarousel";

export function BannerCardPage({ handleBanner }: { handleBanner: () => void }) {
	const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null)
	const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null)
	const [images, setImages] = useState<string[]>([])
	const [imageKey, setImageKey] = useState<Number[]>([])
	const [eventId, setEventId] = useState<number | undefined>(undefined)
	const titleRef = useRef<any>(null);
	const handleSubmit = () => {
		if (!titleRef.current || titleRef.current.value.length <= 0) { alert('제목을 꼭 입력해주세요.') }
		handleBanner()
	}
	return (
		<Write handleSubmit={handleSubmit} wrapStyle="mt-[60px]">
			<div className='relative h-[280px] bg-gray1'>
				<ImageSlide images={images} setImages={setImages} default={<></>} />
				<ImageUploader setImage={setImages} setImageKey={setImageKey} multiple={true} />
			</div>
			<TitleInput titleRef={titleRef} prev={undefined} />
			<Divider color='gray2' />
			<div className='flex flex-col px-[16px] py-[10px] gap-[8px]'>
				<InputDateSelect title={'시작일시'} date={startDate} setDate={setStartDate} />
				<InputDateSelect title={'종료일시'} date={endDate} setDate={setEndDate} />
			</div>
			<Divider color='gray2' />
			<SearchBox title={'연결 이벤트'} defaultText={'이벤트 검색'} value={eventId?.toString()} handleClick={() => { }} />
			<Divider color='gray2' />
			<div className="flex flex-col pt-[10px] pb-[20px] gap-[20px] bg-p-white">
				<p className="px-[16px] text-14 font-semibold">미리보기</p>
				<div className="flex flex-row justify-center">
					<RecPost headImageUrl={images[0] ?? '/default_list_thumb3x.png'} title={titleRef.current ? titleRef.current.value : ''}
						startDate={startDate} endDate={endDate} />
				</div>
			</div>
		</Write>
	)
}