import React from 'react'
import BarraLateral from './BarraLateral'
import { Outlet } from 'react-router-dom'
import Buscador from './Buscador'
import Pokedex from './Pokedex'

const Layout = () => {
  return (
    <div className="w-screen h-screen grid grid-cols-1 grid-rows-[auto_1fr]">
      <header className="col-span-2 bg-gray-200">
        Header
      </header>
      <main className="p-4 grid grid-cols-2 bg-green-200 w-full">
        <div className='w-full '>
          <Buscador />
          <Pokedex/>
        </div>
      </main>
    </div>


  )
}

export default Layout