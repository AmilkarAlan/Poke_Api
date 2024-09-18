import React from 'react'

const Bucador = () => {
    const handleSearch = () => {
        dispatch(searchPokemon(name));
      };
    return (
        <div>
            <div className="inicial buscador">
                <input
                    type="text"
                    value={ name }
                    onChange={ (e) => setName(e.target.value) }
                    placeholder="Search Pokémon..."
                />
                <button onClick={ handleSearch }>Go</button>
            </div>
        </div>
    )
}

export default Bucador