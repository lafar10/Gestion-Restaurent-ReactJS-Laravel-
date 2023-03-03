import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../../ContextProvider'

function MasterFront() {

   /* */

  return (
    <div>
        <Outlet />
    </div>
  )
}

export default MasterFront
