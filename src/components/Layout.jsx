import React from 'react'
import BarraLateral from './BarraLateral'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="w-screen h-screen grid grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
      <header className="col-span-2 bg-gray-200">
        Header
      </header>
      <BarraLateral />
      <main className="bg-green-200 w-full">
        <Outlet />
      </main>
    </div>


  )
}

export default Layout