import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import NavRoutes from './NavRoutes'
import { shiftMembersContext } from './context/context'


const App = () => {

  const [shiftMembers, setShiftMembers] = useState([]);
  const [workAllomentMonitoringData, setWorkAllomentMonitoringData] = useState([])
  const [workAllotmentToolsData, setWorkAllotmentToolsData] = useState([])

  useEffect(() => {
    getShiftMembers();

    if(localStorage.getItem('MD')==null|| localStorage.getItem('SD')==0 ){
      localStorage.setItem("MD", JSON.stringify([]))
      localStorage.setItem("SD", JSON.stringify([]))
    }


    console.log(JSON.parse(localStorage.getItem('MD')));
  }, [])



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
      <shiftMembersContext.Provider value={[shiftMembers, workAllomentMonitoringData, setWorkAllomentMonitoringData, workAllotmentToolsData, setWorkAllotmentToolsData]}>
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