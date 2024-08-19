import React, { useEffect,useContext } from 'react'
import { useState } from 'react'
import AllotmentRows from '../components/AllotmentRows'
import SelectHandoverMember from '../components/SelectHandoverMember'
import { toast } from 'sonner';
import Shiftmembersdetails from '../components/Shiftmembersdetails';
import { shiftMembersContext } from '../context/context'
import Header from '../components/Header';
//import { faL } from '@fortawesome/free-solid-svg-icons';

const WorkAllotment = () => {
  const [currentDate, setCurrentDate] = useState(null)
  const [shiftValue, setShiftValue] = useState('Select Shift')
  const [currentShiftMemebers, setcurrentShiftMemebers] = useState('')
  const [optionsTags, setOptionsTags] = useState([]);
  const [toolsTags, setToolsTags] = useState([])
  const [count, setCount] = useState(0)
  const [HandoverMember, setHandoverMember] = useState('')
  const [toolsFlag, setToolsFlag] = useState(false)
  const [monitoringTags, setMonitoringTags] = useState(false)
  const [scrollFlag, setScrollFlag] = useState(false)
  const [inShift, setInShift] = useState([])
  const [onLeave, setOnLeave] = useState([])
  const [onWeekOff, setOnWeekOff] = useState([])
  


  let type='Work Allotment'
  let space = " - "
  let tempArr = [];
  let toolsArr = []
  let slNo = 1;



  const [,workAllomentMonitoringData, setWorkAllomentMonitoringData,workAllotmentToolsData, setWorkAllotmentToolsData] = useContext(shiftMembersContext);

  


  // To generate the email body for mail
  const generateEmailBody = () => {
    let emailBody = `<div style="display: flex;align-items: center;"> <table border="1" style="border-collapse: collapse; margin-bottom:10px; "><tr><td style="background-color: #2D3250; color:white; font-weight:bold;padding:10px;text-align:center;">Work Allotment</td><td style="padding:10px;text-align:center;">Vedhitha/Roshan</td></tr><tr><td style="background-color: #2D3250; color:white;font-weight:bold;padding:10px;text-align:center;">Shift Handover</td><td style="padding:10px;text-align:center;">${HandoverMember}</td></tr></table>`

    emailBody += `<table border="1" style="border-collapse: collapse; margin-bottom:10px; "><tr><td style="background-color: #2D3250; color:white; font-weight:bold;padding:10px;text-align:center;">Associates in Shift</td><td style="padding:10px;text-align:center;">${inShift}</td></tr><tr><td style="background-color: #2D3250; color:white;font-weight:bold;padding:10px;text-align:center;">Associates on Leave</td><td style="padding:10px;text-align:center;">${onLeave}</td></tr> </tr><tr><td style="background-color: #2D3250; color:white;font-weight:bold;padding:10px;text-align:center;">Week off</td><td style="padding:10px;text-align:center;">${onWeekOff}</td></tr></table> </div>`

    emailBody += '<table border="1" style="border-collapse: collapse;">';

    emailBody += '<tr><th colspan="3" style="color: white; padding:10px ;background-color: #2D3250;">Tools</th></tr><tr><th style="color: white; padding:10px ;background-color: #424769;">SL NO</th><th style="color: white; padding:10px ;background-color: #424769;">Monitoring Tools</th><th style="color: white; padding:10px ;background-color: #424769;">Alotted To</th></tr>';
    toolsArr.forEach(user => {
      user.clients.forEach((client) => {
        emailBody += `<tr><td style="padding:5px;text-align:center; width:10%;">${slNo}</td><td style="padding:5px;text-align:center; width:80%;">${client}</td><td style="padding:5px;text-align:center;width:80%;">${user.name}</td></tr>`;
        slNo = slNo + 1
      });
    });

    emailBody += '<tr><th colspan="3" style="color: white; padding:10px ;background-color: #2D3250;">Monitoring</th></tr><tr><th style="color: white; padding:10px ;background-color: #424769;">SL NO</th><th style="color: white; padding:10px ;background-color: #424769;">Clients</th><th style="color: white; padding:10px ;background-color: #424769;">Alotted To</th></tr>';
    tempArr.forEach(user => {
      user.clients.forEach((client) => {
        emailBody += `<tr><td style="padding:5px;text-align:center; width:10%;">${slNo}</td><td style="padding:5px;text-align:center; width:80%;">${client}</td><td style="padding:5px;text-align:center;width:80%;">${user.name}</td></tr>`;
        slNo = slNo + 1
      });

    });
    emailBody += '</table>';
    return emailBody;
  };


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


  const [isShared, setIsShared] = useState(false);


  let shiftMembers = [];


  // to change the heading once shiftvalue is changed
  function handleShiftChange(event) {
    setShiftValue(event.target.value);
    const todayDate = new Date();
    const properDate = ` ${todayDate.getMonth() + 1}/${todayDate.getDate()}/${todayDate.getFullYear()}`
    setCurrentDate(properDate)
  }

  useEffect(() => {
    getHandoverData();
    getClientLists();
    getToolsData();
  }, [shiftValue])


  // To fetch shiftmembers
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

  // To filter the shift members based on shiftvalue
  function getCurrentShiftMembers() {
    const temp = shiftMembers.filter((ele) => {
      return ele.shift === shiftValue
    })
    return temp
  }

  // To fetch clien list
  async function getClientLists() {
    const resp = await fetch('src/utils/clients.json');
    const clients = await resp.json();
    setOptionTagsFunc(clients);
  }

  // To fetch tools list
  async function getToolsData() {
    const response = await fetch('src/utils/tools.json')
    const result = await response.json()
    setToolsTagsFunc(result)
    // console.log(toolsTags);
  }

  // To filter client list based on tags selected
  function filteredClientLists(selectedTags) {
    const filterTags = optionsTags.filter((tag) => {
      return !selectedTags.includes(tag.clientName);
    })
    setOptionTagsFunc(filterTags);
  }

  // To filter tools list based on tags selected
  function filteredToolsLists(selectedTags) {
    const filterTags = toolsTags.filter((tag) => {
      return !selectedTags.includes(tag.clientName);
    })
    setToolsTagsFunc(filterTags);
  }

  // To add the removed client tags to optiontags state
  function addRemovedTags(tags) {
    setOptionsTags([...optionsTags, tags]);
  }

  // To add the removed tools tags to Toolstags state
  function addRemovedToolsTags(tags) {
    setToolsTags([...toolsTags, tags]);
  }

  // Function to set the option tags
  function setOptionTagsFunc(tags) {
    setOptionsTags(tags);
  }

  // Function to set the tools tags 
  function setToolsTagsFunc(tags) {
    setToolsTags(tags);
  }

  // To store the client list for the assigned members
  function allotedClients(singleMember) {
    tempArr.push(...singleMember);
    // setTimeout(() => {
    //   console.log(tempArr);
    // }, 1000)
  }

  // To store the tools list for the assigned members
  function allotedTools(singleMember) {
    toolsArr.push(...singleMember);

    // setTimeout(() => {
    //   console.log(toolsArr);
    // }, 1000)
  }



  // function handleAllData(){
  //   setTimeout(()=>{
  //    // console.log(users);
  //   },500)
  // }

  // To share the mail
  function handleShare() {
    setIsShared(prev => !prev);
    handleSendEmail(count);
    setCount(prev => prev + 1);

    if (tempArr.length && toolsArr.length) {
      localStorage.setItem("MTD",JSON.stringify(tempArr))
      localStorage.setItem("TD",JSON.stringify(toolsArr))
      localStorage.setItem("MD", JSON.stringify([]))
    }
  }

  useEffect(()=>{
    localStorage.setItem("MD", JSON.stringify([]))
  },[])
  // To get the data of the handover member
  function getHandoverMember(member) {
    setHandoverMember(member)
    // console.log(HandoverMember);
  }


  function changeBgClrOnScroll() {
    if (window.scrollY > 30) {
      setScrollFlag(true)
    }
    else {
      setScrollFlag(false)
    }
  }


//console.log('----Monitoring Data ----\n',tempArr,'-----Tools Data------\n',toolsArr);
  window.addEventListener('scroll', changeBgClrOnScroll)

  return (
    <div className=' font-poppins w-full '>
    <Header scrollFlag={scrollFlag} handleShiftChange={handleShiftChange} type={type} shiftValue={shiftValue} currentDate={currentDate} handleShare={handleShare} />
      <div className='flex p-4 flex-col gap-2 items-start justify-between'>

        <Shiftmembersdetails currentShiftMemebers={currentShiftMemebers} getHandoverMember={getHandoverMember} shiftValue={shiftValue} inShift={inShift} onLeave={onLeave} onWeekOff={onWeekOff} setInShift={setInShift} setOnLeave={setOnLeave} setOnWeekOff={setOnWeekOff} />
        <SelectHandoverMember currentShiftMemebers={currentShiftMemebers} getHandoverMember={getHandoverMember} />

      </div>

      <div className='p-4'>
        <table className='mt-6 w-full border-2 border-white border-separate'>
          <tr>
            <th className='p-2 bg-blue-600 text-white rounded-s-lg w-1/4'>Shift Members</th>
            <th className='p-2 bg-blue-600 text-white rounded-r-lg'>Alert and Ticketing Tools</th>
          </tr>
          {currentShiftMemebers ? currentShiftMemebers.map((emp, index) => {
            return <AllotmentRows empname={emp.empname} key={emp.id} idx={index} optionsTags={toolsTags} filteredClientLists={filteredToolsLists} addRemovedTags={addRemovedToolsTags} allotedClients={allotedTools} handleShare={handleShare} isShared={isShared} getHandoverMember={getHandoverMember} disableFlag={toolsFlag} setDisableFlag={setToolsFlag} />
          }) : ''}

        </table>
        <table className='mt-6 w-full border-2 border-white border-separate'>
          <tr>
            <th className='p-2 bg-blue-600 text-white rounded-s-lg w-1/4'>Shift Members</th>
            <th className='p-2 bg-blue-600 text-white rounded-r-lg'>Custom Clients</th>

          </tr>
          {currentShiftMemebers ? currentShiftMemebers.map((emp, index) => {
            return <AllotmentRows empname={emp.empname} key={emp.id} idx={index} optionsTags={optionsTags} filteredClientLists={filteredClientLists} addRemovedTags={addRemovedTags} allotedClients={allotedClients} handleShare={handleShare} isShared={isShared} getHandoverMember={getHandoverMember} disableFlag={monitoringTags} setDisableFlag={setMonitoringTags} />
          }) : ''}


        </table>
      </div>
      
    </div>
  )
}

export default WorkAllotment