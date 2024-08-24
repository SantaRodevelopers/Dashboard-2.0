import React from 'react'


function Header({ scrollFlag, handleShiftChange, shiftValue, currentDate, handleShare, type,sendType }) {

    
    return (
        <>
            
            <div className={`flex px-4 py-3 justify-between  items-center sticky top-0 z-50   ${scrollFlag ? "bg-gradient-to-r from-blue-600 to-blue-300" : "bg-transparent"}`}>
                <h1 className={`font-semibold text-gray-600 text-xl ${scrollFlag ? "text-white" : "text-gray-600"}`}>COPS-{type} {shiftValue === 'Select Shift' ? null : `${shiftValue} `}{currentDate}</h1>
                <div className='flex just gap-2'>
                    <select name="shifts" defaultValue={shiftValue} onChange={handleShiftChange} id="shifts" className='border-2 border-black rounded-md outline-none'>
                        <option value="" className='hidden'>Select Shift</option>
                        <option value="APAC">APAC</option>
                        <option value="EMEA">EMEA</option>
                        <option value="NA">NA</option>
                    </select>

                    <button className='py-1 px-3 bg-blue-600 hover:bg-blue-400 transition-all duration-100 rounded-md text-white'   onClick={handleShare} 
                    onMouseDown={sendType === 'WA' && handleShare} >Share</button>
                </div>
            </div>

        </>
    )
}

export default Header