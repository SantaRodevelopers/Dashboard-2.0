import React from 'react'

function PreviewHandover({ele}) {
  return (
      <tr>
      <td>{ele.displayClient}</td>
      <td>{ele.assigneeName}</td>
      <td>{ele.jiraTickets}</td>
      <td>{ele.comments}</td>
    </tr>  

  )
}

export default PreviewHandover