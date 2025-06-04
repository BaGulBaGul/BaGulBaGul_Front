"use client";
import { Box, Collapse, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, createTheme } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Users } from './_TmpData';
import dayjs from 'dayjs';
import { FilterApplied, FilterButton } from '@/components/common';
import { ExpandButton } from '@/components/common/block/ExpandButton';
import { FilterDialog } from '@/components/common/filter/FilterDialog';
import { closeFilter } from '@/components/common/filter/Filter';
import { FilterSortRadio } from '@/components/common/filter/FilterWrapper';
import { FilterCalendar } from '@/components/common/filter/FilterContent';
import { FormatDateRange } from '@/service/Functions';
import { FilterCollapse } from '@/components/common/filter/_FilterCollapse';

// * tableheader sticky 적용하기
// * width 좀 더 수정
// * api 호출 시 필터 적용 작업
// * 정지, 삭제 시 팝업 구현
export function UserManagePage() {
	interface Column {
		id: 'userid' | 'username' | 'email' | 'role' | 'activated' | 'joinedAt';
		label: string;
		style?: string;
		minWidth?: number;
		width?: number;
		align?: 'right' | 'center';
		format?: (value: any) => string;
	}
	const columns: readonly Column[] = [
		{ id: 'userid', label: '순번', minWidth: 45 },
		{ id: 'username', label: '이름', style: 'font-semibold truncate', minWidth: 58 },
		{ id: 'email', label: '이메일', style: 'truncate', minWidth: 88 },
		{ id: 'role', label: '그룹(역할)', width: 68, align: 'center', format: (value: string) => value === 'ADMIN' ? '관리자' : '사용자' },
		{ id: 'activated', label: '활성화', style: 'truncate', width: 48, align: 'center', format: (value: boolean) => value ? 'O' : 'X' },
		{ id: 'joinedAt', label: '가입일자', minWidth: 78, align: 'center', format: (value: string) => dayjs(value).format('YY.MM.DD') },
	];
	const rows = Users

	const [open, setOpen] = useState(false);
	const handleOpen = () => { setOpen(true) }

	const [filters, setFilters] = useState(['sort'])
	const [filterCnt, setFilterCnt] = useState(0)
	const [sort, setSort] = useState('createdAt,desc')
	const [joinedDate, setJoinedDate] = useState<Date | undefined>(undefined)

	useEffect(() => {
		if (!!joinedDate && !filters.includes('joinedDate')) {
			filters.push('joinedDate')
			setFilters(filters)
		}
		if (filters.length === 1 && sort === 'createdAt,desc') { setFilterCnt(0) }
		else if (filters.length > 0 && filters.length !== filterCnt) { setFilterCnt(filters.length) }
		console.log('filters', filters, 'filterCnt', filterCnt, 'sort', sort, 'joinedDate', joinedDate);
	}, [sort, joinedDate])

	const handleDeleteFilter = (value: string) => {
		let newFilters = (filters).filter((f) => f !== value)
		setFilters(newFilters)
		setFilterCnt(newFilters.length)
		switch (value) {
			case 'sort':
				setSort('createdAt,desc')
				break;
			case 'joinedDate':
				setJoinedDate(undefined)
				break;
		}
	}
	// //   if (!!props.edit && (!!prev && !prev.isSuccess)) { return (<SkeletonWrite opt='r' />) }
	return (
		<>
			<ThemeProvider theme={tableTheme}>
				<div className="pt-[60px]">
					<UserSearchBar handleOpen={handleOpen} filterCnt={filterCnt} />
					<TableContainer sx={{ overflowX: 'initial', paddingTop: '66px', backgroundColor: '#FFFFFF' }}>
						<Table>
							<TableHead>
								<FilterApplied filterCnt={filterCnt} filters={filters} setFilters={setFilters} opt='UPDATE' sort={sort} joinedDate={joinedDate} handleDelete={handleDeleteFilter} />
								<TableRow>
									{columns.map((column) => (
										<TableCell key={column.id} align={column.align} style={{ width: column.width ? `${column.width}px` : `${(column.minWidth! / 414) * 100}%` }}>
											{column.label}
										</TableCell>))}
									<TableCell className="w-[49px]" />
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((row) => (<UserRowBlock row={row} />))}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</ThemeProvider >
			<FilterDialog open={open} handleClose={() => { closeFilter(setOpen); }} >
				<FilterSortRadio value={sort} handleChange={(e: ChangeEvent<HTMLInputElement>, newSort: string) => { setSort(newSort) }} />
				<FilterCollapse title={'가입일자'} type='CAL' value={!joinedDate ? '' : FormatDateRange(joinedDate, null)}>
					<FilterCalendar startDate={joinedDate} endDate={undefined} onChange={(date: any) => { setJoinedDate(date) }} range={false} />
				</FilterCollapse>
			</FilterDialog>
		</>
	)

	function UserRowBlock(props: { row: any }) {
		const [expanded, setExpanded] = useState(false);
		const handleExpandClick = () => { setExpanded(!expanded); }
		return (
			<>
				<TableRow hover role="checkbox" tabIndex={-1} key={props.row.userid}>
					{columns.map((column) => {
						const value = props.row[column.id];
						return (
							<TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth, width: `${(column.minWidth! / 414) * 100}%` }} className={`${column.style} ${typeof value !== 'boolean' ? 'text-black' : value === true ? 'text-primary-blue' : 'text-danger-red'}`}>
								{column.format ? column.format(value) : value}
							</TableCell>
						);
					})}
					<TableCell className={`p-[16px] ps-[8px]`}>
						<ExpandButton handleExpandClick={handleExpandClick} expanded={expanded} />
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell style={{ padding: 0 }} colSpan={7} >
						<Collapse in={expanded} timeout="auto" unmountOnExit>
							<Box className="flex flex-row w-screen p-[16px] gap-[16px] bg-p-white">
								{props.row.activated ? <button className='w-full bg-gray1 p-[4px] text-14 rounded-[4px]'>계정잠금</button>
									: <button className='w-full bg-primary-blue p-[4px] text-14 rounded-[4px]'>계정풀기</button>}
								<button className='w-full bg-[#FF0000] p-[4px] text-14 rounded-[4px] text-gray1'>계정삭제</button>
							</Box>
						</Collapse>
					</TableCell>
				</TableRow>
			</>
		)
	}
}

