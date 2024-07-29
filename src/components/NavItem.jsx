import React from 'react'
import { Link, NavLink } from 'react-router-dom'


const NavItem = ({ image, navItem, navPath }) => {

    return (
        <>
            {navItem == 'Notification' ? <NavLink to={navPath} className={({ isActive }) =>
    isActive ? "w-full absolute bottom-1/3 flex gap-2 items-center ml-5 bg-white text-blue-500 py-2 pl-2 rounded-s-full transition-all duration-300 ease-in": "absolute bottom-1/3 ml-1 flex gap-2 items-center py-2 pl-2 rounded-s-full w-full transition-all duration-300 ease-out"
  }>
                {image}
                <h3>{navItem}</h3>
            </NavLink> : 
            <NavLink to={navPath} className = {({ isActive }) =>
            isActive ? "flex gap-2 items-center ml-5 py-2 pl-2 bg-white text-blue-500 rounded-s-full transition-all duration-300 ease-in" : "flex gap-2 ml-1 items-center py-2 pl-2 transition-all duration-300 ease-out"
  }>
                {image}
                <h3>{navItem}</h3>
            </NavLink>}
            
        </>

    )
}

export default NavItem