'use client';
import { useRef, useState } from "react";
import { TitleInput, Write } from "../../write";
import { DialogFull, Divider, ImagePreview } from "@/components/common";
import { ImageUploader } from "@/components/common/input";
import { RecPost } from "../../main/RecCarousel";
import { SearchBox, SearchBoxTrigger } from "../../write/_SearchBox";
import { LinkedEventPage } from "./_LinkedEventPage";
import { BannerInfo, BannerLinkedEventData } from "..";

export function BannerCardPage({ cardData, updateCard }: { cardData: BannerInfo; updateCard: (targetId: string, newValue: any) => void }) {
	const [image, setImage] = useState<string | undefined>(cardData.data?.headImageUrl)
	const [imageKey, setImageKey] = useState<Number | undefined>(cardData.data?.headImageKey)
	const [targetEvent, setTargetEvent] = useState<BannerLinkedEventData | undefined>(cardData.data?.linkedEvent)
	const titleRef = useRef<any>(!!cardData && cardData.data ? cardData.data.title : null);
	const updateEvent = (newEventData: (BannerLinkedEventData & { title: string })) => {
		setTargetEvent(newEventData)
		titleRef.current.value = newEventData.title
	}
	const handleSubmit = () => {
		if (!titleRef.current || titleRef.current.value.length <= 0) { alert('제목을 꼭 입력해주세요.') }
		updateCard(cardData.id,
			{ title: titleRef.current.value, headImageUrl: image, headImageKey: imageKey, linkedEvent: { ...targetEvent } }
		)
	}
	return (
		<Write handleSubmit={handleSubmit} wrapStyle="mt-[60px]">
			<div className='relative h-[280px] bg-gray1'>
				<ImagePreview image={image} deleteImage={() => { setImage(undefined) }} deleteImageKey={() => { setImageKey(undefined) }} defaultSrc={targetEvent?.headImageUrl ?? undefined} height={280} />
				<ImageUploader setImage={setImage} setImageKey={setImageKey} multiple={false} />
			</div>
			{/* // * 0807: 제목 집적 입력시 미리보기에 적용 안되는 이슈 */}
			<TitleInput titleRef={titleRef} prev={!!cardData.data ? cardData.data.title : undefined} />
			<Divider color='gray2' />
			<SearchBox title={'연결 이벤트'}>
				<DialogFull trigger={<SearchBoxTrigger defaultText='이벤트 검색' value={targetEvent ? targetEvent.title : undefined} />}>
					<LinkedEventPage updateEvent={updateEvent} />
				</DialogFull>
			</SearchBox>
			<Divider color='gray2' />
			<div className="flex flex-col pt-[10px] pb-[20px] gap-[20px] bg-p-white">
				<p className="px-[16px] text-14 font-semibold">미리보기</p>
				<div className="flex flex-row justify-center">
					<RecPost headImageUrl={image ?? (targetEvent?.headImageUrl ?? '/default_list_thumb3x.png')} title={titleRef.current ? titleRef.current.value : '-'}
						startDate={targetEvent?.startDate} endDate={targetEvent?.endDate} />
				</div>
			</div>
		</Write>
	)
}
