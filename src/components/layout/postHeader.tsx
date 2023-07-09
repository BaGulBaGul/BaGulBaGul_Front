import React from 'react'

function postHeader() {
    return (
        <div className="fixed top-0 left-0 right-0 flex-row flex w-full justify-between px-[24px] py-[10px] bg-[#FFFFFF]">
            <a href="/"><img src='/arrow_prev.svg' /></a>
            <div>
                파티글 작성하기
            </div>
            <div className='w-[24px]'></div>
        </div>

    )
}

export default postHeader