"use client";
import { useState } from "react";
import { Divider, FooterButton, ImagePreview, EventCarousel } from "@/components/common";
import { ImageUploader } from "@/components/common/input";
import { BannerTitleInput, BannerCardItem, DndWrapper, BannerCardPage, BannerInfo } from "..";

export function BannerPage() {
	const [backImage, setBackImage] = useState<string | undefined>(undefined)
	const [backImageKey, setBackImageKey] = useState<Number | undefined>(undefined)
	const [title, setTitle] = useState<string | undefined>(undefined)

	let evt1 = {
		"title": "이벤트1", "headImageUrl": "/banner1.png", "headImageKey": 1,
		"linkedEvent": { "url": "/event/1", "eventId": 1, "headImageUrl": null, "headImageKey": undefined, "title": "이벤트1", "startDate": "2023-07-01", "endDate": "2023-07-31" }
	};
	const [cardData, setCardData] = useState<BannerInfo[]>([{ id: '1', data: undefined }, { id: '2', data: evt1 }, { id: '3', data: undefined }, { id: '4', data: undefined }, { id: '5', data: undefined }]);
	const updateItemValue = (targetId: string, newValue: any) => {
		setCardData(cardData.map((item) => item.id === targetId ? { ...item, data: newValue } : item));
	};
	// * 배너 등록 API 추가 적용 필요
	const handleSubmit = () => { }

	const handleDelete = (e: any, id: string) => {
		e.stopPropagation();
		setCardData(cardData.map((item) => item.id === id ? { ...item, data: undefined } : item));
	}

	//   if (!!props.edit && (!!prev && !prev.isSuccess)) { return (<SkeletonWrite opt='r' />) }
	return (
		<div className="w-full mt-[60px] mb-[77px]">
			<div className='relative h-[430px] bg-gray1'>
				<ImagePreview image={backImage} deleteImage={() => { setBackImage(undefined) }} deleteImageKey={() => { setBackImageKey(undefined) }} height={430} />
				<ImageUploader setImage={setBackImage} setImageKey={setBackImageKey} multiple={false} />
			</div>
			<BannerTitleInput updateTitle={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTitle(e.target.value)} title={title} />
			<Divider color='gray2' />
			<DndWrapper id="banner-card-list" items={cardData} updateItems={(newData: BannerInfo[]) => setCardData(newData)}>
				{cardData.map(item => (
					<BannerCardItem key={`banner-${item.id}`} item={item} handleDelete={handleDelete}>
						<BannerCardPage cardData={item} updateCard={updateItemValue} />
					</BannerCardItem>
				))}
			</DndWrapper>
			<Divider color='gray2' />
			<div className="flex flex-col pt-[10px] pb-[20px] gap-[20px] bg-p-white">
				<p className="px-[16px] text-14 font-semibold">미리보기</p>
				<EventCarousel title={title} data={cardData.map(item => item.data)} bgImage={backImage} />
			</div>
			<FooterButton text="배너 제작하기" handleClick={handleSubmit} />
		</div>
	)
}