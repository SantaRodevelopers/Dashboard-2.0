import React, { useState } from 'react'

function HandoverRows({ workAllotmentToolsData }) {

    const [assigneeName,setAssigneeName]=useState('')

    function handleSelect(event) {
        let value = event.target.value

        let selectedValue = workAllotmentToolsData.filter((ele)=>{
           return ele.clients.length!=0
                //console.log(ele);
        
        })  

        selectedValue.map((ele)=>{

           if (ele.clients.includes(value)){
                setAssigneeName(ele.name)
           }
        })
                // console.log(assigneeName);
        //selectedValue[0].clients.includes(value)?console.log(selectedValue[0].name):console.log('wrong');
       // console.log(selectedValue[0].name);
    }

    return (
        <tr>
            <td className={`text-center } rounded-s-lg py-2`}>{
                <select onChange={handleSelect} name="" id="" className="w-full px-2 py-1 text-sm h-9 border-2 border-gray-300">
                    {
                        workAllotmentToolsData.map((ele, idx) => {
                            return ele.clients.map((e, i) => {
                                return <option value={e}>{e}</option>
                            })
                        })
                    }
                </select>}</td>

                <td className='text-center w-fit'>
                   <p>{assigneeName}</p>
                </td>
        </tr>
    )
}

export default HandoverRows