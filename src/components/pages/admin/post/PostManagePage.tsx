"use client";
import { useState, useRef } from 'react';
import { SubTopHeader } from '@/components/layout/subHeader';
import { EditButton, FooterButton, TypeSwitch, TypeTabs } from '@/components/common';
import { CategoryButtons, SearchInput } from '@/components/common/input';
import { MagnifyingIcn } from '@/components/common/styles/Icon';
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

	const handleChange = (value: any, e: Event | undefined) => {
		setValue(value);
		if (view !== 'EVT') { setView('EVT'); }
	};
	const handleView = (groupValue: any[], event: Event) => {
		if (groupValue.length === 0 || groupValue[0] === view) { return; }
		setView(groupValue[0]);
	}

	let apiURL = `/api/event${view === 'EVT' ? '' : '/recruitment'}?size=10&categories=${selectedCate}&type=${tabList[value]}${title.length === 0 ? '' : '&title=' + title}`
	console.log(apiURL)
	const events = useListWithPageE(apiURL, ['events', { 'title': title, categories: selectedCate, type: tabList[value] }, view], true)

	return (
		<>
			<SubTopHeader name={optString.title[opt]} child={<EditButton editing={selecting} handleEdit={() => setSelecting(!selecting)} text1="선택" text2="완료" />} />
			<div className='fixed w-full flex flex-col top-[60px] bg-p-white z-paper'>
				<div className='flex flex-row items-center mx-[16px] my-[18px] gap-[16px]'>
					<SearchInput placeholder='검색' inputRef={inputRef}>
						<button onClick={handleSearch}><MagnifyingIcn size={20} /></button>
					</SearchInput>
				</div>
				<TypeTabs val={value} handleChange={handleChange}>
					{value < 2 && <TypeSwitch type={view} handleChange={handleView} />}
				</TypeTabs>
				<CategoryButtons selectedCate={selectedCate} setSelectedCate={setSelectedCate} />
			</div>
			<div className="mt-[220px]">
				<PostList opt={view} events={events} editing={selecting} handleSelected={() => { }} />
			</div>
			{selecting && <FooterButton text={optString.action[opt]} />}
		</>
	)
}