import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PokeCarta from './PokeCarta';
import { clearPokemon, searchPokemon } from '../redux/searchSlice';
import { Link } from 'react-router-dom';
import { selectPokemon } from '../redux/pokemonSlice';
import pokeBallIcon from "../../public/pokeballIcon.png"

const Buscador = () => {
    const result = useSelector((state) => state.search.searchResult);
    const status = useSelector((state) => state.search.status);
    const dispatch = useDispatch();

    const [ name, setName ] = useState("");

    const handleSearch = () => {
        if (name !== "") {
            const lowerName = name.toLowerCase();
            dispatch(searchPokemon(lowerName));
        }
    };

    const handleSelectPokemon = (pokemon) => {
        dispatch(selectPokemon(pokemon))
        dispatch(clearPokemon())

    }

    return (
        <div className='w-full h-fit flex flex-col justify-center items-center'>
            <form onSubmit={ (e) => e.preventDefault() } className="w-full mt-4 flex items-center h-full p-2 bg-white rounded-lg shadow-lg">
                <input
                    type="text"
                    value={ name }
                    onChange={ (e) => setName(e.target.value) }
                    placeholder="Ejemplo: pikachu ó 25"
                    className="w-full h-10 mr-2 ml-2 outline-none"

                />
                <button className="w-fit h-fit p-1 rounded-lg bg-red-600 shadow-lg shadow-red-500" onClick={ handleSearch }><img className='h-8 w-8' src={pokeBallIcon} alt="icon" /></button>
            </form>
            <div className='w-1/2 h-full mt-8'>
                <div className='flex w-full h-30 mb-4'>
                    {status === "idle" && <h3>Busca un pokemon por nombre o por numero en la pokedex</h3>}
                    { status === "searching" && <h3>Buscando...</h3> }
                    { status === "notFound" && <h3>Pokemon no encontrado</h3> }
                    { status === "found" && (
                        <Link className='w-full h-full flex' to={ `pokedex/${result.id}` } onClick={ () => handleSelectPokemon(result) }>
                            <PokeCarta poke={ result } />
                        </Link>
                    ) }
                </div>
            </div>
        </div>
    )
}

export default Buscador