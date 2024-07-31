import React from 'react'
import Navbar from './components/Navbar'
import NavRoutes from './NavRoutes'
import UserProfile from "./components/UserProfile";




const App = () => {
    

  return (
    <>
      <div className='flex w-full'>
        <div className='h-screen w-1/4 sticky top-0'>
          <Navbar />
          
        </div>
        <NavRoutes />
      </div>
    </>
  )
}

export default App