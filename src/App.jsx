import React from 'react'
import Navbar from './components/Navbar'
import NavRoutes from './NavRoutes'


const App = () => {


  return (
    <>
      <div className='flex'>
      <div className='h-screen w-1/5'>
        <Navbar />
      </div>
      <NavRoutes/>
    </div>
    </>
  )
}

export default App