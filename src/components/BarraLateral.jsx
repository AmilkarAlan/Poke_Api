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
  }, [ dispatch, id ]);

  useEffect(() => {
    if (pokemon && pokemon.species?.url) {
      dispatch(fetchExtraInfo(pokemon.species.url));
    }
  }, [ dispatch, pokemon ]);

  const flavorTextInSpanish = pokeExtra?.flavor_text_entries.find(
    (entry) => entry.language.name === "es"
  );

  return (
    <aside className="h-full w-full flex flex-col content-center bg-white">
      { id && pokemon ? (
        <div className="flex flex-col items-center">
          {/* Imagen del Pokémon */ }
          <div className="w-40 h-40 rounded-full relative">
            <img
              className="object-cover h-full w-full absolute bottom-14"
              src={ pokemon.sprites?.other?.home?.front_default }
              alt={ pokemon.name }
            />
          </div>

          {/* Información del Pokémon */ }
          <div className="flex flex-col items-center">
            <p>
              <span>#</span>
              { `${pokemon.id?.toString().padStart(4, "0")}` }
            </p>
            <h3>{ pokemon.name }</h3>
            { pokeExtra && (
              <div>
              {flavorTextInSpanish ? (
                <p>{flavorTextInSpanish.flavor_text}</p>
              ) : (
                <p>No se encontró una descripción en español.</p>
              )}
            </div>
            ) }
          </div>
        </div>
      ) : (
        <div>
          <p>Busca o selecciona un Pokémon</p>
        </div>
      ) }
    </aside>
  );
};

export default BarraLateral;
