import React, { useContext, useEffect, useState } from 'react'
import ShiftAssociates from '../components/ShiftAssociates';
import { shiftMembersContext } from '../context/context'

const AboutShifts = () => {
  const [shiftMembers,,,,] = useContext(shiftMembersContext);
  const [apacMembers, setApacMembers] = useState([]);
  const [emeaMembers, setEmeaMembers] = useState([]);
  const [naMembers, setNaMembers] = useState([]);

  useEffect(() => {
    getMembers(setApacMembers, 'APAC');
    getMembers(setEmeaMembers, 'EMEA');
    getMembers(setNaMembers, 'NA');
  }, [])

  function getMembers(shiftMembersState, shiftValue) {
    let members = [];
    members = shiftMembers.filter((ele) => {
      if (ele.shift == shiftValue) {
        return ele.empname;
      }
    })
    shiftMembersState(members);
  }

  return (
    <div className='flex flex-col items-center p-4 w-full'>
      <div className='flex gap-3 items-center justify-evenly py-2 bg-gradient-to-br from-orange-700 to-orange-400 text-white w-fit px-4 rounded-lg shadow-gray-400 shadow-md font-poppins text-lg'>
        <div className='flex justify-center items-center w-10 h-10 rounded-full bg-white text-orange-500 font-bold'><p>MK</p></div>
        <div>
          <h2 className='font-bold'>Mike Okal</h2>
          <p className='w-full text-gray-100 text-sm'>Director, Operations</p>
        </div>
      </div>

      <div className='flex gap-2 justify-evenly items-center my-9'>
      <div className='flex gap-3 items-center justify-evenly py-2 bg-gradient-to-br from-green-700 to-green-400 text-white w-fit px-4 rounded-lg shadow-gray-400 shadow-md font-poppins text-lg'>
        <div className='flex justify-center items-center w-10 h-10 rounded-full bg-white text-green-500 font-bold'><p>RD</p></div>
        <div>
          <h2 className='font-bold'>Rajiv Dey</h2>
          <p className='w-full text-gray-100 text-sm'>Manager, PSE</p>
        </div>
      </div>
      <div className='flex gap-3 items-center justify-evenly py-2 bg-gradient-to-br from-green-700 to-green-400 text-white w-fit px-4 rounded-lg shadow-gray-400 shadow-md font-poppins text-lg'>
        <div className='flex justify-center items-center w-10 h-10 rounded-full bg-white text-green-500 font-bold'><p>RP</p></div>
        <div>
          <h2 className='font-bold'>Roshan Poojary</h2>
          <p className='w-full text-gray-100 text-sm'>Lead Developer</p>
        </div>
      </div>
      <div className='flex gap-3 items-center justify-evenly py-2 bg-gradient-to-br from-green-700 to-green-400 text-white w-fit px-4 rounded-lg shadow-gray-400 shadow-md font-poppins text-lg'>
        <div className='flex justify-center items-center w-10 h-10 rounded-full bg-white text-green-500 font-bold'><p>SV</p></div>
        <div>
          <h2 className='font-bold'>S Vedhitha</h2>
          <p className='w-full text-gray-100 text-sm'>Lead PSE</p>
        </div>
      </div>
      </div>
      <div className='flex flex-wrap items-center justify-center gap-4'>
        <ShiftAssociates shiftValue={"APAC"} shiftAssociates={apacMembers} />
        <ShiftAssociates shiftValue={"EMEA"} shiftAssociates={emeaMembers} />
        <ShiftAssociates shiftValue={"NA"} shiftAssociates={naMembers} />
      </div>
    </div>


  )
}

export default AboutShifts