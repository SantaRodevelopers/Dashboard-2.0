import React from 'react'

function SelectHandoverMember({currentShiftMemebers,getHandoverMember,shiftValue}) {
  return (
    <div className={`flex items-center gap-2 mt-4 ${shiftValue!='Select Shift'? 'opacity-1 transition-opacity': 'opacity-0'}`}>
      <p className={`px-4 py-2 bg-blue-600 text-white rounded-lg w-fit `}>Handover</p>
        <select name="" id="" className='border-2 border-gray-500 px-4 py-1 rounded-md' onChange={(event)=>getHandoverMember(event.target.value)}>
          <option  value="Select">Select</option>
        {currentShiftMemebers?currentShiftMemebers.map((ele)=>{
         return <option value={ele.empname} >{ele.empname}</option>
        }):''}
        </select>
    </div>
  )
}

export default SelectHandoverMember