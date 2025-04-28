import React from 'react'
import Appheader from './dashboard/_Components/Appheader';

const DashBoardLayout = ({children}) => {
  return (
    <div>
      <Appheader/>
      {children}</div>
  )
}

export default DashBoardLayout;