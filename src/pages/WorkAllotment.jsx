import React from 'react'
import { useState } from 'react'

const WorkAllotment = () => {

const [shiftValue,setShiftValue]=useState('Select Shift')

function handleShiftChange(event){
  setShiftValue(event.target.value);
}

  return (
    <div className='p-4 font-poppins w-full'>
      <div className='flex justify-between items-center'>
      <h1 className='font-semibold text-gray-600 text-xl'>COPS-WorkAlloment {shiftValue==='Select Shift'? null:shiftValue}</h1>
      <div className='flex gap-2'>
      <select name="shifts" defaultValue={shiftValue} onChange={handleShiftChange} id="shifts" className='border-2 border-black rounded-md outline-none'>
        <option value="" className='hidden'>Select Shift</option>
        <option value="APAC">APAC</option>
        <option value="EMEA">EMEA</option>
        <option value="NA">NA</option>
      </select>
      <button className='py-1 px-3 bg-blue-500 rounded-md text-white'>Share</button>
      </div>
      
      </div>
      
    </div>
  )
}

export default WorkAllotment