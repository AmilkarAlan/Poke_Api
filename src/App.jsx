import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import BarraLateral from './components/BarraLateral';


function App() {

  return (
    <>
      <Routes>
        <Route path='/pokedex/' element={ <Layout /> } >
          <Route path=':id' element={ <BarraLateral /> } >
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
