"use client";
import { Divider, FooterButton, ImageSlide } from "@/components/common";
import { ImageUploader } from "@/components/common/input";
import { useState } from "react";
import { RecCarousel } from "../../main";
import { BannerCardList, BannerTitleInput, DndWrapper } from "..";

export interface BannerData {
	id: string;
	data: undefined | {
		title: string; startDate: any; endDate: any; headImageUrl: string; headImageKey: Number; linkedEventUrl: string;
	}
}

export function BannerPage() {
	const [backImage, setBackImage] = useState<string[]>([])
	const [backImageKey, setBackImageKey] = useState<Number[]>([])
	const [title, setTitle] = useState<string | undefined>(undefined)
	const handleTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => { setTitle(e.target.value) }

	let evt1 = { "title": "이벤트1", "startDate": "2023-07-01", "endDate": "2023-07-31", "headImageUrl": "/banner1.png", "headImageKey": 1, "linkedEventUrl": "/event/1" };
	const [cardData, setCardData] = useState<BannerData[]>([{id: '1', data: undefined}, {id: '2', data: evt1}, {id: '3', data: undefined}, {id: '4', data: undefined}, {id: '5', data: undefined}]);
	
	const handleSubmit = () => { }

	//   if (!!props.edit && (!!prev && !prev.isSuccess)) { return (<SkeletonWrite opt='r' />) }
	return (
		<div className="w-full mt-[104px] mb-[77px]">
			<div className='relative h-[430px] bg-gray1'>
				{/* // * 이미지 1개만 업로드,표시되도록 수정 */}
				<ImageSlide images={backImage} setImages={setBackImage} default={<></>} />
				<ImageUploader setImage={setBackImage} setImageKey={setBackImageKey} multiple={true} />
			</div>
			<BannerTitleInput handleChange={handleTitle} title={title} />
			<Divider color='gray2' />
			<DndWrapper id="banner-card-list" items={cardData} updateItems={(newData: BannerData[]) => setCardData(newData)}>
				<BannerCardList items={cardData} />
			</DndWrapper>
			<Divider color='gray2' />
			<div className="flex flex-col pt-[10px] pb-[20px] gap-[20px] bg-p-white">
				<p className="px-[16px] text-14 font-semibold">미리보기</p>
				<RecCarousel title={title} />
			</div>
			<FooterButton text="배너 제작하기" handleClick={handleSubmit} />
		</div>
	)
}