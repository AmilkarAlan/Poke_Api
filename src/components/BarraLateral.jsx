import React from 'react'
import { Link } from 'react-router-dom'

const BarraLateral = () => {

  const links = [
    { to: "/pokedex", nombre: "Pokedex" },
    { to: "/miEquipo", nombre: "Mi Equipo" },
  ]
  return (
    <aside className="flex flex-col bg-blue-200 w-fit">
      { links.map((l, i) => (
        <Link key={ i } className='m-1' to={ l.to }>{ l.nombre }</Link>
      )) }

    </aside>
  )
}

export default BarraLateral