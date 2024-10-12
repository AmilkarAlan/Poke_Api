import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExtraInfo, getPokemon } from "../redux/pokemonSlice";
import { useParams } from "react-router-dom";
import { fetchPokeTypes } from "../redux/typesSlice";
import valorIcon from "../assets/valor.png"
import CadenaEvolutiva from "./CadenaEvolutiva";

const BarraLateral = () => {
  const { pokemon, pokeExtra } = useSelector((state) => state.pokemons);
  const { types } = useSelector((state) => state.types);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getPokemon(id));
    }
  }, [ dispatch, id ]);

  useEffect(() => {
    if (pokemon) {
      // Filtrar los tipos que aún no han sido cargados
      const missingTypes = pokemon.types.filter(type =>
        !types.find(t => t.name === type.type.name)
      );

      // Despachar acciones solo si faltan tipos
      missingTypes.forEach(type => {
        dispatch(fetchPokeTypes(type.type.url));
      });

      // Despachar la información extra solo si existe la URL de species
      if (pokemon.species?.url) {
        dispatch(fetchExtraInfo(pokemon.species.url));
      }
    }
  }, [ dispatch, pokemon, types ]);


  const flavorTextInSpanish = pokeExtra?.flavor_text_entries.find(
    (entry) => entry.language.name === "es"
  );
  const generaPokemonSpanish = pokeExtra?.genera.find(
    (entry) => entry.language.name === "es"
  );

  return (
    <aside className="w-full p-4 flex flex-col bg-white rounded-xl shadow-2xl">
      { id && pokemon ? (
        <div className="flex flex-col items-center pl-4 pr-4 gap-4">
          {/* Imagen del Pokémon */ }
          <div className="flex w-40 h-24 relative">
            <img
              className="drop-shadow-lg object-cover h-fit w-fit absolute bottom-0"
              src={ pokemon.sprites?.other?.home?.front_default }
              alt={ pokemon.name }
            />
          </div>

          {/* Información del Pokémon */ }
          <div className="flex flex-col items-center">
            <p className="font-bold text-gray-500">
              <span>#</span>
              { `${pokemon.id?.toString().padStart(4, "0")}` }
            </p>
            <h2 className="text-3xl">{ pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) }</h2>
            <p>
              { generaPokemonSpanish ? (
                <p className="text-gray-400">{ generaPokemonSpanish.genus }</p>
              ) : null }
            </p>
            <div className="w-full flex justify-center items-center gap-2 mt-4 mb-2">
              { pokemon.types.map((type) => {
                const foundType = types.find(t => t.name === type.type.name);
                return foundType ? (
                  <div key={ foundType.id } className="h-5">
                    <img
                      className="h-full"
                      src={ foundType.sprites[ 'generation-viii' ][ 'legends-arceus' ][ 'name_icon' ] }
                      alt={ foundType.name }
                    />
                  </div>
                ) : null;
              }) }
            </div>
            {/* { pokeExtra && ( */ }
            <div className="flex flex-col justify-center items-center text-center">
              <h3>Información de la pokedex</h3>
              { flavorTextInSpanish ? (
                <p>{ flavorTextInSpanish.flavor_text }</p>
              ) : (
                <p>No se encontró una descripción en español.</p>
              ) }
            </div>
            {/* ) } */ }
            <div className="flex flex-col items-center">
              <h3>Habilidades</h3>
              <div className="flex gap-2">
                { pokemon.abilities.map((a, i) => (
                  <div className="rounded-xl border border-gray-600 flex items-center p-1" key={ i }>
                    <p >{ a.ability.name.charAt(0).toUpperCase() + a.ability.name.slice(1) }</p>
                  </div>
                )) }
              </div>
            </div>
            <CadenaEvolutiva pokemon={pokemon}/>
          </div>
        </div>
      ) : (
        <div className="h-full w-full flex justify-center items-center">
          <img className="h-1/3 w-1/2 drop-shadow-[0px_10px_8px_#ef4444]" src={valorIcon} alt="logo" />
        </div>
      ) }
    </aside>
  );
};

export default BarraLateral;
