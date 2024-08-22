import React, { useEffect, useState } from 'react'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faHouse} from '@awesome.me/kit-KIT_CODE/icons/classic/solid'
import { toast } from 'sonner'

function PreviewHandover({ ele, setEdit, mainData, edit, setMainData, temp, handleDelete, localstoreName, RenderFlag }) {

  const [editvalue, setEditValue] = useState([])
  const [editFlag, seteditFlag] = useState(false)
  const [saveFlag, setSaveFlag] = useState(false)
 


  const [editedJiraTickets, setEditedJiraTickets] = useState()
  const [editedComments, setEditedComments] = useState()

  const [isJiraEdited, setJiraEdited] = useState(false);
  const [isCommentsEdited, setCommentsEdited] = useState(false);


  let id
  let displayClient
  let assigneeName
  let type
  let jiraTickets
  let comments
  let tempedit

  function handleEdit() {
    seteditFlag(true)
    setSaveFlag(true);

    toast.warning('Editing ...', {
      description: `You are now editing ${ele.displayClient}`
    })
  }

  function handleSave() {

    // console.log(editedJiraTickets);
    id = ele.id
    displayClient = ele.displayClient
    assigneeName = ele.assigneeName

    jiraTickets = isJiraEdited ? editedJiraTickets : ele.jiraTickets;
    comments = isCommentsEdited ? editedComments : ele.comments;

    let tempedit = { id, displayClient, assigneeName, jiraTickets, comments }
    setEditValue(tempedit)

    let val = temp.map((ele) => {
      if (ele.id == tempedit.id) {
        ele.displayClient = tempedit.displayClient
        ele.assigneeName = tempedit.assigneeName
        ele.jiraTickets = tempedit.jiraTickets
        ele.comments = tempedit.comments
        // ele.type = tempedit.type
      }
      return ele
    })

    localStorage.setItem(localstoreName, JSON.stringify(val))
    setMainData(val)
    setSaveFlag(false)
    seteditFlag(false)

    toast.success('Edit saved...', {
      description: `You have edited ${ele.displayClient}`
    })
  }


  const [cssClass, setCssClass] = useState('');

  useEffect(() => {
      setCssClass(ele.type == 'Follow Up' || ele.SSLType == 'Decommission' ? 'border-2 border-gray-300' : 'border-2 border-gray-300')
    }, [])

  return (
    <>
       <tr className='text-center font-poppins'>
                <td className={cssClass}>{ele.displayClient}</td>
                <td className={cssClass}>{ele.assigneeName}</td>
                {RenderFlag ? <td className={cssClass}>{ele.SSLType}</td>:<td className={cssClass}>{ele.type}</td>}
                <td className={cssClass}>{editFlag ? <textarea id={ele.id} className='outline-none w-full text-center ' onChange={(event) => { setEditedJiraTickets(event.target.value); setJiraEdited(true) }}>{saveFlag && ele.jiraTickets}</textarea> : saveFlag ? editedJiraTickets : ele.jiraTickets}</td>
                <td className={cssClass}>{editFlag ? <textarea id={ele.id} className='outline-none w-full text-center ' onChange={(event) => { setEditedComments(event.target.value); setCommentsEdited(true) }}>{saveFlag && ele.comments}</textarea> : saveFlag ? editedComments : ele.comments}</td>
                <div className='flex gap-2 my-2'>
                    <div onClick={handleEdit} className={`w-9 h-9 flex items-center justify-center rounded-full ${editFlag ? 'invisible' : 'bg-blue-500 text-white visible'}`}>
                        <i className="fa-regular fa-pen-to-square"></i>
                    </div>
                    <div onClick={handleDelete} className='bg-red-500 text-white w-9 h-9 flex items-center justify-center rounded-full' id={ele.id}>
                        <i className="fa-regular fa-trash-can w-1/3"></i>
                    </div>
                    <div onClick={handleSave} className={`w-9 h-9 flex items-center justify-center rounded-full ${saveFlag ? 'bg-green-600 text-white visible' : 'invisible'}`}>
                        <i className="fa-regular fa-floppy-disk w-1/3"></i>
                    </div>
                </div>
            </tr>
    </>
  )
}

export default PreviewHandover  