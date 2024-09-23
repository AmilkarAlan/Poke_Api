import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchColors, fetchPokeTypes } from "../redux/typesSlice";
import Esqueleto from "./Esqueleto";

const PokeCarta = ({ poke }) => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types.types);
  const colors = useSelector((state) => state.types.colors);
  const typeLoad = useSelector((state) => state.types.status);
  const infoLoad = useSelector((state) => state.pokemons.status);
  const [ loaded, setLoaded ] = useState(false);

  useEffect(() => {
    if (colors.length === 0) {
      dispatch(fetchColors());
    }
  }, [ dispatch, colors ]);

  useEffect(() => {
    if (typeLoad === "succeeded" && infoLoad === "succeeded") {
      setLoaded(true)
    }
  }, [ typeLoad, infoLoad ]);

  // Encontrar el color correspondiente al Pokémon
  const pokemonColor = colors.find(colorObj =>
    colorObj.pokemons.includes(poke.name)
  );

  // Asignar el color de fondo basado en el resultado
  const bgColorClass = pokemonColor ? `poke-color-${pokemonColor.color}` : "poke-color-gray";



  useEffect(() => {

    console.log(bgColorClass);

  }, [ bgColorClass ]);

  useEffect(() => {
    poke.types.map((type) => {
      if (!types.find(t => t.name === type.type.name)) {
        dispatch(fetchPokeTypes(type.type.url));
      }
    });
  }, [ poke, dispatch ]);

  return (
        <div className="w-full flex flex-col justify-center items-center bg-white rounded-md shadow-2xl"
        
    // style={{backgroundImage: `url(${poke.sprites.other.dream_world.front_default})`}}
    >
      { !loaded ? <Esqueleto /> :
        (<>
        <div className="relative flex justify-center items-center h-14">
          <div className="w-12 h-12 flex rounded-full absolute top-[-1.5rem]">
            <img className="object-scale-down w-full h-full" alt={ poke.name } src={ poke.sprites.other.showdown.front_default !== null ? poke.sprites.other.showdown.front_default : poke.sprites.other.dream_world.front_default } />
          </div>
        </div>
          <div className="flex flex-col justify-center items-center">
            <p><span>#</span>{ `${poke.id.toString().padStart(4, '0')}` }</p> {/* convertimos a string y añadimos padStart para que sea una cadena de 4 caracteres, en caso de tener menos agrega 0 al inicio para completar, 1, 0001, añade 3 para completar la cadena de 4 con el 1*/ }
            <p>{ poke.name }</p>
          </div>
          <div className="h-full types flex gap-2 justify-center items-center">
            { poke.types.map((type) => {
              const foundType = types.find(t => t.name === type.type.name);
              return foundType ? (
                <div className="icon-container overflow-hidden w-6 h-6">
                  <img
                    className="object-cover object-left w-full h-full"
                    key={ type.slot }
                    src={ foundType.sprites[ 'generation-viii' ][ 'legends-arceus' ][ 'name_icon' ] }
                    alt={ foundType.name }
                  />
                </div>
              ) : null;
            }) }
          </div>
        </>) }
    </div>
  );
};

export default PokeCarta;
