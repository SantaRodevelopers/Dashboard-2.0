import React, { useState } from 'react'
import { useEffect } from 'react';

const AllotmentRows = ({ empname, idx, optionsTags, filteredClientLists, addRemovedTags, allotedClients, isShared, disableFlag, setDisableFlag }) => {
    const [selectedTags, setSelectedTags] = useState([]);
    const [removedTags, setRemovedTags] = useState({ clientName: 'Others' });
    const [emailData, setEmailData] = useState([]);


    useEffect(() => {
        filteredClientLists(selectedTags);
        getShiftMembers();
    }, [selectedTags])

    useEffect(() => {
        allotedClients(emailData);
    }, [isShared])

    // To create an individual object with the tags selected and member name. 
    function getShiftMembers() {
        let obj1 = [{ name: empname, clients: selectedTags }];
        setEmailData(obj1); //setting the obj to the usestate
    }

    useEffect(() => {
        addRemovedTags(removedTags);
    }, [removedTags])

    // To append the selected tags that are selected from the drop down to the usestate
    function getSelectedTags(event) {
        let value = event.target[event.target.value].innerHTML;
        if (!selectedTags.includes(value) && value != 'Select') {
            setSelectedTags([...selectedTags, value]);

        }
    }

    // To remove the tags from the textbox and than filtering the selected tags by what we have removed
    function removeTags(event) {

        event.stopPropagation();
        setRemovedTags({ clientName: event.target.innerText });
        const filteredTags = selectedTags.filter((elem) => {
            return elem != event.target.innerText;
        })
        setSelectedTags(filteredTags);
    }

    function setSelectDefault(event) {
        event.target.value = 0; //to make select has default
    }
    function assignAllTags(Tags) {
        // console.log(Tags);

        setSelectedTags(Tags)
    }

    function handleAssignAll() {
        setDisableFlag(true)
        let tempoptiontags = []
        optionsTags.map((ele) => {
            if (!(ele.clientName == 'Select' || ele.clientName == 'Others')) {
                tempoptiontags.push(ele.clientName)
            }
        })
        assignAllTags(tempoptiontags)


    }
    // console.log('selected tags main------',selectedTags);

    return (

        <tr>
            <td className={`text-center ${idx % 2 == 0 ? "bg-white" : "bg-blue-200"} rounded-s-lg py-2`}>{empname}</td>

            <div className=" px-2 py-3 flex  items-center  gap-1   min-h-[54px]">
                <div className='px-2 py-2 w-full flex items-center gap-1 flex-wrap min-h-[54px]'>
                    {
                        selectedTags.length > 0 ? selectedTags.map((ele, idx) => {
                            return <p className='bg-blue-600 text-white px-3  py-1 w-fit rounded-full text-[12px] hover:cursor-pointer' onClick={removeTags}>{ele}</p>
                        }) : <p className='bg-gray-500 text-white px-3 py-1  mb-3 w-fit rounded-full text-[12px] hover:cursor-pointer'>Please Select from Below Option 👇</p>
                    }
                    {/* <div className="border-2 border-gray-400 px-2 py-3 flex  items-center justify-evenly gap-1  min-h-[54px]"> */}
                    <select name="" id="" onChange={getSelectedTags} onClick={setSelectDefault} className="w-full px-2 py-1 text-sm h-9 border-2 border-gray-300">
                        {optionsTags.map((elem, idx) => {
                            return <option value={idx}>{elem.clientName}</option>
                        })}
                    </select>
                </div>


                <div className={` ${disableFlag? "bg-gray-300": "bg-blue-600"} flex w-[110px] mt-9 px-2 py-2 rounded-lg ${!disableFlag &&"hover:bg-blue-400"} `}>
                    <button disabled={disableFlag} onClick={handleAssignAll} className= {` transition-all duration-100  text-white`} >Assign All</button>
                </div>

            </div>

            {/* </div> */}



        </tr>

    )
}

export default AllotmentRows
