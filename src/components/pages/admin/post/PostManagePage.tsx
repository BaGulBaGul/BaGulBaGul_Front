"use client";
import { useState, useRef } from 'react';
import { SubTopHeader } from '@/components/layout/subHeader';
import { EditButton, FooterButton, TypeSwitch, TypeTabs } from '@/components/common';
import { CategoryButtons, SearchInput } from '@/components/common/input';
import { IconSearchS } from '@/components/common/styles/Icon';
import { useListWithPageE } from '@/hooks/useInCommon';
import { tabList } from '@/service/Functions';
import { PostList } from './PostList';

export function PostManagePage({ opt }: { opt: 'post' | 'deleted-post' }) {
	const optString = {
		title: { 'post': '게시글 관리', 'deleted-post': '삭제된 게시글 관리' },
		action: { 'post': '삭제하기', 'deleted-post': '복구하기' },
		alert: { 'post': '게시글을 삭제하시겠습니까?\n삭제 후에도 복구할 수 있습니다.', 'deleted-post': '복구 후에는 게시글이 다시 보이게 됩니다.\n계속하시겠습니까?' }
	}
	const [selecting, setSelecting] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const [title, setTitle] = useState('')
	const handleSearch = (event: any) => {
		if ((event.type === 'keydown' && event.key === 'Enter') || event.type === 'click') {
			if (inputRef.current && inputRef.current.value !== '') {
				event.preventDefault();
				setTitle(encodeURIComponent(encodeURIComponent(inputRef.current.value)))
			}
		}
	}

	const [value, setValue] = useState(0);
	const [view, setView] = useState<'EVT' | 'RCT'>('EVT');
	const [selectedCate, setSelectedCate] = useState<string[]>([]);
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const handleSelected = (value: any[], eventDetails: any) => { setSelectedItems(value); }

	const handleChange = (value: any, e: Event | undefined) => {
		setValue(value);
		if (view !== 'EVT') { setView('EVT'); }
		if (!!selecting) {
			setSelectedItems([])
			setSelecting(false)
		}
	};
	const handleView = (groupValue: any[], eventDetails: any) => {
		if (groupValue.length === 0 || groupValue[0] === view) { return; }
		setView(groupValue[0]);
		if (!!selecting) {
			setSelectedItems([])
			setSelecting(false)
		}
	}

	let apiURL = `/api/event${view === 'EVT' ? (`?&categories=${selectedCate}&type=${tabList[value]}`) : '/recruitment?'}${title.length === 0 ? '' : '&title=' + decodeURIComponent(decodeURIComponent(title))}&size=10`
	const events = useListWithPageE(apiURL, ['events', { 'title': title, categories: selectedCate, type: tabList[value] }, view], true)

	const handleEdit = () => {
		if (!selecting && !(!events.isSuccess || (events.isSuccess && !events.data))) {
			setSelecting(true)
		} else if (!!selecting) {
			setSelecting(false)
		}
	}

	return (
		<>
			<SubTopHeader name={optString.title[opt]} child={<EditButton editing={selecting} handleEdit={handleEdit} text1="선택" text2="완료" />} />
			<div className='fixed w-full flex flex-col top-[60px] bg-p-white z-paper'>
				<div className='flex flex-row items-center mx-[16px] my-[18px] gap-[16px]'>
					<SearchInput placeholder='검색' inputRef={inputRef}>
						<button onClick={handleSearch}><IconSearchS /></button>
					</SearchInput>
				</div>
				<TypeTabs val={value} handleChange={handleChange}>
					{value < 2 && <TypeSwitch type={view} handleChange={handleView} />}
				</TypeTabs>
				{opt === 'post' && view === 'EVT' && <CategoryButtons selectedCate={selectedCate} updateSelectedCate={(groupValue: string[]) => { setSelectedCate(groupValue) }} />}
			</div>
			<div className={(opt === 'post' && view === 'EVT' ? "mt-[220px]" : "mt-[174px]") + (selecting ? ' mb-[77px]' : '')}>
				<PostList opt={view} events={events} editing={selecting} selectedItems={selectedItems} handleSelected={handleSelected} />
			</div>
			{selecting && <FooterButton text={optString.action[opt]} />}
		</>
	)
}