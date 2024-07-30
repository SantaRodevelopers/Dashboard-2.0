import React,{useState} from 'react'
import { useEffect } from 'react';

const AllotmentRows = ({empname,idx,optionsTags,filteredClientLists,addRemovedTags}) => {
    const [selectedTags,setSelectedTags] = useState([]);
    const [removedTags,setRemovedTags] = useState({clientName : 'Others'});


useEffect(()=>{
    filteredClientLists(selectedTags);
},[selectedTags])

useEffect(()=>{
    addRemovedTags(removedTags);
},[removedTags])

    function getSelectedTags(event){
        let value = event.target[event.target.value].innerHTML;
        if(!selectedTags.includes(value) && value != 'Select'){
            setSelectedTags([...selectedTags,value]);
        }
    }   

    function removeTags(event){
        let tagID = '';
        event.stopPropagation();
        setRemovedTags({clientName:event.target.innerText});
        const filteredTags = selectedTags.filter((elem)=>{
            return elem != event.target.innerText;
        })
        setSelectedTags(filteredTags);
    }

    function setSelectDefault(event){
       event.target.value = 0; //to make select has default
    }


    return (
        <tr>
              <td className={`text-center ${idx % 2 == 0 ? "bg-white" : "bg-blue-200"} rounded-s-lg py-2`}>{empname}</td>
              <div className="border-2 border-gray-400 px-2 py-3 flex items-center gap-1 flex-wrap min-h-[54px]">
                {
                    selectedTags.length>0?selectedTags.map((ele,idx)=>{
                        return <p className='bg-blue-600 text-white px-3 py-1 w-fit rounded-full text-[12px] hover:cursor-pointer' onClick={removeTags}>{ele}</p>
                    }):<p className='bg-gray-500 text-white px-3 py-1 w-fit rounded-full text-[12px] hover:cursor-pointer'>Please Select from Below Option 👇</p>
                }
              </div>
                <select name="" id="" onChange={getSelectedTags} onClick={setSelectDefault} className="w-full border-2 border-gray-400 px-2 py-1 text-sm h-9">
                  {optionsTags.map((elem,idx)=>{
                    return <option value={idx}>{elem.clientName}</option>
                  })}
                </select>
            </tr>
    )
}

export default AllotmentRows
