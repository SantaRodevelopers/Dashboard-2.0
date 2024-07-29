import React, { useEffect } from 'react'
import { useState } from 'react'
import AllotmentRows from '../components/AllotmentRows'


const WorkAllotment = () => {
  const [currentDate, setCurrentDate] = useState(null)
  const [shiftValue, setShiftValue] = useState('Select Shift')
  const [currentShiftMemebers, setcurrentShiftMemebers] = useState('')

  let shiftMembers = []



  function handleShiftChange(event) {
    setShiftValue(event.target.value);
    const todayDate = new Date();
    const properDate = `${todayDate.getMonth() + 1}/${todayDate.getDate()}/${todayDate.getFullYear()}`
    setCurrentDate(properDate)
  }
  useEffect(() => {
    getHandoverData()
  }, [shiftValue])

  async function getHandoverData() {
    try {
      const response = await fetch('src/utils/shiftmemebersdata.json')
      shiftMembers = await response.json()
      if (shiftMembers.length > 0) {
        setcurrentShiftMemebers(getCurrentShiftMembers())
      }
    } catch (error) {
      console.log(error);
    }
  }

  function getCurrentShiftMembers() {
    const temp = shiftMembers.filter((ele) => {
      return ele.shift === shiftValue
    })
    return temp
  }

  console.log(currentShiftMemebers);

  return (
    <div className='p-4 font-poppins w-full'>
      <div className='flex justify-between items-center'>
        <h1 className='font-semibold text-gray-600 text-xl'>COPS-WorkAlloment {shiftValue === 'Select Shift' ? null : `${shiftValue} `}{currentDate}</h1>
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

      <div>
        <table className='mt-6 w-full border-2 border-white border-separate'>
          <tr>
            <th className='p-2 bg-blue-600 text-white rounded-s-lg w-1/4'>Shift Members</th>
            <th className='p-2 bg-blue-600 text-white rounded-r-lg'>Custom Clients</th>
          </tr>
            {currentShiftMemebers ? currentShiftMemebers.map((emp, index) => {
              return <AllotmentRows empname={emp.empname} key={emp.id} idx={index} />
            }) : ''}
        </table>
      </div>

    </div>
  )
}

export default WorkAllotment