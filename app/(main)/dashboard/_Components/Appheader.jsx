import React from 'react'
import { UserButton } from '@stackframe/stack'

const Appheader = () => {
  return (
    <div>
      <div className='flex justify-between items-center mx-auto px-8 py-4 shadow'>
        <div>  <h1>PrepMate</h1></div>
        <div>
        <UserButton />
        </div>
      
        </div>
    </div>
  )
}

export default Appheader