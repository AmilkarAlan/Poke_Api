import React from 'react'
import BarraLateral from './BarraLateral'
import { Outlet } from 'react-router-dom'
import Buscador from './Buscador'
import Pokedex from './Pokedex'

const Layout = () => {
  return (
    <div className="max-w-screen h-screen grid grid-cols-1 grid-rows-[auto_1fr]">
      <header className=" h-fit w-full col-span-2 bg-gray-200">
        Header
      </header>
      <main className="grid grid-cols-2 bg-gray-300 w-full h-full gap-8 p-8">
        <Pokedex />
        <BarraLateral />

      </main>
    </div>


  )
}

export default Layout