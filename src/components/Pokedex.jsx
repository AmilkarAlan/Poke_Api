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
    <div>
      { status === "failed" && (
        <p>{ error }</p>
      ) }
      {/* Mostrar todos los Pokémon cuando la carga haya sido exitosa */ }
      { status === 'succeeded' && (
        <div className="pokedex">
          <ul className='flex w-full flex-wrap gap-4 m-4'>
            { pokedex?.map((poke) => (
              <li key={ poke.name }>
                <PokeCarta poke={ poke } />
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