import { fas } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { toast } from 'sonner'

function HandoverRows({ allotted, getClientsOrTools, setMainData, mainData, temp, setTemp, setClientsOrToolsFlag, RenderFlag, clearType }) {
    let client
    let clientSelected
    // let jiraTickets
    let id = new Date().getTime().toString()


    const [assigneeName, setAssigneeName] = useState('')
    const [displayClient, setDisplayClient] = useState()
    const [jiraTickets, setJiraTickets] = useState()
    const [comments, setComments] = useState()
    const [type, setType] = useState()
    const [SSLType, setSSLType] = useState()



    function handleSelect(event) {
        clientSelected = event.target.value
        setDisplayClient(clientSelected)

        let selectedValue = allotted.filter((ele) => {
            return ele.clients.length != 0
          

        })

        selectedValue.map((ele) => {

            if (ele.clients.includes(clientSelected)) {
                setAssigneeName(ele.name)

            }
        })

    }



    function getMainData() {
        RenderFlag ? client = { id, displayClient, SSLType, assigneeName, jiraTickets, comments } : client = { id, displayClient, type, assigneeName, jiraTickets, comments }


        if ((client.displayClient && client.assigneeName)) {
            if (RenderFlag? client.SSLType:client.type) {
                setTemp([...temp, client]);
                toast.success('Added ...', {
                    description: `Added ${client.displayClient}`,
                    duration:700,
                })
            }

            else{
                RenderFlag?
                toast.error('Please select SSL Request Type',{
                    duration:800,
                }) :
                toast.error('Please select Handover Type',{
                    duration:800,
                })
            }

        } else {
            RenderFlag? 
            toast.error('Please select the Domain and Assignee Name',{
                duration:800
                
            }):
            toast.error('Please select the Client and Assignee Name',{
            duration:800
            })
        }

        // toLocalStorage()

        (client.displayClient && RenderFlag ? client.SSLType:client.type) && document.querySelectorAll('#changeToSelect').forEach((df) => {
            df.value = "Select";
        

            
        })
        // document.querySelectorAll('.changeToSelect').value = 'Select';
        if((client.displayClient && (RenderFlag && client.SSLType))||(client.displayClient && (!RenderFlag && client.type)) ){
            setDisplayClient(''),
            setAssigneeName('')
            setJiraTickets('')
            setComments('')
            setClientsOrToolsFlag(false)
        }



        //    toLocalStorage()
    }

    function clearMDLocal() {
        if (RenderFlag) {
            localStorage.setItem("SD", JSON.stringify([]))
        } else {
            localStorage.setItem("MD", JSON.stringify([]))
        }
        setTemp([]);
        clearType();
        // clearType();

    }



    return (

        <>


            {
                RenderFlag ? <tr className='border-3 border-gray-500'>
                    <td><textarea value={displayClient} onChange={(event) => { setDisplayClient(event.target.value) }} className='w-full px-2 py-1 text-sm h-20 border-2 border-gray-300' name="" id="" ></textarea></td>
                    <td><textarea value={assigneeName} onChange={(event) => { setAssigneeName(event.target.value) }} className='w-full px-2 py-1 text-sm h-20 border-2 border-gray-300' name="" id="" ></textarea></td>


                    {/* <td><textarea value={SSLType} onChange={(event) => { setSSLType(event.target.value) }} className='w-full px-2 py-1 text-sm h-20 border-2 border-gray-300' name="" id="" ></textarea></td> */}
                
                    <select onChange={(event) => { setSSLType(event.target.value) }} id="changeToSelect" className="w-full px-2 py-1 text-sm h-9 border-2 border-gray-300">
                            <option value="Select">Select</option>
                            <option value="Renewal">Renewal</option>
                            <option value="New">New</option>
                            <option value="Decommission">Decommission </option>
                        </select> 
                    
                    <td><textarea value={jiraTickets} onChange={(event) => { setJiraTickets(event.target.value) }} className='w-full px-2 py-1 text-sm h-20 border-2 border-gray-300' name="" id="" ></textarea></td>
                    <td><textarea value={comments} onChange={(event) => { setComments(event.target.value) }} className='w-full px-2 py-1 text-sm h-20 border-2 border-gray-300' name="" id="" ></textarea></td>

                </tr> 
                               
                :

                    <tr className='border-3 border-gray-500'>
                        <td><select onChange={(event) => { getClientsOrTools(event.target.value) }} className='w-full' name="" id="">
                            <option value="Clients">Clients</option>
                            <option value="Tools">Tools</option>

                        </select></td>
                        <td className={`text-center } rounded-s-lg py-2`}>{
                            <select onChange={handleSelect} name="" id="changeToSelect" className="w-full px-2 py-1 text-sm h-9 border-2 border-gray-300">
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


                        <select onChange={(event) => { setType(event.target.value) }} id="changeToSelect" className="w-full px-2 py-1 text-sm h-9 border-2 border-gray-300">
                            <option value="Select">Select</option>
                            <option value="Current Shift Updates">Current Shift Updates</option>
                            <option value="Follow Up">Follow Up</option>
                        </select>

                    <td><textarea value={jiraTickets} onChange={(event) => { setJiraTickets(event.target.value) }} className='w-full px-2 py-1 text-sm h-20 border-2 border-gray-300' name="" id="" ></textarea></td>
                    <td><textarea value={comments} onChange={(event) => { setComments(event.target.value) }} className='w-full px-2 py-1 text-sm h-20 border-2 border-gray-300' name="" id="" ></textarea></td>

                    </tr>
            }

            <tr className='w-fit'>
                <td>
                    <button className={`py-1 px-3 bg-blue-600 hover:bg-blue-400 transition-all duration-100 rounded-md text-white`} onClick={getMainData} >Add More</button>
                </td>
                <td>
                    <button className={`py-1 px-3 bg-blue-600 hover:bg-blue-400 transition-all duration-100 rounded-md text-white w-fit`} onClick={clearMDLocal} >Clear Data</button>
                </td>
            </tr>



            {/* <td>   
                    { RenderFlag?
                            <select onChange={(event)=>{setSSLType(event.target.value)}} id="changeToSelect" className="w-full px-2 py-1 text-sm h-9 border-2 border-gray-300">
                                 <option value="Select">Select</option>
                                 <option value="Renewal">Renewal</option>
                                 <option value="New">New</option>
                                 <option value="Decommission">Decommission </option>
                            </select> :
                    <select onChange={(event)=>{setType(event.target.value)}} id="changeToSelect" className="w-full px-2 py-1 text-sm h-9 border-2 border-gray-300">
                    <option value="Select">Select</option>
                    <option value="Current Shift Updates">Current Shift Updates</option>
                    <option value="Follow Up">Follow Up</option>
                </select>  

                    } 
         
                </td> */}


        </>



    )
            }

    export default HandoverRows