import React, { useEffect, useRef } from 'react'
import Header from '../components/Header'
import { useState, useContext } from 'react'
import HandoverRows from '../components/HandoverRows'
import { shiftMembersContext } from '../context/context'
import PreviewHandover from '../components/PreviewHandover'
import { toast } from 'sonner'
import JoditEditor from 'jodit-react';
import SelectHandoverMember from '../components/SelectHandoverMember'
import PreviewHoHeader from '../components/PreviewHoHeader'


const ShiftHandover = () => {
  const [scrollFlag, setScrollFlag] = useState(false)
  const [RenderFlag, setRenderFlag] = useState(false)
  const [shiftValue, setShiftValue] = useState('Select Shift')
  const [currentDate, setCurrentDate] = useState(null)
  const [allottedClients, setAllottedClients] = useState([])
  const [allottedTools, setAllottedTools] = useState([])
  const [isClients, setIsClients] = useState(true)
  const [mainData, setMainData] = useState([])
  const [edit, setEdit] = useState()
  const [editSSL, setEditSSL] = useState()
  const [currentShiftMemebers, setcurrentShiftMemebers] = useState('')
  const [HandoverMember, setHandoverMember] = useState('')
  const [temp, setTemp] = useState([])
  const [hideFlag, setHideFlag] = useState(false)
  const [noteFlag, setNoteFlag] = useState(false)
  const [tempSSL, setTempSSL] = useState([])
  const [mainDataSSl, setMainDataSSL] = useState([])

  const editor = useRef(null);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isShared, setIsShared] = useState(false);
  const [count, setCount] = useState(0)
  const [clientsorToolsFlag, setClientsOrToolsFlag] = useState(true)
  const [sslFlag, setSslFlag] = useState(false)
  const [shiftPeople, setShiftPeople] = useState({})

  const [currentShiftUpdates, setCurrentShiftUpdates] = useState([]);
  const [followUp, setFollowUp] = useState([]);
  const [newSsl, setNewSsl] = useState([]);
  const [renewal, setRenewal] = useState([]);
  const [decom, setDecom] = useState([]);




  let type = 'Handover'
  let tools = localStorage.getItem('TD')
  let slNo = 1;
  let slNos = 1;
  let values = localStorage.getItem('MTD')
  useEffect(() => {
    setAllottedClients(JSON.parse(values))
    setAllottedTools(JSON.parse(tools))
    setTemp(JSON.parse(localStorage.getItem('MD')))
    setTempSSL(JSON.parse(localStorage.getItem('SD')))
    setShiftPeople(JSON.parse(localStorage.getItem('Shift People')))
  }, [])


  const generateEmailBody = () => {

    let emailBody = `<div style="display: flex;align-items: center;"> <table border="1" style="border-collapse: collapse; margin-bottom:10px; "><tr><td style="background-color: #2D3250; color:white; font-weight:bold;padding:10px;text-align:center;">Work Allotment</td><td style="padding:10px;text-align:center;">Vedhitha/Roshan</td></tr><tr><td style="background-color: #2D3250; color:white;font-weight:bold;padding:10px;text-align:center;">Shift Handover</td><td style="padding:10px;text-align:center;">${shiftPeople.Handover}</td></tr></table>`
    //  emailBody += `<div style="display: flex;align-items: center;"> <table border="1" style="border-collapse: collapse; margin-bottom:10px; "><tr>`;
    //  additionalNotes.map((ele)=>{
    //   emailBody+=` <tr><td>${ele}</td></tr></table>`
    //  })


    // emailBody += `<table border="1" style="border-collapse: collapse; margin-bottom:10px; "><tr><td style="background-color: #2D3250; color:white; font-weight:bold;padding:10px;text-align:center;">Associates in Shift</td><td style="padding:10px;text-align:center;">${inShift}</td></tr><tr><td style="background-color: #2D3250; color:white;font-weight:bold;padding:10px;text-align:center;">Associates on Leave</td><td style="padding:10px;text-align:center;">${onLeave}</td></tr> </tr><tr><td style="background-color: #2D3250; color:white;font-weight:bold;padding:10px;text-align:center;">Week off</td><td style="padding:10px;text-align:center;">${onWeekOff}</td></tr></table> </div>`



    emailBody += `<table border="1" style="border-collapse: collapse; margin-bottom:10px; "><tr><td style="background-color: #2D3250; color:white; font-weight:bold;padding:10px;text-align:center;">Associates in Shift</td><td style="padding:10px;text-align:center;">${shiftPeople.inShift}</td></tr><tr><td style="background-color: #2D3250; color:white;font-weight:bold;padding:10px;text-align:center;">Associates on Leave</td><td style="padding:10px;text-align:center;">${shiftPeople.onLeave}</td></tr> </tr><tr><td style="background-color: #2D3250; color:white;font-weight:bold;padding:10px;text-align:center;">Week off</td><td style="padding:10px;text-align:center;">${shiftPeople.onWeekOff}</td></tr></table> </div>`

    emailBody += '<br></br><br></br>'


    emailBody += '<table><tr><th colspan="4" style="color: white; padding:10px ;background-color: #2D3250;">Current Shift Updates</th></tr><tr><th style="color: white; padding:10px ;background-color: #424769;">SL No</th><th style="color: white; padding:10px ;background-color: #424769;">Client Name</th><th style="color: white; padding:10px ;background-color: #424769;">Worked by</th><th style="color: white; padding:10px ;background-color: #424769;">Ticket # associated (JIRA/SN)</th></tr>';
    temp.forEach(user => {
      if (user.type == 'Current Shift Updates') {
        emailBody += `<tr><td style="padding:5px;text-align:center; width:10%;">${slNo}</td><td style="padding:5px;text-align:center; width:80%;">${user.displayClient}</td><td style="padding:5px;text-align:center;width:80%;">${user.assigneeName}</td><td style="padding:5px;text-align:center;width:80%;">${user.jiraTickets}</td></tr>`;
        slNo = slNo + 1
      }
    });
    emailBody += '</table>'

    emailBody += '<br></br><br></br>'


    emailBody += '<table><tr><th colspan="5" style="color: white; padding:10px ;background-color: #2D3250;">Follow-Up</th></tr><tr><th style="color: white; padding:10px ;background-color: #424769;">SL No</th><th style="color: white; padding:10px ;background-color: #424769;">Client Name</th><th style="color: white; padding:10px ;background-color: #424769;">Worked by</th><th style="color: white; padding:10px ;background-color: #424769;">Comments</th></tr>';
    temp.forEach(user => {
      if (user.type == 'Follow Up') {
        emailBody += `<tr><td style="padding:5px;text-align:center; width:10%;">${slNos}</td><td style="padding:5px;text-align:center; width:80%;">${user.displayClient}</td><td style="padding:5px;text-align:center;width:80%;">${user.assigneeName}</td><td style="padding:5px;text-align:center;width:80%;">${user.comments}</td></tr>`;
        slNos = slNos + 1
      }
    });
    emailBody += '</table>'


    emailBody += '<br></br><br></br>'


    emailBody += '<table><tr><th colspan="5" style="color: white; padding:10px ;background-color: #2D3250;">SSL Updates</th></tr><tr><th style="color: white; padding:10px ;background-color: #424769;">SL No</th><th style="color: white; padding:10px ;background-color: #424769;">Client Name</th><th style="color: white; padding:10px ;background-color: #424769;">Worked by</th><th style="color: white; padding:10px ;background-color: #424769;">Associated Ticket No</th><th style="color: white; padding:10px ;background-color: #424769;">Request Type</th><th style="color: white; padding:10px ;background-color: #424769;">Comments</th></tr>';
    tempSSL.forEach(user => {

      emailBody += `<tr><td style="padding:5px;text-align:center; width:10%;">${slNos}</td><td style="padding:5px;text-align:center; width:80%;">${user.displayClient}</td><td style="padding:5px;text-align:center;width:80%;">${user.assigneeName}</td><td style="padding:5px;text-align:center;width:80%;">${user.jiraTickets}</td><td style="padding:5px;text-align:center;width:80%;">${user.SSLType}</td><td style="padding:5px;text-align:center;width:80%;">${user.comments}</td></tr>`;
      slNos = slNos + 1



    });
    emailBody += '</table>'
    // emailBody += '<tr><th colspan="3" style="color: white; padding:10px ;background-color: #2D3250;">Follow-Up</th></tr><tr><th style="color: white; padding:10px ;background-color: #424769;">SL NO</th><th style="color: white; padding:10px ;background-color: #424769;">Monitoring Tools</th><th style="color: white; padding:10px ;background-color: #424769;">Alotted To</th></tr>';
    // temp.map(val => {
    //   let slNo;
    //     emailBody += `<tr><td style="padding:5px;text-align:center; width:10%;">${slNo}</td><td style="padding:5px;text-align:center; width:80%;">${val.displayClient}</td><td style="padding:5px;text-align:center;width:80%;">${val.assigneeName}</td><td style="padding:5px;text-align:center; width:80%;">${val.displayClient}</td><td style="padding:5px;text-align:center;width:80%;">${val.jiraTickets}</td><td style="padding:5px;text-align:center;width:80%;">${val.comments}</td></tr>`;
    //     slNo = slNo + 1
    // });

    // emailBody += '<tr><th colspan="3" style="color: white; padding:10px ;background-color: #2D3250;">Monitoring</th></tr><tr><th style="color: white; padding:10px ;background-color: #424769;">SL NO</th><th style="color: white; padding:10px ;background-color: #424769;">Clients</th><th style="color: white; padding:10px ;background-color: #424769;">Alotted To</th></tr>';
    // tempArr.forEach(user => {
    //   user.clients.forEach((client) => {
    //     emailBody += `<tr><td style="padding:5px;text-align:center; width:10%;">${slNo}</td><td style="padding:5px;text-align:center; width:80%;">${client}</td><td style="padding:5px;text-align:center;width:80%;">${user.name}</td></tr>`;
    //     slNo = slNo + 1
    //   });

    // });
    // emailBody += '</table>';


    return emailBody;
  };

  // To get subject and body for mail
  const handleSendEmail = (count) => {
    //setWorkAllotmentToolsData(toolsArr)
    const subject = `COPS-Shift Handover ${shiftValue === 'Select Shift' ? null : shiftValue} ${currentDate}`;
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
    if (temp.length > 0) {
      localStorage.setItem("MD", JSON.stringify(temp))
    }
    seggregateType(temp);
  }, [temp])

  useEffect(() => {
    if (tempSSL.length > 0) {
      localStorage.setItem("SD", JSON.stringify(tempSSL))
    }
    seggregateSslType(tempSSL)
  }, [tempSSL])


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
    setTemp(filteredVal);

    if (followUp.length == 1) {
      setFollowUp([]);
    }

    if (currentShiftUpdates.length == 1) {
      setCurrentShiftUpdates([]);
    }
  }

  function handleDeleteSSL(e) {
    let filteredVal = tempSSL.filter((ele) => {
      if (e.currentTarget.id == ele.id) {
        toast.error('Deleted ...', {
          description: `You have deleted ${ele.displayClient}`
        })
      }
      return e.currentTarget.id != ele.id;
    })


    localStorage.setItem("SD", JSON.stringify(filteredVal))
    setTempSSL(filteredVal)

    if (newSsl.length == 1) {
      setNewSsl([]);
    }

    if (renewal.length == 1) {
      setRenewal([]);
    }

    if (decom.length == 1) {
      setDecom([]);
    }
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
    console.log(additionalNotes);
  }
  //console.log(temp);
  function handleClientsRadioButton() {
    setSslFlag(false)
    setClientsOrToolsFlag(true)
    setRenderFlag(false)

  }
  function handleSSLRadioButton() {
    setClientsOrToolsFlag(false)
    setSslFlag(true)
    setRenderFlag(true)
  }
  useEffect(() => {
    if (additionalNotes.length > 0) {
      console.log(document.querySelector('.jodit-wysiwyg').innerHTML);
      // console.log(additionalNotes);

    }
  }, [additionalNotes])

  function seggregateType(temp) {
    let followUpType = temp.filter((ele) => ele.type === 'Follow Up');
    let currentStatusType = temp.filter((ele) => ele.type === 'Current Shift Updates');
    if (followUpType.length > 0) {
      setFollowUp(followUpType);
    }

    if (currentStatusType.length > 0) {
      setCurrentShiftUpdates(currentStatusType);
    }
  }

  function seggregateSslType(tempssl) {
    let newSsl = tempssl.filter((ele) => ele.SSLType === 'New');
    if (newSsl.length > 0) {
      setNewSsl(newSsl);
    }

    let renewalSsl = tempssl.filter((ele) => ele.SSLType === 'Renewal');
    if (renewalSsl.length > 0) {
      setRenewal(renewalSsl);
    }

    let decomSsl = tempssl.filter((ele) => ele.SSLType === 'Decommission');
    if (decomSsl.length > 0) {
      setDecom(decomSsl);
    }
  }

  function clearType() {
    setFollowUp([]);
    setCurrentShiftUpdates([]);
  }

  function clearSSLType(){
    setNewSsl([]);
    setRenewal([]);
    setDecom([]);
  }

  let clientHeadingArr = ['Alert and Ticketing Tools', 'Assigned To', 'Type', 'Jira Tickets', 'Comments'];
  let sslHeadingArr = ['SSL Client Name', 'Assigned To', 'Request Type', 'Tickets', 'Comments'];

  // console.log(tempSSL);
  return (
    <>
      {/* <SelectHandoverMember currentShiftMemebers={currentShiftMemebers} getHandoverMember={getHandoverMember} /> */}

      <div className=' font-poppins w-full '>

        {

          allottedClients && allottedTools ?
            <>
              <Header scrollFlag={scrollFlag} handleShiftChange={handleShiftChange} type={type} shiftValue={shiftValue} currentDate={currentDate} handleShare={handleShare} />
              <span className='flex  p-1.5 mt-8'>
                <i class={`${hideFlag ? 'fa fa-caret-square-o-right fa-lg ' : 'fa fa-caret-square-o-right fa-lg fa-rotate-90 '}`} onClick={handleHide} ></i>
              </span>

              <span className='flex gap-4 px-7 py-1 p-1.5 text-md font-poppins'>
                <label><input type="radio" name="button" defaultChecked={true} onChange={handleClientsRadioButton} />Clients/Tools</label>
                <label><input type="radio" name="button" onChange={handleSSLRadioButton} />SSL</label>
              </span>


              {
                clientsorToolsFlag ?
                  hideFlag ? null :
                    <table className='mt-6 w-full border-2 border-white border-separate'>
                      <tr className='text-[15px]'>
                        <th className='p-2 bg-blue-600 text-white rounded-s-lg w-[100px]'>Tools/Clients</th>
                        <th className='p-2 bg-blue-600 text-white w-1/4'>Alert and Ticketing Tools</th>
                        <th className='p-2 bg-blue-600 text-white w-[150px]'>Assigned To</th>
                        <th className='p-2 bg-blue-600 text-white w-[200px]'>Type</th>
                        <th className='p-2 bg-blue-600 text-white w-[200px]'>Jira Tickets</th>
                        <th className='p-2 bg-blue-600 text-white rounded-r-lg'>Comments</th>

                      </tr>
                      <HandoverRows temp={temp} RenderFlag={RenderFlag} setClientsOrToolsFlag={setClientsOrToolsFlag} setTemp={setTemp} edit={edit} setMainData={setMainData} mainData={mainData} allotted={isClients ? allottedClients : allottedTools} getClientsOrTools={getClientsOrTools} setAllottedClients={setAllottedClients} clearType={clearType} />
                    </table> : sslFlag ?
                    hideFlag ? null :
                      <table className='mt-6 w-full border-2 border-white border-separate'>
                        <th colSpan={6} className='p-2 bg-blue-600 text-white rounded-s-lg rounded-r-lg ' >SSL</th>
                        <tr className='text-[15px]'>

                          <th className='p-2 bg-blue-600 text-white rounded-s-lg w-[100px]'>Tools/Clients</th>
                          <th className='p-2 bg-blue-600 text-white w-1/4'>SSL Client Name</th>
                          <th className='p-2 bg-blue-600 text-white w-[150px]'>Assigned To</th>
                          <th className='p-2 bg-blue-600 text-white w-[150px]'>Type of request (CERT Renewal/VIP/Removal)</th>
                          <th className='p-2 bg-blue-600 text-white w-[200px]'>Tickets</th>
                          <th className='p-2 bg-blue-600 text-white rounded-r-lg'>Comments</th>

                        </tr>
                        <HandoverRows temp={tempSSL} RenderFlag={RenderFlag} setTemp={setTempSSL} edit={editSSL} setMainData={setMainDataSSL} mainData={mainData} allotted={isClients ? allottedClients : allottedTools} getClientsOrTools={getClientsOrTools} setAllottedClients={setAllottedClients} setClientsOrToolsFlag={setClientsOrToolsFlag} clearType={clearSSLType} />
                      </table> : setClientsOrToolsFlag(true)
              }

            </>
            : <div className='text-blue-500 text-4xl font-bold w-full h-screen flex items-center justify-center'>Please send work allotment..</div>
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
                  onChange={newNotes => { setAdditionalNotes(newNotes) }}
                //  config={noteCofig}
                />
              </div> : <p className=' py-2  text-sm'> 👈 Click to add Note</p>
            // noteFlag? <textarea placeholder='Write Here..'  className='border-2 border-gray-500' onKeyDown={(event)=>{setAdditionalNotes(event.target.value)}} name="" id="" cols="80" rows="10">{additionalNotes}</textarea> : <p className=' py-2  text-sm'> 👈 Click to add Note</p>
          }
        </div>

        {clientsorToolsFlag ?
          temp.length > 0 &&
          <>
            <table className='mt-6 w-full border-2 border-white border-separate'>
              {/* For Follow up */}
              {followUp.length > 0 && <PreviewHoHeader heading={'Follow Up'} headingArr={clientHeadingArr} />}
              {followUp.length > 0 && followUp.map((ele) => {
                return <PreviewHandover RenderFlag={RenderFlag} localstoreName={'MD'} handleDelete={handleDelete} temp={temp} setMainData={setMainData} mainData={mainData} edit={edit} setEdit={setEdit} ele={ele} />

              })}

              {/* For Current shift updates */}
              {currentShiftUpdates.length > 0 && <PreviewHoHeader heading={'Current Shift Updates'} headingArr={clientHeadingArr} />}
              {currentShiftUpdates.length > 0 && currentShiftUpdates.map((ele) => {
                return <PreviewHandover RenderFlag={RenderFlag} localstoreName={'MD'} handleDelete={handleDelete} temp={temp} setMainData={setMainData} mainData={mainData} edit={edit} setEdit={setEdit} ele={ele} />

              })}
            </table>
          </> : sslFlag ?
            tempSSL.length > 0 &&
            <>
              <table className='mt-6 w-full border-2 border-white border-separate'>
                {/* for renewal */}
                {renewal.length > 0 && <PreviewHoHeader heading={'Renewal'} headingArr={sslHeadingArr} />}
                {renewal.length > 0 && renewal.map((ele) => {
                  return <PreviewHandover RenderFlag={RenderFlag} localstoreName={'SD'} handleDelete={handleDeleteSSL} temp={tempSSL} setMainData={setMainDataSSL} mainData={mainDataSSl} edit={editSSL} setEdit={setEditSSL} ele={ele} />

                })}
                {/* for New */}
                {newSsl.length > 0 && <PreviewHoHeader heading={'New'} headingArr={sslHeadingArr} />}
                {newSsl.length > 0 && newSsl.map((ele) => {
                  return <PreviewHandover RenderFlag={RenderFlag} localstoreName={'SD'} handleDelete={handleDeleteSSL} temp={tempSSL} setMainData={setMainDataSSL} mainData={mainDataSSl} edit={editSSL} setEdit={setEditSSL} ele={ele} />

                })}
                {/* for decommission */}
                {decom.length > 0 && <PreviewHoHeader heading={'Decommission'} headingArr={sslHeadingArr} />}
                {decom.length > 0 && decom.map((ele) => {
                  return <PreviewHandover RenderFlag={RenderFlag} localstoreName={'SD'} handleDelete={handleDeleteSSL} temp={tempSSL} setMainData={setMainDataSSL} mainData={mainDataSSl} edit={editSSL} setEdit={setEditSSL} ele={ele} />

                })}
              </table>
            </> : setClientsOrToolsFlag(true)

        }




      </div>



    </>

  )
}

export default ShiftHandover