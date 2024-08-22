import React from 'react'

const PreviewHoHeader = ({heading,headingArr}) => {
  return (
    <>
         <tr>
                <th className='bg-blue-600 text-white p-1 rounded-lg w-full' colSpan={5}>{heading}</th>
              </tr>
              <tr className='text-sm'>
                <th className='p-2 bg-blue-600 text-white rounded-s-lg w-1/4 h-5'>{headingArr[0]}</th>
                <th className='p-2 bg-blue-600 text-white w-[200px] h-5'>{headingArr[1]}</th>
                <th className='p-2 bg-blue-600 text-white w-[250px] h-5'>{headingArr[2]}</th>
                <th className='p-2 bg-blue-600 text-white w-[250px] h-5'>{headingArr[3]}</th>
                <th className='p-2 bg-blue-600 text-white rounded-r-lg w-1/3 h-5'>{headingArr[4]}</th>
                <th></th>
              </tr>
    </>
  )
}

export default PreviewHoHeader