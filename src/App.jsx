import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Pokedex from './components/Pokedex';


function App() {


  // const fetchTypes = async () => {
  //   try {
  //     const { data } = await axios.get("https://pokeapi.co/api/v2/type/?offset=0&limit=21")
  //     setTypes(data.results)
  //     return
  //   } catch (error) {
  //     return error
  //   }
  // }

  return (
    <>
      <Routes>
        <Route path='/' element={ <Layout /> } >
          <Route path='/pokedex' element={ <Pokedex /> } />
        </Route>
      </Routes>
    </>
  );
}

export default App;
