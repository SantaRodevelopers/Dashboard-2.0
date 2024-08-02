import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import NavRoutes from './NavRoutes'
import { shiftMembersContext } from './context/context'

const App = () => {

  const [shiftMembers,setShiftMembers] = useState([]);

  useEffect(()=>{
    getShiftMembers();
  },[])

  async function getShiftMembers() {
    try {
      const response = await fetch('src/utils/shiftmemebersdata.json')
      let shiftMembersList = await response.json()
      if (shiftMembersList.length > 0) {
        setShiftMembers(shiftMembersList);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <shiftMembersContext.Provider value={shiftMembers}>
    <div className='flex w-full'>
        <div className='h-screen w-1/4 sticky top-0'>
          <Navbar />
        </div>
        <NavRoutes />
      </div>
    </shiftMembersContext.Provider>
    </>
  )
}

export default App