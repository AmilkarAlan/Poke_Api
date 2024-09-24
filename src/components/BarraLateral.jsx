import { useSelector } from "react-redux"

const BarraLateral = () => {
  const pokemon = useSelector((state) => state.search.searchResult)


  return (
    <aside className="flex flex-col bg-blue-200">
      {
        pokemon ? (
          <div className="">
            <div className="bg-black w-24 h-24 rounded-full">
              <img className="object-cover h-full w-full" src={ pokemon.sprites.other.home.front_default } alt="" />
            </div>
            <div className="">
              <p><span>#</span>{ `${pokemon.id.toString().padStart(4, '0')}` }</p>
              <h3>{pokemon.name}</h3>
              {/* <p>{pokemon}</p> */}
              {console.log(pokemon)}
            </div>
          </div>
        ) :
          <div>
            <p>Busca o selecciona un pokemon</p>
          </div>
      }
    </aside>
  )
}

export default BarraLateral