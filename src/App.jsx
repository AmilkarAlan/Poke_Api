import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPokemons } from './redux/pokemonSlice'

function App() {
  const pokemons = useSelector(state => state.pokemons.pokemons)
  const dispatch = useDispatch()

  return (
    <>
      <div className='principal'>
        <div className="inicial bucador">
          <input type="text" />
          <button onClick={ () => dispatch(fetchPokemons()) }>Go</button>
        </div>
        <div className='resultado'>
          <ul>
            { pokemons.map(
              pokemon => (
                <li>
                  <p>{pokemon.name}</p>
                </li>)) }
          </ul>
        </div>
        <div className='pokedex'>

        </div>
      </div>
    </>
  )
}

export default App
