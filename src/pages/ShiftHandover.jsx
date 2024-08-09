import React, { useEffect, useRef } from 'react'
import Header from '../components/Header'
import { useState, useContext } from 'react'
import HandoverRows from '../components/HandoverRows'
import { shiftMembersContext } from '../context/context'
import PreviewHandover from '../components/PreviewHandover'
import { toast } from 'sonner'
import JoditEditor from 'jodit-react';

const ShiftHandover = () => {
  const [scrollFlag, setScrollFlag] = useState(false)

  const [shiftValue, setShiftValue] = useState('Select Shift')
  const [currentDate, setCurrentDate] = useState(null)
  const [allottedClients, setAllottedClients] = useState([])
  const [allottedTools, setAllottedTools] = useState([])
  const [isClients, setIsClients] = useState(true)
  const [mainData, setMainData] = useState([])
  const [edit, setEdit] = useState()
  const [temp, setTemp] = useState([])
  const [hideFlag, setHideFlag] = useState(false)
  const [noteFlag, setNoteFlag] = useState(false)

  const editor = useRef(null);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isShared, setIsShared] = useState(false);
  const [count, setCount] = useState(0)

  // const [,workAllomentMonitoringData, setWorkAllomentMonitoringData,workAllotmentToolsData, setWorkAllotmentToolsData] = useContext(shiftMembersContext);


  let type = 'Handover'
  let tools = localStorage.getItem('TD')

  let values = localStorage.getItem('MTD')
  useEffect(() => {
    setAllottedClients(JSON.parse(values))
    setAllottedTools(JSON.parse(tools))
    setTemp(JSON.parse(localStorage.getItem('MD')))
  }, [])



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

  const generateEmailBody = () => {
    // let emailBody = `<div style="display: flex;align-items: center;"> <table border="1" style="border-collapse: collapse; margin-bottom:10px; "><tr><td style="background-color: #2D3250; color:white; font-weight:bold;padding:10px;text-align:center;">Work Allotment</td><td style="padding:10px;text-align:center;">Vedhitha/Roshan</td></tr><tr><td style="background-color: #2D3250; color:white;font-weight:bold;padding:10px;text-align:center;">Shift Handover</td><td style="padding:10px;text-align:center;">${HandoverMember}</td></tr></table>`

    // emailBody += `<table border="1" style="border-collapse: collapse; margin-bottom:10px; "><tr><td style="background-color: #2D3250; color:white; font-weight:bold;padding:10px;text-align:center;">Associates in Shift</td><td style="padding:10px;text-align:center;">${inShift}</td></tr><tr><td style="background-color: #2D3250; color:white;font-weight:bold;padding:10px;text-align:center;">Associates on Leave</td><td style="padding:10px;text-align:center;">${onLeave}</td></tr> </tr><tr><td style="background-color: #2D3250; color:white;font-weight:bold;padding:10px;text-align:center;">Week off</td><td style="padding:10px;text-align:center;">${onWeekOff}</td></tr></table> </div>`

    // emailBody += '<table border="1" style="border-collapse: collapse;">';

    // emailBody += '<tr><th colspan="3" style="color: white; padding:10px ;background-color: #2D3250;">Tools</th></tr><tr><th style="color: white; padding:10px ;background-color: #424769;">SL NO</th><th style="color: white; padding:10px ;background-color: #424769;">Monitoring Tools</th><th style="color: white; padding:10px ;background-color: #424769;">Alotted To</th></tr>';
    // toolsArr.forEach(user => {
    //   user.clients.forEach((client) => {
    //     emailBody += `<tr><td style="padding:5px;text-align:center; width:10%;">${slNo}</td><td style="padding:5px;text-align:center; width:80%;">${client}</td><td style="padding:5px;text-align:center;width:80%;">${user.name}</td></tr>`;
    //     slNo = slNo + 1
    //   });
    // });

    // emailBody += '<tr><th colspan="3" style="color: white; padding:10px ;background-color: #2D3250;">Monitoring</th></tr><tr><th style="color: white; padding:10px ;background-color: #424769;">SL NO</th><th style="color: white; padding:10px ;background-color: #424769;">Clients</th><th style="color: white; padding:10px ;background-color: #424769;">Alotted To</th></tr>';
    // tempArr.forEach(user => {
    //   user.clients.forEach((client) => {
    //     emailBody += `<tr><td style="padding:5px;text-align:center; width:10%;">${slNo}</td><td style="padding:5px;text-align:center; width:80%;">${client}</td><td style="padding:5px;text-align:center;width:80%;">${user.name}</td></tr>`;
    //     slNo = slNo + 1
    //   });

    // });
    // emailBody += '</table>';
    let emailBody =`${additionalNotes}`
    
    return emailBody;
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
    handleSendEmail(count);
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



  useEffect(() => {

    if (temp.length > 0) {
      localStorage.setItem("MD", JSON.stringify(temp))
    }
  }, [temp])


  // console.log(workAllotmentToolsData)

  window.addEventListener('scroll', changeBgClrOnScroll)

  function handleDelete(e) {
    let filteredVal = temp.filter((ele) => {
      if (e.currentTarget.id == ele.id) {
        toast.error('Deleted ...', {
          description: `You have deleted ${ele.displayClient}`
        })
      }
      return e.currentTarget.id != ele.id;
    })


    localStorage.setItem("MD", JSON.stringify(filteredVal))
    setTemp(filteredVal)
  }

  function handleHide() {
    if (hideFlag == false) {
      toast.info('Alerts/Clients Bar Hidden', {
        duration: 700,
      });
    }
    else {
      toast.info('Displaying Alerts/Clients Bar', {
        duration: 700,
      });
    }
    setHideFlag(!hideFlag)
  }

  function handleNote() {
    setNoteFlag(!noteFlag)
  }
  let tem='<p>Santosh</p>'
  console.log(tem);
  return (
    <>
      <div className=' font-poppins w-full '>

        {

          allottedClients && allottedTools ?
            <>
              <Header scrollFlag={scrollFlag} handleShiftChange={handleShiftChange} type={type} shiftValue={shiftValue} currentDate={currentDate} handleShare={handleShare} />
              <span className='p-1.5'>
                <i class={`${hideFlag ? 'fa fa-caret-square-o-right fa-lg ' : 'fa fa-caret-square-o-right fa-lg fa-rotate-90 '}`} onClick={handleHide} ></i>
              </span>

              {
                hideFlag ? null :
                  <table className='mt-6 w-full border-2 border-white border-separate'>
                    <tr className='text-[15px]'>
                      <th className='p-2 bg-blue-600 text-white rounded-s-lg w-[100px]'>Tools/Clients</th>
                      <th className='p-2 bg-blue-600 text-white w-1/4'>Alert and Ticketing Tools</th>
                      <th className='p-2 bg-blue-600 text-white w-[150px]'>Assigned To</th>
                      <th className='p-2 bg-blue-600 text-white w-[200px]'>Jira Tickets</th>
                      <th className='p-2 bg-blue-600 text-white rounded-r-lg'>Comments</th>

                    </tr>
                    <HandoverRows temp={temp} setTemp={setTemp} edit={edit} setMainData={setMainData} mainData={mainData} allotted={isClients ? allottedClients : allottedTools} getClientsOrTools={getClientsOrTools} setAllottedClients={setAllottedClients} />
                  </table>
              }

            </>
            : <div>Please send work allotment..</div>
          // <i class="fa-solid fa-angle-up" onClick={handleHide}></i> 

        }


        <div className='p-2 flex'>
          <span className=' p-1 text-blue-600'>
            <i onClick={handleNote} class={`${noteFlag ? 'fa-solid fa-note-sticky ' : 'fa-solid fa-note-sticky  fa-shake'}`}></i>
          </span>

          {
            noteFlag ?
              <div id='myjoditEditor'>
                <JoditEditor
                  ref={editor}
                  value={additionalNotes}
                  onChange={newNotes => setAdditionalNotes(newNotes)}
                //  config={noteCofig}
                />
              </div> : <p className=' py-2  text-sm'> 👈 Click to add Note</p>
              // noteFlag? <textarea className='border-2 border-gray-500' name="" id="" cols="80" rows="10"></textarea>: <p className=' py-2  text-sm'> 👈 Click to add Note</p>
          }
        </div>

        {temp.length > 0 &&
          <>
            <table className='mt-6 w-full border-2 border-white border-separate'>
              <tr className='text-sm'>
                <th className='p-2 bg-blue-600 text-white rounded-s-lg w-1/4 h-5'>Alert and Ticketing Tools</th>
                <th className='p-2 bg-blue-600 text-white w-[200px] h-5'>Assigned To</th>
                <th className='p-2 bg-blue-600 text-white w-[250px] h-5'>Jira Tickets</th>
                <th className='p-2 bg-blue-600 text-white rounded-r-lg w-1/3 h-5'>Comments</th>
                <th></th>
              </tr>
              {temp.map((ele) => {
                return <PreviewHandover handleDelete={handleDelete} temp={temp} setMainData={setMainData} mainData={mainData} edit={edit} setEdit={setEdit} ele={ele} />

              })}
            </table>
          </>
        }




      </div>



    </>

  )
}

export default ShiftHandover