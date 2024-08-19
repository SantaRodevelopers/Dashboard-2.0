import { fas } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import {toast} from 'sonner'

function HandoverRows({ allotted, getClientsOrTools, setMainData, mainData, temp, setTemp, setClientsOrToolsFlag }) {

    let clientSelected
    // let jiraTickets
    let id = new Date().getTime().toString()


    const [assigneeName, setAssigneeName] = useState('')
    const [displayClient, setDisplayClient] = useState()
    const [jiraTickets, setJiraTickets] = useState()
    const [comments, setComments] = useState()



    function handleSelect(event) {
        clientSelected = event.target.value
        setDisplayClient(clientSelected)

        let selectedValue = allotted.filter((ele) => {
            return ele.clients.length != 0
            //console.log(ele);

        })

        selectedValue.map((ele) => {

            if (ele.clients.includes(clientSelected)) {
                setAssigneeName(ele.name)

            }
        })
        // console.log(assigneeName);
        //selectedValue[0].clients.includes(value)?console.log(selectedValue[0].name):console.log('wrong');
        // console.log(selectedValue[0].name);
    }



    function getMainData() {
        let client = { id, displayClient, assigneeName, jiraTickets, comments }

        if((client.displayClient && client.assigneeName)){
            setTemp([...temp, client])
            toast.success('Added ...',{
                description:`Added ${client.displayClient}`
            })
        }else{
            toast.error('Please select the client and assignee name')
        }

        // toLocalStorage()

        setDisplayClient('')
        setAssigneeName('')
        setJiraTickets('')
        setComments('')
        setClientsOrToolsFlag(false)


        //    toLocalStorage()
    }

    function clearMDLocal() {
        localStorage.setItem("MD", JSON.stringify([]))
        setTemp([])
    }




    return (
        <>
            <tr className='border-3 border-gray-500'>
                <td><select onChange={(event) => { getClientsOrTools(event.target.value) }} className='w-full' name="" id="">
                    <option value="Clients">Clients</option>
                    <option value="Tools">Tools</option>

                </select></td>
                <td className={`text-center } rounded-s-lg py-2`}>{
                    <select onChange={handleSelect} name="" id="" className="w-full px-2 py-1 text-sm h-9 border-2 border-gray-300">
                        <option value="Select">Select</option>
                        {
                            allotted.map((ele, idx) => {
                                return ele.clients.length && ele.clients.map((e, i) => {
                                    return <option value={e}>{e}</option>
                                })
                            })

                        }
                    </select>}</td>

                <td className='text-center w-fit'>
                    <p>{assigneeName}</p>
                </td>
                <td><textarea value={jiraTickets} onChange={(event) => { setJiraTickets(event.target.value) }} className='w-full px-2 py-1 text-sm h-20 border-2 border-gray-300' name="" id="" ></textarea></td>
                <td><textarea value={comments} onChange={(event) => { setComments(event.target.value) }} className='w-full px-2 py-1 text-sm h-20 border-2 border-gray-300' name="" id="" ></textarea></td>
            </tr>
            <tr className='w-fit'>
                <td>
                    <button className={`py-1 px-3 bg-blue-600 hover:bg-blue-400 transition-all duration-100 rounded-md text-white`} onClick={getMainData} >Add More</button>
                </td>
                <td>
                    <button className={`py-1 px-3 bg-blue-600 hover:bg-blue-400 transition-all duration-100 rounded-md text-white w-fit`} onClick={clearMDLocal} >Clear Data</button>
                </td>
            </tr>

        </>
    )
}

export default HandoverRows