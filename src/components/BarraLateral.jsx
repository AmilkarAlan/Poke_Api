import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExtraInfo, getPokemon } from "../redux/pokemonSlice";
import { useParams } from "react-router-dom";

const BarraLateral = () => {
  const { pokemon, pokeExtra } = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getPokemon(id));
      console.log(id);
      
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (pokemon && pokemon.species?.url) {
      dispatch(fetchExtraInfo(pokemon.species.url));
    }
  }, [dispatch, pokemon]);

  return (
    <aside className="h-full w-full flex flex-col bg-blue-200">
      {id && pokemon ? (
        <div className="">
          {/* Imagen del Pokémon */}
          <div className="w-40 h-40 rounded-full">
            <img
              className="object-cover h-full w-full"
              src={pokemon.sprites?.other?.home?.front_default}
              alt={pokemon.name}
            />
          </div>

          {/* Información del Pokémon */}
          <div className="">
            <p>
              <span>#</span>
              {`${pokemon.id?.toString().padStart(4, "0")}`}
            </p>
            <h3>{pokemon.name}</h3>
            {/* Información extra */}
            {pokeExtra && <p>{pokeExtra.flavor_text_entries[0].flavor_text}</p>}
          </div>
        </div>
      ) : (
        <div>
          <p>Busca o selecciona un Pokémon</p>
        </div>
      )}
    </aside>
  );
};

export default BarraLateral;
