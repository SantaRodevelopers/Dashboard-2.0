import React from 'react'

const AllotmentRows = ({empname,idx}) => {
    return (
        <tr>
            <td className={`text-center ${idx%2 == 0?"bg-white": "bg-blue-200"} rounded-s-lg py-2`}>{empname}</td>
            <input type="text" />
        </tr>
    )
}

export default AllotmentRows