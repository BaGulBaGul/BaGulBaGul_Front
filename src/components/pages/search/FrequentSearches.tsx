export function FrequentSearches() {
  const freqsearchlist = ['피크페스티벌', '서재페', '종강파티', '방학', '연희동', '와인파티', '볼빨간사춘기', '피크페스티벌', '서재페', '종강파티', '방학']
  return (
    <div className='flex flex-col py-[20px]'>
      <span className='px-[16px] text-14'>자주 찾는 검색어입니다</span>
      <div className='overflow-hidden	h-[30px]'>
        <div className='flex h-[60px] py-[8px] px-[16px] overflow-x-scroll overflow-y-hide whitespace-nowrap'>
          {freqsearchlist.map((item, idx) =>
            <button className='searchfreq-btn' key={`freq-${idx}`}>{item}</button>
          )}
        </div>
      </div>
    </div>
  )
}

interface RecentSearchProps { searchword: string; idx: number; }
export function RecentSearches() {
  const searchlist = ['책과 와인파티', '페스티벌1', '페스티벌2', '페스티벌3', '페스티벌4']
  const SearchBlock = (props: RecentSearchProps) => {
    return (
      <div className='flex flex-row justify-between'>
        {
          props.idx === 0
            ? <>
              <div className='flex flex-row gap-[6px] items-center'>
                <img className='h-[20px] w-[20px]' src='/search_magnifying.svg' />
                <span className='text-14 text-gray3'>{props.searchword}</span>
              </div>
              <button><img src='/search_delete.svg' /></button>
            </>
            : <>
              <div className='flex flex-row gap-[6px] items-center'>
                <img className='h-[20px] w-[20px]' src='/search_magnifying_1.svg' />
                <span className='text-14 text-gray2'>{props.searchword}</span>
              </div>
              <button><img src='/search_delete_1.svg' /></button>
            </>
        }
      </div>
    )
  }

  return (
    <div className='flex flex-col px-[16px] py-[20px] gap-[16px]'>
      <div className='flex flex-row justify-between text-12 text-[#757575]'>
        <span>최근 검색어</span>
        <button className='text-gray3'>전체삭제</button>
      </div>
      <div className='flex flex-col gap-[8px]'>
        {
          searchlist.map((item, idx) => (
            <SearchBlock searchword={item} idx={idx} key={`recent-${idx}`} />
          ))
        }
      </div>
      <div className='flex justify-center text-12 text-gray3'>검색어 더보기</div>
    </div>
  )
}