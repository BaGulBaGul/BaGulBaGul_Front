'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import useLoginInfo from "@/hooks/useLoginInfo";
import { useAlarmed } from "@/hooks/useInAlarm";
import { SubTopHeader } from "@/components/layout/subHeader";
import { UserProfileBlock, SetBlock } from "@/components/common/block";
import { LogoutButton } from "@/components/common";
import { IconNoti } from "@/components/common/styles/Icon";

export function AdminPage() {
	let userinfo = useLoginInfo()
	let userdata = userinfo?.data

	if (userinfo.isPending || userinfo.isLoading) { return (<></>) }
	return (
		<>
			<SubTopHeader name='관리자페이지' child={<AlarmButton />} />
			<div className="flex flex-col mb-[11px] pt-[60px]">
				<div className="flex flex-col gap-[8px]">
					<UserProfileBlock profileImageUrl="/profile_admin.svg" username={userdata?.nickname ?? 'Admin'} email={userdata?.email ?? 'admin@gmail.com'} />
					<div className="flex flex-col bg-p-white" id='mypage-set1'>
						<div className="p-[16px] text-14 font-semibold text-black">메인화면</div>
						<SetBlock title='배너 설정' desc='메인화면 추천 배너를 제작할 수 있어요.' url='/admin/banner' />
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
					<div className="flex flex-col bg-p-white" id='mypage-set4'>
						<div className="p-[16px] text-14 font-semibold text-black">이벤트 관리</div>
						<SetBlock title='카테고리 관리' desc='카테고리를 추가하거나 제거할 수 있어요.' url='/admin/category' />
						<SetBlock title='주최자 관리' desc='주최자 정보를 등록하고 관리할 수 있어요.' url='/admin/organizer' />
					</div>
				</div>
				<LogoutButton />
			</div>
		</>
	)
}

const AlarmButton = () => {
	const [alarmed, setAlarmed] = useState(false);
	const mutateAlarmed = useAlarmed(setAlarmed)
	useEffect(() => { mutateAlarmed.mutate() }, [])

	return (
		<Link href='/mypage/alarm' className='relative w-[24px] h-[24px]'>
			<IconNoti />
			{!alarmed ? <></>
				: <div id='alarm-check' className="absolute top-0 right-[3px] w-[8px] h-[8px] bg-primary-blue rounded-full z-10"></div>}
		</Link>
	)
}