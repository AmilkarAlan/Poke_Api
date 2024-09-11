import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPokemons, searchPokemon } from './redux/pokemonSlice'
import { useEffect, useState } from 'react'

function App() {
  const { pokemon, searchResult, status, error } = useSelector(state => state.pokemons);
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSearch = () => {
    dispatch(searchPokemon(name));
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPokemons());
    }
  }, [dispatch, status]);

  return (
    <>
      <div className="principal">
        <div className="inicial buscador">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Search Pokémon..."
          />
          <button onClick={handleSearch}>Go</button>
        </div>

        {/* Mensajes de estado */}
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p>Error: {error}</p>}

        {/* Mostrar resultado de búsqueda si existe */}
        {searchResult && (
          <div className="resultado">
            <p>{searchResult.name}</p>
            {/* <img src={searchResult.sprites.front_default} alt={searchResult.name} /> */}
          </div>
        )}

        {/* Mostrar todos los Pokémon cuando la carga haya sido exitosa */}
        {status === 'succeeded' && (
          <div className="pokedex">
            <ul>
              {pokemon?.map((poke) => (
                <li key={poke.name}>
                  <p>{poke.name}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
