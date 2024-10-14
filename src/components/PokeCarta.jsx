import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchColors, fetchPokeTypes } from "../redux/typesSlice";
import Esqueleto from "./Esqueleto";
import pokeIconBlack from "../assets/pokeIconBlack.png"

const PokeCarta = ({ poke }) => {
  const dispatch = useDispatch();
  const { types, colors } = useSelector((state) => state.types);
  const typeLoad = useSelector((state) => state.types.status);
  const infoLoad = useSelector((state) => state.pokemons.status);
  const [ loaded, setLoaded ] = useState(false);

  useEffect(() => {
    if (colors.length === 0) {
      dispatch(fetchColors());
    }
  }, [ dispatch, colors, poke ]);

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
    const missingTypes = poke.types.filter(type => 
      !types.find(t => t.name === type.type.name)
    );
  
    if (missingTypes.length > 0) {
      missingTypes.forEach((type) => {
        dispatch(fetchPokeTypes(type.type.url));
      });
    }
  }, [poke, types, dispatch]);
  

  return (
    <div className="w-full flex items-center gap-4 p-2 bg-white rounded-md shadow-xl  box-shadow-card"

    // style={{backgroundImage: `url(${poke.sprites.other.dream_world.front_default})`}}
    >
      { !loaded ? <Esqueleto /> :
        (<>
          <div className="relative flex justify-center items-center h-fit w-fit">
            <div className="w-8 h-8 flex rounded-full">
              <img className="object-contain w-full h-full" alt={ poke.name } src={ poke.sprites.other.showdown.front_default !== null ? poke.sprites.other.showdown.front_default : poke.sprites.other.dream_world.front_default } />
            </div>
          </div>
          <div className="w-full h-full flex items-center gap-2">
            <p className="text-gray-500"><span>#</span>{ `${poke.id.toString().padStart(4, '0')}` }</p> {/* convertimos a string y añadimos padStart para que sea una cadena de 4 caracteres, en caso de tener menos agrega 0 al inicio para completar, 1, 0001, añade 3 para completar la cadena de 4 con el 1*/ }
            <h3 className="font-bold text-base">{ poke.name.charAt(0).toUpperCase() + poke.name.slice(1) }</h3>
          </div>
          
          <div className="h-full w-full flex gap-2 justify-start items-center">
            { poke.types.map((type) => {
              const foundType = types.find(t => t.name === type.type.name);
              return foundType ? (
                <div key={ foundType.id } className="overflow-hidden w-6 h-6">
                  <img
                    className="object-cover object-left w-full h-full"
                    src={ foundType.sprites[ 'generation-viii' ][ 'legends-arceus' ][ 'name_icon' ] }
                    alt={ foundType.name }
                  />
                </div>
              ) : null;
            }) }
          </div>
          <div className="h-full w-full flex justify-end">
            <img className="h-6 w-6 opacity-55" src={pokeIconBlack} alt="icon" />
          </div>
        </>) }
    </div>
  );
};

export default PokeCarta;
