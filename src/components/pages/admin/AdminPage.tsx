'use client';
import React, { useEffect, useState } from "react";
import useLoginInfo from "@/hooks/useLoginInfo";
import Link from "next/link";
import { useSignout } from "@/hooks/useInUser";
import { SubTopHeader } from "@/components/layout/subHeader";
import { useAlarmed } from "@/hooks/useInAlarm";

export function AdminPage() {
	let userinfo = useLoginInfo()
	let userdata = userinfo?.data

	const mutateSignout = useSignout();
	const handleSignout = () => { mutateSignout.mutate() }
	if (userinfo.isPending || userinfo.isLoading) { return (<></>) }
	return (
		<>
			<SubTopHeader name='관리자페이지' child={<AlarmButton />} />
			<div className="flex flex-col mb-[11px] pt-[60px]">
				<div className="flex flex-col gap-[8px]">
					<div className="flex flex-row px-[16px] py-[18px] gap-[16px] items-center bg-p-white" id='mypage-profile'>
						<div className="relative w-[77px] h-[70px] rounded-full">
							<img src="/profile_admin.svg" className="w-[70px] h-[70px] rounded-full object-cover" />
						</div>
						<div className="flex flex-col">
							<span className="font-semibold text-18 text-black">{userdata?.nickname ?? 'Admin'}</span>
							<span className="text-14 text-gray3">{userdata?.email ?? 'admin@gmail.com'}</span>
						</div>
					</div>
					<div className="flex flex-col bg-p-white" id='mypage-set1'>
						<div className="p-[16px] text-14 font-semibold text-black">메인화면</div>
						<SetBlock title='배너 설정' desc='메인화면 추천 배너를 제작할 수 있어요.' url='/admin/banner' />
						<SetBlock title='카테고리 관리' desc='카테고리를 추가하거나 제거할 수 있어요.' url='/admin/category' />
					</div>
					<div className="flex flex-col bg-p-white" id='mypage-set2'>
						<div className="p-[16px] text-14 font-semibold text-black">게시글 및 댓글</div>
						<SetBlock title='게시글 작성' desc='페스티벌/지역행사 게시글을 작성할 수 있어요.' url='/admin/write' />
						<SetBlock title='게시글 관리' desc='전체 게시글을 관리할 수 있어요.' url='/admin/post' />
						<SetBlock title='삭제된 게시글 관리' desc='삭제된 게시글을 관리할 수 있어요.' url='/admin/deleted-post' />
						<SetBlock title='신고 게시글' desc='신고된 게시글을 관리할 수 있어요.' count={4} url='/admin/reported-post' />
						<SetBlock title='신고 댓글' desc='신고된 댓글을 관리할 수 있어요.' count={8} url='/admin/reported-comment' />
					</div>
					<div className="flex flex-col bg-p-white" id='mypage-set3'>
						<div className="p-[16px] text-14 font-semibold text-black">유저 관리</div>
						<SetBlock title='유저 관리' desc='유저 정보를 확인하고 삭제 및 정지할 수 있어요.' url='/admin/user' />
					</div>
				</div>
				<div className="p-[24px]">
					<button className="w-full bg-p-white text-gray3 text-16 p-[16px]" onClick={handleSignout}>로그아웃</button>
				</div>
			</div>
		</>
	)
}

function SetBlock(props: { title: string; desc: string; count?: number; url: string; }) {
	return (
		<Link href={props.url}
			className="flex flex-row justify-between p-[16px]">
			<div className="flex flex-col">
				<span className="text-14 text-black">{props.title}</span>
				<span className="text-12 text-gray3">{props.desc}</span>
			</div>
			<div className="flex flex-row items-center gap-[8px]">
				{props.count ? <span className="text-14 text-black">{props.count >= 0 ? props.count : '-'}개</span> : <></>}
				<img src='/arrow_next.svg' className="p-[4px] w-[24px] h-[24px]" />
			</div>
		</Link>
	)
}

const AlarmButton = () => {
	const [alarmed, setAlarmed] = useState(false);
	const mutateAlarmed = useAlarmed(setAlarmed)
	useEffect(() => { mutateAlarmed.mutate() }, [])

	return (
		<Link href='/mypage/alarm' className='relative w-[24px] h-[24px]'>
			<AlarmIcn />
			{!alarmed ? <></>
				: <div id='alarm-check' className="absolute top-0 right-[3px] w-[8px] h-[8px] bg-primary-blue rounded-full z-10"></div>}
		</Link>
	)
}

const AlarmIcn = () => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M13.7295 21C13.5537 21.3031 13.3014 21.5547 12.9978 21.7295C12.6941 21.9044 12.3499 21.9965 11.9995 21.9965C11.6492 21.9965 11.3049 21.9044 11.0013 21.7295C10.6977 21.5547 10.4453 21.3031 10.2695 21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
)