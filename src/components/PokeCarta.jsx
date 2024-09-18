
const PokeCarta = ({ poke }) => {

    return (
        <div>
            <img src={poke.sprites.front_default}/>
            <p>{ poke.name }</p>
            <div className="types">
            {poke.types.map((type) => (
              <span key={type.slot} className="type-badge mr-2">
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
    )
}

export default PokeCarta