import React from 'react'

const ShiftAssociates = ({shiftValue,shiftAssociates}) => {
  return (
    <div className='bg-gradient-to-br from-blue-700 to-blue-400 text-white w-48 h-full pb-7 rounded-lg shadow-gray-400 shadow-md font-poppins text-lg'>
         <h2 className='bg-white text-blue-600 mb-2 mt-4 ml-2 px-2 py-1 rounded-s-full shadow-gray-700 shadow-md'>{shiftValue}</h2>
        {shiftAssociates.map((member)=>{
          return <p className='px-3'>{member.empname}</p>
        })}
    </div>
  )
}

export default ShiftAssociates