function UserSearchBar({ handleOpen, filterCnt }: { handleOpen: any, filterCnt: number }) {
	return (
		<div className="flex flex-row px-[16px] py-[18px] gap-[10px] w-full bg-p-white fixed top-[60px] z-20">
			<p className="w-full h-[30px] bg-gray1" />
			<FilterButton handleOpen={handleOpen} cnt={filterCnt} fs={18} />
		</div>
	)
}

const tableTheme = createTheme({
	components: {
		MuiTable: {
			styleOverrides: {
				root: { tableLayout: 'fixed', width: '100vw' },
			}
		},
		MuiTableHead: {
			styleOverrides: {
				root: { position: 'sticky', top: '0px', zIndex: 10, },
			}
		},
		MuiTableBody: {
			styleOverrides: {
				root: { position: 'relative', top: '8px' },
			}
		},
		MuiTableRow: {
			styleOverrides: {
				root: { width: '100vw', backgroundColor: '#FFFFFF', }
			}
		},
		MuiTableCell: {
			styleOverrides: {
				root: { fontFamily: 'inherit', fontSize: '14px', lineHeight: '160%', fontWeight: 400, letterSpacing: 'unset', borderBottom: 'none' },
				head: {
					padding: '16px 4px 16px 4px', wordBreak: 'keep-all',
					'&:first-of-type': { padding: '16px 4px 16px 16px' },
				},
				body: {
					padding: '16px 4px 18px 4px',
					'&:first-of-type': { padding: '16px 4px 16px 16px' },
				},
			}
		}
	},
});