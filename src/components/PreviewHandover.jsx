import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faHouse} from '@awesome.me/kit-KIT_CODE/icons/classic/solid'

function PreviewHandover({ ele, setEdit,mainData,edit,setMainData,temp }) {

  const [editvalue, setEditValue] = useState([])
  const [editFlag, seteditFlag] = useState(false)
  const [saveFlag,setSaveFlag]=useState(false)


  const [editedJiraTickets, setEditedJiraTickets] = useState()
  const [editedComments, setEditedComments] = useState()

  let id 
  let displayClient 
  let assigneeName   
  let jiraTickets 
  let comments

  function handleDelete(params) {

  }

  function handleEdit() {
    seteditFlag(true)
    setSaveFlag(false)


  }
  function handleSave() {
    // console.log(editedJiraTickets);
    id = ele.id
    displayClient = ele.displayClient
    assigneeName = ele.assigneeName
    jiraTickets=editedJiraTickets
    comments=editedComments

    let tempedit = { id, displayClient, assigneeName, jiraTickets, comments }
    setEditValue(tempedit)

   let val= temp.map((ele)=>{
    if(ele.id==tempedit.id){
      ele.displayClient=tempedit.displayClient
      ele.assigneeName=tempedit.assigneeName
      ele.jiraTickets=tempedit.jiraTickets
      ele.comments=tempedit.comments
    }
    return ele
   })
    
    localStorage.setItem("MD",JSON.stringify(val))
    setMainData(val)
    setSaveFlag(true)
    seteditFlag(false)
  
  }

  


  return (
    <>
      {editFlag ? <tr>
        <td>{ele.displayClient}</td>
        <td>{ele.assigneeName}</td>
        <td> <textarea id={ele.id} className='w-full ' onChange={(event)=>{setEditedJiraTickets(event.target.value)}}>{saveFlag?editedJiraTickets:ele.jiraTickets}</textarea> </td>
        <td><textarea id={ele.id} className='w-full ' onChange={(event) => { setEditedComments(event.target.value) }} >{saveFlag?editedComments:ele.comments}</textarea></td>
        <div className='flex gap-2'>
          <i class="fa-regular fa-pen-to-square" onClick={handleEdit}></i>
          <i className='w-1/3' onClick={handleDelete} class="fa-regular fa-trash-can"></i>
          
        </div>
        {saveFlag? '':<button onClick={handleSave}>Save</button>  }
        
      </tr> : <tr>
        <td>{ele.displayClient}</td>
        <td>{ele.assigneeName}</td>
        <td>{saveFlag?editedJiraTickets:ele.jiraTickets}</td>
        <td>{saveFlag?editedComments:ele.comments}</td>   
        <div className='flex gap-2'>
          <i class="fa-regular fa-pen-to-square" onClick={handleEdit}></i>
          <i className='w-1/3' onClick={handleDelete} class="fa-regular fa-trash-can"></i>
        </div>

      </tr>}



    </>



  )
}

export default PreviewHandover  