import React, { useEffect } from 'react'
import Header from '../components/Header'
import { useState, useContext } from 'react'
import HandoverRows from '../components/HandoverRows'
import { shiftMembersContext } from '../context/context'
import PreviewHandover from '../components/PreviewHandover'



const ShiftHandover = () => {
  const [scrollFlag, setScrollFlag] = useState(false)

  const [shiftValue, setShiftValue] = useState('Select Shift')
  const [currentDate, setCurrentDate] = useState(null)
  const [allottedClients, setAllottedClients] = useState([])
  const [allottedTools, setAllottedTools] = useState([])
  const [isClients, setIsClients] = useState(true)
  const [mainData, setMainData] = useState([])
  const [edit,setEdit]=useState()
  const [temp,setTemp]=useState([])
  const [nullFlag,setNullFlag]=useState(true)
 
  // const [,workAllomentMonitoringData, setWorkAllomentMonitoringData,workAllotmentToolsData, setWorkAllotmentToolsData] = useContext(shiftMembersContext);


  let type = 'Handover'
  let tools = localStorage.getItem('TD')
  
  let values = localStorage.getItem('MTD')
  useEffect(() => {
    setAllottedClients(JSON.parse(values))
    setAllottedTools(JSON.parse(tools))
    setTemp(JSON.parse(localStorage.getItem('MD')))
  }, [])

  

     console.log(temp);



  // To get subject and body for mail
  const handleSendEmail = (count) => {

    // setWorkAllotmentToolsData(toolsArr)
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

  //   // To share the mail
  function handleShare() {
    setIsShared(prev => !prev);
    //handleAllData();
    // handleSendEmail(count);
    setCount(prev => prev + 1);
    // setTimeout(()=>{
    //   handleSendEmail(count);
    //   setCount(prev=>prev+1);
    // },50)

  }


  function getClientsOrTools(val) {
    if (val == 'Clients') {
      setIsClients(true)
    }
    else {
      setIsClients(false)
    }
  }


  useEffect(() => {
    // console.log(mainData);
  }, [mainData])



useEffect(()=>{

  if (temp.length>0) {
    localStorage.setItem("MD", JSON.stringify(temp))
}
},[temp])


  // console.log(workAllotmentToolsData)

console.log(mainData);
  window.addEventListener('scroll', changeBgClrOnScroll)


  return (
    <>
      <div className=' font-poppins w-full '>
        {
          allottedClients && allottedTools ?
            <>
              <Header scrollFlag={scrollFlag} handleShiftChange={handleShiftChange} type={type} shiftValue={shiftValue} currentDate={currentDate} handleShare={handleShare} />
              <table className='mt-6 w-full border-2 border-white border-separate'>
                <tr>
                  <th className='p-2 bg-blue-600 text-white rounded-s-lg w-[100px]'>Tools/Clients</th>
                  <th className='p-2 bg-blue-600 text-white rounded-s-lg w-1/4'>Alert and Ticketing Tools</th>
                  <th className='p-2 bg-blue-600 text-white rounded-r-lg w-[150px]'>Assigned To</th>
                  <th className='p-2 bg-blue-600 text-white rounded-r-lg w-[200px]'>Jira Tickets</th>
                  <th className='p-2 bg-blue-600 text-white rounded-r-lg'>Comments</th>

                </tr>
                <HandoverRows temp={temp} setTemp={setTemp} edit={edit} setMainData={setMainData} mainData={mainData} allotted={isClients ? allottedClients : allottedTools} getClientsOrTools={getClientsOrTools} setAllottedClients={setAllottedClients} />
              </table>
            </>
            : <div>Please send work allotment..</div>
        }

        {temp!=null &&
          <>
            <table className='mt-6 w-full border-2 border-white border-separate'>
              <tr>
                <th className='p-2 bg-blue-600 text-white rounded-s-lg w-1/4'>Alert and Ticketing Tools</th>
                <th className='p-2 bg-blue-600 text-white rounded-r-lg w-[150px]'>Assigned To</th>
                <th className='p-2 bg-blue-600 text-white rounded-r-lg w-[200px]'>Jira Tickets</th>
                <th className='p-2 bg-blue-600 text-white rounded-r-lg w-1/2'>Comments</th>

              </tr>
              {temp.map((ele) => {
                return <PreviewHandover temp={temp} setMainData={setMainData} mainData={mainData} edit={edit} setEdit={setEdit} ele={ele} /> 
                
              })}
              

              


            </table>
          </>
        }




      </div>



    </>

  )
}

export default ShiftHandover