import React from 'react'
import Header from '../components/Header'
import { useState,useContext } from 'react'
import HandoverRows from '../components/HandoverRows'
import { shiftMembersContext } from '../context/context'

const ShiftHandover = () => {
  const [scrollFlag, setScrollFlag] = useState(false)
  const [shiftValue, setShiftValue] = useState('Select Shift')
  const [currentDate, setCurrentDate] = useState(null)
  

  const [,workAllomentMonitoringData, setWorkAllomentMonitoringData,workAllotmentToolsData, setWorkAllotmentToolsData] = useContext(shiftMembersContext);


  let type = 'Handover'


  // To get subject and body for mail
  const handleSendEmail = (count) => {
    setWorkAllomentMonitoringData(tempArr)
    setWorkAllotmentToolsData(toolsArr)
    const subject = `COPS-WorkAlloment ${shiftValue === 'Select Shift' ? null : shiftValue} ${space} ${currentDate}`;
    const body = generateEmailBody();
    if (count == 0) {
      null
      //setEmailFlag(false)
    }
    else {
      const date = new Date();
      const maindate = ` ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear() + " " + date.getHours() + ":"
        + date.getMinutes() + ":" + date.getSeconds()}`

      fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ subject, body })
      })
        .then(response => response.text())
        .then(result => toast.success('Email Sent..', {
          description: `Mail sent at ${maindate}`
        }))

        .catch(error => console.error('Error:', error));
      setCount(0)
      //setEmailFlag(prev=>!prev)
    }

  };

  function changeBgClrOnScroll() {
    if (window.scrollY > 30) {
      setScrollFlag(true)
    }
    else {
      setScrollFlag(false)
    }
  }

  function handleShiftChange(event) {
    setShiftValue(event.target.value);
    const todayDate = new Date();
    const properDate = ` ${todayDate.getMonth() + 1}/${todayDate.getDate()}/${todayDate.getFullYear()}`
    setCurrentDate(properDate)
  }

  // To share the mail
  function handleShare() {
    setIsShared(prev => !prev);
    //handleAllData();
    handleSendEmail(count);
    setCount(prev => prev + 1);
    // setTimeout(()=>{
    //   handleSendEmail(count);
    //   setCount(prev=>prev+1);
    // },50)

  }
  console.log(workAllotmentToolsData)
  window.addEventListener('scroll', changeBgClrOnScroll)


  return (
    <div className=' font-poppins w-full '>
      <Header scrollFlag={scrollFlag} handleShiftChange={handleShiftChange} type={type} shiftValue={shiftValue} currentDate={currentDate} handleShare={handleShare} />


      <table className='mt-6 w-full border-2 border-white border-separate'>
       
          <tr>
            <th className='p-2 bg-blue-600 text-white rounded-s-lg w-1/4'>Alert and Ticketing Tools</th>
            <th className='p-2 bg-blue-600 text-white rounded-r-lg'>Assigned To</th>
            <th className='p-2 bg-blue-600 text-white rounded-r-lg'>Jira Tickets</th>
            <th className='p-2 bg-blue-600 text-white rounded-r-lg'>Comments</th>

          </tr>
          {/* {currentShiftMemebers ? currentShiftMemebers.map((emp, index) => {
            return <AllotmentRows empname={emp.empname} key={emp.id} idx={index} optionsTags={toolsTags} filteredClientLists={filteredToolsLists} addRemovedTags={addRemovedToolsTags} allotedClients={allotedTools} handleShare={handleShare} isShared={isShared} getHandoverMember={getHandoverMember} disableFlag={toolsFlag} setDisableFlag={setToolsFlag} />
          }) : ''} */}
        <HandoverRows workAllotmentToolsData={workAllotmentToolsData} />
        </table>
        
        <button className= {`py-1 px-3 bg-blue-600 hover:bg-blue-400 transition-all duration-100 rounded-md text-white`} >Add More</button>
    </div>


  )
}

export default ShiftHandover