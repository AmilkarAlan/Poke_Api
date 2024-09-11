import { useDispatch, useSelector } from 'react-redux'
import { fetchPokemons, nextPage, previousPage, searchPokemon } from './redux/pokemonSlice'
import { useEffect, useState } from 'react'
import axios from 'axios';

function App() {
  const { pokemon, searchResult, status, error } = useSelector(state => state.pokemons);
  const offset = useSelector(state => state.pokemons.offset);
  const dispatch = useDispatch();
  const [ name, setName ] = useState("");
  const [ types, setTypes ] = useState([])

  const handleSearch = () => {
    dispatch(searchPokemon(name));
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPokemons());
      fetchTypes()
    }
  }, [ dispatch, status ]);

  const handleNext = () => {
    dispatch(nextPage()); // Aumentar el offset
    dispatch(fetchPokemons()); // Realizar fetch de los nuevos Pokémon
  };

  const handlePrevious = () => {
    dispatch(previousPage()); // Reducir el offset
    dispatch(fetchPokemons()); // Realizar fetch de los Pokémon anteriores
  };

  const fetchTypes = async () => {
    try {
      const { data } = await axios.get("https://pokeapi.co/api/v2/type/?offset=0&limit=21")
      setTypes(data.results)
      return 
    } catch (error) {
      return error
    }
  }

  return (
    <>
      <div className="principal">
        <div className="inicial buscador">
          <input
            type="text"
            value={ name }
            onChange={ (e) => setName(e.target.value) }
            placeholder="Search Pokémon..."
          />
          <button onClick={ handleSearch }>Go</button>
        </div>
        <div className='filtros'>
          <div className='tipos'>
            <ul className="flex gap-2">
            {types && types.map((type)=>(
                <li>
                  <p>{type.name}</p>
                </li>
            ))}
            </ul>
          </div>
        </div>
        {/* Mensajes de estado */ }
        { status === 'loading' && <p>Loading...</p> }
        { status === 'failed' && <p>Error: { error }</p> }

        {/* Mostrar resultado de búsqueda si existe */ }
        { searchResult && (
          <div className="resultado">
            <p>{ searchResult.name }</p>
            {/* <img src={searchResult.sprites.front_default} alt={searchResult.name} /> */ }
          </div>
        ) }

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
    </>
  );
}

export default App;
