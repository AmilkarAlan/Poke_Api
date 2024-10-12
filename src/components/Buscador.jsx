import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PokeCarta from './PokeCarta';
import { clearPokemon, searchPokemon } from '../redux/searchSlice';
import { Link } from 'react-router-dom';
import { selectPokemon } from '../redux/pokemonSlice';
import pokeBallIcon from "../../public/pokeballIcon.png"

const Buscador = () => {
    const result = useSelector((state) => state.search.searchResult);
    const { pokedex } = useSelector((state) => state.pokemons);
    const status = useSelector((state) => state.search.status);
    const dispatch = useDispatch();

    const [ input, setInput ] = useState("");

    const handleSearch = () => {
        if (input !== "") {
            const lowerName = input.toLowerCase();
            dispatch(searchPokemon(lowerName));
        }
    };

    const handleSelectPokemon = (pokemon) => {
        dispatch(selectPokemon(pokemon))
        dispatch(clearPokemon())
        setInput("")

    }

    return (
        <div className='w-full h-fit flex flex-col justify-center items-center gap-4 mb-2'>
            <form onSubmit={ (e) => e.preventDefault() } className="w-full flex items-center h-full p-2 bg-white rounded-lg shadow-lg">
                <input
                    type="text"
                    value={ input }
                    onChange={ (e) => setInput(e.target.value) }
                    placeholder="Busca un pokemon por nombre ó por número en la pokedex: Pikachu ó 25"
                    className="w-full h-10 mr-2 ml-2 outline-none placeholder:text-sm"

                />
                <button className="w-fit h-fit p-1 rounded-lg bg-red-600 shadow-lg shadow-red-500" onClick={ handleSearch }><img className='h-8 w-8' src={ pokeBallIcon } alt="icon" /></button>
            </form>
            <div className='w-1/2 h-full gap-4'>


                { status === "searching" && <h3>Buscando...</h3> }
                { status === "notFound" && <h3>Pokemon no encontrado</h3> }
                { status === "found" && (
                    <Link className='w-full h-full flex' to={ `/pokedex/${result.id}` } onClick={ () => handleSelectPokemon(result) }>
                        <PokeCarta poke={ result } />
                    </Link>
                ) }

            </div>
        </div>
    )
}

export default Buscador