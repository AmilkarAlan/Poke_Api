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
  }, [ typeLoad, infoLoad]);

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
    <div className={ `${bgColorClass} h-fit w-fit flex flex-col bg-red` }>
      { !loaded ? <Esqueleto /> : (        <>
          <img src={ poke.sprites.front_default } alt={ poke.name } onLoad={ () => setLoaded(true) } />
          <p>{ poke.name }</p>
          <div className="types flex">
            { poke.types.map((type) => {
              const foundType = types.find(t => t.name === type.type.name);
              return foundType ? (
                <div className="icon-container overflow-hidden w-8 h-8 rounded-full ">
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
        </>)}
      {/* { loaded && (
        <>
          <img src={ poke.sprites.front_default } alt={ poke.name } onLoad={ () => setLoaded(true) } />
          <p>{ poke.name }</p>
          <div className="types flex">
            { poke.types.map((type) => {
              const foundType = types.find(t => t.name === type.type.name);
              return foundType ? (
                <div className="icon-container overflow-hidden w-8 h-8 rounded-full ">
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
        </>
      ) } */}
    </div>
  );
};

export default PokeCarta;
