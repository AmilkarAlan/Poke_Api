import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PokeCarta from './PokeCarta';
import { searchPokemon } from '../redux/searchSlice';

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

    return (
        <div className='w-full h-fit flex flex-col justify-center items-center'>
            <form onSubmit={ (e) => e.preventDefault() } className="w-full mt-4 flex">
                <input
                    type="text"
                    value={ name }
                    onChange={ (e) => setName(e.target.value) }
                    placeholder="Search Pokémon..."
                    className="w-full"

                />
                <button className="w-fit" onClick={ handleSearch }>Go</button>
            </form>
            <div className='w-1/2 h-full mt-8'>
                <div className='flex w-full h-full mb-4'>
                    { status === "searching" && <h3>Buscando...</h3> }
                    { status === "notFound" && <h3>Pokemon no encontrado</h3> }
                    { status === "found" && <PokeCarta poke={ result } /> }
                </div>
            </div>
        </div>
    )
}

export default Buscador