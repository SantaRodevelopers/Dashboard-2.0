import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AboutShifts from './pages/AboutShifts'
import HistoricData from './pages/HistoricData'
import Notifications from './pages/Notifications'
import ShiftHandover from './pages/ShiftHandover'
import ShiftPlanner from './pages/ShiftPlanner'
import WorkAllotment from './pages/WorkAllotment'


const NavRoutes = () => {
  return (
      <Routes>
        <Route path='/' element={<WorkAllotment />} />
        <Route path='/shifthandover' element={<ShiftHandover />} />
        <Route path='/aboutshifts' element={<AboutShifts />} />
        <Route path='/historicdata' element={<HistoricData />} />
        <Route path='/shiftplanner' element={<ShiftPlanner />} />
        <Route path='/notification' element={<Notifications />} />
      </Routes>
  )
}

export default NavRoutes