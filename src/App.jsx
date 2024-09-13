import { useDispatch, useSelector } from 'react-redux'
import { fetchPokemons, nextPage, previousPage, searchPokemon } from './redux/pokemonSlice'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Principal from './routes/Layout';

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
      <Routes>
        <Route path='/' element={<Principal/>} />
      </Routes>
    </>
  );
}

export default App;
