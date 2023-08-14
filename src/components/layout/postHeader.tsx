import React from 'react'

function postHeader({ name, url }: any) {
    

    return (
        <div className="fixed top-[44px] left-0 right-0 flex-row flex w-full justify-between px-[24px] py-[10px] bg-[#FFFFFF]">
            <a href={url}><img src='/arrow_prev.svg' /></a>
            <div>
                {name}
            </div>
            <div className='w-[24px]'></div>
        </div>

    )
}

export default postHeader