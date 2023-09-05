"use client";
import { useState } from 'react';
import { IconButton, TextField, Select, SelectChangeEvent, MenuItem, ThemeProvider, FormControl, Divider, Button, } from '@mui/material';
import { searchInputTheme, selectTheme, searchFreqTheme } from '@/components/common/Themes';

const index = () => {
  return (
    <div className='flex flex-col w-full pb-[10px]'>
      <SearchBar />
      <Divider />
      <FrequentSearches />
      <RecentSearches />
    </div>
  )
}
export default index;

function SearchBar() {
  const [sort, setSort] = useState('createdAt,desc');
  const handleSort = (e: SelectChangeEvent) => { setSort(e.target.value); }

  const [searchDate, setSearchDate] = useState('');

  return (
    <div className='flex flex-row mx-[16px] my-[18px] gap-[16px]'>
      <div>
        <IconButton disableRipple className='p-0'><img src='/search_back.svg' /></IconButton>
      </div>
      <div className='flex flex-col gap-[8px]'>
        <div className='flex flex-row bg-gray1-text px-[8px] py-[4px] gap-[8px]'>
          <ThemeProvider theme={searchInputTheme}><TextField placeholder="피크페스티벌" /></ThemeProvider>
          <IconButton disableRipple className='p-0'><img src='/search_magnifying.svg' /></IconButton>
        </div>
        <div className='flex flex-row gap-[10px]'>
          <div className='flex flex-row bg-gray1-text w-[250px] px-[8px] py-[4px] gap-[8px]'>
            <IconButton disableRipple className='p-0 h-[20px] w-[20px]'><img src='/post_calendar.svg' /></IconButton>
            {
              searchDate === ''
                ? <span className='text-[14px] text-gray2-text'>날짜 검색</span>
                : <span className='text-[14px] text-black-text'>날짜</span>
            }
          </div>
          <FormControl variant="standard">
            <ThemeProvider theme={selectTheme}>
              <Select labelId='sort-label' id='sort' value={sort} onChange={handleSort}
                IconComponent={() => { return (<img src='/arrow_select.svg' />) }}>
                <MenuItem value='createdAt,desc'><em>최신순</em></MenuItem>
                <MenuItem value='popular,asc'><em>인기순</em></MenuItem>
                <MenuItem value='comment,desc'><em>댓글순</em></MenuItem>
              </Select>
            </ThemeProvider>
          </FormControl>
        </div>
      </div>
    </div>
  )
}

function FrequentSearches() {
  const freqsearchlist = ['피크페스티벌', '서재페', '종강파티', '방학', '연희동', '와인파티', '볼빨간사춘기', '피크페스티벌', '서재페', '종강파티', '방학']

  return (
    <div className='flex flex-col my-[20px]'>
      <span className='mx-[16px] text-[14px] leading-[160%]'>자주 찾는 검색어입니다</span>
      <div className='overflow-hidden	h-[30px]'>
        <div className='flex h-[60px] py-[8px] px-[16px] overflow-x-scroll overflow-y-hide whitespace-nowrap'>
          {freqsearchlist.map((item, idx) =>
            <ThemeProvider theme={searchFreqTheme}>
              <Button disableRipple value={item} key={`freq-${idx}`}>{item}</Button>
            </ThemeProvider>
          )}
        </div>
      </div>
    </div>
  )
}

interface RecentSearchProps { searchword: string; }
function RecentSearches() {
  const searchlist = ['책과 와인파티', '페스티벌1', '페스티벌2', '페스티벌3', '페스티벌4']
  const SearchBlock = (props: RecentSearchProps) => {
    return (
      <div className='flex flex-row justify-between'>
        <div className='flex flex-row gap-[6px] items-center'>
          <img className='h-[20px] w-[20px]' src='/search_magnifying.svg' />
          <span className='text-[14px] text-gray3-text leading-[160%] font-normal'>{props.searchword}</span>
        </div>
        <IconButton className='p-0'><img src='/search_delete.svg' /></IconButton>
      </div>
    )
  }

  return (
    <div className='flex flex-col mx-[16px] my-[20px] gap-[16px]'>
      <div className='flex flex-row justify-between text-[12px] text-[#757575]'>
        <span>최근 검색어</span>
        <span>전체 삭제</span>
      </div>
      <div className='flex flex-col gap-[8px]'>
        {
          searchlist.map((item, idx) => (
            <SearchBlock searchword={item} />
          ))
        }
      </div>
      <div className='flex justify-center text-[12px] text-gray3-text leading-[160%] font-normal'>검색어 더보기</div>
    </div>
  )
}