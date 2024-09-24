import { lazy, Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokedex, nextPage, previousPage } from '../redux/pokemonSlice';
import PokeCarta from './PokeCarta';


const Pokedex = () => {
  const { pokedex, status, error } = useSelector(state => state.pokemons);
  const offset = useSelector(state => state.pokemons.offset);
  const dispatch = useDispatch();



  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPokedex());
    }
  }, [ dispatch, status ]);

  const handleNext = () => {
    dispatch(nextPage()); // Aumentar el offset
    dispatch(fetchPokedex()); // Realizar fetch de los nuevos Pokémon
  };

  const handlePrevious = () => {
    dispatch(previousPage()); // Reducir el offset
    dispatch(fetchPokedex()); // Realizar fetch de los Pokémon anteriores
  };
  return (
    <div className='w-full'>
      { status === "failed" && (
        <p>{ error }</p>
      ) }
      {/* Mostrar todos los Pokémon cuando la carga haya sido exitosa */ }
      <div className="h-full w-full">
        {status === "loading" && (<h1>Cargando...</h1>)}
        { status === 'succeeded' && (
          <ul className='w-full grid grid-cols-3 gap-8 p-4'>
            { pokedex?.map((poke) => (
              <li className='flex justify-center' key={ poke.name }>
                <PokeCarta poke={ poke } />
              </li>
            )) }
          </ul>
        ) }
      </div>
      <div className='botones'>
        <button onClick={ handlePrevious } disabled={ offset === 0 }>Anterior</button>
        <button onClick={ handleNext }>Siguiente</button>
      </div>
    </div>
  )
}

export default Pokedex