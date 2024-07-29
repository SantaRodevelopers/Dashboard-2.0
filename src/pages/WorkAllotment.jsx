import React from 'react'

const WorkAllotment = () => {
  return (
    <div className='p-4 font-poppins w-full'>
      <div className='flex justify-between'>
      <h1>COPS-WorkAlloment</h1>
      <select name="shifts" id="shifts">
        <option value="APAC">APAC</option>
        <option value="EMEA">EMEA</option>
        <option value="NA">NA</option>

      </select>
      
      </div>
      
    </div>
  )
}

export default WorkAllotment