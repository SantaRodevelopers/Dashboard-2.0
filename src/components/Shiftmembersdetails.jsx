import React, { useEffect, useState } from 'react'
import AssoicatesStatus from './AssoicatesStatus'


function Shiftmembersdetails({ currentShiftMemebers, getHandoverMember, shiftValue, inShift,onLeave,onWeekOff,setInShift,setOnLeave,setOnWeekOff }) {

    const [members, setMembers] = useState([])
    const [removedMembers,setRemovedMembers] =useState([])
    const [membersOnWeekOff,setMembersOnWeekOff] =useState([])


    //const [filterMemebers,setFilterMemebers] =useState([])

    // assigning members to new usestate
    function AssigningMemeber() {
        let temp = []
        currentShiftMemebers && currentShiftMemebers.map((ele) => {
            temp.push(ele.empname)
        })
        setMembers([...members, ...temp])

    }
    useEffect(() => {
        AssigningMemeber()
        //console.log(members);
        //console.log(members);
    }, [currentShiftMemebers])

    useEffect(() => {
        setMembers([])
        setMembersOnWeekOff([])
        setRemovedMembers([])
    }, [shiftValue])


    function removeTags(event) {

 
        setRemovedMembers([...removedMembers,event.target.innerText]);
    
        const filteredTags = members.filter((elem) => {    
        return elem != event.target.innerText;
        })
        // setRemovedMemebers(filteredTags);
        setMembers(filteredTags)
        

    }

    function onLeaveTags(event) {

        event.stopPropagation();
        setMembersOnWeekOff([...membersOnWeekOff,event.target.innerText]);
        
        const filteredTags = removedMembers.filter((elem) => {    
            return elem != event.target.innerText;
        })
        // setRemovedMemebers(filteredTags);
        setRemovedMembers(filteredTags)
        
    }
    function notonWeekOff(event) {

        event.stopPropagation();
        setMembers([...members,event.target.innerText]);
        const filteredTags = membersOnWeekOff.filter((elem) => {    
            return elem != event.target.innerText;
        })
        // setRemovedMemebers(filteredTags);
        setMembersOnWeekOff(filteredTags)
        
    }

    useEffect(()=>{
        setInShift(members);
        
    },[removeTags])
    
    useEffect(()=>{
        setOnLeave(removedMembers)
        
    },[onLeaveTags])

    useEffect(()=>{
        setOnWeekOff(membersOnWeekOff)
        
    },[notonWeekOff])

    
    


    return (
        <div className='flex gap-2 items-center  w-full h-fit '>
            <div className='flex flex-col  gap-3 mt-4 min-w-[50%] bg-gradient-to-r from-blue-300  to-white text-blue-900 font-bold shadow-lg  shadow-gray-400 p-3 rounded-lg'>

                <div className='flex gap-2'>
                <p className='w-[175px]'>Associate in Shift</p>
                <AssoicatesStatus members={members} filterAssociates={removeTags}   />
                </div>

                <div className='flex gap-2'>
                <p className='w-[175px]'>Associates on Leave</p>
                <AssoicatesStatus members={removedMembers} filterAssociates={onLeaveTags}  />
                </div>

                <div className='flex gap-2'>
                <p className='w-[175px]'>Week off</p>
                <AssoicatesStatus members={membersOnWeekOff} filterAssociates={notonWeekOff}  />
                </div>
            </div>


        </div>
    )
}

export default Shiftmembersdetails