import React from 'react'

function AssoicatesStatus({members,filterAssociates}) {
    return (


        <div className='flex gap-2 flex-wrap items-center'>
            {
                members.length > 0 ? members.map((ele, idx) => {
                    return <p onClick={filterAssociates} className='bg-white text-blue-900 font-semibold px-3  py-1 w-fit rounded-full text-[12px] hover:cursor-pointer' >{ele}</p>
                }) : null
            }
        </div>

    )
}

export default AssoicatesStatus