import React from 'react'

const Pokedex = () => {
  return (
    <div>
         {/* Mostrar todos los Pokémon cuando la carga haya sido exitosa */ }
         { status === 'succeeded' && (
          <div className="pokedex">
            <ul>
              { pokemon?.map((poke) => (
                <li key={ poke.name }>
                  <p>{ poke.name }</p>
                </li>
              )) }
            </ul>
            <div className='botones'>
              <button onClick={ handlePrevious } disabled={ offset === 0 }>Anterior</button>
              <button onClick={ handleNext }>Siguiente</button>
            </div>
          </div>
        ) }
    </div>
  )
}

export default Pokedex