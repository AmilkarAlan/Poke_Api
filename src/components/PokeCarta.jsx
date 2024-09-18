import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokeTypes } from "../redux/typesSlice";

const PokeCarta = ({ poke }) => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types.types);

  useEffect(() => {
    poke.types.map((type) => {
      if (!types.find(t => t.name === type.type.name)) {
        dispatch(fetchPokeTypes(type.type.url));
      }
    });
  }, [ poke, dispatch ]);

  return (
    <div className="bg-slate-600 h-fit w-fit flex flex-col">
      <img src={ poke.sprites.front_default } alt={ poke.name } />
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
    </div>
  );
};

export default PokeCarta;
