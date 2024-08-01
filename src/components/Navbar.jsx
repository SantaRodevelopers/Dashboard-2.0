import React from 'react'
import { useState } from 'react'
import { GiNotebook } from "react-icons/gi";
import { FaHandshake } from "react-icons/fa";
import { LiaSwatchbookSolid } from "react-icons/lia";
import { MdOutlineHistory } from "react-icons/md";
import { PiBooksLight } from "react-icons/pi";
import { IoMdNotificationsOutline } from "react-icons/io";
import NavItem from './NavItem';
import UserProfile from './UserProfile';

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
    <div className='bg-blue-600 w-full py-2 text-white h-full relative'>
        <div className="logo ml-2 mb-4">
          Logo
        </div>
        <div className=' font-poppins text-[15px] flex flex-col gap-2'>
           {adminItems.map((item)=>{
                return <NavItem image = {item.image} navItem = {item.item} key={item.id} navPath = {item.navLink}/>
           })}
          <UserProfile className='h-screen w-1/4 sticky top-0' />

        </div>
    </div>
  )
}

export default Navbar