import { lazy, Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokedex, nextPage, previousPage, selectPokemon } from '../redux/pokemonSlice';
import PokeCarta from './PokeCarta';
import { Link } from 'react-router-dom';
import Buscador from './Buscador';


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

  const handleSelectPokemon = (pokemon) => {
    dispatch(selectPokemon(pokemon))

  }
  return (
    <div className='w-full h-screen flex flex-col bg-slate-400 p-4 rounded-xl'>
      <Buscador />
      { status === "failed" && (
        <p>{ error }</p>
      ) }
      {/* Mostrar todos los Pokémon cuando la carga haya sido exitosa */ }

      <div className='h-full w-full flex flex-col p-8 gap-2 overflow-y-scroll'>
        { status === "loading" && (<h1>Cargando...</h1>) }
        { status === 'succeeded' && (
          <>
            {/* <ul className='h-full w-full flex flex-col gap-2 p-4'> */ }
            { pokedex?.map((poke) => (

              <Link key={ poke.name } onClick={ () => handleSelectPokemon(poke) } to={ `/pokedex/${poke.id}` }>
                <PokeCarta poke={ poke } />
              </Link>

            )) }
            {/* </ul> */ }
          </>
        ) }
      </div>
      <div className='flex justify-between p-2 mt-2'>
        <button className='bg-slate-100 rounded ' onClick={ handlePrevious } disabled={ offset === 0 }>Anterior</button>
        <button className='bg-slate-100 rounded ' onClick={ handleNext }>Siguiente</button>
      </div>
    </div>
  )
}

export default Pokedex