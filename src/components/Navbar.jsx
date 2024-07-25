import React from 'react'
import { useState } from 'react'
import { GiNotebook } from "react-icons/gi";
import { FaHandshake } from "react-icons/fa";
import { LiaSwatchbookSolid } from "react-icons/lia";
import { MdOutlineHistory } from "react-icons/md";
import { PiBooksLight } from "react-icons/pi";
import { IoMdNotificationsOutline } from "react-icons/io";
import NavItem from './NavItem';

const Navbar = () => {
    const [navItems, setNavItems] = useState([]);
    const adminItems = [
        {image: <GiNotebook size={'20px'}/>,item: "Work Allotment",id:1,navLink:'/'},
        {image: <FaHandshake  size={'20px'}/>,item: "Shift Handover",id:2,navLink:'/shifthandover'},
        {image: <LiaSwatchbookSolid  size={'20px'}/>,item: "About Shifts",id:3,navLink:'/aboutshifts'},
        {image: <MdOutlineHistory  size={'20px'}/>,item: "Historic Data",id:4,navLink:'/historicdata'},
        {image: <PiBooksLight  size={'20px'}/>,item: "Shift Planner",id:5,navLink:'/shiftplanner'},
        {image: <IoMdNotificationsOutline  size={'20px'}/>,item: "Notification",id:6,navLink:'/notification'}
    ]
  return (
    <div className='bg-blue-600 w-full py-3 pl-3 text-white h-full'>
        <div className="logo mb-4">Logo</div>
        <div className='flex flex-col'>
           {adminItems.map((item)=>{
                return <NavItem image = {item.image} navItem = {item.item} key={item.id} navPath = {item.navLink}/>
           })}
        </div>
    </div>
  )
}

export default Navbar