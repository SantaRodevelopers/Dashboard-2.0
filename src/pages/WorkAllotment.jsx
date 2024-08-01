import React, { useEffect } from 'react'
import { useState } from 'react'
import AllotmentRows from '../components/AllotmentRows'
import SelectHandoverMember from '../components/SelectHandoverMember'
import { toast } from 'sonner';

const WorkAllotment = () => {
  const [currentDate, setCurrentDate] = useState(null)
  const [shiftValue, setShiftValue] = useState('Select Shift')
  const [currentShiftMemebers, setcurrentShiftMemebers] = useState('')
  const [optionsTags, setOptionsTags] = useState([]);
  const [toolsTags, setToolsTags] = useState([])
  const [count, setCount] = useState(0)
  const [emailFlag, setEmailFlag] = useState(false)
  const [HandoverMember, setHandoverMember] = useState('')
  let space = " - "
  let tempArr = [];
  let toolsArr = []
  let slNo = 1;


  const generateEmailBody = () => {
    let emailBody = `<table border="1" style="border-collapse: collapse; margin-bottom:10px; "><tr><td style="background-color: #2D3250; color:white; font-weight:bold;padding:10px;text-align:center;">Work Allotment</td><td style="padding:10px;text-align:center;">Vedhitha/Roshan</td></tr><tr><td style="background-color: #2D3250; color:white;font-weight:bold;padding:10px;text-align:center;">Shift Handover</td><td style="padding:10px;text-align:center;">${HandoverMember}</td></tr></table>`
    emailBody += '<table border="1" style="border-collapse: collapse;">';

    emailBody += '<tr><th colspan="3" style="color: white; padding:10px ;background-color: #2D3250;">Tools</th></tr><tr><th style="color: white; padding:10px ;background-color: #424769;">SL NO</th><th style="color: white; padding:10px ;background-color: #424769;">Tools</th><th style="color: white; padding:10px ;background-color: #424769;">Alotted To</th></tr>';
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

  const handleSendEmail = (count) => {
    const subject = `COPS-WorkAlloment ${shiftValue === 'Select Shift' ? null : shiftValue} ${space} ${currentDate}`;
    const body = generateEmailBody();
    if (count == 0) {
      null
      //setEmailFlag(false)
    }
    else {
      const date = new Date();
      const maindate = ` ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()+ " "+ date.getHours() + ":" 
      + date.getMinutes() + ":" + date.getSeconds()}`

      fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ subject, body })
      })
        .then(response => response.text())
        .then(result => toast.success('Email Sent..',{
          description: `Mail sent at ${maindate}`}))
        
        .catch(error => console.error('Error:', error));
        setCount(0)
      //setEmailFlag(prev=>!prev)
    }

  };


  const [isShared, setIsShared] = useState(false);


  let shiftMembers = [];

  // useEffect(()=>{
  //   handleAllData(); // to overcome two timeshare 
  // },[isShared])


  // useEffect(()=>{
  //   handleSendEmail()
  // },[emailFlag])

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

  async function getClientLists() {
    const resp = await fetch('src/utils/clients.json');
    const clients = await resp.json();
    setOptionTagsFunc(clients);
  }
  async function getToolsData() {
    const response = await fetch('src/utils/tools.json')
    const result = await response.json()
    setToolsTagsFunc(result)
    // console.log(toolsTags);
  }

  function filteredClientLists(selectedTags) {
    const filterTags = optionsTags.filter((tag) => {
      return !selectedTags.includes(tag.clientName);
    })
    setOptionTagsFunc(filterTags);
  }

  function filteredToolsLists(selectedTags) {
    const filterTags = toolsTags.filter((tag) => {
      return !selectedTags.includes(tag.clientName);
    })
    setToolsTagsFunc(filterTags);
  }

  function addRemovedTags(tags) {
    setOptionsTags([...optionsTags, tags]);
  }

  function addRemovedToolsTags(tags) {
    setToolsTags([...toolsTags, tags]);
  }

  function setOptionTagsFunc(tags) {
    setOptionsTags(tags);
  }

  function setToolsTagsFunc(tags) {
    setToolsTags(tags);
  }


  function allotedClients(singleMember) {
    tempArr.push(...singleMember);
    // setTimeout(() => {
    //   console.log(tempArr);
    // }, 1000)
  }

  function allotedTools(singleMember) {
    toolsArr.push(...singleMember);

    setTimeout(() => {
      console.log(toolsArr);
    }, 1000)
  }

  // function handleAllData(){
  //   setTimeout(()=>{
  //    // console.log(users);
  //   },500)
  // }

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

  function getHandoverMember(member) {
    setHandoverMember(member)
    console.log(HandoverMember);
  }

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
          <button className='py-1 px-3 bg-blue-500 rounded-md text-white' onClick={handleShare} onMouseDown={handleShare}>Share</button>
        </div>
      </div>
      <SelectHandoverMember currentShiftMemebers={currentShiftMemebers} getHandoverMember={getHandoverMember} />
      <div>
        <table className='mt-6 w-full border-2 border-white border-separate'>
          <tr>
            <th className='p-2 bg-blue-600 text-white rounded-s-lg w-1/4'>Shift Members</th>
            <th className='p-2 bg-blue-600 text-white rounded-r-lg'>Alert and Ticketing Tools</th>
          </tr>
          {currentShiftMemebers ? currentShiftMemebers.map((emp, index) => {
            return <AllotmentRows empname={emp.empname} key={emp.id} idx={index} optionsTags={toolsTags} filteredClientLists={filteredToolsLists} addRemovedTags={addRemovedToolsTags} allotedClients={allotedTools} handleShare={handleShare} isShared={isShared} getHandoverMember={getHandoverMember} />
          }) : ''}

        </table>
        <table className='mt-6 w-full border-2 border-white border-separate'>
          <tr>
            <th className='p-2 bg-blue-600 text-white rounded-s-lg w-1/4'>Shift Members</th>
            <th className='p-2 bg-blue-600 text-white rounded-r-lg'>Custom Clients</th>
          </tr>
          {currentShiftMemebers ? currentShiftMemebers.map((emp, index) => {
            return <AllotmentRows empname={emp.empname} key={emp.id} idx={index} optionsTags={optionsTags} filteredClientLists={filteredClientLists} addRemovedTags={addRemovedTags} allotedClients={allotedClients} handleShare={handleShare} isShared={isShared} getHandoverMember={getHandoverMember} />
          }) : ''}

        </table>
      </div>
    </div>
  )
}

export default WorkAllotment