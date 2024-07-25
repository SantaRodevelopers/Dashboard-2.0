import React from 'react'
import { Link, NavLink } from 'react-router-dom'


const NavItem = ({ image, navItem, navPath }) => {
    console.log(navPath);
    return (
        <>
            {navItem == 'Notification' ? <NavLink to={navPath} className={({ isActive }) =>
    isActive ? "w-full absolute bottom-1/3 flex gap-2 items-center bg-white text-blue-500 py-2 pl-2 rounded-s-full": "absolute bottom-1/3 flex gap-2 items-center py-2 pl-2 rounded-r-full w-full"
  }>
                {image}
                <h3>{navItem}</h3>
            </NavLink> : 
            <NavLink to={navPath} className = {({ isActive }) =>
            isActive ? "flex gap-2 items-center py-2 pl-2 bg-white text-blue-500 rounded-s-full" : "flex gap-2 items-center py-2 pl-2"
  }>
                {image}
                <h3>{navItem}</h3>
            </NavLink>}
            
        </>

    )
}

export default NavItem