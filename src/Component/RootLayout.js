import React from 'react'
import { Outlet } from 'react-router-dom'
import ManiNav from './ManiNav'

const RootLayout = () => {
  return (
    <div>
        <ManiNav/>
        <Outlet/>
    </div>
  )
}

export default RootLayout
