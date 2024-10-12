import { useDispatch } from "react-redux"
import { getPokemon } from "../redux/pokemonSlice";
import { useEffect } from "react";

function CadenaEvolutiva({ pokemon }) {
  const dispatch = useDispatch();
  useEffect(() => {
    
  }, []);
  const handleNext = () => {
    dispatch(getPokemon(pokemon.id + 1))
  }
  return (
    <>
      <div className="flex flex-col items-center">
        <h3>Cadena evolutiva</h3>

      </div>
      <div className="flex gap-2 items-center">
        <button></button>
        <button>Siguiente</button>
      </div>
    </>
  )
}

export default CadenaEvolutiva